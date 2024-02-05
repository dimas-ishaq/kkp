import React from 'react'
import NavUserDashboard from '../components/NavUserDashboard'
const UserSuratKematian = () => {
    const agama = [
        { key: 0, agama: 'Islam' },
        { key: 1, agama: 'Kristen' },
        { key: 3, agama: 'Katolik' },
        { key: 4, agama: 'Hindu' },
        { key: 5, agama: 'Budha' },
        { key: 6, agama: 'Konghuchu' },
        { key: 7, agama: 'Lainnya' },
    ]
    return (
        <>
            <div className="flex w-full h-full flex-col" data-aos="fade-down" data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out">
                <NavUserDashboard />
                <div className="flex flex-col-reverse lg:flex-row w-full h-full py-10 md:py-5 bg-sky-600">
                    <div className="flex flex-col lg:w-6/12 w-full md:px-10 px-3 py-5" data-aos="fade-up" data-aos-delay="80"
                        data-aos-duration="1000"
                        data-aos-easing="ease-in-out">
                        <div className="p-3">
                            <h3 className="text-center font-semibold text-2xl text-slate-100">Pengajuan Surat Kematian</h3>
                        </div>
                        <form action="" className="flex flex-col w-full h-full p-5 gap-y-2 items-center ">
                            <div className="flex flex-col md:flex-row gap-x-2 gap-y-3 w-full">
                                <label htmlFor="nama" className='md:w-4/12 text-slate-50 md:self-center'>Nama Lengkap</label>
                                <input type="text" className='w-full border-2 px-auto rounded-md py-1.5 px-2' name="nama" id="nama" />
                            </div>
                            <div className="flex flex-col md:flex-row gap-x-2 gap-y- w-full">
                                <label htmlFor="tempat" className='md:w-4/12  text-slate-50 md:self-center'>Tempat Lahir</label>
                                <input type="text" className='w-full border-2 px-auto rounded-md py-1.5 px-2' name="tempat" id="tempat" />
                            </div>
                            <div className="flex flex-col md:flex-row gap-x-2 gap-y-3 w-full">
                                <label htmlFor="tanggal" className='md:w-4/12  text-slate-50 md:self-center'>Tanggal Lahir</label>
                                <input type="date" className='w-full border-2 px-auto rounded-md py-1.5 px-2' name="tanggal" id="tanggal" placeholder='DD/MM/YY' />
                            </div>
                            <div className="flex md:flex-row gap-x-2 gap-y-3 w-full py-2">
                                <label htmlFor="gender" className='md:w-4/12  text-slate-50 md:self-center'>Jenis Kelamin</label>
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
                                <label htmlFor="agama" className='md:w-4/12  text-slate-50 md:self-center'>Agama</label>
                                <select name="agama" id="agama" className='w-full border-2 px-auto rounded-md py-1.5 px-2'>
                                    <option disabled selected>Pilih Agama</option>
                                    {agama.map((item) => (
                                        <option key={item.key} value={item.agama}>{item.agama}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col md:flex-row gap-x-2 gap-y-3 w-full">
                                <label htmlFor="tempat-meninggal" className='md:w-4/12 text-slate-50 md:self-center'>Tempat Meninggal</label>
                                <input type="text" className='w-full border-2 px-auto rounded-md py-1.5 px-2' name="tempat-meninggal" id="tempat-meninggal" />
                            </div>
                            <div className="flex flex-col md:flex-row gap-x-2 gap-y-3 w-full">
                                <label htmlFor="tanggal-meninggal" className='md:w-4/12 text-slate-50 md:self-center'>Tanggal Meninggal</label>
                                <input type="date" className='w-full border-2 px-auto rounded-md py-1.5 px-2' name="tanggal-meninggal" id="tanggal-meninggal" />
                            </div>
                            <div className="flex flex-col md:flex-row gap-x-2 gap-y-3 w-full">
                                <label htmlFor="sebab-meninggal" className='md:w-4/12 text-slate-50 md:self-center'>Sebab Meninggal</label>
                                <select className='w-full border-2 px-auto rounded-md py-1.5 px-2' name="sebab-meninggal" id="sebab-meninggal" >
                                    <option disabled selected>Pilih Penyebab</option>
                                    <option value='Kecelakaan' >Kecelakaan</option>
                                    <option value='Sakit'>Sakit</option>
                                    <option value='lainnya'>Lainnya</option>
                                </select>
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
                    <div className="items-center w-6/12 sm:max-w-md mx-auto my-auto sm:w-full rounded-full  bg-gray-100" data-aos="fade-up" data-aos-delay="100"
                        data-aos-duration="1000"
                        data-aos-easing="ease-in-out">
                        <img src="/images/kematian.svg" alt="" />
                    </div>
                </div>

            </div>
        </>
    )
}

export default UserSuratKematian