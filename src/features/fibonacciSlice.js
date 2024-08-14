import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  series: [],
  serverTime: '',
};

export const generateFibonacci = createAsyncThunk(
  'fibonacci/generateFibonacci',
  async (time) => {
    const response = await axios.post('http://localhost:6001/api/fibonacci', { time });
    return response.data;
  }
);

const fibonacciSlice = createSlice({
  name: 'fibonacci',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(generateFibonacci.fulfilled, (state, action) => {
      state.series = action.payload.series;
      state.serverTime = action.payload.serverTime;
    });
  },
});

export default fibonacciSlice.reducer;
