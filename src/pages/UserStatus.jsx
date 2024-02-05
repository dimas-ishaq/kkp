import React from 'react'
import NavUserDashboard from '../components/NavUserDashboard'
import Footer from '../components/Footer'
import Faq from '../components/FaqDashboard'
import MainUserStatus from '../components/MainUserStatus'

const UserStatus = () => {
    return (
        <>
            <div className="flex flex-col w-full h-full" data-aos="fade-down" data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out">
                <NavUserDashboard />
                <MainUserStatus />
                <Faq />
                <Footer />
            </div>
        </>
    )
}

export default UserStatus