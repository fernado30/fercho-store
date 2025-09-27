import React, { useEffect, useState } from 'react';
import { getAllProducts, getProductsByCategory } from '../services/productsService';
import ProductCard from '../components/ProductCard';
import { useStore } from '../stores/useStore';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const addToCart = useStore((s) => s.addToCart);

  useEffect(() => {
    const load = async () => {
      try {
        if (category) {
          const byCat = await getProductsByCategory(category);
          setProducts(byCat);
        } else {
          const all = await getAllProducts();
          setProducts(all);
        }
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [category]);

  return (
    <div>
      <h2>Tienda</h2>
      <div className="mb-3">
        <select className="form-select w-auto" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Todas</option>
          <option value="electronics">Electrónica</option>
          <option value="clothing">Ropa</option>
          <option value="home">Hogar</option>
        </select>
      </div>

      <div className="row g-3">
        {products.map((p) => (
          <div key={p.id} className="col-12 col-md-4">
            <ProductCard product={p} onAdd={(prod) => addToCart(prod, 1)} />
          </div>
        ))}
      </div>
    </div>
  );
}
