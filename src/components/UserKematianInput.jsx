import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { handleFormKematian } from '../utils/api';
import Cookies from 'js-cookie';


const UserKematianInput = ({ onInfo, onLoading }) => {

  const [data, setData] = useState({
    nama: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    gender: "",
    agama: "",
    tempat_meninggal: "",
    tanggal_meninggal: "",
    sebab_meninggal: ""
  })
  const [file, setFile] = useState()
  const navigate = useNavigate()
  const token = Cookies.get('usertoken')

  const { register, handleSubmit, formState: { errors } } = useForm()

  const handleSurat = async () => {
    if (!data.nama || !data.tempat_lahir || !data.tanggal_lahir || !data.gender || !data.agama || !data.tempat_meninggal || !data.tanggal_meninggal || !data.sebab_meninggal) {
      onInfo(true, true)
    }
    onLoading(true)
    const formData = new FormData
    formData.append('data', JSON.stringify(data))
    formData.append('file', file)
    const error = await handleFormKematian(formData, token)
    if (!error) {
      setTimeout(() => { navigate('/user/status'), onLoading(false) }, 2500)
      onInfo(false)
      return
    }
    onLoading(false)
    return onInfo(true)
  }



  const religion = [
    { key: 0, agama: 'Islam' },
    { key: 1, agama: 'Kristen' },
    { key: 3, agama: 'Katolik' },
    { key: 4, agama: 'Hindu' },
    { key: 5, agama: 'Budha' },
    { key: 6, agama: 'Konghuchu' },
    { key: 7, agama: 'Lainnya' },
  ]

  return (
    <>
      <form className="flex flex-col w-full h-full p-5 gap-y-2 items-center ">
        <div className="flex flex-col  gap-x-2 gap-y-1 w-full">
          <label htmlFor="nama" className=' text-slate-50 font-light' >Nama Lengkap</label>
          <input {...register("nama", { required: "Nama harus diisi", onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} type="text" className='w-full border-2 px-auto rounded-md py-1.5 px-2' id="nama" />
          <p className='text-sm text-yellow-400'>{errors.nama?.message}</p>
        </div>
        <div className="flex flex-col  gap-x-2 gap-y3 w-full">
          <label htmlFor="tempat_lahir" className='  text-slate-50 font-light' >Tempat Lahir</label>
          <input {...register("tempat_lahir", { required: 'Tempat lahir wajib diisi', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} type="text" className='w-full border-2 px-auto rounded-md py-1.5 px-2' id="tempat_lahir" />
          <p className='text-sm text-yellow-400'>{errors.tempat_lahir?.message}</p>
        </div>
        <div className="flex flex-col  gap-x-2 gap-y-1 w-full">
          <label htmlFor="tanggal_lahir" className='  text-slate-50 font-light' >Tanggal Lahir</label>
          <input {...register("tanggal_lahir", { required: 'Tanggal Lahir harus dipilh', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} type="date" className='w-full border-2 px-auto rounded-md py-1.5 px-2' id="tanggal_lahir" />
          <p className='text-sm text-yellow-400'>{errors.tanggal_lahir?.message}</p>
        </div>
        <div className="flex gap-y-1 gap-x-3 sm:gap-x-10 md:justify-start   w-full py-2">
          <label htmlFor="gender" className='  text-slate-50 font-light' >Jenis Kelamin</label>
          <div className="flex gap-x-2 gap-y-1">
            <input type="radio" className=' border-2 px-auto'{...register("gender", { required: 'Jenis Kelamin harus dipilih', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} id="gender" value='laki-laki' />
            <span className=' text-slate-50 font-light self-center'>Laki-Laki</span>
          </div>
          <div className="flex  gap-x-2 gap-y-1">
            <input type="radio" className=' border-2 px-auto'{...register("gender", { required: 'Jenis Kelamin harus dipilih', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} id="gender" value='perempuan' />
            <span className=' text-slate-50 font-light self-center'>Perempuan</span>
          </div>
          <div>
            <p className='text-sm text-yellow-400'>{errors.gender?.message}</p>
          </div>
        </div>
        <div className="flex flex-col  gap-x-2 gap-y-1 w-full">
          <label htmlFor="agama" className='  text-slate-50 font-light' >Agama</label>
          <select {...register("agama", { required: 'Agama harus dipilih', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} id="agama" className='w-full border-2 px-auto rounded-md py-1.5 px-2'>
            <option disabled selected>Pilih Agama</option>
            {religion.map((item) => (
              <option key={item.key} value={item.agama}>{item.agama}</option>
            ))}
          </select>
          <p className='text-sm text-yellow-400'>{errors.agama?.message}</p>
        </div>
        <div className="flex flex-col  gap-x-2 gap-y-1 w-full">
          <label htmlFor="tempat_meninggal" className=' text-slate-50 font-light' >Tempat Meninggal</label>
          <input {...register("tempat_meninggal", { required: 'Tempat harus diisi', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} type="text" className='w-full border-2 px-auto rounded-md py-1.5 px-2' id="tempat_meninggal" />
          <p className='text-sm text-yellow-400'>{errors.tempat_meninggal?.message}</p>
        </div>
        <div className="flex flex-col  gap-x-2 gap-y-1 w-full">
          <label htmlFor="tanggal_meninggal" className=' text-slate-50 font-light' >Tanggal Meninggal</label>
          <input {...register("tanggal_meninggal", { required: 'Tanggal harus dipilih', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} type="date" className='w-full border-2 px-auto rounded-md py-1.5 px-2' id="tanggal_meninggal" />
          <p className='text-sm text-yellow-400'>{errors.tanggal_meninggal?.message}</p>
        </div>
        <div className="flex flex-col  gap-x-2 gap-y-1 w-full">
          <label htmlFor="sebab_meninggal" className=' text-slate-50 font-light' >Sebab Meninggal</label>
          <select {...register("sebab_meninggal", { required: 'Penyebab meninggal harus dipilih', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} className='w-full border-2 px-auto rounded-md py-1.5 px-2' id="sebab_meninggal" >
            <option disabled selected>Pilih Penyebab</option>
            <option value='Kecelakaan'>Kecelakaan</option>
            <option value='Sakit'>Sakit</option>
            <option value='Sebab Lain/Tidak diketahui'>Sebab Lain/Tidak diketahui</option>
          </select>
          <p className='text-sm text-yellow-400'>{errors.sebab_meninggal?.message}</p>
        </div>
        <div className="flex flex-col  gap-x-2 gap-y-1 w-full">
          <label htmlFor="file" className=' text-slate-50 font-light' >Berkas Lampiran</label>
          <input {...register("file", {
            required: 'Berkas harus di upload', onChange: (e) => setFile(e.target.files[0]), validate: (value) => {
              if (value[0]) {
                const fileType = value[0].type; return fileType === 'application/pdf' || 'Hanya menerima file berformamt .Pdf'
              }
            }
          })} accept='.pdf' id="file" type="file" className='w-full border-2 px-auto rounded-md py-1.5 px-2 bg-gray-100' />
          <p className='text-sm text-yellow-400'>{errors.file?.message}</p>
        </div>
        <div className="w-full py-2">
          <button onClick={handleSubmit(handleSurat)} className='px-3 py-2.5 bg-sky-800 hover:bg-sky-700 text-md font-semibold w-full rounded-md text-slate-50' >
            Kirim
          </button>
        </div>
      </form>
    </>
  )
}

export default UserKematianInput