import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];

export const fetchData = createAsyncThunk("youbikeDataSlice/fetchData", async () => {
  const res = await axios.get('https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json');
  return res;
});

export const youbikeDataSlice = createSlice({
  name: 'youbikeDataSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        state = payload.data;
        return state;
      });
  },
});

export const selectYoubikeData = (state) => {
  return state.youbikeData;
};

export default youbikeDataSlice.reducer;
