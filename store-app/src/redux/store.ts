import { configureStore, type Middleware } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

export type RootState = { 
    cart: ReturnType<typeof cartReducer>;
};

const saveCartToSession = (state: RootState) => {
    try {
        sessionStorage.setItem('cart', JSON.stringify(state.cart.items));
    } catch (e) {
        console.error('Could not save cart to sessionStorage', e)
    }

};

const sessionStorageMiddleware: Middleware<{}, RootState> = store => next => action => {

    const result = next(action);
    saveCartToSession(store.getState());
    return result;
};

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(sessionStorageMiddleware),
});

export type AppDispatch = typeof store.dispatch;







