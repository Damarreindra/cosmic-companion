import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchJournal } from '../utils/Store/journalSlice'

function JournalList() {
    const {journals, loading, error} = useSelector((state)=>state.journal)
    const dispatch = useDispatch()
    useEffect(()=>{
       dispatch(fetchJournal())
    },[])

  return (
    <div className='mt-5 flex flex-col gap-2'>
        {
            journals && (
                journals.map((item, index)=>(
                    <>
                       <div className='p-3 border border-gray-300 shadow rounded-xl' key={index}>
                        <h1 className='font-bold'>{item.title}</h1>
                        <h1>{item.content}</h1>
                       </div>
                    </>
                ))
            )
        }

    </div>
  )
}

export default JournalList