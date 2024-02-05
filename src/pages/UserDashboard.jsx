import NavUserDashboard from "../components/NavUserDashboard"
import UserHero from "../components/UserHero"
import UserMenu from "../components/UserMenu"
import Faq from "../components/FaqDashboard"
import Footer from "../components/Footer"

const UserDashboard = () => {
  return (
    <>
      <div className="flex flex-col w-full h-full" data-aos="fade-down" data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out">
        <NavUserDashboard />
        <UserHero />
        <UserMenu />
        <Faq />
        <Footer />

      </div >

    </>
  )
}

export default UserDashboard