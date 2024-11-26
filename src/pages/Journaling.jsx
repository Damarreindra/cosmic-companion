import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../utils/firebaseConfig';
import { addJournal, fetchJournal } from '../utils/Store/journalSlice';
import StatusAlert from '../components/StatusAlert';
import JournalList from '../components/JournalList';
import { Timestamp } from 'firebase/firestore';


function Journaling() {
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const [status, setStatus] = useState(null)
    const [user, setUser] = useState(null)
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            title: title,
            content: content,
            author: user.uid,
            date: Timestamp.now()
        }
        dispatch(addJournal(data))
        .then((result) => {            
            if (result.meta.requestStatus === "fulfilled") {
              dispatch(fetchJournal());
              setContent("")
              setTitle("")
              setStatus("Journal Added");
            } else {
                setStatus(result.payload?.message);
                console.log(result.payload?.message);
            
            }
         
          });
    }






    return (
        <Layout>
            <div className='w-full h-screen flex flex-1 flex-row gap-2 relative'>
                <div className='w-80 rounded-xl bg-white p-5 border border-gray-200 shadow '>
                    <h1 className='font-bold text-3xl text-primary'>
                        &#10024;Journal List&#10024;

                    </h1>
                    <div className=''>
                        <JournalList />
                        <button>

                        </button>
                    </div>
                </div>
                <div className="flex-1 rounded-xl bg-white p-5 w-full h-full border border-gray-200 shadow">
                    <form onSubmit={handleSubmit} className="w-full h-3/4">
                        <h1 className='font-bold font-open text-3xl mb-3'>Journal Form</h1>

                        <label htmlFor="" className='font-semibold font-open'>Title</label>
                        <input className="w-full  border border-gray-300 shadow p-3 rounded-xl mt-2 mb-2" 
                        required
                        placeholder='Write the title' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

                        <label htmlFor="" className='font-semibold font-open'>Content</label>
                        <textarea className="w-full h-1/2 border border-gray-300 shadow p-3 rounded-xl  mt-2 mb-2" required placeholder="Write your journey today" value={content} onChange={(e) => setContent(e.target.value)} />

                        <button type="submit" className="flex items-center justify-center rounded p-3 bg-primary text-white font-bold mt-4">Submit</button>
                    </form>
                </div>

            </div>
            {
                status === "Journal Added" ? (
                    <StatusAlert
                        text={status}
                        variant={"success"}
                    />
                ) : status === "Error Added Journal" ? (
                    <StatusAlert
                        text={status}
                        variant={"error"}
                    />
                ) : " "
            }
        </Layout>
    )
}

export default Journaling