import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // Lógica de autenticación  (verificar el token en localStorage)
    const token = localStorage.getItem('token');
    console.log(token);
    if (token){
      setIsAuthenticated(true);
    } else {
      console.error('No se encontró ningún token en localStorage');
    }
  };

  const logout = () => {
    // Lógica para cerrar sesión (limpiar el token en localStorage)
    setIsAuthenticated(false);
    localStorage.removeItem('token'); 
  };
  console.log(isAuthenticated);
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
    {children}
    
    </AuthContext.Provider>
  );
};