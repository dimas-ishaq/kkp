import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const PrivateRoute = ({ children, role }) => {

  const isUserAuthenticated = Cookies.get("usertoken")
  const isAdminAuthenticated = Cookies.get("admintoken")

  if (role === 'user' && isUserAuthenticated) {
    return children
  } else if (role === 'admin' && isAdminAuthenticated) {
    return children
  } else {
    return <Navigate to={role === 'user' ? "/userLogin" : "/adminLogin"} />
  }
}

export default PrivateRoute