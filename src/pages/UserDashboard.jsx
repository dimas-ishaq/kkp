import NavUserDashboard from "../components/NavUserDashboard"
import UserHero from "../components/DashboardUserHero"
import UserMenu from "../components/DashboardUserMenu"
import Faq from "../components/FaqContent"
import Footer from "../components/Footer"

const UserDashboard = () => {

  return (
    <>
      <div className="flex flex-col w-full h-full overflow-hidden" >
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