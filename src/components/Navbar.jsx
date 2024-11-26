import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../utils/firebaseConfig';
import { useNavigate } from 'react-router';

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
    <nav className='bg-white w-full py-3 px-24 border-b border-gray-300 flex justify-between items-center'>
        <h1 className='font-pacifico font-bold text-2xl'>CosmicCompanion</h1>
        <button onClick={logOut} className='p-3 rounded-xl bg-red-400 text-white font-bold'>
            Logout
        </button>
    </nav>
  )
}

export default Navbar