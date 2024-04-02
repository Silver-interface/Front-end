import { configureStore } from '@reduxjs/toolkit';
import { cartReducer, saveCartMiddleware } from './cartSlice'; // Ajusta la importación según la ubicación de tu slice del carrito

const store = configureStore({
  reducer: {
    cart: cartReducer,
  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveCartMiddleware),
});

export default store;