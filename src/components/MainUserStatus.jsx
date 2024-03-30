import { React, Fragment, useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import { ToastContainer, toast } from 'react-toastify';
import { Transition, Dialog } from '@headlessui/react';
import Cookies from 'js-cookie';
import { handleDeleteDataStatus } from '../utils/api';
import { ColorRing } from 'react-loader-spinner'
import { getUserStatus } from '../utils/api';
import TableUserKelahiranStatus from '../components/TableUserKelahiranStatus';
import TableUserKematianStatus from '../components/TableUserKematianStatus';
import TableUserDomisiliStatus from '../components/TableUserDomisiliStatus';
import TableUserSKTMStatus from '../components/TableUserSKTMStatus'

const MainUserStatus = () => {
    const [dataPengajuan, setDataPengajuan] = useState({
        Kelahiran: [],
        Kematian: [],
        Domisili: [],
        SKTM: [],
    })
    const { Kelahiran, Kematian, Domisili, SKTM } = dataPengajuan
    const [loading, setLoading] = useState(true)

    const notifyError = (data) => toast.error(data, {
        theme: "colored",
        autoClose: 1000
    })
    const notifySuccess = (data) => toast.success(data, {
        theme: "colored",
        autoClose: 1000
    })


    const usertoken = Cookies.get("usertoken")

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const data = await getUserStatus(usertoken);
                setDataPengajuan(data);
                setTimeout(() => setLoading(false), 3000)
            } catch (error) {
                console.error('Terjadi kesalahan saat mengambil status pengguna:', error);
                setLoading(false)
            }
        };
        fetchStatus();
    }, [loading]);


    const [isOpen, setIsOpen] = useState(false)
    const [istarget, setTarget] = useState(null)
    const [isInfo, setInfo] = useState(false)

    const handleInfo = () => {
        console.log('hello')
        setInfo(true)
    }

    const handleTarget = (item, jenis) => {
        setIsOpen(true)
        setTarget({ item, jenis })
    }
    const handleDelete = async () => {
        const item = istarget.item
        const jenis = istarget.jenis
        setIsOpen(false)
        setLoading(true)
        const { error } = await handleDeleteDataStatus(usertoken, item, jenis)
        if (!error) {
            window.location.reload()
            return notifySuccess("Permohonan berhasil dibatalkan")
        }
        return notifyError("Erorr terjadi, hub admin")
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <>
            <ToastContainer />
            {loading ? <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="justify-center items-center flex mx-auto mt-5"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            /> :
                <div className="flex-col w-full h-full border shadow-md">
                    <div className="w-full p-5 h-full flex flex-col py-10">
                        <span className="rounded-full text-sm self-center font-medium text-indigo-500 bg-indigo-50 px-3 py-2 w-28 text-center shadow">Cek Status</span>
                        <div className="mx-auto py-10 md:w-9/12 flex flex-col items-center">
                            <h3 className="text-2xl md:text-3xl text-center font-semibold text-gray-800">Status Permohonan</h3>
                            <p className="text-sm text-center text-gray-800 py-2 ">Silahkan cek status permohonan administrasi anda, Apabila sudah diproses, anda bisa menunggu maksimal 24jam dan surat bisa diunduh untuk keperluan administrasi anda. Terimakasih telah menggunakan layanan digital sensus dan administrasi.</p>
                        </div>
                        <div className="w-full h-full">
                            <Tab.Group>
                                <div className="w-full max-w-lg mx-auto  sm:px-0">
                                    <Tab.List className="flex space-x-1 rounded-xl bg-blue-800 p-2 md:p-1">
                                        <Tab
                                            className={({ selected }) =>
                                                classNames(
                                                    'w-full rounded-lg py-2.5 text-xs md:text-sm font-medium leading-5',
                                                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                    selected
                                                        ? 'bg-white text-blue-700 shadow'
                                                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                                )
                                            }
                                        >
                                            Surat Kelahiran
                                        </Tab>
                                        <Tab
                                            className={({ selected }) =>
                                                classNames(
                                                    'w-full rounded-lg py-2.5  text-xs md:text-sm  font-medium leading-5',
                                                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                    selected
                                                        ? 'bg-white text-blue-700 shadow'
                                                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                                )
                                            }
                                        >
                                            Surat Kematian
                                        </Tab>
                                        <Tab
                                            className={({ selected }) =>
                                                classNames(
                                                    'w-full rounded-lg py-2.5  text-xs md:text-sm  font-medium leading-5',
                                                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                    selected
                                                        ? 'bg-white text-blue-700 shadow'
                                                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                                )
                                            }
                                        >
                                            Surat Domisili
                                        </Tab>
                                        <Tab
                                            className={({ selected }) =>
                                                classNames(
                                                    'w-full rounded-lg py-2.5 text-xs md:text-sm  font-medium leading-5',
                                                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                    selected
                                                        ? 'bg-white text-blue-700 shadow'
                                                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                                )
                                            }
                                        >
                                            SKTM
                                        </Tab>
                                    </Tab.List>
                                </div>
                                {/* SURAT KELAHIRAN */}
                                <Tab.Panels className="mt-2 ">
                                    <Tab.Panel
                                        className={classNames(
                                            'rounded-md bg-white p-3',
                                            'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                                        )}
                                    >
                                        <div className="flex flex-col">
                                            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                                                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                                    <div className="overflow-hidden">

                                                        <TableUserKelahiranStatus items={Kelahiran} itemsPerPage={5} handleTarget={handleTarget} handleInfo={handleInfo} />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Panel>
                                    {/* SURAT KEMATIAN */}
                                    <Tab.Panel
                                        className={classNames(
                                            'rounded-md bg-white p-3',
                                            'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                                        )}
                                    >
                                        <div className="flex flex-col">
                                            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                                                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                                    <div className="overflow-hidden">
                                                        <TableUserKematianStatus items={Kematian} itemsPerPage={5} handleTarget={handleTarget} handleInfo={handleInfo} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Panel>
                                    {/* SURAT DOMISILI */}
                                    <Tab.Panel
                                        className={classNames(
                                            'rounded-md bg-white p-3',
                                            'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                                        )}
                                    >
                                        <div className="flex flex-col ">
                                            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                                                <div className="py-2 inline-block min-w-full sm: lg:px-8">
                                                    <div className="overflow-hidden">
                                                        <TableUserDomisiliStatus items={Domisili} itemsPerPage={5} handleTarget={handleTarget} handleInfo={handleInfo} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Panel>
                                    {/* SURAT KETERANGAN TIDAK MAMPU */}
                                    <Tab.Panel
                                        className={classNames(
                                            'rounded-md bg-white p-3',
                                            'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                                        )}
                                    >
                                        <div className="flex flex-col">
                                            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                                                <div className="py-2 inline-block min-w-full sm: lg:px-8">
                                                    <div className="overflow-hidden">
                                                        <TableUserSKTMStatus items={SKTM} itemsPerPage={5} handleTarget={handleTarget} handleInfo={handleInfo} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
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
                                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-blue-950 p-6 text-left align-middle shadow-xl transition-all">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-lg font-light leading-6 text-white text-center"
                                                >
                                                    Apakah anda yakin ingin membatalkan permohonan tersebut?
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm font-light text-slate-50 text-justify">
                                                        "Anda yakin ingin membatalkan permohonan ini? Permohonan yang sudah dibatalkan tidak dapat dikembalikan seperti semula. Silahkan konfirmasi kembali sebelum melanjutkan."
                                                    </p>
                                                </div>
                                                <div className="flex justify-between mt-4">
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        Kembali
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                        onClick={() => handleDelete()}
                                                    >
                                                        Konfirmasi Pembatalan
                                                    </button>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    </div>
                    <div className="flex w-full h-full">
                        <Transition appear show={isInfo} as={Fragment}>
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
                                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-red-600 p-6 text-left align-middle shadow-xl transition-all">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-xl py-2 font-semibold text-center leading-6 text-white"
                                                >
                                                    Pengajuan Anda Ditolak !
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm font-light text-white text-justify">
                                                        Kami mohon maaf atas ketidaknyamanan ini, namun pengajuan surat Anda tidak dapat diproses pada saat ini karena berkas yang diunggah belum lengkap atau tidak sesuai dengan persyaratan yang ditetapkan.
                                                        Mohon untuk memastikan bahwa semua dokumen yang diminta telah diunggah dengan lengkap dan sesuai dengan ketentuan yang berlaku sebelum mengirimkan kembali pengajuan surat Anda.
                                                        Terima kasih atas pengertian dan kerjasamanya.
                                                    </p>
                                                    <p className='text-white text-sm py-3 font-semibold'> Hormat kami.</p>
                                                    <small className='text-white text-sm py-3 font-semibold'>[Tim Administrasi]</small>
                                                </div>
                                                <div className="mt-4">
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-950/95 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                        onClick={() => setInfo(false)}
                                                    >
                                                        Kembali
                                                    </button>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog >
                        </Transition >
                    </div >
                </div >}
        </>
    )
}

export default MainUserStatus