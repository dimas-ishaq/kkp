import NavUserDashboard from '../components/NavUserDashboard'
import { useState, useEffect, React } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const UserSuratKelahiran = () => {
    useEffect(() => {
        // Ketika komponen pertama kali dimuat, atur posisi scroll window ke atas
        window.scrollTo(0, 0);
    }, []);
    const notifyError = (data) => toast.error(data, {
        theme: "colored",
    })
    const notifySuccess = (data) => toast.success(data, {
        theme: "colored",
        autoClose: 2000
    })

    const [data, setData] = useState({
        nama: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        gender: '',
        ayah: '',
        ibu: '',
        anak: ''
    })
    const [file, setFile] = useState(null)
    const [onSave, setSave] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const api = "https://db.dimsomnia.cloud/api/user/suratKelahiran"

    const handleSurat = async () => {
        if (!data.nama || !data.tempat_lahir || !data.tanggal_lahir || !data.gender || !data.ayah || !data.ibu || !data.anak) {
            return notifyError("Pastikan semua field sudah diisi")
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
                            <h3 className="text-center font-semibold text-2xl text-slate-100">Pengajuan Surat Kelahiran</h3>
                        </div>
                        <form className="flex flex-col w-full h-full p-5 gap-y-2 items-center ">
                            <div className="flex flex-col gap-x-2 gap-y-1 w-full">
                                <label htmlFor="nama" className='text-slate-50 font-light'>Nama Bayi</label>
                                <input type="text" {...register("nama", { required: 'Nama harus diisi', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} className='w-full border-2 px-auto rounded-md py-1.5 px-2' id="nama" placeholder='Isi Nama Anak Anda' />
                                <p className='text-xs text-yellow-400'>{errors.nama?.message}</p>
                            </div>
                            <div className="flex flex-col gap-x-2 gap-y-1 w-full">
                                <label htmlFor="tempat_lahir" className=' text-slate-50 font-light'>Tempat Lahir</label>
                                <input type="text" {...register("tempat_lahir", { required: 'Tempat lahir harus diisi', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} className='w-full border-2 px-auto rounded-md py-1.5 px-2' id="tempat_lahir" placeholder='Isi Tempat Lahir' />
                                <p className='text-xs text-yellow-400'>{errors.tempat?.message}</p>
                            </div>
                            <div className="flex flex-col gap-x-2 gap-y-1 w-full">
                                <label htmlFor="tanggal_lahir" className=' text-slate-50 font-light'>Tanggal Lahir</label>
                                <input type="date" {...register("tanggal_lahir", { required: 'Tanggal lahir harus diisi', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} className='w-full border-2 px-auto rounded-md py-1.5 px-2 font-light' id="tanggal_lahir" placeholder='DD/MM/YY' />
                                <p className='text-xs text-yellow-400'>{errors.tanggal?.message}</p>
                            </div>
                            <div className="flex gap-y-1 gap-x-3 sm:gap-x-10 md:justify-start  w-full py-2">
                                <label htmlFor="gender" className=' text-slate-50 font-light'>Jenis Kelamin</label>
                                <div className="flex gap-x-2 gap-y-1">
                                    <input type="radio" className=' border-2 px-auto' {...register("gender", { required: 'Jenis kelamin harus dipilih', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} id="gender" value='laki-laki' />
                                    <span className=' text-slate-50 font-light self-center'>Laki-Laki</span>
                                </div>
                                <div className="flex gap-x-2 gap-y-1">
                                    <input type="radio" className=' border-2 px-auto' {...register("gender", { required: 'Jenis kelamin harus dipilih', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} id="gender" value='perempuan' />
                                    <span className=' text-slate-50 font-light self-center'>Perempuan</span>
                                </div>
                            </div>
                            <div>
                                <p className='text-xs text-yellow-400'>{errors.gender?.message}</p>
                            </div>
                            <div className="flex flex-col gap-x-2 gap-y-1 w-full">
                                <label htmlFor="ayah" className=' text-slate-50 font-light'>Nama Ayah</label>
                                <input type="text" className='w-full border-2 px-auto rounded-md py-1.5 px-2' {...register("ayah", { required: 'Nama ayah harus diisi', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} id="ayah" placeholder='Isi Nama Ayah' />
                                <p className='text-xs text-yellow-400'>{errors.ayah?.message}</p>
                            </div>
                            <div className="flex flex-col gap-x-2 gap-y-1 w-full">
                                <label htmlFor="ibu" className='text-slate-50 font-light'>Nama Ibu</label>
                                <input type="text" className='w-full border-2 px-auto rounded-md py-1.5 px-2' {...register("ibu", { required: 'Nama ibu harus diisi', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} id="ibu" placeholder='Isi Nama Ibu' />
                                <p className='text-xs text-yellow-400'>{errors.ibu?.message}</p>
                            </div>
                            <div className="flex flex-col gap-x-2 gap-y-1 w-full">
                                <label htmlFor="anak" className=' text-slate-50 font-light'>Anak Ke-</label>
                                <select {...register("anak", { required: '', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} id="anak" className='w-full border-2 px-auto rounded-md py-1.5 font-light px-2'>
                                    <option disabled selected>Anak ke</option>
                                    {Array.from({ length: 10 }, (_, index) => (
                                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                                    ))}
                                </select>

                            </div>
                            <div className="flex flex-col gap-x-2 gap-y-1 w-full">
                                <label htmlFor="file" className='text-slate-50 font-light'>Berkas Lampiran</label>
                                <input type="file" className='w-full border-2 px-auto rounded-md py-1.5 px-2 font-light bg-gray-100' {...register("file", {
                                    required: 'Berkas harus di upload', onChange: (e) => setFile(e.target.files[0]), validate: (value) => {
                                        if (value[0]) {
                                            const fileType = value[0].type; return fileType === 'application/pdf' || 'Hanya menerima file berformamt .Pdf'
                                        }
                                    }
                                })} accept='.pdf' id="file" />
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
                    <div className="items-center w-6/12 sm:max-w-sm mx-auto sm:w-full rounded-full bg-cyan-500 " data-aos="fade-up" data-aos-delay="100"
                        data-aos-duration="1000"
                        data-aos-easing="ease-in-out">
                        <img src="/images/kelahiran.svg" alt="" />
                    </div>
                </div >
            </div >
        </>
    )
}

export default UserSuratKelahiran