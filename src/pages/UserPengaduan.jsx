import { React, useEffect, useState, Fragment } from 'react';
import NavUserDashboard from '../components/NavUserDashboard'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { Transition, Dialog } from '@headlessui/react';


const UserPengaduan = () => {
    useEffect(() => {
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
        nama: '',
        pesan: '',
        tanggal: '',
    })
    const [isOpen, setIsOpen] = useState(false)
    const [onSave, setSave] = useState(false)
    const [file, setFile] = useState(null)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const api = 'https://db.dimsomnia.cloud/api/user/pengaduan'

    const handlePengaduan = async () => {
        if (!data.nama || !data.tanggal || !data.pesan) {
            return notifyError("Pastikan semua field sudah terisi")
        }
        const formData = new FormData
        formData.append('data', JSON.stringify(data))
        if (file) {
            formData.append('file', file)
        }
        const usercookie = localStorage.getItem("USER_COOKIE")
        console.log(data)
        axios.defaults.headers.common['Authorization'] = `Bearer ${usercookie}`;
        axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
        await axios
            .post(api, formData)
            .then(() => {
                notifySuccess("Pengaduan berhasil dibuat")
                setSave(false)
                setIsOpen(true)
                setTimeout(() => { navigate('/user/dashboard'), setSave(false), setIsOpen(false) }, 7000)
            }).catch((error) => {
                setSave(false)
                setIsOpen(false)
                notifyError(error)
                console.log(error)
            })
    }


    return (
        <>
            <ToastContainer />
            <div className="flex flex-col w-full h-full">
                <NavUserDashboard />
                <div className="flex flex-col-reverse lg:flex-row w-full h-full py-10 md:py-5 bg-sky-600">
                    <div className="flex flex-col lg:w-6/12 w-full md:px-10 px-3 py-5" data-aos="fade-up" data-aos-delay="80"
                        data-aos-duration="1000"
                        data-aos-easing="ease-in-out">
                        <div className="p-3">
                            <h3 className="text-center font-semibold text-2xl text-slate-100">Formulir Pengaduan</h3>
                        </div>
                        <form className="flex flex-col w-full h-full p-5 gap-y-2 items-center ">
                            <div className="flex flex-col gap-x-2 gap-y-1 w-full">
                                <label htmlFor="nama" className='text-slate-50 font-light'>Nama Lengkap</label>
                                <input {...register("nama", { required: 'Nama harus diisi', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} type="text" className='w-full border-2 px-auto rounded-md py-1.5 px-2' id="nama" placeholder='Isi Nama Lengkap Anda' />
                                <p className='text-xs text-yellow-400'>{errors.nama?.message}</p>
                            </div>
                            <div className="flex flex-col gap-x-2 gap-y-1 w-full">
                                <label htmlFor="pesan" className=' text-slate-50 font-light'>Pesan Pengaduan</label>
                                <textarea {...register("pesan", { required: 'Pesan pengaduan harus di isi', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} type="text" className='w-full border-2 px-auto rounded-md py-1.5 px-2' id="isi" cols={20} rows={5} placeholder='Isi Pesan Pengaduan Anda' />
                                <p className='text-xs text-yellow-400'>{errors.pesan?.message}</p>
                            </div>
                            <div className="flex flex-col gap-x-2 gap-y-1 w-full">
                                <label htmlFor="tanggal" className=' text-slate-50 font-light'>Tanggal Kejadian</label>
                                <input {...register("tanggal", { required: 'Tanggal harus dipilih', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} type="date" className='w-full border-2 px-auto rounded-md py-1.5 px-2' id="tanggal" placeholder='DD/MM/YY' />
                                <p className='text-xs text-yellow-400'>{errors.tanggal?.message}</p>
                            </div>
                            <div className="flex flex-col gap-x-2 gap-y-1 w-full">
                                <label htmlFor="file" className='text-slate-50 font-light'>Bukti Pengaduan (Opsional)</label>
                                <input {...register("file", {
                                    onChange: (e) => setFile(e.target.files[0])
                                })} type="file" className='w-full border-2 px-auto rounded-md py-1.5 px-2 bg-gray-100' name="file" id="file" />
                            </div>
                            <div className="w-full py-2">
                                {onSave && <button disabled className='px-3 py-2.5 bg-sky-800 hover:bg-sky-700 text-md font-semibold w-full rounded-md text-slate-50'>
                                    Permintaan sedang diproses
                                </button>}
                                {!onSave && <button onClick={handleSubmit(handlePengaduan)} className='px-3 py-2.5 bg-sky-800 hover:bg-sky-700 text-md font-semibold w-full rounded-md text-slate-50'>
                                    Kirim
                                </button>}
                            </div>
                        </form>
                    </div>
                    <div className="items-center w-6/12 sm:max-w-md mx-auto my-auto sm:w-full rounded-full  bg-slate-100 md:p-10 p-3">
                        <img src="/images/eval.svg" alt="" />
                    </div>
                </div>
                <div className="flex w-full h-full">
                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black/25" />
                            </Transition.Child>
                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-blue-950 p-6 text-left align-middle shadow-xl transition-all">
                                            <div className="w-full h-full py-2">
                                                <img src="/images/logo.png " className='w-24 mx-auto' alt="" />
                                            </div>
                                            <Dialog.Title
                                                as="h3"
                                                className="text-xl text-center  font-semibold leading-6 text-slate-50 px-3"
                                            >
                                                Kepada Seluruh Masyarakat Desa Pandawangan
                                            </Dialog.Title>
                                            <div className=" flex flex-col gap-y-3 px-5 py-5">
                                                <p className="text-sm text-justify text-white font-light">
                                                    Terima kasih atas partisipasi Anda dalam menyampaikan pengaduan melalui platform web kami. Setiap masukan Anda sangat berharga bagi kami dalam meningkatkan kualitas layanan publik.
                                                </p>
                                                <p className='text-sm text-justify text-white  font-light'>
                                                    Dengan kerjasama kita, kita dapat mencapai perubahan yang lebih baik. Kami mengundang Anda untuk terus berpartisipasi dan memberikan kontribusi Anda.
                                                </p>
                                                <p className="text-sm text-justify text-white  font-light">
                                                    Terima kasih atas dukungan dan partisipasi Anda dalam membangun Desa Pandawangan yang lebih baik.
                                                </p>
                                                <p className=" text-md text-center font-semibold text-white">
                                                    [Hormat kami] <br />Pemerintah Desa Pandawangan
                                                </p>

                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
            </div>
        </>
    )
}

export default UserPengaduan