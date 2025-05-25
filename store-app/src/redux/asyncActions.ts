import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCounter = createAsyncThunk(
    'counter/fetchCounter',
    async (_, { rejectWithValue}) => {
        try {
            const response = await fetch('https://api.example.com/counter');
            if (!response.ok){
                throw new Error('Failed to fetch data')
            }
            const data = await response.json();
            return data.count;
        } catch (error: any){
            return rejectWithValue(error.message);
        }
    }
);