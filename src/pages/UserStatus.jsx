import NavUserDashboard from '../components/NavUserDashboard'
import Footer from '../components/Footer'
import Faq from '../components/FaqContent'
import MainUserStatus from '../components/MainUserStatus'
import React from 'react';
import HeroUserStatus from '../components/HeroUserStatus';
import { useAuth } from '../contexts/AuthContext';
const UserStatus = () => {
    const { user } = useAuth()
    return (
        <>
            <div className="flex flex-col w-full h-full overflow-hidden">
                <NavUserDashboard profilePic={user.profile_picture} />
                <HeroUserStatus />
                <MainUserStatus />
                <Faq />
                <Footer />
            </div>
        </>
    )
}

export default UserStatus
