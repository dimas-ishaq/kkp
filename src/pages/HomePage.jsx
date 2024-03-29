import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import FaqContent from "../components/FaqContent"
import Footer from "../components/Footer"
import Article from "../components/Article"
import ProfileDesa from "../components/ProfileDesa"
import Layanan from "../components/Layanan"

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col w-full h-auto overflow-hidden" >
        <Navbar />
        <Hero />
        {/*Profile Desa */}
        <ProfileDesa />
        {/*  Layanan Desa*/}
        <Layanan />
        {/* Berita Desa */}
        <Article />
        {/* Pertanyaan yang sering diajukan */}
        <FaqContent />
        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}

export default HomePage