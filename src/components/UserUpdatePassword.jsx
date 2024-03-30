import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { handleUpdatePassword } from '../utils/api'
import Cookies from 'js-cookie';


const UserUpdatePassword = ({ onInfo }) => {
  const { register: registerFormPassword, handleSubmit: handleSubmitPassword, watch: formPasswordWatch, setError: setErrorPassword, formState: formStatePassword } = useForm();
  const [userPassword, setUserPassword] = useState({
    recent_password: null,
    new_password: null
  })


  const updatePassword = async () => {
    const repeat_pass = formPasswordWatch('repeat_password')
    const new_pass = formPasswordWatch('new_password')
    const recent_pass = formPasswordWatch('recent_password')
    console.log(userPassword)
    if (new_pass === recent_pass) {
      return setErrorPassword('new_password', {
        type: 'custom',
        message: 'Password baru dan lama harus berbeda'
      })
    }
    if (new_pass !== repeat_pass) {
      return setErrorPassword('repeat_password', {
        type: 'custom',
        message: 'Password dan konfirmasi password harus sama.'
      })
    }

    const formData = new FormData
    formData.append('updatePass', JSON.stringify(userPassword))
    const token = Cookies.get('usertoken')
    const { error, message } = await handleUpdatePassword(formData, token)
    if (!error) {
      setTimeout(() => window.location.reload(), 2000)
      return onInfo(false, message)
    }
    return onInfo(true, message)
  }

  return (
    <>
      <form className="flex flex-col w-full h-full">
        <div className="flex flex-col py-2 gap-y-1">
          <label className='text-slate-50 font-light' htmlFor="password">Password Lama</label>
          <input className="py-2 rounded-md px-3 " type="password" {...registerFormPassword('recent_password', { required: 'Password lama harus diisi', onChange: (e) => setUserPassword({ ...userPassword, [e.target.name]: e.target.value }) })} id="recent_password" placeholder="*******" />
          <p className="text-xs text-yellow-300">{formStatePassword.errors.recent_password?.message}</p>
        </div>
        <div className="flex flex-col py-2 gap-y-1">
          <label className='text-slate-50 font-light' htmlFor="password">Password Baru</label>
          <input className="py-2 rounded-md px-3 " type="password" {...registerFormPassword('new_password', { required: 'Password baru harus diisi', onChange: (e) => setUserPassword({ ...userPassword, [e.target.name]: e.target.value }) })} id="new_password" placeholder="*******" />
          <p className="text-xs text-yellow-300">{formStatePassword.errors.new_password?.message}</p>
        </div>
        <div className="flex flex-col py-2 gap-y-1">
          <label className='text-slate-50 font-light' htmlFor="password">Konfirmasi Password Baru</label>
          <input className="py-2 rounded-md px-3 " type="password" {...registerFormPassword('repeat_password', { required: true })} id="repeat_password" placeholder="*******" />
          <p className="text-xs text-yellow-300">{formStatePassword.errors.repeat_password?.message}</p>
        </div>
        <div className="w-full py-2 gap-y-1">
          <button onClick={handleSubmitPassword(updatePassword)} className="w-full text-center text-slate-50 py-3 px-5 bg-cyan-700 hover:bg-cyan-600 font-semibold rounded-md">Simpan Perubahan</button>
        </div>
      </form>
    </>
  )
}

export default UserUpdatePassword