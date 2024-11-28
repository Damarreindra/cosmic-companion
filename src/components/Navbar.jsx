import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../utils/firebaseConfig';
import { Link, useNavigate } from 'react-router';

function Navbar() {
    const navigate = useNavigate()
    const logOut = async () => {
        try {
          await signOut(auth);
            navigate('/')
        } catch (error) {
          console.error("Error signing out:", error);
        }
      };
  return (
    <nav className='bg-white w-full py-3 px-8 xl:px-36 border-b border-gray-300 '>
      <div className='flex justify-between items-center w-full '>
        <Link to={'/home'} className='font-pacifico font-bold xl:text-2xl text-xl'>CosmicCompanion</Link>
        <button onClick={logOut} className='p-3 rounded-xl bg-red-400 text-white xl:font-base font-sm font-bold'>
            Logout
        </button>
        </div>
    </nav>
  )
}

export default Navbar