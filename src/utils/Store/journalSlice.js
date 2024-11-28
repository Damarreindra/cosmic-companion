import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../firebaseConfig";
import { addDoc, and, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where, } from "firebase/firestore";
import { orderBy } from "firebase/firestore/lite";


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
            const uid = localStorage.getItem("uid");
            const journalRef = collection(db, "journals");
            const q = query(
                journalRef,
                where("author","==", uid)
            );

            const querySnapshot = await getDocs(q);
            const journals = querySnapshot.docs.map((doc) => ({
           
                id: doc.id,
                ...doc.data(),
            })).sort((a,b)=>new Date(b.date) - new Date(a.date));
            return journals;

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


export const fetchJournalById = createAsyncThunk(
    'journal/fetchJournalById',
    async (id, { rejectWithValue }) => {
        try {
            const journalRef = doc(db, 'journals', id);
            const docSnap = await getDoc(journalRef); 
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                return rejectWithValue({ message: "Journal not found" }); 
            }
        } catch (error) {
            return rejectWithValue({
                message: error.message || 'An error occurred while fetching the journal.',
            });
        }
    }
);


export const deleteJournal = createAsyncThunk(
   'journal/deleteJournal',
   async(id, {rejectWithValue})=>{
    try {
        const journalRef = doc(db, 'journals', id);
        deleteDoc(journalRef)
        .then(() => {
          console.log("Document deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting document: ", error);
        });
    } catch (error) {
        return rejectWithValue({
            message: error.message || 'An error occurred while delete the journal.',
        });
    }
   }
)

export const editJournal = createAsyncThunk(
    'journal/editJournal',
    async ( {note,id},{ rejectWithValue }) => {
        try {            
            const journalRef = doc(db, 'journals', id);
            await updateDoc(journalRef, { 
                title: note.title,
                content: note.content,
                date: note.date
             })
             return { id, ...note };
        } catch (error) {
            return rejectWithValue({
                message: error.message || 'An error occurred while editing the journal.',
            });
        }
    }
);


const journalSlice = createSlice({
    name: "journal",
    initialState: {
        loading: false,
        journal: null,
        journals: null,
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
            .addCase(fetchJournal.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchJournal.fulfilled, (state, action) => {
                state.loading = false;
                state.journals = action.payload
            })
            .addCase(fetchJournal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


             //FETCH JOURNAL BY ID
             .addCase(fetchJournalById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchJournalById.fulfilled, (state, action) => {
                state.loading = false;
                state.journal = action.payload
            })
            .addCase(fetchJournalById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

              //DELETE JOURNAL BY ID
              .addCase(deleteJournal.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteJournal.fulfilled, (state, action) => {
                state.loading = false;
                state.journal = action.payload
            })
            .addCase(deleteJournal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

               //UPDATE JOURNAL BY ID
            .addCase(editJournal.pending, (state) => {
                state.loading = true;
            })
            .addCase(editJournal.fulfilled, (state, action) => {
                state.loading = false;
                state.journal = action.payload
            })
            .addCase(editJournal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


    }
})

export default journalSlice.reducer;