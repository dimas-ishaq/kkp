import React from 'react'
import NavUserDashboard from '../components/NavUserDashboard'
const UserPengaduan = () => {
    return (
        <>
            <div className="flex flex-col w-full h-full">
                <NavUserDashboard />
                <div className="flex flex-col-reverse lg:flex-row w-full h-full py-10 md:py-5 bg-sky-600">
                    <div className="flex flex-col lg:w-6/12 w-full md:px-10 px-3 py-5" data-aos="fade-up" data-aos-delay="80"
                        data-aos-duration="1000"
                        data-aos-easing="ease-in-out">
                        <div className="p-3">
                            <h3 className="text-center font-semibold text-2xl text-slate-100">Formulir Pengaduan</h3>
                        </div>
                        <form action="" className="flex flex-col w-full h-full p-5 gap-y-2 items-center ">
                            <div className="flex flex-col md:flex-row gap-x-2 gap-y-3 w-full">
                                <label htmlFor="nama" className='md:w-4/12 text-slate-50 md:self-center'>Nama Lengkap</label>
                                <input type="text" className='w-full border-2 px-auto rounded-md py-1.5 px-2' name="nama" id="nama" placeholder='Isi nama anda' />
                            </div>
                            <div className="flex flex-col md:flex-row gap-x-2 gap-y- w-full">
                                <label htmlFor="isi" className='md:w-4/12  text-slate-50 md:self-center'>Isi Pengaduan</label>
                                <textarea type="text" className='w-full border-2 px-auto rounded-md py-1.5 px-2' name="isi" id="isi" cols={20} rows={5} placeholder='Isi pengaduan anda' />
                            </div>
                            <div className="flex flex-col md:flex-row gap-x-2 gap-y-3 w-full">
                                <label htmlFor="tanggal" className='md:w-4/12  text-slate-50 md:self-center'>Tanggal Kejadian</label>
                                <input type="date" className='w-full border-2 px-auto rounded-md py-1.5 px-2' name="tanggal" id="tanggal" placeholder='DD/MM/YY' />
                            </div>
                            <div className="flex flex-col md:flex-row gap-x-2 gap-y-3 w-full">
                                <label htmlFor="file" className='md:w-4/12 text-slate-50 md:self-center'>Berkas Lampiran</label>
                                <input type="file" className='w-full border-2 px-auto rounded-md py-1.5 px-2 bg-gray-100' name="file" id="file" />
                            </div>
                            <div className="w-full py-2">
                                <button className='px-3 py-2.5 bg-sky-800 hover:bg-sky-700 text-md font-semibold w-full rounded-md text-slate-50'>
                                    Kirim
                                </button>
                            </div>

                        </form>

                    </div>
                    <div className="items-center w-6/12 sm:max-w-md mx-auto my-auto sm:w-full rounded-full  bg-slate-100 md:p-10 p-3">
                        <img src="/images/eval.svg" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserPengaduan