import { React, Fragment, useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { Transition, Dialog } from '@headlessui/react';

const MainUserStatus = ({ data }) => {

    const notifyError = (data) => toast.error(data, {
        theme: "colored",
        autoClose: 1000
    })
    const notifySuccess = (data) => toast.success(data, {
        theme: "colored",
        autoClose: 1000
    })
    const { Kelahiran, Kematian, Domisili, SKTM, user_info } = data
    const api = 'https://db.dimsomnia.cloud/api/user/status'

    const [isOpen, setIsOpen] = useState(false)
    const [istarget, setTarget] = useState(null)
    const handleTarget = (item, jenis) => {
        setIsOpen(true)
        setTarget({ item, jenis })
    }
    const handleDelete = async () => {
        const item = istarget.item
        const jenis = istarget.jenis
        setIsOpen(false)
        const usercookie = localStorage.getItem("USER_COOKIE")
        axios.defaults.headers.common['Authorization'] = `Bearer ${usercookie}`;
        console.log(item)
        await axios
            .delete(api, {
                params: {
                    item_id: item,
                    jenis: jenis
                }
            })
            .then((response) => {
                notifySuccess("Permohonan berhasil dibatalkan")
                setTimeout(() => { window.location.reload() }, 2500)
                console.log(response)
                setIsOpen(false)
            }).catch((error) => {
                notifyError("Erorr terjadi, hub admin")
                console.log(error)
                setIsOpen(false)
            })
    }







    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <>
            <ToastContainer />
            <div className="flex-col w-full h-full">
                <div className="w-full p-5 h-full bg-sky-600 flex flex-col">
                    <div className="mx-auto py-10 md:w-9/12">
                        <h3 className="text-2xl md:text-3xl text-center font-semibold text-slate-100">Status Permohonan</h3>
                        <p className="text-sm text-center text-slate-50 py-2 ">Silahkan cek status permohonan administrasi anda, Apabila sudah diproses, anda bisa menunggu maksimal 24jam dan surat bisa diunduh untuk keperluan administrasi anda. Terimakasih telah menggunakan layanan digital sensus dan administrasi.</p>
                    </div>
                    <div className="w-full h-full">
                        <Tab.Group>
                            <div className="w-full max-w-md mx-auto  sm:px-0">
                                <Tab.List className="flex space-x-1 rounded-xl bg-blue-950 p-1">
                                    <Tab
                                        className={({ selected }) =>
                                            classNames(
                                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
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
                                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
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
                                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
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
                                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                selected
                                                    ? 'bg-white text-blue-700 shadow'
                                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                            )
                                        }
                                    >
                                        Surat SKTM
                                    </Tab>
                                </Tab.List>
                            </div>
                            {/* SURAT KELAHIRAN */}
                            <Tab.Panels className="mt-2">
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
                                                    <table className="min-w-full">
                                                        <thead className="bg-white border-b">
                                                            <tr>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    No
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Nama Anak
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Tempat, Tanggal Lahir
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Jenis Kelamin
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Nama Ayah
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Nama Ibu
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Anak Ke
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Status
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    File Persyaratan
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Aksi
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Kelahiran && Kelahiran.map((item, index) => (
                                                                <tr key={index} className="bg-gray-100 border-b">
                                                                    <td className="px-2 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap capitalize">
                                                                        {item.nama}
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap capitalize">
                                                                        {item.tempat_lahir}  {item.tanggal_lahir}
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap capitalize">
                                                                        {item.jenis_kelamin}
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap capitalize">
                                                                        {item.nama_ayah}
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap capitalize">
                                                                        {item.nama_ibu}
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap capitalize">
                                                                        {item.anak_ke}
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                                                                        <div className="px-3 py-2.5 bg-blue-500 text-white rounded-md capitalize font-semibold w-full mx-auto">
                                                                            {item.status}
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3   whitespace-nowrap">
                                                                        <a className='rounded-md bg-violet-500 px-3 py-2.5 font-semibold text-white' href={item.file_url} target='_blank'>Lihat File</a>
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                                                                        {Kelahiran && <button onClick={() => handleTarget(item._id, 'kelahiran')} className="rounded-md bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                                                            Batalkan
                                                                        </button>}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
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
                                                    <table className="min-w-full">
                                                        <thead className="bg-white border-b">
                                                            <tr>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    No
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Almarhum/Almarhumah
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Tempat, Tanggal Lahir
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Jenis Kelamin
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Agama
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Tempat Meninggal
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Tanggal Meninggal
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Status
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    File Persyaratan
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Aksi
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Kematian && Kematian.map((item, index) => (
                                                                <tr key={index} className="bg-gray-100 border-b" >
                                                                    <td className=" px-2 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-center">{index + 1}</td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3   whitespace-nowrap">
                                                                        {item.nama}
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3   whitespace-nowrap">
                                                                        {item.tempat_lahir} ,{item.tanggal_lahir}
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3   whitespace-nowrap">
                                                                        {item.jenis_kelamin}
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3   whitespace-nowrap">
                                                                        {item.agama}
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3   whitespace-nowrap">
                                                                        {item.tempat_meninggal}
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3   whitespace-nowrap">
                                                                        {item.tanggal_meninggal}
                                                                    </td>
                                                                    <td className='text-sm text-gray-900 font-light px-2 py-3   whitespace-nowrap'>
                                                                        <div className="px-3 py-2.5 bg-blue-500 text-white rounded-md capitalize font-semibold w-full mx-auto">
                                                                            {item.status}
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3   whitespace-nowrap">
                                                                        <a className='rounded-md bg-violet-500 px-3 py-2.5 font-semibold text-white' href={item.file_url} target='_blank'>Lihat File</a>
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3   whitespace-nowrap">
                                                                        {Kematian && <button onClick={() => handleTarget(item._id, 'kematian')} className="rounded-md bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                                                            Batalkan
                                                                        </button>}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
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
                                    <div className="flex flex-col">
                                        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                                            <div className="py-2 inline-block min-w-full sm: lg:px-8">
                                                <div className="overflow-hidden">
                                                    <table className="min-w-full">
                                                        <thead className="bg-white border-b">
                                                            <tr>
                                                                <th scope="col" className="text-sm font-medium text-gray-900  px-2 py-3 text-left">
                                                                    No
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Nama Lengkap
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Tempat, Tanggal Lahir
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Jenis Kelamin
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Pekerjaan
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Alamat
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Status
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    File Persyaratan
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Aksi
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Domisili && Domisili.map((item, index) => (

                                                                <tr key={index} className="bg-gray-100 border-b">
                                                                    <td className="px-2 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap capitalize">
                                                                        {item.nama}
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap capitalize">
                                                                        {item.tempat_lahir}  {item.tanggal_lahir}
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap capitalize">
                                                                        {item.jenis_kelamin}
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap capitalize">
                                                                        {item.pekerjaan}
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap capitalize">
                                                                        {item.alamat}
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                                                                        <div className="px-3 py-2.5 bg-blue-500 text-white rounded-md capitalize font-semibold w-full mx-auto">
                                                                            {item.status}
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                                                                        <a className='rounded-md bg-violet-500 px-3 py-2.5 font-semibold text-white' href={item.file_url} target='_blank'>Lihat File</a>
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                                                                        {Domisili && <button onClick={() => handleTarget(item._id, 'domisili')} className="rounded-md bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                                                            Batalkan
                                                                        </button>}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
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
                                                    <table className="min-w-full">
                                                        <thead className="bg-white border-b">
                                                            <tr>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3  text-left">
                                                                    No
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3  text-left">
                                                                    Nama Pemohon
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3  text-left">
                                                                    Tempat, Tanggal Lahir
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Jenis Kelamin
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3  text-left">
                                                                    Pekerjaan
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900  px-2 py-3 text-left">
                                                                    Alamat
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Status
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    File Persyaratan
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-3 text-left">
                                                                    Aksi
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {SKTM && SKTM.map((item, index) => (
                                                                <tr key={index} className="bg-gray-100 border-b">
                                                                    <td className="px-2 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                                                                        {item.nama}
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                                                                        {item.tempat_lahir}  {item.tanggal_lahir}
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                                                                        {item.jenis_kelamin}
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                                                                        {item.pekerjaan}
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                                                                        {item.alamat}
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                                                                        <div className="px-3 py-2.5 bg-blue-500 text-white rounded-md capitalize font-semibold w-full mx-auto">
                                                                            {item.status}
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                                                                        <a className='rounded-md bg-violet-500 px-3 py-2.5 font-semibold text-white' href={item.file_url} target='_blank'>Lihat File</a>
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                                                                        {SKTM && <button onClick={() => handleTarget(item._id, 'sktm')} className="rounded-md bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                                                            Batalkan
                                                                        </button>}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0284C7" fillOpacity="1" d="M0,256L48,234.7C96,213,192,171,288,144C384,117,480,107,576,138.7C672,171,768,245,864,229.3C960,213,1056,107,1152,90.7C1248,75,1344,149,1392,186.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
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
            </div >
        </>
    )
}

export default MainUserStatus