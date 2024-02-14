import { Link } from 'react-router-dom'
import { useState, Fragment, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form'
import { Dialog, Transition } from '@headlessui/react';


const UserRegister = () => {
    useEffect(() => {
        // Ketika komponen pertama kali dimuat, atur posisi scroll window ke atas
        window.scrollTo(0, 0);
    }, []);
    const [data, setData] = useState({
        nama: '',
        nik: '',
        alamat: '',
        email: '',
        password: ''
    })
    const [isOpen, setIsOpen] = useState(false)
    const [onSave, setSave] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit, watch, setError, formState: { errors } } = useForm()

    const notifyError = (data) => toast.error(data, {
        theme: "colored",
        autoClose: 1000
    })
    const pass = watch('password')
    const confirmPass = watch('repeat_password')
    const api = 'https://db.dimsomnia.cloud/api/register'

    const handleRegister = async () => {
        if (pass !== confirmPass) {
            return setError('repeat_password', {
                type: 'custom',
                message: 'Password dan konfirmasi password harus sama.'
            })

        }

        setSave(true)
        const formData = new FormData
        formData.append('data', JSON.stringify(data))
        console.log(formData)
        await axios
            .post(api, formData)
            .then(() => {
                setIsOpen(true)
                setSave(false)
            }).catch((error) => {
                notifyError(error.response.data.message)
                console.log(error)
                navigate('/userRegister')
                setSave(false)
            })

    }
    return (
        <>
            <div className="flex flex-col w-full h-full">
                <ToastContainer />
                <div className="grid md:grid-cols-2 gap-y-5 w-full h-full">
                    <div className="flex flex-col md:px-20 md:py-10 p-10 bg-slate-100">
                        <div className="flex flex-col justify-center gap-y-2 ">
                            <h3 className='text-xl font-semibold text-center'>Halo Masyarakat :)</h3>
                            <p className='text-sm text-center'>Selamat Datang di Portal Digital dan Administrasi Desa Pandanwangi</p>
                            <div className="flex gap-x-2 mx-auto">
                                <span className='text-sm '>Sudah Memiliki Akun ?</span> <Link to='/userLogin' className='text-sm text-blue-600 hover:bg-blue-700 hover:px-2 hover:rounded hover:text-white '>Login</Link>
                            </div>
                        </div>
                        <form className='py-3' >
                            <div className="flex flex-col gap-y-1 py-2">
                                <label htmlFor="nama" className='font-light'>
                                    Nama Lengkap
                                </label>
                                <input type="text" {...register("nama", { required: 'Nama lengkap harus di isi', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} id="nama" className='py-2 px-3 rounded-sm focus:outline-none focus:ring focus:border-blue-500' placeholder='Masukkan Nama Lengkap Anda' />
                                <p className='text-xs text-red-600'>{errors.nama?.message}</p>
                            </div>
                            <div className="flex flex-col gap-y-1 py-2">
                                <label htmlFor="nik" className='font-light'>
                                    NIK
                                </label>
                                <input type="text" {...register("nik", {
                                    required: 'NIK harus di isi', maxLength: {
                                        value: 16,
                                        message: 'NIK maksimal harus 16 angka'
                                    }, minLength: {
                                        value: 16,
                                        message: 'NIK minimal harus 16 angka'
                                    }, onChange: (e) => setData({ ...data, [e.target.name]: e.target.value })
                                })} id="nik" className='py-2 px-3 rounded-sm focus:outline-none focus:ring focus:border-blue-500' placeholder='Masukkan NIK 16 Angka' />
                                <p className='text-xs text-red-600'>{errors.nik?.message}</p>
                            </div>
                            <div className="flex flex-col gap-y-1 py-2">
                                <label htmlFor="alamat" className='font-light'>
                                    Alamat
                                </label>
                                <input type="text" {...register("alamat", { required: 'Alamat lengkap harus di isi', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} id="alamat" className='py-2 px-3 rounded-sm focus:outline-none focus:ring focus:border-blue-500' placeholder='Masukkan Alamat Lengkap Anda' />
                                <p className='text-xs text-red-600'>{errors.alamat?.message}</p>
                            </div>
                            <div className="flex flex-col gap-y-1 py-2">
                                <label htmlFor="email" className='font-light'>
                                    Email
                                </label>
                                <input type="email" {...register("email", { required: 'Email harus di isi', pattern: /^\S+@\S+$/i, onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} id="email" className='py-2 px-3 rounded-sm focus:outline-none focus:ring focus:border-blue-500' placeholder='Masukkan Email Anda' />
                                <p className='text-xs text-red-600'>{errors.email?.message}</p>
                            </div>
                            <div className="flex flex-col gap-y-1 py-2">
                                <label htmlFor="password" className='font-light'>
                                    Password
                                </label>
                                <input type="password" {...register("password", {
                                    required: 'Password harus di isi', minLength: {
                                        value: 6,
                                        message: 'Password minimal 6 karakter'
                                    }
                                    , onChange: (e) => setData({ ...data, [e.target.name]: e.target.value })
                                })} id="password" className='py-2 px-3 rounded-sm focus:outline-none focus:ring focus:border-blue-500' placeholder='********' />
                                <p className='text-xs text-red-600'>{errors.password?.message}</p>
                            </div>
                            <div className="flex flex-col gap-y-1 py-2">
                                <label htmlFor="repeat_password" className='font-light'>
                                    Konfirmasi Password
                                </label>
                                <input type="password" {...register("repeat_password", {
                                    required: true,
                                })} id="repeat_password" className='py-2 px-3 rounded-sm focus:outline-none focus:ring focus:border-blue-500' placeholder='********' />
                                <p className='text-xs text-red-500'>{errors.repeat_password?.message}</p>
                            </div>
                            <div className="w-full py-5">
                                {onSave && <button disabled type='submit' onClick={handleSubmit(handleRegister)} className="w-full font-semibold px-3 py-4 text-white bg-blue-700 hover:bg-blue-600 rounded-md" >Pendaftaran sedang diproses</button>}
                                {!onSave && <button type='submit' onClick={handleSubmit(handleRegister)} className="w-full font-semibold px-3 py-4 text-white bg-blue-700 hover:bg-blue-600 rounded-md" >Daftar</button>}
                            </div>
                        </form>

                    </div >
                    <div className="w-full h-full hidden md:block">
                        <img src="/images/hero.jpg" className='object-cover w-full h-full' alt="" />
                    </div>
                </div >
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
                                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-green-500 p-6 text-left align-middle shadow-xl transition-all">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-light leading-6 text-white"
                                            >
                                                Pendaftaran Berhasil
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm font-light text-white">
                                                    Silahkan klik tombol dibawah ini untuk login sebagai pengguna. Terimakasih atas kepercayaan anda menggunakan layanan kami :)
                                                </p>
                                            </div>

                                            <div className="mt-4">
                                                <Link to='/userLogin'
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-800 px-4 py-2 text-sm font-light text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                >
                                                    Login Pengguna
                                                </Link>
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

export default UserRegister