import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useStore } from '../../stores/useStore';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  // Estados para el formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const setUser = useStore((s) => s.setUser);
  const nav = useNavigate();

  // Función para login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      nav('/');
    } catch (err) {
      console.error(err);
      alert('Error al iniciar sesión: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para registro
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validaciones básicas
    if (!name.trim()) {
      alert('Por favor ingresa tu nombre');
      setLoading(false);
      return;
    }
    
    if (!phone.trim()) {
      alert('Por favor ingresa tu teléfono');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      // Crear usuario en Firebase Auth
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      // Actualizar el perfil del usuario con el nombre
      await updateProfile(user, {
        displayName: name
      });

      // Guardar información adicional en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        phone: phone,
        createdAt: new Date().toISOString(),
        role: 'customer' // Puedes agregar roles si los necesitas
      });

      setUser(user);
      alert('¡Registro exitoso! Bienvenido a Fercho Store');
      nav('/');
    } catch (err) {
      console.error(err);
      let errorMessage = 'Error al registrarse';
      
      // Mensajes de error más amigables
      switch (err.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este correo ya está registrado';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Correo electrónico inválido';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña es muy débil';
          break;
        default:
          errorMessage = err.message;
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Limpiar formulario al cambiar de modo
  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setEmail('');
    setPassword('');
    setPhone('');
    setName('');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isRegistering ? ' Crear Cuenta' : ' Iniciar Sesión'}</h2>
          <p>{isRegistering ? 'Únete a Fercho Store' : 'Bienvenido de vuelta'}</p>
        </div>

        <form onSubmit={isRegistering ? handleRegister : handleLogin} className="auth-form">
          {/* Campos para registro */}
          {isRegistering && (
            <>
              <div className="form-group">
                <label> Nombre completo</label>
                <input 
                  className="form-control" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Tu nombre completo"
                  required
                />
              </div>

              <div className="form-group">
                <label> Teléfono</label>
                <input 
                  className="form-control" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="Número de teléfono"
                  type="tel"
                  required
                />
              </div>
            </>
          )}

          {/* Campos comunes */}
          <div className="form-group">
            <label> Correo electrónico</label>
            <input 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="tu@email.com"
              type="email"
              required
            />
          </div>

          <div className="form-group">
            <label> Contraseña</label>
            <input 
              className="form-control" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder={isRegistering ? "Mínimo 6 caracteres" : "Tu contraseña"}
              required
            />
          </div>

          {/* Botón principal */}
          <button 
            className="btn btn-primary auth-submit-btn" 
            disabled={loading}
            type="submit"
          >
            {loading ? (
              <>
                 {isRegistering ? 'Registrando...' : 'Ingresando...'}
              </>
            ) : (
              <>
                {isRegistering ? ' Crear Cuenta' : ' Entrar'}
              </>
            )}
          </button>

          {/* Toggle entre login/registro */}
          <div className="auth-toggle">
            <p>
              {isRegistering 
                ? '¿Ya tienes cuenta? ' 
                : '¿No tienes cuenta? '
              }
              <button 
                type="button" 
                className="btn-link" 
                onClick={toggleMode}
                disabled={loading}
              >
                {isRegistering ? 'Iniciar Sesión' : 'Registrarse'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}