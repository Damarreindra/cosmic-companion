import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../utils/firebaseConfig';
import { editJournal, fetchJournal, fetchJournalById } from '../utils/Store/journalSlice';
import StatusAlert from '../components/StatusAlert';
import JournalList from '../components/JournalList';
import { Timestamp } from 'firebase/firestore';
import { useParams } from 'react-router';
import HelperNav from '../components/HelperNav';
import { CgClose } from 'react-icons/cg';
import { BiMenu } from 'react-icons/bi';


function JournalEdit() {
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("");
    const [success, setSuccess] = useState(null)
    const [active, setActive] = useState(false)
    const dispatch = useDispatch();
    const params = useParams()
    const { id } = params

    const { journal } = useSelector((state) => state.journal)
    const handleActive = () => setActive(!active)

    useEffect(() => {
        dispatch(fetchJournalById(id))
    }, [id])


    useEffect(() => {
        if (journal) {
            setTitle(journal.title);
            setContent(journal.content)
        }
    }, [journal]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            title: title,
            content: content,
            date: Timestamp.now().toDate().toISOString(),
        }
        dispatch(editJournal({ note: data, id: id }))
            .then((result) => {
                if (result.meta.requestStatus === "fulfilled") {
                    dispatch(fetchJournal());
                    setContent("")
                    setTitle("")
                    setSuccess("Journal Edited")
                } else {
                    alert(result.payload?.message);
                }
            });
    }

    return (
        <Layout>
            <div className='flex justify-between items-center'>
                <HelperNav />
                <h1 className='text-white font-bold text-3xl block xl:hidden md:hidden' onClick={handleActive}>
                    {
                        active ? (<CgClose />) : (<BiMenu />)
                    }

                </h1>
            </div>

            <div className='w-full h-screen flex flex-1 flex-row gap-2 relative'>
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
                <div className="flex-1 rounded-xl mt-5 xl:mt-0 bg-white p-5 w-full h-full border border-gray-200 shadow">
                    <form onSubmit={handleSubmit} className="w-full h-3/4">
                        <h1 className='font-bold font-open text-3xl mb-3'>Journal Form</h1>

                        <label htmlFor="" className='font-semibold font-open'>Title</label>
                        <input className="w-full  border border-gray-300 shadow p-3 rounded-xl mt-2 mb-2 focus:outline-primary"
                            required
                            placeholder='Write the title'
                            type="text"
                            value={title || ""}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                        />
                        <label htmlFor="" className='font-semibold font-open'>Content</label>
                        <textarea className="w-full h-1/2 border border-gray-300 shadow p-3 rounded-xl  mt-2 mb-2 focus:outline-primary"
                            required
                            placeholder="Write your journey today"
                            value={content || ""}
                            onChange={(e) => setContent(e.target.value)} />

                        <button type="submit" className="flex items-center justify-center rounded p-3 bg-primary text-white font-bold mt-4">Submit</button>
                    </form>
                </div>

            </div>
            {
                success && (
                    <StatusAlert
                        message={success}
                        onClose={() => setSuccess(null)}
                    />
                )
            }
        </Layout>
    )
}

export default JournalEdit