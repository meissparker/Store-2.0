import { type RootState } from './store';

export const selectCartTotal = (state: RootState) => 
    state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)

export const selectCartQuantity = (state: RootState) => 
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)

export const selectCartItems = (state: RootState) => state.cart.items;

