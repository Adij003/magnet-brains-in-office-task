import { configureStore } from '@reduxjs/toolkit';
import authReducer  from '../features/auth/authSlice'
import productReducer from '../features/products/productSlice';
import cartReducer from '../features/cart/cartSlice'
import orderReducer from '../features/order/orderSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer
  },
});
