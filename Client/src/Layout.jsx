import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LoggedInHeader from './components/LoggedInHeader'
function Layout() {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    console.log(isLoggedIn);
    return (
        <>
            {isLoggedIn ? <LoggedInHeader /> : <Header />}
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout