import React,{ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAvail } from '../utils/Store/geminiSlice'
import Layout from '../components/Layout'
import MainMenu from '../components/MainMenu';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


function Home() {
    const dispatch = useDispatch()
    const {gemini} = useSelector((state)=>state.gemini)

    useEffect(()=>{
        dispatch(checkAvail())
    },[])

   
    

    return (
        <Layout>
            {
                !gemini && (
                    <div className='p-3 bg-red-100 rounded-xl mb-3 '>
                    <h1 className='text-red-500'>
                           Your browser doesn't support the Prompt API. If you're on Chrome, join the <a className='font-bold text-red-600' href="https://developer.chrome.com/docs/ai/built-in#get_an_early_preview">Early Preview Program</a> to enable it.
                    </h1>
                    </div>
                )
            }
            <Hero/>
        <MainMenu/>
            <Footer/>
        </Layout>
    )
}

export default Home