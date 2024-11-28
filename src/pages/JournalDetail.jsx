import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../utils/firebaseConfig';
import { fetchJournalById } from '../utils/Store/journalSlice';
import StatusAlert from '../components/StatusAlert';
import JournalList from '../components/JournalList';
import { Timestamp } from 'firebase/firestore';
import { Link, useParams } from 'react-router';
import HelperNav from '../components/HelperNav';
import { BiMenu, BiPencil } from 'react-icons/bi';
import { formatDate } from '../utils/dateFormatter';
import { CgClose } from 'react-icons/cg';


function JournalDetail() {
    const dispatch = useDispatch();
    const params = useParams()
    const { id } = params
    const [active, setActive] = useState(false)
    const handleActive = () => setActive(!active)


    const { journal } = useSelector((state) => state.journal)

    useEffect(() => {
        dispatch(fetchJournalById(id))
    }, [id])

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
              <div className="flex-1 rounded-xl bg-white p-5 w-full h-full border border-gray-200 shadow overflow-y-auto">
    <div className="px-5 md:px-12 whitespace-pre">
        <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center">
            <h1 className="text-justify font-bold text-2xl md:text-3xl">
                {journal?.title}
            </h1>
            <Link 
                to={`/journaling/${id}/edit`} 
                className="mt-3 md:mt-0 flex items-center justify-center rounded p-3 bg-primary text-white font-bold gap-2"
            >
                <BiPencil /> Edit
            </Link>
        </div>
        <p className="text-justify text-gray-400 text-sm ">
            {formatDate(journal?.date)}
        </p>
        <p className="text-justify mt-5 text-sm ">
            {journal?.content}
        </p>
    </div>
</div>


            </div>
        </Layout>
    )
}

export default JournalDetail