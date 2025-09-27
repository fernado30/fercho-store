import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useStore } from '../../stores/useStore';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useStore((s) => s.setUser);
  const nav = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      nav('/');
    } catch (err) {
      console.error(err);
      alert('Error al crear usuario');
    }
  };

  return (
    <form onSubmit={handle} className="w-50 mx-auto">
      <h3>Registrarse</h3>
      <input className="form-control mb-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input className="form-control mb-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
      <button className="btn btn-primary">Crear cuenta</button>
    </form>
  );
}
