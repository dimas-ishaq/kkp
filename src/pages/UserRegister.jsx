import { Link } from 'react-router-dom'
import { useState, Fragment, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Dialog, Transition } from '@headlessui/react';
import UserRegisterInput from '../components/UserRegisterInput';


const UserRegister = () => {
    useEffect(() => {
        // Ketika komponen pertama kali dimuat, atur posisi scroll window ke atas
        window.scrollTo(0, 0);
    }, []);
    const [isOpen, setIsOpen] = useState(false)
    const notifyError = (data) => toast.error(data, {
        theme: "colored",
        autoClose: 1000
    })
    const notifHandler = (error, message) => {
        if (error) {
            return notifyError(message)
        } else {
            setIsOpen(true)
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="grid md:grid-cols-2 w-full h-full ">
                <div className="flex flex-col md:px-20 md:py-10 p-8 bg-slate-100 ">
                    <div className="flex flex-col justify-center gap-y-2 ">
                        <div className="w-full mb-5">
                            <img className="mx-auto w-32" src="/images/img-login.png" alt="logo" />
                        </div>
                        <h3 className='text-2xl font-semibold text-center'>Halo Masyarakat :)</h3>
                        <p className='text-sm text-center'>Selamat Datang di Portal Digital dan Administrasi Desa Pandanwangi</p>
                    </div>
                    <UserRegisterInput onInfo={notifHandler} />
                    <div className="flex gap-x-2 mx-auto">
                        <span className='text-sm '>Sudah Memiliki Akun ?</span> <Link to='/userLogin' className='text-sm text-blue-600 hover:bg-blue-700 hover:px-2 hover:rounded hover:text-white '>Login</Link>
                    </div>

                </div >
                <div className="w-full hidden md:block max-h-[870px]">
                    <img src="/images/image-user-login.png" className='object-cover
 w-full h-full' />
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
            </div >
        </>
    )
}

export default UserRegister