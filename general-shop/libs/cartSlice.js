import { createSlice } from '@reduxjs/toolkit';

// Función para cargar los productos del carrito desde el localStorage
const loadCartLocalStorage = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } else {
    return [];
  }
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartLocalStorage(),
  reducers: {
    addToCart(state, action) {
      const { ID_PRODUCTO, IMAGEN, NOMBRE_PRODUCTO, TALLA, CANTIDAD, PRECIO } = action.payload;
      const existingProductIndex = state.findIndex(item => item.ID_PRODUCTO === ID_PRODUCTO && item.TALLA === TALLA);
      if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        state[existingProductIndex].CANTIDAD += CANTIDAD;
      } else {
        // Si el producto no está en el carrito, agrégalo como un nuevo elemento
        state.push({
          ID_PRODUCTO,
          IMAGEN,
          NOMBRE_PRODUCTO,
          TALLA,
          CANTIDAD,
          PRECIO
        });
      }
    },
    removeAllFromCart(state, action){
      return [];
    },

    incrementQuantity: (state, action) => {
      const item = state.find((item) => item.ID_PRODUCTO === action.payload);
      item.CANTIDAD++;
    },
    decrementQuantity: (state, action) => {
      const item = state.find((item) => item.ID_PRODUCTO === action.payload);
      if (item.CANTIDAD === 1) {
        const index = state.findIndex((item) => item.ID_PRODUCTO === action.payload);
        state.splice(index, 1);
      } else {
        item.CANTIDAD--;
      }
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex((item) => item.ID_PRODUCTO === action.payload);
      state.splice(index, 1);
    },
  },
});

// Middleware para guardar el carrito en el localStorage después de cada cambio
export const saveCartMiddleware = store => next => action => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem('cart', JSON.stringify(state.cart));
  return result;
};

export const cartReducer = cartSlice.reducer;
export const { addToCart, removeAllFromCart, incrementQuantity, decrementQuantity, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;