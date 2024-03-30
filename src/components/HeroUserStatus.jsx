import React from 'react'
import { CiClock1 } from "react-icons/ci";
const HeroUserStatus = () => {
  return (
    <div className='w-full bg-blue-950'>
      <div className="flex flex-col md:w-6/12 mx-auto py-24 gap-y-3 px-5 md:px-0">
        <h2 className=' text-2xl font-semibold md:text-4xl text-center text-slate-50'>Memberi kemudahan dan bantuan apapun yang anda butuhkan</h2>
        <p className='text-xs text-center text-slate-50'>Dengan data terkini kami hadir untuk memudahkan akses dan informasi
          pelayanan desa seperti Administrasi desa dan kesejahteraan masyarakat,
          semuanya bisa anda akses dengan mudah</p>
        <div className="wrapper flex flex-col w-full gap-y-1">
          <span className='mx-auto'> <CiClock1 fontSize={32} color='white' /></span>
          <p className='text-center text-sm font-semibold text-slate-50'>Jam layanan: Senin - Jumat <br />Pukul: 08.00 - 17.00</p>
        </div>
      </div >
    </div >
  )
}

export default HeroUserStatus