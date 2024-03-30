import React from 'react'

const DashboardUserHero = () => {
    return (
        <><div className="flex flex-col">
            <div className="flex flex-col md:flex-row px-6 pt-7 lg:px-8 md:gap-x-5 gap-y-10 items-center bg-blue-950  ">
                <div className="flex flex-col w-11/12">
                    <h1 className=' text-2xl md:text-4xl text-gray-100 text-center font-bold sm:text-left py-3 md:py-5'>Selamat Datang di Digital Sensus dan Administrasi</h1>
                    <h3 className="text-xl md:text-2xl text-center sm:text-left text-gray-100 shadow-sm">
                        Salah satu inovasi layanan administrasi pengganti tatap muka, sehingga pemohon atau masyarakat dapat mengurus dokumen dari rumah dan dapat mencetak mandiri. Pelayanan yang tersedia meliputi permohonan surat dan pengaduan.
                    </h3>
                    <p className=" text-sm md:text-md font-light text-slate-50 shadow-sm text-center sm:text-left py-5">
                        Jam Layanan Kerja : Senin - Jumat <br />
                        Pukul : 08.00 - 17.00 WIB
                    </p>
                </div>
                <div className="rounded-md md:flex-initial w-11/12">
                    <img className='bg-cyan-700/70 rounded-lg' src="/images/service.svg" alt="service" />
                </div>
            </div>
            <div className="h-full w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#172554" fillOpacity="1" d="M0,224L40,192C80,160,160,96,240,90.7C320,85,400,139,480,176C560,213,640,235,720,208C800,181,880,107,960,74.7C1040,43,1120,53,1200,74.7C1280,96,1360,128,1400,144L1440,160L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>
            </div>
        </div>
        </>
    )
}

export default DashboardUserHero