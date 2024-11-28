import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../utils/firebaseConfig'
import { fetchQuote } from '../utils/Store/cosmicSlice';

function Hero() {

    const dispatch = useDispatch()
    const { quote, loading } = useSelector((state) => state.cosmic);

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
            <div className="flex items-center justify-center w-full">
            <img src="./images/hi.png" className='xl:w-24 w-12' alt="" />
                <h1 className='font-bold md:text-5xl'>Hi, {uname}</h1>
            </div>
            {
                loading ? (
                    <span className='font-semibold font-open w-full text-center'>Some motivational quote are coming...</span>

                ) : (
                    <span className='font-semibold font-open'>{quote}</span>
                )
            }


        </div>
    )
}

export default Hero