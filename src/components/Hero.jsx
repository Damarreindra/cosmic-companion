import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAvail } from '../utils/Store/geminiSlice'
import { fetchQuote } from '../utils/Store/quoteSlice'
import { auth } from '../utils/firebaseConfig'

function Hero() {

    const dispatch = useDispatch()
    const { quote, loading } = useSelector((state) => state.quote);

    useEffect(() => {
        dispatch(fetchQuote());
    }, [dispatch]);

    const [uname, setUname] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUname(user.displayName);
            } else {
                setUname(null);
            }
        });
        return () => unsubscribe();
    }, []);
    return (
        <div className='w-full bg-white rounded-xl p-12 flex flex-col justify-center items-center'>
            <div className="flex items-center justify-center">
                <img src="./images/hi.png" className='w-24' alt="" />
                <h1 className='font-bold text-5xl'>Hi, {uname}</h1>

            </div>
            {
                loading ? (
                    <span className='font-semibold font-open'>Some motivational quote are coming...</span>

                ) : (
                    <span className='font-semibold font-open'>{quote}</span>
                )
            }


        </div>
    )
}

export default Hero