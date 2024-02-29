import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/authContext';
import { Provider } from 'react-redux';
import store from '../libs/store';

export default function App({ Component, pageProps }) { 
  
  return (
    <AuthProvider>
      <Provider store={store}>
        
        <Component {...pageProps}   />
      </Provider>
    </AuthProvider>
  )
}

