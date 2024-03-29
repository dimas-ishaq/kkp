import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onRegister } from '../utils/api'
import { useForm } from 'react-hook-form'


const UserRegisterInput = ({ onInfo }) => {
  const [data, setData] = useState({
    nama: '',
    nik: '',
    alamat: '',
    email: '',
    password: ''
  })

  const [onSave, setSave] = useState(false)
  const navigate = useNavigate()
  const { register, handleSubmit, watch, setError, formState: { errors } } = useForm()
  const pass = watch('password')
  const confirmPass = watch('repeat_password')

  const handleRegister = async () => {
    if (pass !== confirmPass) {
      return setError('repeat_password', {
        type: 'custom',
        message: 'Password dan konfirmasi password harus sama.'
      })

    }

    setSave(true)
    const formData = new FormData
    formData.append('data', JSON.stringify(data))
    const { error, message } = await onRegister(formData)
    if (!error) {
      setTimeout(() => { navigate('/userLogin'), setSave(false) }, 2500)
      onInfo(false, message)
      return
    }
    setSave(false)
    return onInfo(true, message)
  }


  return (
    <>
      <form className='py-3' >
        <div className="flex flex-col gap-y-1 py-2">
          <label htmlFor="nama" className='font-light'>
            Nama Lengkap
          </label>
          <input type="text" {...register("nama", { required: 'Nama lengkap harus di isi', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} id="nama" className='py-2 px-3 rounded-sm focus:outline-none focus:ring focus:border-blue-500' placeholder='Masukkan Nama Lengkap Anda' />
          <p className='text-xs text-red-600'>{errors.nama?.message}</p>
        </div>
        <div className="flex flex-col gap-y-1 py-2">
          <label htmlFor="nik" className='font-light'>
            NIK
          </label>
          <input type="text" {...register("nik", {
            required: 'NIK harus di isi', maxLength: {
              value: 16,
              message: 'NIK maksimal harus 16 angka'
            }, minLength: {
              value: 16,
              message: 'NIK minimal harus 16 angka'
            }, onChange: (e) => setData({ ...data, [e.target.name]: e.target.value })
          })} id="nik" className='py-2 px-3 rounded-sm focus:outline-none focus:ring focus:border-blue-500' placeholder='Masukkan NIK 16 Angka' />
          <p className='text-xs text-red-600'>{errors.nik?.message}</p>
        </div>
        <div className="flex flex-col gap-y-1 py-2">
          <label htmlFor="alamat" className='font-light'>
            Alamat
          </label>
          <input type="text" {...register("alamat", { required: 'Alamat lengkap harus di isi', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} id="alamat" className='py-2 px-3 rounded-sm focus:outline-none focus:ring focus:border-blue-500' placeholder='Masukkan Alamat Lengkap Anda' />
          <p className='text-xs text-red-600'>{errors.alamat?.message}</p>
        </div>
        <div className="flex flex-col gap-y-1 py-2">
          <label htmlFor="email" className='font-light'>
            Email
          </label>
          <input type="email" {...register("email", { required: 'Email harus di isi', pattern: /^\S+@\S+$/i, onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} id="email" className='py-2 px-3 rounded-sm focus:outline-none focus:ring focus:border-blue-500' placeholder='Masukkan Email Anda' />
          <p className='text-xs text-red-600'>{errors.email?.message}</p>
        </div>
        <div className="flex flex-col gap-y-1 py-2">
          <label htmlFor="password" className='font-light'>
            Password
          </label>
          <input type="password" {...register("password", {
            required: 'Password harus di isi', minLength: {
              value: 6,
              message: 'Password minimal 6 karakter'
            }
            , onChange: (e) => setData({ ...data, [e.target.name]: e.target.value })
          })} id="password" className='py-2 px-3 rounded-sm focus:outline-none focus:ring focus:border-blue-500' placeholder='********' />
          <p className='text-xs text-red-600'>{errors.password?.message}</p>
        </div>
        <div className="flex flex-col gap-y-1 py-2">
          <label htmlFor="repeat_password" className='font-light'>
            Konfirmasi Password
          </label>
          <input type="password" {...register("repeat_password", {
            required: true,
          })} id="repeat_password" className='py-2 px-3 rounded-sm focus:outline-none focus:ring focus:border-blue-500' placeholder='********' />
          <p className='text-xs text-red-500'>{errors.repeat_password?.message}</p>
        </div>
        <div className="w-full py-5">
          {onSave && <button disabled type='submit' onClick={handleSubmit(handleRegister)} className="w-full font-semibold px-3 py-4 text-white bg-blue-700 hover:bg-blue-600 rounded-md" >Pendaftaran sedang diproses</button>}
          {!onSave && <button type='submit' onClick={handleSubmit(handleRegister)} className="w-full font-semibold px-3 py-4 text-white bg-blue-700 hover:bg-blue-600 rounded-md" >Daftar</button>}
        </div>
      </form>

    </>
  )
}

export default UserRegisterInput