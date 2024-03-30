import axios from "axios";
import { useNavigate } from "react-router-dom";


const Hero = () => {
  const navigate = useNavigate()
  const api = 'https://db.dimsomnia.cloud/api'
  const handleLogin = () => {
    const usercookie = localStorage.getItem("USER_COOKIE")
    if (usercookie === null) {
      return navigate('/userLogin')
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${usercookie}`;
    axios
      .get(api)
      .then(() => {
        navigate('/user/dashboard')
      }).catch(() => {
        navigate('/userLogin')
      })
  }

  return (
    <div className="w-full h-full relative bg-[url('/images/hero.png')] bg-blend-darken bg-cover" data-aos="fade-down" data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="mx-auto max-w-3xl py-32 sm:py-38 lg:py-30 flex flex-col relative inset-0">
        <div className="text-center py-5 rounded-md px-0.5">
          <h1 className="text-3xl font-semibold tracking-tight sm:leading-snug text-white stroke-white sm:text-5xl px-3">
            Pelayanan online berbasis
            data untuk memudahkan
            masyarakat desa
          </h1>
          <p className="mt-6 text-sm sm:text-md leading-normal text-white font-normal px-2">
            Dengan data terkini kami hadir untuk memudahkan akses dan informasi pelayanan desa seperti
            Administrasi desa, layanan utuk membantu kesejahteraan masyarakat semuanya bisa anda
            akses dengan mudah dan tanpa keluar rumah
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button onClick={handleLogin}
              className="rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
              Baca Selengkapnya
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero