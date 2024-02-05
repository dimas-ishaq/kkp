import React from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Logout = ({ role }) => {

    Cookies.remove('usertoken')
    Cookies.remove('admintoken')

    localStorage.removeItem('USER_COOKIE')
    localStorage.removeItem('ADMIN_COOKIE')

    return <Navigate to={role === 'user' ? "/userLogin" : "/adminLogin"} />
}

export default Logout