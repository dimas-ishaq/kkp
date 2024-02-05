import React from 'react'
import { useState } from 'react'
import { Tab } from '@headlessui/react'



const MainUserStatus = () => {
    let [categories] = useState({
        Domisili: [
            {
                id: 1,
                nama: 'Dimas Maulana Ishaq',
                tempat_lahir: 'Jombang',
                tgl_lahir: '10/10/2000',
                jenis_kelamin: 'Laki-Laki',
                pekerjaan: 'IT Analyst',
                alamat: 'Pandanwangi',
                file_persyaratan: 'dokumen',
                validasi: 'valid'
            },
            {
                id: 2,
                nama: 'Bambang Pamungkas',
                tempat_lahir: 'Jombang',
                tgl_lahir: '10/10/2000',
                jenis_kelamin: 'Laki-Laki',
                pekerjaan: 'IT Analyst',
                alamat: 'Pandanwangi',
                file_persyaratan: 'dokumen',
                validasi: 'valid'
            },
        ],
        Kelahiran: [
            {
                id: 1,
                nama: 'Elvis Presley',
                tempat_lahir: 'Jombang',
                tgl_lahir: '10/10/2000',
                jenis_kelamin: 'Laki-Laki',
                pekerjaan: 'IT Analyst',
                alamat: 'Pandanwangi',
                file_persyaratan: 'dokumen',
                validasi: 'valid'
            },
            {
                id: 2,
                nama: 'Dominic Toretto',
                tempat_lahir: 'Jombang',
                tgl_lahir: '10/10/2000',
                jenis_kelamin: 'Laki-Laki',
                pekerjaan: 'IT Analyst',
                alamat: 'Pandanwangi',
                file_persyaratan: 'dokumen',
                validasi: 'valid'
            },
        ],
        Kematian: [
            {
                id: 1,
                nama: 'Dimas Maulana Ishaq',
                tempat_lahir: 'Jombang',
                tgl_lahir: '10/10/2000',
                jenis_kelamin: 'Laki-Laki',
                pekerjaan: 'IT Analyst',
                alamat: 'Pandanwangi',
                file_persyaratan: 'dokumen',
                validasi: 'valid'
            },
            {
                id: 2,
                nama: 'Dimas Maulana Ishaq',
                tempat_lahir: 'Jombang',
                tgl_lahir: '10/10/2000',
                jenis_kelamin: 'Laki-Laki',
                pekerjaan: 'IT Analyst',
                alamat: 'Pandanwangi',
                file_persyaratan: 'dokumen',
                validasi: 'valid'
            },
        ],
        SKTM: [
            {
                id: 1,
                nama: 'Dimas Maulana Ishaq',
                tempat_lahir: 'Jombang',
                tgl_lahir: '10/10/2000',
                jenis_kelamin: 'Laki-Laki',
                pekerjaan: 'IT Analyst',
                alamat: 'Pandanwangi',
                file_persyaratan: 'dokumen',
                validasi: 'valid'
            },
            {
                id: 2,
                nama: 'Dimas Maulana Ishaq',
                tempat_lahir: 'Jombang',
                tgl_lahir: '10/10/2000',
                jenis_kelamin: 'Laki-Laki',
                pekerjaan: 'IT Analyst',
                alamat: 'Pandanwangi',
                file_persyaratan: 'dokumen',
                validasi: 'valid'
            },
        ],
    })

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <>
            <div className="flex-col w-full h-full">
                <div className="w-full p-5 h-full bg-sky-600 flex flex-col">
                    <div className="mx-auto py-10 md:w-9/12">
                        <h3 className="text-2xl md:text-3xl text-center font-semibold text-slate-100">Status Permohonan</h3>
                        <p className="text-sm text-center text-slate-50 py-2 ">Silahkan cek status permohonan administrasi anda, Apabila sudah diproses, anda bisa menunggu maksimal 24jam dan surat bisa diunduh untuk keperluan administrasi anda. Terimakasih telah menggunakan layanan digital sensus dan administrasi.</p>
                    </div>

                    <div className="w-full h-full">
                        <Tab.Group>
                            <div className="w-full max-w-md mx-auto  sm:px-0">
                                <Tab.List className="flex space-x-1 rounded-xl bg-blue-800 p-1">
                                    {Object.keys(categories).map((category) => (
                                        <Tab
                                            key={category}
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
                                            Surat {category}
                                        </Tab>
                                    ))}
                                </Tab.List>
                            </div>
                            <Tab.Panels className="mt-2">
                                {Object.values(categories).map((posts, idx) => (
                                    <Tab.Panel
                                        key={idx}
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
                                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                        No
                                                                    </th>
                                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                        Nama Pemohon
                                                                    </th>
                                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                        Tempat, Tanggal Lahir
                                                                    </th>
                                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                        Jenis Kelamin
                                                                    </th>
                                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                        Pekerjaan
                                                                    </th>
                                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                        Alamat
                                                                    </th>
                                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                        Status
                                                                    </th>
                                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                        File Persyaratan
                                                                    </th>
                                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                        Aksi
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {posts.map((post) => (
                                                                    <tr key={post.id} className="bg-gray-100 border-b">
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.id}</td>
                                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                            {post.nama}
                                                                        </td>
                                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                            {post.tempat_lahir}, {post.tgl_lahir}
                                                                        </td>
                                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                            {post.jenis_kelamin}
                                                                        </td>
                                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                            {post.pekerjaan}
                                                                        </td>
                                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                            {post.alamat}
                                                                        </td>
                                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                            Diproses
                                                                        </td>
                                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                            {post.file_persyaratan}
                                                                        </td>
                                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                            <div className="flex gap-x-3 p-5">
                                                                                <button className="rounded-md bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                                                                    Batalkan
                                                                                </button>
                                                                            </div>
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
                                ))}
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0284C7" fillOpacity="1" d="M0,256L48,234.7C96,213,192,171,288,144C384,117,480,107,576,138.7C672,171,768,245,864,229.3C960,213,1056,107,1152,90.7C1248,75,1344,149,1392,186.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
            </div>
        </>
    )
}

export default MainUserStatus