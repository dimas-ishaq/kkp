
import { AiFillContainer } from "react-icons/ai";
import { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { getDataLayanan } from '../utils/api'
import Cookies from "js-cookie";
import { handleValidateSurat } from '../utils/api'
import TableAdminKelahiran from '../components/TableAdminKelahiran'
import TableAdminKematian from '../components/TableAdminKematian'
import TableAdminDomisili from '../components/TableAdminDomisili'
import TableAdminSKTM from '../components/TableAdminSKTM'
import { ToastContainer, toast } from 'react-toastify';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const MainPelayanan = () => {
  const [Kelahiran, setKelahiran] = useState([]);
  const [Domisili, setDomisili] = useState([]);
  const [Kematian, setKematian] = useState([]);
  const [SKTM, setSKTM] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalDitolak, setTotalDitolak] = useState(0);
  const [totalDiterima, setTotalDiterima] = useState(0);

  const notifyError = (data) => toast.error(data, {
    theme: "colored",
    autoClose: 2000
  })
  const notifySuccess = (data) => toast.success(data, {
    theme: "colored",
    autoClose: 2000
  })

  const adminToken = Cookies.get('admintoken');
  useEffect(() => {
    const fetchData = async () => {
      const { error, total_surat, total_diterima, total_ditolak, kelahiran, kematian, domisili, sktm } = await getDataLayanan(adminToken)
      if (!error) {
        setKelahiran(kelahiran)
        setKematian(kematian)
        setDomisili(domisili)
        setSKTM(sktm)
        setTotal(total_surat)
        setTotalDiterima(total_diterima)
        setTotalDitolak(total_ditolak)
      }
    }
    fetchData()
  }, [])

  const handleValidate = async (docId, jenis) => {
    const data = {
      status: 'diterima',
      doc_id: docId,
      jenis: jenis
    };
    const { error, message } = await handleValidateSurat(adminToken, data)
    if (!error) {
      setTimeout(() => window.location.reload(), 2000)
      return notifySuccess(message)
    }
    return notifyError(message)
  };

  const handleReject = async (docId, jenis) => {
    const data = {
      status: 'ditolak',
      pesan: 'Berkas tidak lengkap! Mohon di cek dan lengkapi persyaratan',
      doc_id: docId,
      jenis: jenis
    }
    const { error } = await handleValidateSurat(adminToken, data)
    if (!error) {
      setTimeout(() => window.location.reload(), 2000)
      return notifySuccess('Berhasil menolak berkas')
    }
    return notifyError('Gagal menolak berkas')
  }

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col w-full h-full">
        <div className="grid sm:grid-flow-col md:grid-cols-3 gap-5 items-center p-5">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md p-4 flex flex-col hover:bg-sky-800">
            <h3 className="text-md text-slate-100 font-semibold text-center">Permintaan Masuk</h3>
            <AiFillContainer className="mx-auto" color="white" fontSize={24} />
            <p className="text-xl font-semibold text-slate-100 text-center">{total}</p>
          </div>
          <div className="bg-green-500 rounded-md p-4 flex flex-col hover:bg-green-600">
            <h3 className="text-md text-slate-100 font-semibold text-center">Permintaan Tervalidasi</h3>
            <FaCircleCheck className="mx-auto" color="white" fontSize={24} />
            <p className="text-xl font-semibold text-slate-100 text-center">{totalDiterima}</p>
          </div>
          <div className="bg-red-600 rounded-md p-4 flex flex-col hover:bg-red-700">
            <h3 className="text-md text-slate-100 font-semibold text-center">Permintaan Ditolak </h3>
            <MdCancel className="mx-auto" color="white" fontSize={24} />
            <p className="text-xl font-semibold text-slate-100 text-center">{totalDitolak}</p>
          </div>
        </div>
        <div className="w-full p-5 h-full">
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
                          <TableAdminKelahiran items={Kelahiran} itemsPerPage={5} handleReject={handleReject} handleValidate={handleValidate} />

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
                  <div className="flex flex-col ">
                    <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                          <TableAdminKematian items={Kematian} itemsPerPage={5} handleReject={handleReject} handleValidate={handleValidate} />
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
                          <TableAdminDomisili items={Domisili} itemsPerPage={5} handleReject={handleReject} handleValidate={handleValidate} />
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
                          <TableAdminSKTM items={SKTM} itemsPerPage={5} handleReject={handleReject} handleValidate={handleValidate} />
                          {/* <table className="min-w-full">
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
                                    <div className={`px-3 py-2.5  ${item.status === 'diterima' ? 'bg-green-600' : item.status === 'ditolak' ? 'bg-red-600' : 'bg-blue-600'}  text-white rounded-md capitalize font-semibold w-full mx-auto`}>
                                      {item.status}
                                    </div>
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                                    <a className='rounded-md bg-violet-500 px-3 py-2.5 font-semibold text-white' href={item.file_url} target='_blank'>Lihat File</a>
                                  </td>
                                  {item.status === "pending" &&
                                    <>
                                      <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                                        {SKTM && <button onClick={() => handleValidate(item._id, 'sktm')} className="rounded-md bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                          Validasi
                                        </button>}
                                      </td>
                                      <td className="text-sm text-gray-900 font-light px-2 py-3 whitespace-nowrap">
                                        <button onClick={() => handleReject(item._id)} className='rounded-md bg-red-600 px-3 py-2.5 font-semibold text-white'>Tolak</button>
                                      </td>
                                    </>
                                  }
                                </tr>
                              ))}
                            </tbody>
                          </table> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div >

    </>
  )
}

export default MainPelayanan