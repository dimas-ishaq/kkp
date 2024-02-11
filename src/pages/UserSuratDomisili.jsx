
import NavUserDashboard from '../components/NavUserDashboard'
import { useState, useEffect, React } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

const UserSuratDomisili = () => {
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
        pekerjaan: "",
        alamat: "",
    })
    const [file, setFile] = useState(null)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const api = 'https://db.dimsomnia.cloud/api/user/suratDomisili'
    const [onSave, setSave] = useState(false)
    const handleSurat = async () => {
        if (!data.nama || !data.tempat_lahir || !data.tanggal_lahir || !data.gender || !data.pekerjaan || !data.alamat || !file) {
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
                console.log(data)
                setTimeout(() => { navigate('/user/status'), setSave(false) }, 2500)
            }).catch((error) => {
                setSave(false)
                notifyError(error?.response?.data?.message || error.message)
                console.log(error)
            })
    }
    const jobs = [
        { key: 0, pekerjaan: 'Karyawan Swasta' },
        { key: 1, pekerjaan: 'Dokter' },
        { key: 2, pekerjaan: 'Wiraswasta' },
        { key: 3, pekerjaan: 'PNS' },
        { key: 4, pekerjaan: 'Petani' },
        { key: 5, pekerjaan: 'Wirausaha' },
        { key: 6, pekerjaan: 'Buruh' },
        { key: 7, pekerjaan: 'Guru' },
        { key: 8, pekerjaan: 'Mahasiswa' },
        { key: 9, pekerjaan: 'Tidak Bekerja' },
    ];


    return (
        <>

            <ToastContainer />
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
                        <form className="flex flex-col w-full h-full p-5 gap-y-2 items-center ">
                            <div className="flex flex-col gap-x-2 gap-y-1 w-full">
                                <label htmlFor="nama" className='text-slate-50 font-light'>Nama Lengkap</label>
                                <input {...register("nama", {
                                    required: 'Nama harus diisi', onChange: (e) => setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                })} type="text" className='w-full border-2 px-auto rounded-md py-1.5 px-2' id="nama" />
                                <p className='text-xs text-yellow-400'>{errors.nama?.message}</p>
                            </div>
                            <div className="flex flex-col gap-x-2 gap-y-1 w-full">
                                <label htmlFor="tempat_lahir" className=' text-slate-50 font-light'>Tempat Lahir</label>
                                <input {...register("tempat_lahir", {
                                    required: 'Tempat lahir harus diisi', onChange: (e) => setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                })} type="text" className='w-full border-2 px-auto rounded-md py-1.5 px-2' id="tempat_lahir" />
                                <p className='text-xs text-yellow-400'>{errors.tempat_lahir?.message}</p>
                            </div>
                            <div className="flex flex-col gap-x-2 gap-y-1 w-full">
                                <label htmlFor="tanggal_lahir" className=' text-slate-50 font-light'>Tanggal Lahir</label>
                                <input {...register("tanggal_lahir", {
                                    required: 'Tanggal lahir harus dipilih', onChange: (e) => setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                })} type="date" className='w-full border-2 px-auto rounded-md py-1.5 px-2' id="tanggal_lahir" />
                                <p className='text-xs text-yellow-400'>{errors.tanggal_lahir?.message}</p>
                            </div>
                            <div className="flex gap-y-1 gap-x-3 sm:gap-x-10 md:justify-start w-full py-2">
                                <label htmlFor="gender" className=' text-slate-50 font-light'>Jenis Kelamin</label>
                                <div className="flex gap-x-2 gap-y-1">
                                    <input {...register("gender", {
                                        required: 'Nama harus diisi', onChange: (e) => setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    })} type="radio" className=' border-2 px-auto' id="gender" value='laki-laki' />
                                    <span className=' text-slate-50 font-light self-center'>Laki-Laki</span>
                                </div>
                                <div className="flex gap-x-2 gap-y-1">
                                    <input {...register("gender", {
                                        required: 'Jenis kelamin harus dipilih', onChange: (e) => setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    })} type="radio" className=' border-2 px-auto' id="gender" value='perempuan' />
                                    <span className=' text-slate-50 font-light self-center'>Perempuan</span>
                                </div>
                            </div>
                            <div className="w-full py-1">
                                <p className='text-xs text-yellow-400 text-center'>{errors.gender?.message}</p>
                            </div>
                            <div className="flex flex-col gap-x-2 gap-y-1 w-full">
                                <label htmlFor="pekerjaan" className=' text-slate-50 font-light'>Pekerjaan</label>
                                <select {...register("pekerjaan", {
                                    required: 'Pekerjaan harus dipilih', onChange: (e) => setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                })} id="pekerjaan" className='w-full border-2 px-auto rounded-md py-1.5 px-2'>
                                    <option disabled selected>Pekerjaan</option>
                                    {jobs.map((item) => (
                                        <option key={item.key} value={item.pekerjaan}>{item.pekerjaan}</option>
                                    ))}
                                </select>
                                <p className='text-xs text-yellow-400'>{errors.pekerjaan?.message}</p>
                            </div>
                            <div className="flex flex-col gap-x-2 gap-y- w-full">
                                <label htmlFor="alamat" className=' text-slate-50 font-light'>Alamat</label>
                                <textarea {...register("alamat", {
                                    required: 'Alamat harus diisi', onChange: (e) => setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                })} type="text" className='w-full border-2 px-auto rounded-md py-1.5 px-2' id="alamat" cols={20} rows={5} placeholder='Alamat Lengkap' />
                                <p className='text-xs text-yellow-400'>{errors.alamat?.message}</p>
                            </div>
                            <div className="flex flex-col gap-x-2 gap-y-1 w-full">
                                <label htmlFor="file" className='text-slate-50 font-light'>Berkas Lampiran</label>
                                <input {...register("file", {
                                    required: 'Berkas harus diupload', onChange: (e) => setFile(e.target.files[0]), validate: (value) => {
                                        if (value[0]) {
                                            const fileType = value[0].type; return fileType === 'application/pdf' || 'Hanya menerima file berformamt .Pdf'
                                        }
                                    }
                                })} accept='.pdf' type="file" className='w-full border-2 px-auto rounded-md py-1.5 px-2 bg-gray-100' id="file" />
                                <p className='text-xs text-yellow-400'>{errors.file?.message}</p>
                            </div>
                            <div className="w-full py-2">
                                {onSave && <button disabled onClick={handleSubmit(handleSurat)} className='px-3 py-2.5 bg-sky-800 hover:bg-sky-700 text-md font-semibold w-full rounded-md text-slate-50'>
                                    Permintaan sedang diproses
                                </button>}
                                {!onSave && <button onClick={handleSubmit(handleSurat)} className='px-3 py-2.5 bg-sky-800 hover:bg-sky-700 text-md font-semibold w-full rounded-md text-slate-50'>
                                    Kirim
                                </button>}
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