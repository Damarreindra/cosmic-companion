import { configureStore } from '@reduxjs/toolkit';
import geminiReducer from './geminiSlice';
import quoteReducer from './quoteSlice';
import journalReducer from './journalSlice';


export const store = configureStore({
  reducer: {
    gemini: geminiReducer,
    quote: quoteReducer,
    journal: journalReducer
  },
});

export default store;
