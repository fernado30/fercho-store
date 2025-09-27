import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useStore } from './stores/useStore';

//  cambios de autenticación y sincronizar con Zustand
onAuthStateChanged(auth, (user) => {
  // setUser es una función del store; la importamos así para evitar hooks fuera de componentes
  useStore.getState().setUser(user ? { uid: user.uid, email: user.email } : null);
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
