import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { handleFormPengaduan } from '../utils/api';
import Cookies from 'js-cookie';

const UserPengaduanInput = ({ onInfo }) => {
  const [data, setData] = useState({
    nama: '',
    pesan: '',
    tanggal: '',
  })

  const [onSave, setSave] = useState(false)
  const [file, setFile] = useState(null)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const token = Cookies.get('usertoken')
  const handlePengaduan = async (event) => {
    if (!data.nama || !data.tanggal || !data.pesan) {
      return onInfo(true, true)
    }
    const formData = new FormData
    formData.append('data', JSON.stringify(data))
    if (file) {
      formData.append('file', file)
    }
    const error = await handleFormPengaduan(formData, token)
    if (!error) {

      onInfo(false)
      return
    }
    setSave(false)
    return onInfo(true)
  }
  return (
    <>
      <form onSubmit={handleSubmit(handlePengaduan)} className="flex flex-col w-full h-full p-5 gap-y-2 items-center ">
        <div className="flex flex-col gap-x-2 gap-y-1 w-full">
          <label htmlFor="nama" className='text-slate-50 font-light'>Nama Lengkap</label>
          <input {...register("nama", { required: 'Nama harus diisi', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} type="text" className='w-full border-2 px-auto rounded-md py-1.5 px-2' id="nama" placeholder='Isi Nama Lengkap Anda' />
          <p className='text-xs text-yellow-400'>{errors.nama?.message}</p>
        </div>
        <div className="flex flex-col gap-x-2 gap-y-1 w-full">
          <label htmlFor="pesan" className=' text-slate-50 font-light'>Pesan Pengaduan</label>
          <textarea {...register("pesan", { required: 'Pesan pengaduan harus di isi', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} type="text" className='w-full border-2 px-auto rounded-md py-1.5 px-2' id="isi" cols={20} rows={5} placeholder='Isi Pesan Pengaduan Anda' />
          <p className='text-xs text-yellow-400'>{errors.pesan?.message}</p>
        </div>
        <div className="flex flex-col gap-x-2 gap-y-1 w-full">
          <label htmlFor="tanggal" className=' text-slate-50 font-light'>Tanggal Kejadian</label>
          <input {...register("tanggal", { required: 'Tanggal harus dipilih', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} type="date" className='w-full border-2 px-auto rounded-md py-1.5 px-2' id="tanggal" placeholder='DD/MM/YY' />
          <p className='text-xs text-yellow-400'>{errors.tanggal?.message}</p>
        </div>
        <div className="flex flex-col gap-x-2 gap-y-1 w-full">
          <label htmlFor="file" className='text-slate-50 font-light'>Bukti Pengaduan (Opsional)</label>
          <input {...register("file", {
            onChange: (e) => setFile(e.target.files[0])
          })} type="file" className='w-full border-2 px-auto rounded-md py-1.5 px-2 bg-gray-100' name="file" id="file" />
        </div>
        <div className="w-full py-2">
          {onSave && <button disabled className='px-3 py-2.5 bg-sky-800 hover:bg-sky-700 text-md font-semibold w-full rounded-md text-slate-50'>
            Permintaan sedang diproses
          </button>}
          {!onSave && <button type='submit' className='px-3 py-2.5 bg-sky-800 hover:bg-sky-700 text-md font-semibold w-full rounded-md text-slate-50'>
            Kirim
          </button>}
        </div>
      </form >
    </>
  )
}

export default UserPengaduanInput