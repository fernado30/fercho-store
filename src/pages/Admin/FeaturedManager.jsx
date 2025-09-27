import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function FeaturedManager({ type, title }) {
  const [allProducts, setAllProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [loading, setLoading] = useState(false);

  // Cargar productos al montar el componente
  useEffect(() => {
    loadAllProducts();
    loadFeaturedProducts();
  }, [type]);

  // Cargar todos los productos disponibles
  const loadAllProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'products'));
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAllProducts(products);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  // Cargar productos destacados del tipo específico
  const loadFeaturedProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, type));
      const featured = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFeaturedProducts(featured);
    } catch (error) {
      console.error(`Error loading ${type}:`, error);
    }
  };

  // Agregar producto a la colección especial
  const addToFeatured = async (e) => {
    e.preventDefault();
    if (!selectedProduct) {
      alert('Por favor selecciona un producto');
      return;
    }

    setLoading(true);
    try {
      // Buscar el producto seleccionado
      const product = allProducts.find(p => p.id === selectedProduct);
      if (!product) {
        alert('Producto no encontrado');
        return;
      }

      // Crear el documento en la colección específica
      const featuredData = {
        ...product,
        originalPrice: product.price,
        addedAt: new Date().toISOString(),
        isActive: true
      };

      // Si es una oferta, agregar descuento
      if (type === 'offers' && discountPercentage) {
        const discount = parseFloat(discountPercentage);
        featuredData.discountPercentage = discount;
        featuredData.price = product.price * (1 - discount / 100);
        featuredData.discountedPrice = featuredData.price;
      }

      await setDoc(doc(db, type, selectedProduct), featuredData);
      
      alert(`Producto agregado a ${title.toLowerCase()} exitosamente`);
      setSelectedProduct('');
      setDiscountPercentage('');
      loadFeaturedProducts();
    } catch (error) {
      console.error(`Error adding to ${type}:`, error);
      alert('Error al agregar el producto');
    } finally {
      setLoading(false);
    }
  };

  // Remover producto de la colección especial
  const removeFromFeatured = async (productId) => {
    if (!confirm('¿Estás seguro de que quieres remover este producto?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, type, productId));
      alert('Producto removido exitosamente');
      loadFeaturedProducts();
    } catch (error) {
      console.error(`Error removing from ${type}:`, error);
      alert('Error al remover el producto');
    }
  };

  // Alternar estado activo/inactivo
  const toggleActive = async (productId, currentStatus) => {
    try {
      const productRef = doc(db, type, productId);
      const productDoc = await getDoc(productRef);
      
      if (productDoc.exists()) {
        await setDoc(productRef, {
          ...productDoc.data(),
          isActive: !currentStatus
        }, { merge: true });
        
        loadFeaturedProducts();
      }
    } catch (error) {
      console.error('Error toggling status:', error);
      alert('Error al cambiar el estado');
    }
  };

  return (
    <div className="featured-manager">
      <div className="featured-header">
        <h3>{title}</h3>
        
      </div>

      {/* Formulario para agregar productos */}
      <div className="add-featured-form">
        <h4>➕ Agregar Producto</h4>
        <form onSubmit={addToFeatured} className="featured-form">
          <div className="form-row">
            <div className="form-group flex-1">
              <label>Seleccionar Producto:</label>
              <select 
                className="form-control"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                required
              >
                <option value="">-- Selecciona un producto --</option>
                {allProducts
                  .filter(product => !featuredProducts.find(f => f.id === product.id))
                  .map(product => (
                    <option key={product.id} value={product.id}>
                      {product.title} - ${product.price}
                    </option>
                  ))}
              </select>
            </div>

            {type === 'offers' && (
              <div className="form-group">
                <label>% Descuento:</label>
                <input
                  type="number"
                  className="form-control"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(e.target.value)}
                  placeholder="10"
                  min="1"
                  max="90"
                  required
                />
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="btn btn-success"
            disabled={loading}
          >
            {loading ? ' Agregando...' : `➕ Agregar a ${title}`}
          </button>
        </form>
      </div>

      {/* Lista de productos en la categoría */}
      <div className="featured-list">
        <h4> Productos Actuales ({featuredProducts.length})</h4>
        
        {featuredProducts.length === 0 ? (
          <div className="empty-state">
            <p> No hay productos en esta categoría</p>
            <small>Agrega productos usando el formulario de arriba</small>
          </div>
        ) : (
          <div className="featured-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className={`featured-item ${!product.isActive ? 'inactive' : ''}`}>
                <div className="featured-item-image">
                  <img src={product.image} alt={product.title} />
                  <div className="featured-badge">
                    {type === 'featured' && '⭐'}
                    {type === 'offers' && '🏷️'}
                    {type === 'popular' && '🔥'}
                  </div>
                </div>
                
                <div className="featured-item-content">
                  <h5>{product.title}</h5>
                  
                  <div className="featured-price">
                    {type === 'offers' && product.discountPercentage ? (
                      <>
                        <span className="original-price">${product.originalPrice}</span>
                        <span className="discounted-price">${product.price.toFixed(2)}</span>
                        <span className="discount-badge">-{product.discountPercentage}%</span>
                      </>
                    ) : (
                      <span className="current-price">${product.price}</span>
                    )}
                  </div>

                  <div className="featured-actions">
                    <button
                      className={`btn btn-sm ${product.isActive ? 'btn-warning' : 'btn-success'}`}
                      onClick={() => toggleActive(product.id, product.isActive)}
                    >
                      {product.isActive ? '⏸️ Desactivar' : '▶️ Activar'}
                    </button>
                    
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeFromFeatured(product.id)}
                    >
                      🗑️ Remover
                    </button>
                  </div>

                  <div className="featured-status">
                    <span className={`status-badge ${product.isActive ? 'active' : 'inactive'}`}>
                      {product.isActive ? '✅ Activo' : '⏸️ Inactivo'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}