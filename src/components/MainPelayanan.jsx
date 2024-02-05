
import { AiFillContainer } from "react-icons/ai";
import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const MainPelayanan = () => {
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

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="grid sm:grid-flow-col md:grid-cols-3 gap-5 items-center p-5">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md p-4 flex flex-col hover:bg-sky-800">
            <h3 className="text-md text-slate-100 font-semibold text-center">Permintaan Masuk</h3>
            <AiFillContainer className="mx-auto" color="white" fontSize={24} />
            <p className="text-xl font-semibold text-slate-100 text-center">1582</p>
          </div>
          <div className="bg-green-500 rounded-md p-4 flex flex-col hover:bg-green-600">
            <h3 className="text-md text-slate-100 font-semibold text-center">Permintaan Tervalidasi</h3>
            <FaCircleCheck className="mx-auto" color="white" fontSize={24} />
            <p className="text-xl font-semibold text-slate-100 text-center">1582</p>
          </div>
          <div className="bg-red-600 rounded-md p-4 flex flex-col hover:bg-red-700">
            <h3 className="text-md text-slate-100 font-semibold text-center">Permintaan Ditolak </h3>
            <MdCancel className="mx-auto" color="white" fontSize={24} />
            <p className="text-xl font-semibold text-slate-100 text-center">1582</p>
          </div>
        </div>
        <div className="w-full p-5 h-full">
          <div className="w-full">
            <Tab.Group>
              <div className="w-full max-w-md ms-auto sm:px-0">
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
                                    File Persyaratan
                                  </th>
                                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Validasi
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
                                      {post.file_persyaratan}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                      <div className="flex gap-x-3 p-5">
                                        <button className="rounded-md bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                                          Validasi
                                        </button>
                                        <button className="rounded-md bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                          Tolak
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
      </div >

    </>
  )
}

export default MainPelayanan