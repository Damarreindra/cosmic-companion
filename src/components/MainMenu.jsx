import React from 'react'
import { Link } from 'react-router'
import { CgNotes } from "react-icons/cg";
import { TbZodiacAries } from "react-icons/tb";

function MainMenu() {
  return (
    <div className='grid grid-cols-4  gap-5 grid-rows-8  mt-12'>
                <Link to={'/journaling'} className='col-span-2 row-span-4 bg-white rounded-xl shadow p-5 flex flex-col justify-end'>
                <img src="./images/journaling.png" className='w-1/2 mx-auto' alt="" />
                    <div className='flex flex-row gap-2'>
                        <span className='font-pacifico text-5xl mb-5'><CgNotes /></span>
                        <h1 className='font-pacifico text-5xl mb-5'>Journaling</h1>
                    </div>
                    <h1 className='font-open font-semibold w-2/3'>Discover the magic within you. Our app combines daily journaling with personalized horoscopes to help you unlock your full potential.</h1>
                </Link>
                <Link to={'/journaling'} className='col-span-2 row-span-4 bg-white rounded-xl shadow p-5 flex flex-col justify-end'>
                <img src="./images/horoscope.png" className='w-1/3 mx-auto' alt="" />

                    <div className='flex flex-row gap-2'>
                        <span className='font-pacifico text-5xl mb-5'><TbZodiacAries /></span>
                        <h1 className='font-pacifico text-5xl mb-5'>Daily Horoscope</h1>

                    </div>

                    <h1 className='font-open font-semibold w-2/3'>Receive tailored astrological insights.Gain clarity and direction.</h1>
                </Link>

                <Link to={'#'} className='col-span-4 row-span-2 bg-gray-200 rounded-xl shadow p-5 flex flex-col justify-end'>
                    <div className='flex flex-row gap-2'>
                        <span className='font-pacifico text-5xl mb-5'><TbZodiacAries /></span>
                        <h1 className='font-pacifico text-5xl mb-5'>Match Company</h1>

                    </div>

                    <h1 className='font-open font-semibold w-2/3'>Receive tailored astrological insights.Gain clarity and direction.</h1>
                </Link>

            </div>

  )
}

export default MainMenu