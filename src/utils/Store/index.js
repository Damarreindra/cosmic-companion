import { configureStore } from '@reduxjs/toolkit';
import geminiReducer from './geminiSlice';
import quoteReducer from './quoteSlice';

export const store = configureStore({
  reducer: {
    gemini: geminiReducer,
    quote: quoteReducer
  },
});

export default store;
