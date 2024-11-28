import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchQuote = createAsyncThunk(
    'cosmic/fetchQuote',
    async (_, { rejectWithValue }) => {
        try {
            const session = await ai.languageModel.create({
                systemPrompt: "You are a friendly motivator and you always give a motivational quote, along with the author. Don't include any extra text, like dont add ** ** please just plain text"
            });
            const result = await session.prompt(`
               Give me motivational quote
            `);

           
            return result;
        } catch (error) {
            if (error.response) {
                return rejectWithValue({
                    status: error.response.status,
                    message: error.response.data.message,
                });
            }
            return rejectWithValue({ message: "An unknown error occurred." });
        }
    }
);

export const readMood = createAsyncThunk(
    'cosmic/readMood',
    async (note, { rejectWithValue }) => {
        try {
            
            const session = await ai.languageModel.create({
                systemPrompt: "You are a friendly mood reader that can read user mood based on their journal, theres mood list that can u return as a result Very happy, Happy, Neutral, Sad, and Very sad. just return the mood without any added text"
            });
            
            const result = await session.prompt(`
            ${note.content}
             `);            
            return result;
        } catch (error) {
            if (error.response) {
                return rejectWithValue({
                    status: error.response.status,
                    message: error.response.data.message,
                });
            }
            return rejectWithValue({ message: "An unknown error occurred." });
        }
    }
);



const cosmicSlice = createSlice({
    name: "cosmic",
    initialState: {
        loading: false,
        quote: null,
        mood:null,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuote.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchQuote.fulfilled, (state, action) => {
                state.loading = false;
                state.quote = action.payload;
            })
            .addCase(fetchQuote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(readMood.pending, (state) => {
                state.loading = true;
            })
            .addCase(readMood.fulfilled, (state, action) => {
                state.loading = false;
                state.mood = action.payload;
            })
            .addCase(readMood.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default cosmicSlice.reducer;
