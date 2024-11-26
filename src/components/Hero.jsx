import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAvail } from '../utils/Store/geminiSlice'
import { fetchQuote } from '../utils/Store/quoteSlice'

function Hero() {
   
    const dispatch = useDispatch()
    const {quote, loading} = useSelector((state) => state.quote);

    useEffect(() => {
        dispatch(fetchQuote());
    }, [dispatch]);

    


    
    
    
  return (
    <div className='w-full bg-white rounded-xl p-12 flex flex-col justify-center items-center'>
        <div className="flex items-center justify-center">
        <img src="./images/hi.png" className='w-24' alt="" />
        <h1 className='font-bold text-5xl'>Hi, Damarreindra</h1>
       
        </div>
        {
            loading ? (
                <span className='font-semibold font-open'>Loading...</span>

            ) : (
                <span className='font-semibold font-open'>{quote}</span>
            )
        }
       

    </div>
  )
}

export default Hero