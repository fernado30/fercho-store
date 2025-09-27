import React, { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct } from '../../services/productsService';

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);

  const load = async () => {
    const all = await getAllProducts();
    setProducts(all);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Eliminar producto?')) return;
    await deleteProduct(id);
    await load();
  };

  return (
    <div>
      <h4>Productos</h4>
      <ul className="list-group">
        {products.map(p => (
          <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{p.title}</strong> - ${p.price}
            </div>
            <div>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}> 🗑️Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
