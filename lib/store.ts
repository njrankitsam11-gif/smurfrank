import { configureStore } from '@reduxjs/toolkit';
import { rankvaultApi } from './features/api/apiSlice';

export const store = configureStore({
  reducer: {
    [rankvaultApi.reducerPath]: rankvaultApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rankvaultApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
