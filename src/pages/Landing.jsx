import React from 'react'
import { Link } from 'react-router'

function Landing() {
    return (
        <div className='bg-gradient-to-tr from-primary to-base h-screen w-screen flex flex-col items-center justify-center gap-5'>
            <div className='flex '>
                <h1 className='text-7xl font-open font-bold'>
                    Cosmic
                </h1>
                <h1 className='text-7xl font-pacifico'>

                    -Companion</h1>
            </div>

            <h1 className='font-semibold'>&#10024;	
            Starry Insights	
            , Daily Bliss.</h1>
            <Link to={'/login'}>
            <button className='p-3 w-96 rounded-xl flex justify-center items-center font-semibold text-white bg-orange-500'>
                Try it
            </button>
            </Link>
        </div>
    )
}

export default Landing