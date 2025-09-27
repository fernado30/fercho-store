import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../stores/useStore';

export default function ProtectedRoute({ children }) {
  const user = useStore((s) => s.user);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
