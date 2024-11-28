import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { readMood } from '../utils/Store/cosmicSlice';
import Loader from './Loader';

function Mood() {
    const dispatch = useDispatch()
    const { mood, loading: cosmicLoading,} = useSelector((state) => state.cosmic);
    const { journals, loading: journalLoading, error, journal } = useSelector((state) => state.journal)    
        

    useEffect(() => {
        if (journals && journals.length > 0) {
            dispatch(readMood(journals[0]));
        }
    }, [journals, dispatch, journal]);
    return (
        <div className='py-5 px-5 flex flex-col items-center w-full '>
            <h1 className='font-bold text-3xl text-primary text-center'>
                &#128577;Mood Check&#128513;
            </h1>
            <p className='text-center font-semibold text-pink-500 mb-5'>Let's reflect on your current mood based on your last journal.</p>
         {
            cosmicLoading ? (<Loader/>) : (

                <div className='mt-8 flex flex-col justify-center items-center'>
                <p className='text-3xl font-semibold text-pink-500'>{mood}</p>
                <div className='xl:text-9xl text-7xl mt-5 xl:mt-0'>
                {
                    mood?.toLowerCase() === "very happy" && (<h1>&#128513;</h1>) 
                }
                {
                   mood?.toLowerCase() === "happy" && (<h1>&#128522;</h1>)
                }
                {
                  mood?.toLowerCase() === "neutral" && (<h1>&#128528;</h1>) 
                }
                {
                  mood?.toLowerCase() === "sad" && (<h1>&#128546;</h1>) 
                }
                {
                    mood?.toLowerCase() === "very sad"  && (<h1>&#128557;</h1>) 
                }
                </div>
                </div>
            )
         }

        </div>
    )
}

export default Mood