import React from 'react'
import NavUserDashboard from '../components/NavUserDashboard'

const UserSuratSKTM = () => {
    const agama = [
        { key: 0, agama: 'Islam' },
        { key: 1, agama: 'Kristen' },
        { key: 3, agama: 'Katolik' },
        { key: 4, agama: 'Hindu' },
        { key: 5, agama: 'Budha' },
        { key: 6, agama: 'Konghuchu' },
        { key: 7, agama: 'Lainnya' },
    ]
    const pendidikan = [
        { key: 0, pendidikan: 'Tidak Bersekolah' },
        { key: 1, pendidikan: 'SD/MI' },
        { key: 2, pendidikan: 'SMP/SLTP' },
        { key: 3, pendidikan: 'SLTA/SMA/SMK/MA' },
        { key: 4, pendidikan: 'Sarjana S1' }
    ]
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
                            <h3 className="text-center font-semibold text-2xl text-slate-100">Pengajuan Surat Keterangan Tidak Mampu</h3>
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
                                <label htmlFor="agama" className='md:w-3/12  text-slate-50 md:self-center'>Agama</label>
                                <select name="agama" id="agama" className='w-full border-2 px-auto rounded-md py-1.5 px-2'>
                                    <option disabled selected>Pilih Agama</option>
                                    {agama.map((item) => (
                                        <option key={item.key} value={item.agama}>{item.agama}</option>
                                    ))}
                                </select>
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
                            <div className="flex flex-col md:flex-row gap-x-2 gap-y-3 w-full">
                                <label htmlFor="pernikahan" className='md:w-3/12  text-slate-50 md:self-center'>Status Pernikahan</label>
                                <select name="pernikahan" id="pernikahan" className='w-full border-2 px-auto rounded-md py-1.5 px-2'>
                                    <option disabled selected>Status Pernikahan</option>
                                    <option value={'belum-menikah'}>Belum Menikah</option>
                                    <option value={'sudah menikah'}>Sudah Menikah</option>
                                </select>
                            </div>
                            <div className="flex flex-col md:flex-row gap-x-2 gap-y-3 w-full">
                                <label htmlFor="pendidikan" className='md:w-3/12  text-slate-50 md:self-center'>Pendidikan Terakhir</label>
                                <select name="pendidikan" id="pernikahan" className='w-full border-2 px-auto rounded-md py-1.5 px-2'>
                                    <option disabled selected>Pendidikan Terakhir</option>
                                    {pendidikan.map((item) => (
                                        <option key={item.key} value={item.pendidikan}>{item.pendidikan}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col md:flex-row gap-x-2 gap-y- w-full">
                                <label htmlFor="alamat" className='md:w-3/12  text-slate-50 md:self-center'>Alamat</label>
                                <textarea type="text" className='w-full border-2 px-auto rounded-md py-1.5 px-2' name="alamat" id="alamat" cols={20} rows={5} placeholder='Alamat Lengkap' />
                            </div>
                            <div className="flex flex-col md:flex-row gap-x-2 gap-y-3 w-full">
                                <label htmlFor="nik" className='md:w-3/12 text-slate-50 md:self-center'>NIK</label>
                                <input type="text" className='w-full border-2 px-auto rounded-md py-1.5 px-2' name="nik" id="nik" />
                            </div>
                            <div className="flex flex-col md:flex-row gap-x-2 gap-y-3 w-full">
                                <label htmlFor="anggota" className='md:w-3/12  text-slate-50 md:self-center'>Anggota Keluarga</label>
                                <select name="anggota" id="anggota" className='w-full border-2 px-auto rounded-md py-1.5 px-2'>
                                    <option disabled selected>Jumlah Anggota Keluarga </option>
                                    {Array.from({ length: 10 }, (_, index) => (
                                        <option key={index + 1} value={index + 1}>{index + 1} Orang</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col md:flex-row gap-x-2 gap-y-3 w-full">
                                <label htmlFor="anggota" className='md:w-3/12  text-slate-50 md:self-center'>Pendapatan Perbulan</label>
                                <select name="anggota" id="anggota" className='w-full border-2 px-auto rounded-md py-1.5 px-2'>
                                    <option disabled selected>Pendapatan per Bulan Rupiah </option>
                                    {Array.from({ length: 10 }, (_, index) => (
                                        <option key={index + 1} value={index + 1}>{index + 1} Orang</option>
                                    ))}
                                </select>
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
                    <div className="items-center w-6/12 sm:max-w-sm mx-auto sm:w-full rounded-full my-auto bg-cyan-500 ">
                        <img src="/images/sktm.svg" alt="" />
                    </div>

                </div >

            </div >
        </>
    )
}

export default UserSuratSKTM