import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchQuote = createAsyncThunk(
    'quote/fetchQuote',
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

const quoteSlice = createSlice({
    name: "quote",
    initialState: {
        loading: false,
        quote: null,
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
            });
    }
});

export default quoteSlice.reducer;
