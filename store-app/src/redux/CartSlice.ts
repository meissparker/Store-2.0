import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchCounter } from './asyncActions'; // Import the async thunk

interface CartItem {
    id: number;
    title: string;
    image: string;
    quantity: number;
    price: number;
}

interface CartState {
    items: CartItem[];
    loading: boolean;
    error: string | null;
}

const loadCartFromSession = (): CartItem[] => {
    try {
        const data = sessionStorage.getItem('cart');
        return data ? JSON.parse(data) : [];
    } catch {
        return []
    }
};

const initialState: CartState = {
    items: loadCartFromSession(),
    loading: false,
    error: null,

};

const cartSlice = createSlice({
    name: 'cart',
    initialState, 
    reducers: {
         addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
            const existing = state.items.find(i => i.id === action.payload.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({...action.payload, quantity: 1})
            }
         },

         decrementFromCart: (state, action: PayloadAction<number>) => {
            const item = state.items.find(i => i.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.items = state.items.filter(i => i.id !== action.payload);
            }
         },

         clearCart: (state) => {
            state.items = []
         }

    },
    
    extraReducers: (builder) => {
        builder
            .addCase(fetchCounter.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCounter.fulfilled, (state) => {
                state.loading = false;
            })
    },

});

export const { addToCart, decrementFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

