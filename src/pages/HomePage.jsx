import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import ProductCard from '../components/ProductCard';
import { useStore } from '../stores/useStore';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Obtener función para agregar al carrito del store
  const addToCart = useStore((s) => s.addToCart);

  useEffect(() => {
    loadSpecialProducts();
  }, []);

  // Cargar todos los productos especiales
  const loadSpecialProducts = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadFeatured(),
        loadOffers(), 
        loadPopular()
      ]);
      console.log('Productos especiales cargados exitosamente');
    } catch (error) {
      console.error('Error loading special products:', error);
      alert('Error al cargar los productos especiales');
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos destacados
  const loadFeatured = async () => {
    try {
      const q = query(collection(db, 'featured'), where('isActive', '==', true));
      const snapshot = await getDocs(q);
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFeaturedProducts(products.slice(0, 6)); // Máximo 6 productos
      console.log(`Productos destacados cargados: ${products.length}`);
    } catch (error) {
      console.error('Error loading featured products:', error);
    }
  };

  // Cargar ofertas
  const loadOffers = async () => {
    try {
      const q = query(collection(db, 'offers'), where('isActive', '==', true));
      const snapshot = await getDocs(q);
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOffers(products.slice(0, 8)); // Máximo 8 ofertas
      console.log(`Ofertas cargadas: ${products.length}`);
    } catch (error) {
      console.error('Error loading offers:', error);
    }
  };

  // Cargar productos populares
  const loadPopular = async () => {
    try {
      const q = query(collection(db, 'popular'), where('isActive', '==', true));
      const snapshot = await getDocs(q);
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPopularProducts(products.slice(0, 6)); // Máximo 6 productos
      console.log(`Productos populares cargados: ${products.length}`);
    } catch (error) {
      console.error('Error loading popular products:', error);
    }
  };

  // Función para agregar al carrito con feedback visual
  const handleAddToCart = (product) => {
    try {
      // Preparar el producto para el carrito (asegurar formato correcto)
      const cartProduct = {
        id: product.id,
        title: product.title,
        price: product.price, // Usar precio con descuento si es una oferta
        image: product.image,
        qty: 1 // Cantidad inicial
      };

      // Agregar al carrito usando el store
      addToCart(cartProduct);
      
      // Feedback visual para el usuario
      alert(`✅ ${product.title} agregado al carrito! 🛒`);
      
      console.log('Producto agregado al carrito:', cartProduct);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('❌ Error al agregar el producto al carrito');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando productos especiales...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>🌿 Bienvenido a Fercho Store</h1>
          <p>Descubre los mejores productos con ofertas increíbles</p>
          <Link to="/shop" className="btn btn-primary hero-btn">
            🛍️ Explorar Tienda
          </Link>
        </div>
        <div className="hero-decoration">
          <div className="floating-icon">🌱</div>
          <div className="floating-icon">🛒</div>
          <div className="floating-icon">⭐</div>
        </div>
      </section>

      {/* Productos Destacados */}
      {featuredProducts.length > 0 && (
        <section className="products-section featured-section">
          <div className="section-header">
            <h2>⭐ Productos Destacados</h2>
            <p>Los productos más recomendados por nuestro equipo</p>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={handleAddToCart}
                badge="⭐"
              />
            ))}
          </div>
          <div className="section-footer">
            <p>✨ {featuredProducts.length} productos destacados disponibles</p>
          </div>
        </section>
      )}

      {/* Ofertas Especiales */}
      {offers.length > 0 && (
        <section className="products-section offers-section">
          <div className="section-header special-offers">
            <h2>🏷️ Ofertas Especiales</h2>
            <p>¡Descuentos increíbles por tiempo limitado!</p>
          </div>
          <div className="products-grid offers-grid">
            {offers.map(product => (
              <div key={product.id} className="offer-card-wrapper">
                <ProductCard
                  product={product}
                  onAdd={handleAddToCart}
                  badge={product.discountPercentage ? `-${product.discountPercentage}%` : '🏷️'}
                />
                {product.originalPrice && product.originalPrice !== product.price && (
                  <div className="offer-details">
                    <span className="original-price">Antes: ${product.originalPrice}</span>
                    <span className="savings">
                      ¡Ahorras ${(product.originalPrice - product.price).toFixed(2)}!
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="section-footer offers-footer">
            <p>🔥 {offers.length} ofertas activas - ¡Aprovéchalas ahora!</p>
          </div>
        </section>
      )}

      {/* Productos Populares */}
      {popularProducts.length > 0 && (
        <section className="products-section popular-section">
          <div className="section-header">
            <h2>🔥 Productos Populares</h2>
            <p>Los favoritos de nuestros clientes</p>
          </div>
          <div className="products-grid">
            {popularProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={handleAddToCart}
                badge="🔥"
              />
            ))}
          </div>
          <div className="section-footer">
            <p>❤️ {popularProducts.length} productos populares entre nuestros clientes</p>
          </div>
        </section>
      )}

      {/* Mensaje cuando no hay productos especiales */}
      {!loading && featuredProducts.length === 0 && offers.length === 0 && popularProducts.length === 0 && (
        <section className="empty-home-state">
          <div className="empty-content">
            <h2>🏪 ¡Próximamente productos especiales!</h2>
            <p>El administrador aún no ha configurado productos destacados, ofertas o populares.</p>
            <Link to="/shop" className="btn btn-primary">
              🛍️ Ver Todos los Productos
            </Link>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h3>¿No encontraste lo que buscabas?</h3>
          <p>Explora todo nuestro catálogo de productos</p>
          <Link to="/shop" className="btn btn-outline cta-btn">
            🔍 Ver Todos los Productos
          </Link>
        </div>
      </section>
    </div>
  );
}