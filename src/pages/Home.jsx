import Hero from "../components/Hero"
import Navbar from "../components/Navbar"

const Home = () => {
  return (
    <>
      <div className="home flex flex-col overflow-x-hidden !important">
        <Navbar />
        <Hero />
      </div>
    </>
  )
}

export default Home