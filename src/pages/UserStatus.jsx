import NavUserDashboard from '../components/NavUserDashboard'
import Footer from '../components/Footer'
import Faq from '../components/FaqDashboard'
import MainUserStatus from '../components/MainUserStatus'
import { useState, useEffect, React } from 'react';
import axios from 'axios';

const UserStatus = () => {
    const [data, setData] = useState({
        Kelahiran: null,
        Kematian: null,
        Domisili: null,
        SKTM: null,
        user_info: null
    })
    const [profilePic, setProfilePic] = useState(null)
    const api = 'https://db.dimsomnia.cloud/api/user/status'
    useEffect(() => {
        window.scrollTo(0, 0);
        const usercookie = localStorage.getItem("USER_COOKIE")
        axios.defaults.headers.common['Authorization'] = `Bearer ${usercookie}`;
        axios
            .get(api)
            .then((response) => {
                const { Kelahiran, Kematian, Domisili, SKTM, user_info } = response.data
                setData({ Kelahiran: Kelahiran, Kematian: Kematian, Domisili: Domisili, SKTM: SKTM, user_info: user_info })
                setProfilePic(user_info.profile_picture)

            }).catch((error) => {
                console.log(error)
            })

    }, []);

    return (
        <>
            <div className="flex flex-col w-full h-full" data-aos="fade-down" data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out">
                <NavUserDashboard profilePic={profilePic} />
                <MainUserStatus data={data} />
                <Faq />
                <Footer />
            </div>
        </>
    )
}

export default UserStatus
