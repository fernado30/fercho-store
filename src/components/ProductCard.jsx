import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAdd, badge }) {
  return (
    <div className="product-card fade-in-up">
      {/* Imagen del producto */}
      <div className="product-card-image">
        <img 
          src={product.image} 
          alt={product.title}
        />
        {/* Badge especial si existe */}
        {badge && (
          <div className={`product-badge ${
            badge.includes('%') ? 'offer' : 
            badge.includes('🔥') ? 'popular' : 
            'featured'
          }`}>
            {badge}
          </div>
        )}
      </div>
      
      {/* Contenido del producto */}
      <div className="product-card-content">
        <h3>{product.title}</h3>
        
        {/* Precio con lógica para ofertas */}
        <div className="product-price">
          {product.originalPrice && product.originalPrice !== product.price ? (
            <>
              <span className="original-price">${product.originalPrice}</span>
              <span className="discounted-price">${product.price}</span>
            </>
          ) : (
            <span className="current-price">${product.price}</span>
          )}
        </div>
        
        {/* Botones de acción */}
        <div className="product-actions">
          <Link 
            className="btn btn-outline" 
            to={`/product/${product.id}`}
          >
             Ver Detalles
          </Link>
          <button 
            className="btn btn-primary" 
            onClick={() => onAdd(product)}
          >
            🛒 Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
