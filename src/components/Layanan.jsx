import React from 'react'
import { Link } from 'react-router-dom'
const Layanan = () => {
  return (
    <div id="layanan" className="flex flex-col w-full h-full pt-16 pb-10 px-8 mx-auto">
      <div className="flex flex-col gap-y-5 mx-auto py-10">
        <span className="rounded-full text-sm static font-medium text-indigo-500 bg-indigo-50 px-3 py-2 w-32 text-center shadow mx-auto">Layanan Desa</span>
        <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center mx-auto max-w-md leading-tight sm:leading-snug drop-shadow-sm">Layanan yang kami miliki untuk membantu anda</h3>
        <p className="text-sm medium text-gray-600 text-center mx-aut max-w-md">Kami memiliki banyak layanan yang kamu butuhkan, anda bisa
          menikmati dan menggunakan dengan mudah dan cepat</p>
      </div>
      <div className="flex max-w-full md:w-9/12 mx-auto">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 items-center  gap-x-5 gap-y-5">
          <div className="flex flex-col w-full h-auto rounded-xl shadow-xl items-center md:items-baseline gap-y-5 lg:p-10 md:p-5 p-10 border">
            <img src="/images/home.png" className="w-10 h-auto" alt="" />
            <div className="flex flex-col gap-y-1">
              <h4 className="text-md font-semibold text-center md:text-left">Surat Domisili</h4>
              <p className="text-xs font-light text-center md:text-left text-gray-500">Membantu anda untuk mendapatkan surat domisili</p>
            </div>
            <Link to='/user/suratDomisili' className="text-sm font-semibold text-violet-600 hover:text-violet-500">Baca Selengkapnya</Link>
          </div>
          <div className="flex flex-col w-full h-auto rounded-xl shadow-xl items-center md:items-baseline gap-y-5 lg:p-10 md:p-5 p-10 border">
            <img src="/images/baby.png" className="w-10 h-auto" alt="" />
            <div className="flex flex-col gap-y-1">
              <h4 className="text-md font-semibold text-center md:text-left">Surat Kelahiran</h4>
              <p className="text-xs font-light text-center md:text-left text-gray-500">Pengajuan surat kelahiran dengan mudah dan cepat</p>
            </div>
            <Link to='/user/suratKelahiran' className="text-sm font-semibold text-violet-600 hover:text-violet-500">Baca Selengkapnya</Link>
          </div>
          <div className="flex flex-col w-full h-auto rounded-xl shadow-xl items-center md:items-baseline gap-y-5 lg:p-10 md:p-5 p-10 border">
            <img src="/images/tomb.png" className="w-10 h-auto" alt="" />
            <div className="flex flex-col gap-y-1">
              <h4 className="text-md font-semibold text-center md:text-left">Surat Kematian</h4>
              <p className="text-xs font-light text-center md:text-left text-gray-500">Membantu membuat surat kematian dengan cepat</p>
            </div>
            <Link to='/user/suratKematian' className="text-sm font-semibold text-violet-600 hover:text-violet-500">Baca Selengkapnya</Link>
          </div>
          <div className="flex flex-col w-full h-auto rounded-xl shadow-xl items-center md:items-baseline gap-y-5 lg:p-10 md:p-5 p-10 border">
            <img src="/images/sktm.png" className="w-10 h-auto" alt="" />
            <div className="flex flex-col gap-y-1">
              <h4 className="text-md font-semibold text-center md:text-left">Pengajuan SKTM</h4>
              <p className="text-xs font-light text-center md:text-left text-gray-500">Membantu anda untuk pembuatan SKTM</p>
            </div>
            <Link to='/user/suratSKTM' className="text-sm font-semibold text-violet-600 hover:text-violet-500">Baca Selengkapnya</Link>
          </div>
          <div className="flex flex-col w-full h-auto rounded-xl shadow-xl items-center md:items-baseline gap-y-5 lg:p-10 md:p-5 p-10 border">
            <img src="/images/speaker.png" className="w-10 h-auto" alt="" />
            <div className="flex flex-col gap-y-1">
              <h4 className="text-md font-semibold text-center md:text-left">Surat Pengaduan</h4>
              <p className="text-xs font-light text-center md:text-left text-gray-500">Kami selalu menerima masukan dan pengaduan anda</p>
            </div>
            <Link to='/user/pengaduan' className="text-sm font-semibold text-violet-600 hover:text-violet-500">Baca Selengkapnya</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layanan