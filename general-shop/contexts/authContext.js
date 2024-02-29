import React, { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

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
    localStorage.setItem('userData', JSON.stringify(userData.user));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    localStorage.removeItem('userData');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, userData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};