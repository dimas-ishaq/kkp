import NavUserDashboard from "../components/NavUserDashboard"
import UserHero from "../components/UserHero"
import UserMenu from "../components/UserMenu"
import Faq from "../components/FaqDashboard"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const UserDashboard = () => {
  const navigate = useNavigate()
  const [profilePic, setProfilePic] = useState(null)
  useEffect(() => {
    window.scrollTo(0, 0);
    const api = 'https://db.dimsomnia.cloud/api/user/dashboard'
    const usercookie = localStorage.getItem("USER_COOKIE")
    axios.defaults.headers.common['Authorization'] = `Bearer ${usercookie}`;
    axios
      .get(api)
      .then((response) => {
        console.log(response.data.path)
        setProfilePic(response.data.path)
      }).catch((error) => {
        console.log(error.message)

      })
  })

  return (
    <>
      <div className="flex flex-col w-full h-full" data-aos="fade-down" data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out">
        <NavUserDashboard profilePic={profilePic} />
        <UserHero />
        <UserMenu />
        <Faq />
        <Footer />

      </div >

    </>
  )
}

export default UserDashboard