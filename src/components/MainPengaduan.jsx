import { CiSearch } from "react-icons/ci";
import { FaCircleCheck } from "react-icons/fa6";
import { MdPending } from "react-icons/md";
import { AiFillContainer } from "react-icons/ai";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const MainPengaduan = () => {
    const [isOpen, setIsOpen] = useState(false)
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    return (
        <>
            <div className="flex flex-col w-full h-full">
                <div className="grid sm:grid-flow-col md:grid-cols-3 gap-5 items-center p-5">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md p-4 flex flex-col hover:bg-sky-800">
                        <h3 className="text-md text-slate-100 font-semibold text-center">Pengaduan Masuk</h3>
                        <AiFillContainer className="mx-auto" color="white" fontSize={24} />
                        <p className="text-xl font-semibold text-slate-100 text-center">1582</p>
                    </div>
                    <div className="bg-green-500 rounded-md p-4 flex flex-col hover:bg-green-600">
                        <h3 className="text-md text-slate-100 font-semibold text-center">Pengaduan Sukses</h3>
                        <FaCircleCheck className="mx-auto" color="white" fontSize={24} />
                        <p className="text-xl font-semibold text-slate-100 text-center">1582</p>
                    </div>
                    <div className="bg-yellow-600 rounded-md p-4 flex flex-col hover:bg-yellow-700">
                        <h3 className="text-md text-slate-100 font-semibold text-center">Pengaduan Pending </h3>
                        <MdPending className="mx-auto" color="white" fontSize={24} />
                        <p className="text-xl font-semibold text-slate-100 text-center">1582</p>
                    </div>
                </div>
                <div id="penduduk-table">
                    <div className="flex flex-col w-full py-5">
                        <div className="border-2 rounded-lg ">
                            <div className="flex-col">
                                <div className="flex flex-col sm:flex-row justify-between w-full p-5 items-center">
                                    <div className="flex gap-x-2 text-gray-600 px-10 py-4 sm:py-0">
                                        <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-5 sm:pr-15  rounded-lg text-sm focus:outline-none"
                                            type="search" name="search" placeholder="Search" />
                                        <button className="rounded-md bg-indigo-500 px-4 hover:border-1 hover:bg-indigo-600">
                                            <CiSearch className="text-gray-500 hover:text-gray-700" fontSize={30} color="white" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex py-5">
                                    <div className="flex flex-col text-center mx-auto items-center">
                                        <h1 className="text-lg font-semibold">Data Pengaduan</h1>
                                        <p className="text-sm font-light text-slate-600">A list of all the users in your account including their name, title, email and role.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                            <div className="overflow-hidden">
                                                <table className="min-w-full">
                                                    <thead className="bg-white border-b">
                                                        <tr>
                                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                No
                                                            </th>
                                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                Tanggal
                                                            </th>
                                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                Nama
                                                            </th>
                                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                Status
                                                            </th>
                                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                Bukti Pengaduan
                                                            </th>
                                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                Aksi
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="bg-gray-100 border-b">
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                27/01/2024
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                Dimas Maulana Ishaq
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                Pending
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                <button className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                                                                    Lihat
                                                                </button>
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                <div className="flex gap-x-2">
                                                                    <button className="rounded-md bg-yellow-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600" onClick={openModal}>
                                                                        Detail
                                                                    </button>
                                                                    <button className="rounded-md bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                                                        Hapus
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
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

                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-200 p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-xl text-center font-semibold leading-6 text-gray-900"
                                        >
                                            Detail Data
                                        </Dialog.Title>
                                        <div className="relative">
                                            <div className="absolute -right-4 -top-9 sm:-top-5 sm:right-0">
                                                <button onClick={closeModal}>
                                                    <IoCloseOutline fontSize={26} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-2 shadow-sm flex flex-col">
                                            <div className="overflow-x-auto m:mx-0.5 lg:mx-0.5">
                                                <div className="py-2 inline-block min-w-full">
                                                    <div className="overflow-hidden">
                                                        <table className="min-w-full">
                                                            <tbody>
                                                                <tr>
                                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left ">
                                                                        ID
                                                                    </th>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray">: JAN270124</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                        Tanggal
                                                                    </th>
                                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                        : 28/01/2024
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                        Nama
                                                                    </th>
                                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                        : Dimas Maulana Ishaq
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                        Isi
                                                                    </th>
                                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                        <textarea className="border-2" name="isi" id="isi" cols="25 md:15" rows="5" disabled value='Dompet ku kritis kena kangker'></textarea>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                        Status
                                                                    </th>
                                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                        : Pending
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                        Ubah Status
                                                                    </th>
                                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                        <input type="checkbox" name="status" id="succes" className="text-md" /> Pengaduan Diterima<br />
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                    </div>
                                                </div>
                                            </div>
                                            <button className="rounded-md bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
                                                Ubah Status Pengaduan
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    )
}

export default MainPengaduan