import React from 'react';

export default function Cart({ cart, onUpdateQty, onRemove }) {
  return (
    <div>
      {cart.length === 0 && <p>El carrito está vacío.</p>}
      {cart.map((p) => (
        <div key={p.id} className="d-flex align-items-center mb-3">
          <img src={p.image} alt={p.title} style={{ width: 80, height: 80, objectFit: 'cover' }} />
          <div className="ms-3 flex-grow-1">
            <h6>{p.title}</h6>
            <p>${p.price} x {p.qty}</p>
            <div>
              <input type="number" value={p.qty} min={1} onChange={(e) => onUpdateQty(p.id, Number(e.target.value))} style={{ width: 80 }} />
              <button className="btn btn-link text-danger" onClick={() => onRemove(p.id)}>Eliminar</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
