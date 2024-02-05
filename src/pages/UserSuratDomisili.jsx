import React from 'react'
import NavUserDashboard from '../components/NavUserDashboard'

const UserSuratDomisili = () => {
    return (
        <>
            <div className="flex flex-col w-full h-full" data-aos="fade-down" data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out">
                <NavUserDashboard />
                <div className=" flex flex-col-reverse lg:flex-row w-full h-full py-10 md:py-5 bg-sky-600" >
                    <div className="flex flex-col lg:w-6/12 w-full md:px-10 px-3 py-5" data-aos="fade-up" data-aos-delay="80"
                        data-aos-duration="1000"
                        data-aos-easing="ease-in-out">
                        <div className="p-3">
                            <h3 className="text-center font-semibold text-2xl text-slate-100">Pengajuan Surat Domisili</h3>
                        </div>
                        <form action="" className="flex flex-col w-full h-full p-5 gap-y-2 items-center ">
                            <div className="flex flex-col md:flex-row gap-x-2 gap-y-3 w-full">
                                <label htmlFor="nama" className='md:w-3/12 text-slate-50 md:self-center'>Nama Lengkap</label>
                                <input type="text" className='w-full border-2 px-auto rounded-md py-1.5 px-2' name="nama" id="nama" />
                            </div>
                            <div className="flex flex-col md:flex-row gap-x-2 gap-y- w-full">
                                <label htmlFor="tempat" className='md:w-3/12  text-slate-50 md:self-center'>Tempat Lahir</label>
                                <input type="text" className='w-full border-2 px-auto rounded-md py-1.5 px-2' name="tempat" id="tempat" />
                            </div>
                            <div className="flex flex-col md:flex-row gap-x-2 gap-y-3 w-full">
                                <label htmlFor="tanggal" className='md:w-3/12  text-slate-50 md:self-center'>Tanggal Lahir</label>
                                <input type="date" className='w-full border-2 px-auto rounded-md py-1.5 px-2' name="tanggal" id="tanggal" placeholder='DD/MM/YY' />
                            </div>
                            <div className="flex md:flex-row gap-x-2 gap-y-3 w-full py-2">
                                <label htmlFor="gender" className='md:w-3/12  text-slate-50 md:self-center'>Jenis Kelamin</label>
                                <div className="flex gap-x-2 gap-y-3">
                                    <input type="radio" className=' border-2 px-auto' name="gender" id="gender" value='laki' />
                                    <span className=' text-slate-50 self-center'>Laki-Laki</span>
                                </div>
                                <div className="flex md:flex-row gap-x-2 gap-y-3">
                                    <input type="radio" className=' border-2 px-auto' name="gender" id="gender" value='perempuan' />
                                    <span className=' text-slate-50 self-center'>Perempuan</span>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-x-2 gap-y-3 w-full">
                                <label htmlFor="pekerjaan" className='md:w-3/12  text-slate-50 md:self-center'>Pekerjaan</label>
                                <select name="pekerjaan" id="pekerjaan" className='w-full border-2 px-auto rounded-md py-1.5 px-2'>
                                    <option disabled selected>Pekerjaan</option>
                                    {Array.from({ length: 10 }, (_, index) => (
                                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col md:flex-row gap-x-2 gap-y- w-full">
                                <label htmlFor="alamat" className='md:w-3/12  text-slate-50 md:self-center'>Alamat</label>
                                <textarea type="text" className='w-full border-2 px-auto rounded-md py-1.5 px-2' name="alamat" id="alamat" cols={20} rows={5} placeholder='Alamat Lengkap' />
                            </div>
                            <div className="flex flex-col md:flex-row gap-x-2 gap-y-3 w-full">
                                <label htmlFor="file" className='md:w-3/12 text-slate-50 md:self-center'>Berkas Lampiran</label>
                                <input type="file" className='w-full border-2 px-auto rounded-md py-1.5 px-2 bg-gray-100' name="file" id="file" />
                            </div>
                            <div className="w-full py-2">
                                <button className='px-3 py-2.5 bg-sky-800 hover:bg-sky-700 text-md font-semibold w-full rounded-md text-slate-50'>
                                    Kirim
                                </button>
                            </div>

                        </form>
                    </div>
                    <div className="items-center mx-auto my-auto md:w-6/12 w-max-md bg-slate-100 rounded-full p-20" data-aos="fade-up" data-aos-delay="100"
                        data-aos-duration="1000"
                        data-aos-easing="ease-in-out">
                        <img src="/images/home.svg" className='mx-auto' alt="domisili" />
                    </div>

                </div >

            </div >
        </>
    )
}

export default UserSuratDomisili