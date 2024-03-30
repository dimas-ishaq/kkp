import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useAuth, useAdminAuth } from '../contexts/AuthContext'

const Logout = ({ role }) => {
    const { logout } = useAuth(); // Perhatikan pemanggilan useAuth sebagai fungsi, menggunakan ()
    const { adminLogout } = useAdminAuth()
    Cookies.remove('admintoken');
    Cookies.remove('usertoken')
    localStorage.removeItem('usia_penduduk')
    localStorage.removeItem('status_pernikahan')
    localStorage.removeItem('dusun')
    localStorage.removeItem('admindata')
    localStorage.removeItem('userdata')


    // Pastikan logout dijalankan ketika komponen unmount
    useEffect(() => {
        logout();
        adminLogout()
    }, [logout, adminLogout]);

    return <Navigate to={role === 'user' ? "/userLogin" : "/adminLogin"} />
}

export default Logout
