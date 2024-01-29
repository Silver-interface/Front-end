import React, { useState } from 'react';   //manejo de estado en la función del componente


export default function App({ Component, pageProps }) {  //Component como página actual que se renderiza y pageProps como propiedades de esa página

  //manejo de estados de autenticación
  const [isAutenticated, setIsAuthenticated] = useState(false);   // se inicializa en false (no autenticado)

  const UserLogin = () => {   //se rastrea que el usuario se ha autenticado
    setIsAuthenticated(true);
  };

  const UserLogout = () => {  //usuario no autenticado
    setIsAuthenticated(false);
  };

  return <Component {...pageProps} isAutenticated={isAutenticated} onLogin={UserLogin} onLogout={UserLogout} />;
      
    
}