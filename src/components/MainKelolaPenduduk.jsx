import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoCloseOutline } from "react-icons/io5";

const MainKelolaPenduduk = () => {
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
                <div id="penduduk-table">
                    <div className="flex flex-col w-full py-5">
                        <div className="border-2 rounded-lg ">
                            <div className="flex-col">
                                <div className="flex flex-col sm:flex-row justify-between w-full p-5 items-center">
                                    <div className="flex gap-x-2 text-gray-600 px-10 py-4 sm:py-0">
                                        <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-5 sm:pr-15  rounded-lg text-sm focus:outline-none"
                                            type="search" name="search" placeholder="Search" />
                                        <button className="rounded-md bg-indigo-500 px-4">
                                            <CiSearch className="text-gray-500 hover:text-gray-700" color="white" fontSize={30} />
                                        </button>
                                    </div>

                                    <button className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={openModal}>
                                        <span className="flex items-center"><FaPlus fontSize={16} /> Tambah</span>
                                    </button>
                                </div>
                                <div className="flex py-5">
                                    <div className="flex flex-col text-center mx-auto items-center">
                                        <h1 className="text-lg font-semibold">Data Penduduk</h1>
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
                                                                Nama
                                                            </th>
                                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                Jenis Kelamin
                                                            </th>
                                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                Tempat Lahir
                                                            </th>
                                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                Tanggal Lahir
                                                            </th>
                                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                Dusun
                                                            </th>
                                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                Pekerjaan
                                                            </th>
                                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                Pendidikan Terakhir
                                                            </th>
                                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                Status Pernikahan
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="bg-gray-100 border-b">
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                Dimas Maulana Ishaq
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                Laki-laki
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                Jombang
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                10/10/2000
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                Pandanwangi
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                IT Analyst
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                Sarjana
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                Belum Menikah
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

                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-100 p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-xl text-center font-semibold leading-6 text-gray-900"
                                        >
                                            Form Input Data Penduduk
                                        </Dialog.Title>
                                        <div className="relative">
                                            <div className="absolute -right-4 -top-9 sm:-top-5 sm:right-0">
                                                <button onClick={closeModal}>
                                                    <IoCloseOutline fontSize={26} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-2 shadow-sm">
                                            <form className="w-full max-w-sm mx-auto p-5 rounded-md ">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nama</label>
                                                    <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                                        type="text" id="name" name="name" placeholder="John Doe" />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Jenis Kelamin</label>
                                                    <select name="gender" id="gender" className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:border-indigo-500">
                                                        <option value="#" disabled selected>Jenis Kelamin</option>
                                                        <option value="0">Laki-Laki</option>
                                                        <option value="1"  >Perempuan</option>
                                                    </select>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tempat-lahir">Tempat Lahir</label>
                                                    <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                                        type="text" id="tempat-lahir" name="tempat-lahir" placeholder="Jombang" />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tanggal-lahir">Tanggal Lahir</label>
                                                    <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                                        type="date" id="tanggal-lahir" name="tanggal-lahir" />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alamat">Alamat</label>
                                                    <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                                        type="text" id="alamat" name="alamat" placeholder="Pandanwangi Gg.3" />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dusun">Nama Dusun</label>
                                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                                        type="text" id="dusun" name="dusun" placeholder="Pandanwangi">
                                                        <option value="#" disabled selected>Nama Dusun</option>
                                                        <option value="pandanwangi"  >Pandanwangi</option>
                                                        <option value="beyan"  >Beyan</option>
                                                        <option value="bencal"  >Bencal</option>
                                                        <option value="butuh"  >Butuh</option>
                                                    </select>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pekerjaan">Pekerjaan</label>
                                                    <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                                        type="text" id="pekerjaan" name="pekerjaan" placeholder="Wirausaha" />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pendidikan-terakhir">Pendidikan Terakhir</label>
                                                    <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                                        type="text" id="pendidikan-terakhir" name="pendidikan-terakhir" placeholder="Sekolah / Kampus" />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status-pernikahan">Status Pernikahan</label>
                                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                                        type="text" id="status-pernikahan" name="status-pernikahan" >
                                                        <option value="#" disabled selected >Status Pernikahan</option>
                                                        <option value="1">Sudah Menikah</option>
                                                        <option value="0">Belum Menikah</option>
                                                    </select>
                                                </div>
                                                <button
                                                    className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                                                    type='submit'>Submit</button>
                                            </form>
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

export default MainKelolaPenduduk