import React, { useState } from 'react';
import ProductsAdmin from './ProductsAdmin';
import ProductForm from './ProductForm';
import FeaturedManager from './FeaturedManager';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');

  const tabs = [
    { id: 'products', label: ' Productos', icon: '📦' },
    { id: 'featured', label: ' Destacados', icon: '⭐' },
    { id: 'offers', label: ' Ofertas', icon: '🏷️' },
    { id: 'popular', label: ' Populares', icon: '🔥' }
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2> Panel de Administración - Fercho Store</h2>
      
      </div>

      {/* Tabs Navigation */}
      <div className="admin-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="admin-content">
        {activeTab === 'products' && (
          <div className="tab-content">
            <div className="products-section">
              <div className="admin-grid">
                <div className="admin-card">
                  <h3></h3>
                  <ProductForm />
                </div>
                <div className="admin-card">
                  <h3> Gestionar Productos</h3>
                  <ProductsAdmin />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'featured' && (
          <div className="tab-content">
            <FeaturedManager type="featured" title="⭐ Productos Destacados" />
          </div>
        )}

        {activeTab === 'offers' && (
          <div className="tab-content">
            <FeaturedManager type="offers" title="🏷️ Ofertas Especiales" />
          </div>
        )}

        {activeTab === 'popular' && (
          <div className="tab-content">
            <FeaturedManager type="popular" title="🔥 Productos Populares" />
          </div>
        )}
      </div>
    </div>
  );
}
