import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <div className="relative isolate px-6 pt-5 lg:px-8 bg-[url('/images/hero.jpg')] bg-cover bg-fixed overflow-hidden" data-aos="fade-down" data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
      </div>
      <div className="mx-auto max-w-3xl py-32 sm:py-38 lg:py-30 ">
        <div className="text-center py-5 bg-slate-800/10 rounded-md">
          <img className="mx-auto" src="/images/logo.png" alt="" />
          <h1 className="text-3xl font-bold tracking-tight text-gray-200 sm:text-5xl">
            Selamat Datang di <br />Digital Sensus Pandanwangi
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-100">
            Senantiasa membantu masyarakat pandanwangi dengan senang hati melalui pelayanan ramah, responsif dan cepat.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to='/userLogin'
              className="rounded-xl bg-sky-700 px-5 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Masuk
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero