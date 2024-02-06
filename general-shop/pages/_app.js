import React, { useState } from 'react';   //manejo de estado en la función del componente
import { Provider } from 'react-redux';
import store from '../libs/store';


export default function App({ Component, pageProps }) {  //Component como página actual que se renderiza y pageProps como propiedades de esa página

  //manejo de estados de autenticación
  const [isAutenticated, setIsAuthenticated] = useState(false);   // se inicializa en false (no autenticado)

  const UserLogin = () => {   //se rastrea que el usuario se ha autenticado
    setIsAuthenticated(true);
  };

  const UserLogout = () => {  //usuario no autenticado
    setIsAuthenticated(false);
  };

  return (
    <Provider store={store}>
      <Component {...pageProps} isAutenticated={isAutenticated} onLogin={UserLogin} onLogout={UserLogout} />
    </Provider>
  )


}