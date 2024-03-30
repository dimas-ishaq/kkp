import { React, useEffect, useState, Fragment } from 'react';
import NavUserDashboard from '../components/NavUserDashboard'
import { ToastContainer, toast } from 'react-toastify';
import { Transition, Dialog } from '@headlessui/react';
import UserPengaduanInput from '../components/UserPengaduanInput'
import FaqContent from '../components/FaqContent';


const UserPengaduan = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [isOpen, setIsOpen] = useState(false)
    const notifyError = (data) => toast.error(data, {
        theme: "colored",
        autoClose: 2000
    })
    const notifySuccess = (data) => toast.success(data, {
        theme: "colored",
        autoClose: 2000
    })
    const notifHandler = (error, errInput) => {
        if (error && errInput) {
            return notifyError('Pastikan semua filed terisi')
        }
        if (error) {
            return notifyError(error)
        } else {
            setIsOpen(true)
            return notifySuccess('Pengaduan berhasil dibuat')
        }
    }



    return (
        <>
            <ToastContainer />
            <div className="flex flex-col w-full h-full">
                <NavUserDashboard />
                <div className="flex flex-col w-full h-full py-10 md:py-5 bg-blue-950/95">
                    <div className="p-3">
                        <h3 className="text-center font-semibold text-2xl text-slate-100">Formulir Pengaduan</h3>
                        <p className='text-center font-light text-slate-100 text-xs'>Isi dan Ajukan Formulir Pengajuan dengan mudah dan cepat</p>
                    </div>
                    <div className="grid lg:grid-cols-2 w-full md:px-10 px-3 py-5 items-center">
                        <UserPengaduanInput onInfo={notifHandler} />
                        <div className="items-center hidden lg:block sm:max-w-md mx-auto my-auto sm:w-full md:p-10 p-3">
                            <img src="/images/form-pengaduan.png" alt="" />
                        </div>
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
                                        <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-slate-50 p-6 text-left align-middle shadow-xl transition-all">
                                            <div className="w-full h-full py-2">
                                                <img src="/images/logo.png " className='w-24 mx-auto py-3' alt="" />
                                            </div>
                                            <Dialog.Title
                                                as="h3"
                                                className="text-xl text-center  font-semibold leading-6 text-blue-950 px-3"
                                            >
                                                Kepada Seluruh Masyarakat Desa Pandawangan
                                            </Dialog.Title>
                                            <div className=" flex flex-col gap-y-3 px-5 py-5">
                                                <p className="text-sm text-justify text-blue-950 font-light">
                                                    Terima kasih atas partisipasi Anda dalam menyampaikan pengaduan melalui platform web kami. Setiap masukan Anda sangat berharga bagi kami dalam meningkatkan kualitas layanan publik.
                                                </p>
                                                <p className='text-sm text-justify text-blue-950  font-light'>
                                                    Dengan kerjasama kita, kita dapat mencapai perubahan yang lebih baik. Kami mengundang Anda untuk terus berpartisipasi dan memberikan kontribusi Anda.
                                                </p>
                                                <p className="text-sm text-justify text-blue-950  font-light">
                                                    Terima kasih atas dukungan dan partisipasi Anda dalam membangun Desa Pandawangan yang lebih baik.
                                                </p>
                                                <p className=" text-md text-center font-semibold text-blue-950">
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
                <FaqContent />
            </div>
        </>
    )
}

export default UserPengaduan