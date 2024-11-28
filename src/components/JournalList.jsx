import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteJournal, fetchJournal } from '../utils/Store/journalSlice'
import { Link, useNavigate } from 'react-router'
import { FaTrash } from 'react-icons/fa'
import { BiPlusCircle } from 'react-icons/bi'
import StatusAlert from './StatusAlert'
import { readMood } from '../utils/Store/cosmicSlice'

function JournalList() {
    const { journals,  loading: journalLoading, error, journal } = useSelector((state) => state.journal)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchJournal())
    }, [journal])

  
    useEffect(() => {
        if (journals && journals.length > 0) {
            dispatch(readMood(journals[0])); 
        }
    }, [journals, dispatch]);

   
    
    const handleDelete = (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this journal?')
        if(confirmed){
            dispatch(deleteJournal(id))
            .then(() => {
                dispatch(fetchJournal())
                navigate('/journaling')
            })
        }
      
    }


    return (
        <div className='mt-5 flex flex-col gap-3 px-5'>
            <Link to={'/journaling'} className='font-bold text-3xl text-primary text-center'>
                &#10024;Journal List&#10024;
            </Link>
            <Link to={'/journaling'} className='flex items-center justify-center w-full gap-1 border p-2 bg-primary shadow border-primary rounded-xl text-white font-bold'>
                <span className='text-2xl'> <BiPlusCircle /></span>
                Add Journal
            </Link>
            <div className='flex flex-col gap-3 py-3'>
                {
                    journals && (
                        journals.map((item, index) => (

                            <>
                                <Link to={`/journaling/${item.id}`} className='p-3 border w-full border-gray-300 shadow rounded-xl relative z-0 min-h-28 max-h-28 overflow-auto' key={index}>
                                   <div className='flex flex-col w-3/4 bg-white'>
                                    <h1 className='font-bold truncate'>{item.title}</h1>
                                    <h1 className='text-gray-600 truncate ...'>{item.content}</h1>
                                    </div>
                                    <button onClick={() => handleDelete(item.id)}
                                        className='p-3 absolute top-4 right-3 z-2 text-white bg-red-500 rounded-xl'><FaTrash /></button>
                                </Link>
                            </>
                        ))
                    )
                }
            </div>
        </div>
        

    )
}

export default JournalList