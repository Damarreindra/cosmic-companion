import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout({children}) {
  return (
    <div className='justify-center items-center bg-gradient-to-tr relative from-base to-primary'>
    <Navbar />
    <main className='px-24 py-12 '>
    {children}
    </main>
  
</div>
  )
}

export default Layout