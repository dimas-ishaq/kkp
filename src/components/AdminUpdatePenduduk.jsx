import React from 'react'
import { useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from 'react';
import { IoCloseOutline } from "react-icons/io5";

const AdminUpdatePenduduk = ({ isEdit, handleEditSubmit, pendidikan, handleCloseEdit, detailEdit }) => {
  const { register: updatePenduduk, handleSubmit: handleSubmitEditPenduduk, formState: formStateEditPenduduk } = useForm()
  return (
    <div>
      <Transition appear show={isEdit} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => handleCloseEdit()
        }>
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
                    Form Update Data Penduduk
                  </Dialog.Title>
                  <div className="relative">
                    <div className="absolute -right-4 -top-9 sm:-top-5 sm:right-0">
                      <button onClick={() => handleCloseEdit()}>
                        <IoCloseOutline fontSize={26} />
                      </button>
                    </div>
                  </div>

                  <div div className="mt-2 shadow-sm">
                    <form onSubmit={handleSubmitEditPenduduk(handleEditSubmit)} className="w-full max-w-sm mx-auto p-5 rounded-md " >
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nama</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                          type="text" {...updatePenduduk('nama', { required: 'Nama harus di isi' })} id="nama" name="nama" placeholder="John Doe" defaultValue={detailEdit?.nama || ''} />
                        <p className='text-xs text-red-600'>{formStateEditPenduduk.errors.nama?.message}</p>
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jenis_kelamin">Jenis Kelamin</label>
                        <select name="jenis_kelamin" {...updatePenduduk('jenis_kelamin', { required: 'Jenis Kelamin harus di pilih' })} id="jenis_kelamin" className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:border-indigo-500" defaultValue={detailEdit?.jenis_kelamin}>
                          <option value="#" disabled selected>Jenis Kelamin</option>
                          <option value="Laki-Laki">Laki-Laki</option>
                          <option value="Perempuan"  >Perempuan</option>
                        </select>
                        <p className='text-xs text-red-600'>{formStateEditPenduduk.errors.gender?.message}</p>
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tempat_lahir">Tempat Lahir</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                          type="text" {...updatePenduduk('tempat_lahir', { required: 'Tempat lahir harus di isi' })} id="tempat_lahir" name="tempat_lahir" placeholder="Jombang" defaultValue={detailEdit?.tempat_lahir} />
                        <p className='text-xs text-red-600'>{formStateEditPenduduk.errors.tempat_lahir?.message}</p>
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tanggal_lahir">Tanggal Lahir</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                          type="date" id="tanggal_lahir" name="tanggal_lahir" {...updatePenduduk('tanggal_lahir', { required: 'Tanggal lahir harus di isi' })} defaultValue={detailEdit?.tanggal_lahir} />
                        <p className='text-xs text-red-600'>{formStateEditPenduduk.errors.tanggal_lahir?.message}</p>
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alamat">Alamat</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                          type="text"{...updatePenduduk('alamat', { required: 'Alamat harus di isi' })} id="alamat" name="alamat" placeholder="Pandanwangi Gg.3" defaultValue={detailEdit?.alamat} />
                        <p className='text-xs text-red-600'>{formStateEditPenduduk.errors.alamat?.message}</p>
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dusun">Nama Dusun</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                          type="text" id="dusun" name="dusun" {...updatePenduduk('dusun', { required: 'Nama dusun harus di isi' })} placeholder="Pandanwangi" defaultValue={detailEdit?.dusun}>
                          <option value="#" disabled selected>Nama Dusun</option>
                          <option value="Pandanwangi"  >Pandanwangi</option>
                          <option value="Beyan"  >Beyan</option>
                          <option value="Bencal"  >Bencal</option>
                          <option value="Butuh"  >Butuh</option>
                        </select>
                        <p className='text-xs text-red-600'>{formStateEditPenduduk.errors.dusun?.message}</p>
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pekerjaan">Pekerjaan</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                          type="text" id="pekerjaan" name="pekerjaan" {...updatePenduduk('pekerjaan', { required: 'pekerjaan harus di isi' })} placeholder="Wirausaha" defaultValue={detailEdit?.pekerjaan} />
                        <p className='text-xs text-red-600'>{formStateEditPenduduk.errors.pekerjaan?.message}</p>
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pendidikan-terakhir">Pendidikan Terakhir</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                          type="text" id="pendidikan_terakhir" name="pendidikan_terakhir" {...updatePenduduk('pendidikan_terakhir', { required: 'Pendidikan harus di isi' })} placeholder="Sekolah / Kampus" defaultValue={detailEdit?.pendidikan_terakhir} >
                          <option disabled selected>Pendidikan Terakhir</option>
                          {pendidikan.map((item) => (
                            <option key={item.key} value={item.pendidikan}>{item.pendidikan}</option>
                          ))}
                        </select>
                        <p className='text-xs text-red-600'>{formStateEditPenduduk.errors.pendidikan_terakhir?.message}</p>
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status-pernikahan">Status Pernikahan</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                          type="text" id="status_pernikahan" name="status_pernikahan"{...updatePenduduk('status_pernikahan', { required: 'Status pernikahan harus di isi' })} defaultValue={detailEdit?.status_pernikahan}>
                          <option value="#" disabled selected >Status Pernikahan</option>
                          <option value="Sudah Menikah">Sudah Menikah</option>
                          <option value="Belum Menikah">Belum Menikah</option>
                        </select>
                      </div>
                      <p className='text-xs text-red-600'>{formStateEditPenduduk.errors.status_pernikahan?.message}</p>
                      <button
                        className="w-full bg-yellow-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                        type='submit'>Update</button>
                    </form>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default AdminUpdatePenduduk