import React, { useState } from 'react';
import { createProduct } from '../../services/productsService';

export default function ProductForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('electronics');

  const handle = async (e) => {
    e.preventDefault();
    try {
      await createProduct({ title, description, price: Number(price), image, category, createdAt: new Date().toISOString() });
      alert('Producto creado');
      setTitle(''); setDescription(''); setPrice(''); setImage('');
    } catch (err) {
      console.error(err);
      alert('Error creando producto');
    }
  };

  return (
    <form onSubmit={handle}>
      <h4>Crear producto</h4>
      <input className="form-control mb-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" />
      <textarea className="form-control mb-2" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" />
      <input className="form-control mb-2" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Precio" />
      <input className="form-control mb-2" value={image} onChange={(e) => setImage(e.target.value)} placeholder="URL imagen" />
      <select className="form-select mb-2" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="electronics">Electrónica</option>
        <option value="clothing">Ropa</option>
        <option value="home">Hogar</option>
      </select>
      <button className="btn btn-primary">Crear</button>
    </form>
  );
}
