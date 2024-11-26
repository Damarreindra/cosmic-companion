import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const checkAvail = createAsyncThunk(
    'gemini/checkAvail',
    async (_, { rejectWithValue }) => {
        try {
            const { available } = await ai.languageModel.capabilities();
            if (available !== "no") {
                return true
            } else {
                return false
            }

        } catch (error) {
            if (error.response) {
                return rejectWithValue({
                    status: error.response.status,
                    message: error.response.data.message,
                });
            }
        }
    }
)









const geminiSlice = createSlice({
    name: "gemini",
    initialState: {
        loading: false,
        gemini: null,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAvail.pending, (state) => {
                state.loading = true
            })
            .addCase(checkAvail.fulfilled, (state, action) => {
                state.loading = false,
                    state.gemini = action.payload
            })
            .addCase(checkAvail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


        
    }
})

export default geminiSlice.reducer;