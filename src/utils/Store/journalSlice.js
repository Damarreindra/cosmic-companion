import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../firebaseConfig";
import { addDoc, and, collection, getDocs, orderBy, query, where } from "firebase/firestore";


export const addJournal = createAsyncThunk(
    'journal/addJournal',
    async (note, { rejectWithValue }) => {
        try {
           const docRef = await addDoc(collection(db, "journals"), note);
            return { id: docRef.id, ...note };
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

export const fetchJournal = createAsyncThunk(
    
    'journal/fetchJournal',
    async (_, { rejectWithValue }) => {
      try {
        const uid = localStorage.getItem("uid")

        const q = query(collection(db, "journals"),
         where("author","==",uid)
        )
         

         const querySnapshot = await getDocs(q);

          const journals = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
      
         return journals    
        
      } catch (error) {
        if (error.response) {
            return rejectWithValue({
                status: error.response.status,
                message: error.response.data.message,
            });
        } 
      }
    }
  );
  


const journalSlice = createSlice({
    name: "journal",
    initialState: {
        loading: false,
        journal:null,
        journals:null,
        error: null
    },
    extraReducers: (builder) => {
        builder
             //ADD JOURNAL
            .addCase(addJournal.pending, (state) => {
                state.loading = true
            })
            .addCase(addJournal.fulfilled, (state, action) => {
                state.loading = false;
                state.journal = action.payload
            })
            .addCase(addJournal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //FETCH JOURNAL
            .addCase(fetchJournal.pending,(state)=>{
                state.loading = true;
            })
            .addCase(fetchJournal.fulfilled,(state, action)=>{
                state.loading = false;
                state.journals = action.payload
            })
            .addCase(fetchJournal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


        
    }
})

export default journalSlice.reducer;