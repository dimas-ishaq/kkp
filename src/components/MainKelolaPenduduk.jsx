import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoCloseOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { handlerSubmitPenduduk, getDataPenduduk, handleEditDataPenduduk, handleDeleteDataPenduduk } from "../utils/api";
import { ToastContainer, toast } from 'react-toastify';
import Cookies from "js-cookie";
import { ColorRing } from 'react-loader-spinner'
import TableKelolaPenduduk from "./TableKelolaPenduduk";
import AdminUpdatePenduduk from './AdminUpdatePenduduk'

const MainKelolaPenduduk = () => {
    const { register: registerPenduduk, formState: formStatePenduduk, handleSubmit: handleSubmitPenduduk } = useForm();


    const adminToken = Cookies.get('admintoken')
    const [dataPenduduk, setDataPenduduk] = useState(null)
    const [loading, setLoading] = useState(true)
    const [keyword, setKeyword] = useState('')
    const [filterData, setFilterData] = useState([])
    const [detailEdit, setDetailEdit] = useState(null)
    const [isEdit, setIsEdit] = useState(false)

    const notifyError = (data) => toast.error(data, {
        theme: "colored",
        autoClose: 2000
    })
    const notifySuccess = (data) => toast.success(data, {
        theme: "colored",
        autoClose: 2000
    })

    const handleSubmitForm = async (data) => {
        const response = await handlerSubmitPenduduk(data, adminToken);
        if (response !== undefined) {
            return notifySuccess(response.message)
        }
        return notifyError('Error, hubungi admin')
    }

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getDataPenduduk(adminToken)
            if (data !== null) {
                setDataPenduduk(data)
                setFilterData(data)
                setLoading(false)
            }
        }
        fetchData()
    }, [keyword, loading])

    const handleSearch = () => {
        if (keyword.length > 0) {
            const filteredData = dataPenduduk.filter((item) => item.nama.toLowerCase().includes(keyword.toLowerCase()))
            setFilterData(filteredData)
            if (filteredData.length === 0) {
                notifyError('Data tidak ditemukan')
                return setFilterData(dataPenduduk)
            }
        }
    }



    const handleEdit = (id) => {
        const dataTarget = dataPenduduk.find(item => item._id === id);
        console.log(dataTarget)
        setIsEdit(true)
        setDetailEdit(dataTarget)

    }
    const handleCloseEdit = () => {
        setIsEdit(false)
        setDetailEdit(null)
    }
    const handleEditSubmit = async (data) => {
        const updateData = { ...data, _id: detailEdit._id }
        const response = await handleEditDataPenduduk(adminToken, updateData)
        if (!response.error) {
            setLoading(true)
            return notifySuccess(response.message)
        }
        return notifySuccess(response.message)
    }

    const handleDelete = async (id) => {
        const confirmProceed = window.confirm("Apakah Anda yakin ingin menghapus data ini?")
        if (confirmProceed) {
            const response = await handleDeleteDataPenduduk(adminToken, id)
            if (!response.error) {
                setLoading(true)
                return notifySuccess(response.message)
            }
            return notifyError(response.message)
        }
    }

    const [isOpen, setIsOpen] = useState(false)
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const pendidikan = [
        { key: 0, pendidikan: 'Tidak Bersekolah' },
        { key: 1, pendidikan: 'SD/MI' },
        { key: 2, pendidikan: 'SMP/SLTP' },
        { key: 3, pendidikan: 'SLTA/SMA/SMK/MA' },
        { key: 4, pendidikan: 'Sarjana S1' }
    ]

    return (
        <>
            <ToastContainer />
            <div className="flex flex-col w-full h-full">
                <div id="penduduk-table">
                    <div className="flex flex-col w-full py-5">
                        <div className="border-2 rounded-lg ">
                            <div className="flex-col">
                                <div className="flex flex-col sm:flex-row justify-between w-full p-5 items-center">
                                    <div className="flex gap-x-2 text-gray-600 px-10 py-4 sm:py-0">
                                        <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-5 sm:pr-15  rounded-lg text-sm focus:outline-none"
                                            type="search" name="search" placeholder="Search" onChange={(e) => setKeyword(e.target.value)} />
                                        <button className="rounded-md bg-indigo-500 px-4" onClick={() => handleSearch()}>
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
                                                {loading ? <div className="w-full h-full justify-center items-center flex p-32  ">
                                                    <ColorRing
                                                        visible={true}
                                                        height="80"
                                                        width="80"
                                                        ariaLabel="color-ring-loading"
                                                        wrapperStyle={{}}
                                                        wrapperClass="my-auto"
                                                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                                    /></div> : <div><TableKelolaPenduduk items={filterData} itemsPerPage={5} handleEdit={handleEdit} handleDelete={handleDelete} /></div>}
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
                                            <form onSubmit={handleSubmitPenduduk(handleSubmitForm)} className="w-full max-w-sm mx-auto p-5 rounded-md " >
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nama</label>
                                                    <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                                        type="text" {...registerPenduduk('nama', { required: 'Nama harus di isi' })} id="nama" name="nama" placeholder="John Doe" />
                                                    <p className='text-xs text-red-600'>{formStatePenduduk.errors.nama?.message}</p>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jenis_kelamin">Jenis Kelamin</label>
                                                    <select name="jenis_kelamin" {...registerPenduduk('jenis_kelamin', { required: 'Jenis Kelamin harus di pilih' })} id="jenis_kelamin" className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:border-indigo-500">
                                                        <option value="#" disabled selected>Jenis Kelamin</option>
                                                        <option value="Laki-Laki">Laki-Laki</option>
                                                        <option value="Perempuan"  >Perempuan</option>
                                                    </select>
                                                    <p className='text-xs text-red-600'>{formStatePenduduk.errors.gender?.message}</p>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tempat_lahir">Tempat Lahir</label>
                                                    <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                                        type="text" {...registerPenduduk('tempat_lahir', { required: 'Tempat lahir harus di isi' })} id="tempat_lahir" name="tempat_lahir" placeholder="Jombang" />
                                                    <p className='text-xs text-red-600'>{formStatePenduduk.errors.tempat_lahir?.message}</p>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tanggal_lahir">Tanggal Lahir</label>
                                                    <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                                        type="date" id="tanggal_lahir" name="tanggal_lahir" {...registerPenduduk('tanggal_lahir', { required: 'Tanggal lahir harus di isi' })} />
                                                    <p className='text-xs text-red-600'>{formStatePenduduk.errors.tanggal_lahir?.message}</p>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alamat">Alamat</label>
                                                    <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                                        type="text"{...registerPenduduk('alamat', { required: 'Alamat harus di isi' })} id="alamat" name="alamat" placeholder="Pandanwangi Gg.3" />
                                                    <p className='text-xs text-red-600'>{formStatePenduduk.errors.alamat?.message}</p>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dusun">Nama Dusun</label>
                                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                                        type="text" id="dusun" name="dusun" {...registerPenduduk('dusun', { required: 'Nama dusun harus di isi' })} placeholder="Pandanwangi">
                                                        <option value="#" disabled selected>Nama Dusun</option>
                                                        <option value="Pandanwangi"  >Pandanwangi</option>
                                                        <option value="Beyan"  >Beyan</option>
                                                        <option value="Bencal"  >Bencal</option>
                                                        <option value="Butuh"  >Butuh</option>
                                                    </select>
                                                    <p className='text-xs text-red-600'>{formStatePenduduk.errors.dusun?.message}</p>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pekerjaan">Pekerjaan</label>
                                                    <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                                        type="text" id="pekerjaan" name="pekerjaan" {...registerPenduduk('pekerjaan', { required: 'pekerjaan harus di isi' })} placeholder="Wirausaha" />
                                                    <p className='text-xs text-red-600'>{formStatePenduduk.errors.pekerjaan?.message}</p>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pendidikan_terakhir">Pendidikan Terakhir</label>
                                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                                        type="text" id="pendidikan_terakhir" name="pendidikan_terakhir" {...registerPenduduk('pendidikan_terakhir', { required: 'Pendidikan harus di isi' })} placeholder="Sekolah / Kampus" >
                                                        <option disabled selected>Pendidikan Terakhir</option>
                                                        {pendidikan.map((item) => (
                                                            <option key={item.key} value={item.pendidikan}>{item.pendidikan}</option>
                                                        ))}
                                                    </select>
                                                    <p className='text-xs text-red-600'>{formStatePenduduk.errors.pendidikan_terakhir?.message}</p>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status-pernikahan">Status Pernikahan</label>
                                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                                        type="text" id="status_pernikahan" name="status_pernikahan"{...registerPenduduk('status_pernikahan', { required: 'Status pernikahan harus di isi' })} >
                                                        <option value="#" disabled selected >Status Pernikahan</option>
                                                        <option value="Sudah Menikah">Sudah Menikah</option>
                                                        <option value="Belum Menikah">Belum Menikah</option>
                                                    </select>
                                                </div>
                                                <p className='text-xs text-red-600'>{formStatePenduduk.errors.status_pernikahan?.message}</p>
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
                {detailEdit && <AdminUpdatePenduduk isEdit={isEdit} detailEdit={detailEdit} handleEditSubmit={handleEditSubmit} pendidikan={pendidikan} handleCloseEdit={handleCloseEdit} />}

            </div >
        </>
    )
}

export default MainKelolaPenduduk