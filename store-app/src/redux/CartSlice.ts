import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchCounter } from './asyncActions'; // Import the async thunk

interface CartState {
    title: string;
    image: string;
    quantity: number;
    price: number;
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    title: "",
    image: "",
    quantity: 0,
    price: 0.00,
    loading: false,
    error: null,

};

const cartSlice = createSlice({
    name: 'cart',
    initialState, 
    reducers: {
        increment: (state) => {
            state.quantity += 1;
        },
        decrement: (state) => {
            state.quantity -= 1;
         },
         incrementByAmount: (state, action: PayloadAction<number>) => {
            state.quantity += action.payload;
         },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCounter.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCounter.fulfilled, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },

});

export const { increment, decrement, incrementByAmount } = cartSlice.actions;
export default cartSlice.reducer;
