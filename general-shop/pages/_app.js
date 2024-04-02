import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/authContext';
import { Provider } from 'react-redux';
import store from '../libs/store';


export default function App({ Component, pageProps }) { 
  
  return (
    <Provider store={store}>
    <AuthProvider>
    

        <Component {...pageProps}   />
        </AuthProvider>
      </Provider>
    
  )
}

