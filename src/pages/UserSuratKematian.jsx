import { React, useState, useEffect } from 'react'
import NavUserDashboard from '../components/NavUserDashboard'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const UserSuratKematian = () => {
    useEffect(() => {
        // Ketika komponen pertama kali dimuat, atur posisi scroll window ke atas
        window.scrollTo(0, 0);
    }, []);
    const notifyError = (data) => toast.error(data, {
        theme: "colored",
        autoClose: 2000
    })
    const notifySuccess = (data) => toast.success(data, {
        theme: "colored",
        autoClose: 2000
    })
    const [data, setData] = useState({
        nama: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        gender: "",
        agama: "",
        tempat_meninggal: "",
        tanggal_meninggal: "",
        sebab_meninggal: ""
    })
    const [file, setFile] = useState()
    const [onSave, setSave] = useState(false)
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm()
    const api = 'https://db.dimsomnia.cloud/api/user/suratKematian'
    const handleSurat = async () => {
        if (!data.nama || !data.tempat_lahir || !data.tanggal_lahir || !data.gender || !data.agama || !data.tempat_meninggal || !data.tanggal_meninggal || !data.sebab_meninggal) {
            return notifyError("Pastikan semua field sudah terisi")
        }
        setSave(true)
        const formData = new FormData
        formData.append('data', JSON.stringify(data))
        formData.append('file', file)
        const usercookie = localStorage.getItem("USER_COOKIE")
        axios.defaults.headers.common['Authorization'] = `Bearer ${usercookie}`;
        await axios
            .post(api, formData)
            .then(() => {
                notifySuccess("Data berhasil disimpan")
                setSave(false)
                setTimeout(() => { navigate('/user/status'), setSave(false) }, 2500)
            }).catch((error) => {
                setSave(false)
                notifyError(error?.response?.data?.message || error.message)
                console.log(error)
            })
    }

    const religion = [
        { key: 0, agama: 'Islam' },
        { key: 1, agama: 'Kristen' },
        { key: 3, agama: 'Katolik' },
        { key: 4, agama: 'Hindu' },
        { key: 5, agama: 'Budha' },
        { key: 6, agama: 'Konghuchu' },
        { key: 7, agama: 'Lainnya' },
    ]
    return (
        <> <ToastContainer />
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
                        <form className="flex flex-col w-full h-full p-5 gap-y-2 items-center ">
                            <div className="flex flex-col  gap-x-2 gap-y-1 w-full">
                                <label htmlFor="nama" className=' text-slate-50 font-light' >Nama Lengkap</label>
                                <input {...register("nama", { required: "Nama harus diisi", onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} type="text" className='w-full border-2 px-auto rounded-md py-1.5 px-2' id="nama" />
                                <p className='text-sm text-yellow-400'>{errors.nama?.message}</p>
                            </div>
                            <div className="flex flex-col  gap-x-2 gap-y3 w-full">
                                <label htmlFor="tempat_lahir" className='  text-slate-50 font-light' >Tempat Lahir</label>
                                <input {...register("tempat_lahir", { required: 'Tempat lahir wajib diisi', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} type="text" className='w-full border-2 px-auto rounded-md py-1.5 px-2' id="tempat_lahir" />
                                <p className='text-sm text-yellow-400'>{errors.tempat_lahir?.message}</p>
                            </div>
                            <div className="flex flex-col  gap-x-2 gap-y-1 w-full">
                                <label htmlFor="tanggal_lahir" className='  text-slate-50 font-light' >Tanggal Lahir</label>
                                <input {...register("tanggal_lahir", { required: 'Tanggal Lahir harus dipilh', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} type="date" className='w-full border-2 px-auto rounded-md py-1.5 px-2' id="tanggal_lahir" />
                                <p className='text-sm text-yellow-400'>{errors.tanggal_lahir?.message}</p>
                            </div>
                            <div className="flex gap-y-1 gap-x-3 sm:gap-x-10 md:justify-start   w-full py-2">
                                <label htmlFor="gender" className='  text-slate-50 font-light' >Jenis Kelamin</label>
                                <div className="flex gap-x-2 gap-y-1">
                                    <input type="radio" className=' border-2 px-auto'{...register("gender", { required: 'Jenis Kelamin harus dipilih', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} id="gender" value='laki-laki' />
                                    <span className=' text-slate-50 font-light self-center'>Laki-Laki</span>
                                </div>
                                <div className="flex  gap-x-2 gap-y-1">
                                    <input type="radio" className=' border-2 px-auto'{...register("gender", { required: 'Jenis Kelamin harus dipilih', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} id="gender" value='perempuan' />
                                    <span className=' text-slate-50 font-light self-center'>Perempuan</span>
                                </div>
                                <div>
                                    <p className='text-sm text-yellow-400'>{errors.gender?.message}</p>
                                </div>
                            </div>
                            <div className="flex flex-col  gap-x-2 gap-y-1 w-full">
                                <label htmlFor="agama" className='  text-slate-50 font-light' >Agama</label>
                                <select {...register("agama", { required: 'Agama harus dipilih', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} id="agama" className='w-full border-2 px-auto rounded-md py-1.5 px-2'>
                                    <option disabled selected>Pilih Agama</option>
                                    {religion.map((item) => (
                                        <option key={item.key} value={item.agama}>{item.agama}</option>
                                    ))}
                                </select>
                                <p className='text-sm text-yellow-400'>{errors.agama?.message}</p>
                            </div>
                            <div className="flex flex-col  gap-x-2 gap-y-1 w-full">
                                <label htmlFor="tempat_meninggal" className=' text-slate-50 font-light' >Tempat Meninggal</label>
                                <input {...register("tempat_meninggal", { required: 'Tempat harus diisi', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} type="text" className='w-full border-2 px-auto rounded-md py-1.5 px-2' id="tempat_meninggal" />
                                <p className='text-sm text-yellow-400'>{errors.tempat_meninggal?.message}</p>
                            </div>
                            <div className="flex flex-col  gap-x-2 gap-y-1 w-full">
                                <label htmlFor="tanggal_meninggal" className=' text-slate-50 font-light' >Tanggal Meninggal</label>
                                <input {...register("tanggal_meninggal", { required: 'Tanggal harus dipilih', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} type="date" className='w-full border-2 px-auto rounded-md py-1.5 px-2' id="tanggal_meninggal" />
                                <p className='text-sm text-yellow-400'>{errors.tanggal_meninggal?.message}</p>
                            </div>
                            <div className="flex flex-col  gap-x-2 gap-y-1 w-full">
                                <label htmlFor="sebab_meninggal" className=' text-slate-50 font-light' >Sebab Meninggal</label>
                                <select {...register("sebab_meninggal", { required: 'Penyebab meninggal harus dipilih', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} className='w-full border-2 px-auto rounded-md py-1.5 px-2' id="sebab_meninggal" >
                                    <option disabled selected>Pilih Penyebab</option>
                                    <option value='Kecelakaan'>Kecelakaan</option>
                                    <option value='Sakit'>Sakit</option>
                                    <option value='lainnya'>Lainnya</option>
                                </select>
                                <p className='text-sm text-yellow-400'>{errors.sebab_meninggal?.message}</p>
                            </div>
                            <div className="flex flex-col  gap-x-2 gap-y-1 w-full">
                                <label htmlFor="file" className=' text-slate-50 font-light' >Berkas Lampiran</label>
                                <input {...register("file", {
                                    required: 'Berkas harus di upload', onChange: (e) => setFile(e.target.files[0]), validate: (value) => {
                                        if (value[0]) {
                                            const fileType = value[0].type; return fileType === 'application/pdf' || 'Hanya menerima file berformamt .Pdf'
                                        }
                                    }
                                })} accept='.pdf' id="file" type="file" className='w-full border-2 px-auto rounded-md py-1.5 px-2 bg-gray-100' />
                                <p className='text-sm text-yellow-400'>{errors.file?.message}</p>
                            </div>
                            <div className="w-full py-2">
                                {onSave && <button disabled onClick={handleSubmit(handleSurat)} className='px-3 py-2.5 bg-sky-800 hover:bg-sky-700 text-md font-semibold w-full rounded-md text-slate-50' >
                                    Permintaan sedang diproses
                                </button>}
                                {!onSave && <button onClick={handleSubmit(handleSurat)} className='px-3 py-2.5 bg-sky-800 hover:bg-sky-700 text-md font-semibold w-full rounded-md text-slate-50' >
                                    Kirim
                                </button>}
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