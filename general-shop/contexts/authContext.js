import { removeAllFromCart } from '@/libs/cartSlice';
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router';
import React, { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // Verificar si hay un usuario autenticado al cargar la aplicación
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      setIsAuthenticated(true);
      setUserData(storedUserData);
    }
  }, []);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUserData(userData.user); // Almacena el objeto user recibido del servidor
    localStorage.removeItem('cart');
    dispatch(removeAllFromCart());
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    dispatch(removeAllFromCart());
  };



  return (
    <AuthContext.Provider value={{ isAuthenticated, login, userData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};