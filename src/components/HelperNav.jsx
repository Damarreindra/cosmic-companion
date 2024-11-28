import React from 'react'
import { BiLeftArrowCircle } from 'react-icons/bi'
import { useNavigate } from 'react-router'

function HelperNav() {
    const navigate = useNavigate()
  return (
    <div className=''>
    <button
    onClick={()=>navigate(-1)}
    className='text-5xl text-white'
    >
        <BiLeftArrowCircle/>
    </button>
    </div>
  )
}

export default HelperNav