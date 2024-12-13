import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../utils/firebaseConfig';
import { addJournal, fetchJournal } from '../utils/Store/journalSlice';
import StatusAlert from '../components/StatusAlert';
import JournalList from '../components/JournalList';
import { Timestamp } from 'firebase/firestore';
import HelperNav from '../components/HelperNav';
import Mood from '../components/Mood';
import { BiMenu } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';


function Journaling() {
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const [success, setSuccess] = useState(null)
    const [user, setUser] = useState(null)
    const dispatch = useDispatch();
    const [active, setActive] = useState(false)

    const handleActive=()=>setActive(!active)
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
            date: Date.now(),
        }
        dispatch(addJournal(data))
            .then((result) => {
                if (result.meta.requestStatus === "fulfilled") {
                    dispatch(fetchJournal());
                    setContent("")
                    setTitle("")
                    setSuccess("Journal Added")
                } else {
                    setSuccess(result.payload?.message);
                }

            });
    }

    return (
        <Layout>
            <div className='flex justify-between items-center'>
            <HelperNav />
            <h1 className='text-white font-bold text-3xl block xl:hidden md:hidden' onClick={handleActive}> 
                {
                    active ? (<CgClose/>) : (<BiMenu/>)
                }           
           
            </h1>
            </div>
            <div className='w-full h-screen flex flex-1 flex-col xl:flex-row gap-2 relative'>
                <div className='w-80 rounded-xl hidden xl:block bg-white border border-gray-200 shadow overflow-y-scroll'>
                    <JournalList />
                </div>
                {
                    active && (
                        <div className='w-full h-full absolute z-99 rounded-xl bg-white border border-gray-200 shadow overflow-y-scroll'>
                    <JournalList />
                </div>
                    )
                }
                
                <div className="xl:flex-1 rounded-xl bg-white p-5 xl:w-full xl:h-full h-1/2 border border-gray-200 shadow">
                    <form onSubmit={handleSubmit} className="w-full h-3/4">
                        <h1 className='font-bold font-open text-3xl mb-3'>Journal Form</h1>

                        <label htmlFor="" className='font-semibold font-open'>Title</label>
                        <input className="w-full  border border-gray-300 shadow p-3 rounded-xl mt-2 mb-2 focus:outline-primary"
                            required
                            maxLength={24}
                            placeholder='Write the title' type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                        />

                        <label htmlFor="" className='font-semibold font-open'>Content</label>
                        <textarea className="w-full h-1/2 border border-gray-300 shadow p-3 rounded-xl  mt-2 mb-2 focus:outline-primary"
                            required
                            placeholder="Write your journey today"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}

                        />

                        <button type="submit" className="flex items-center justify-center rounded p-3 bg-primary text-white font-bold mt-4">Submit</button>
                    </form>
                </div>
                <div className='xl:w-80 rounded-xl bg-white border border-gray-200 shadow xl:h-1/2 h-1/3 w-full'>
                <Mood/>
                </div>

            </div>
            {
                success && (
                    <StatusAlert
                       message={success}
                       onClose={()=>setSuccess(null)}
                    />
                )
            }
        </Layout>
    )
}

export default Journaling


