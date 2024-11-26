import React from 'react'
import { auth, provider } from '../utils/firebaseConfig';
import { signInWithPopup, signOut } from 'firebase/auth';
import { redirect, useNavigate } from 'react-router';

function Register() {
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        try {
          const result = await signInWithPopup(auth, provider);
          navigate("/home")
        } catch (error) {
          console.error("Error signing in with Google:", error);
        }
      };


      const logOut = async () => {
        try {
          await signOut(auth);
          console.log("User signed out");
        } catch (error) {
          console.error("Error signing out:", error);
        }
      };


  return (
    <div className='bg-gradient-to-br from-base to-primary h-screen w-screen flex justify-center items-center'>
        <div className='bg-white rounded-xl h-1/2 w-1/3 flex  items-center p-8 flex-col'>
            <h1 className='font-bold text-3xl'>Login</h1>
            <button onClick={signInWithGoogle} className='bg-white border flex justify-center items-center gap-2 border-gray-200 shadow w-1/2 p-3 bg'>
               <img src="./images/google.png" className='w-8' alt="" /> Signin With Google
            </button>

           
        </div>

    </div>
  )
}

export default Register