import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../stores/useStore';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function Navbar() {
  const cart = useStore((s) => s.cart);
  const setUser = useStore((s) => s.setUser);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/');
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Fercho Store</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/">Inicio</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/shop">Tienda</NavLink></li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link"> 🛒Carrito ({cart.reduce((s, p) => s + p.qty, 0)})</NavLink>
            </li>
            <li className="nav-item">
              <Link to="/admin" className="nav-link">Admin</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-secondary ms-2" onClick={handleLogout}>Salir</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
