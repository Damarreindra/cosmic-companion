import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout({children}) {
  return (
    <div className='bg-gradient-to-tr relative  from-base to-primary font-open'>
    <Navbar />
    <main className='xl:px-36 xl:py-5 px-8 py-3'>
    {children}
    </main>
</div>
  )
}

export default Layout