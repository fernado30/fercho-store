import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../services/productsService';
import { useStore } from '../stores/useStore';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const addToCart = useStore((s) => s.addToCart);

  useEffect(() => {
    getProduct(id).then(setProduct).catch(console.error);
  }, [id]);

  if (!product) return <p>Cargando...</p>;

  return (
    <div className="row">
      <div className="col-md-6">
        <img src={product.image} className="img-fluid" alt={product.title} />
      </div>
      <div className="col-md-6">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <h4>${product.price}</h4>
        <button className="btn btn-primary" onClick={() => addToCart(product, 1)}>Agregar al carrito</button>
      </div>
    </div>
  );
}
