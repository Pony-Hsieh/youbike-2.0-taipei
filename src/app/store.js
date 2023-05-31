import { configureStore } from '@reduxjs/toolkit';
import youbikeDataReducer from '../slices/youbikeDataSlice';

export const store = configureStore({
  reducer: {
    youbikeData: youbikeDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
