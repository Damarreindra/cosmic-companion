import { configureStore } from '@reduxjs/toolkit';
import geminiReducer from './geminiSlice';
import cosmicReducer from './cosmicSlice';
import journalReducer from './journalSlice';


export const store = configureStore({
  reducer: {
    gemini: geminiReducer,
    cosmic: cosmicReducer,
    journal: journalReducer
  },
});

export default store;
