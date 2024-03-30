import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { handleUpdateProfile } from '../utils/api';
import Cookies from 'js-cookie';


const UserUpdateProfile = ({ onInfo }) => {
  const { register: registerFormProfile, handleSubmit: handleSubmitProfile, formState: formStateProfile } = useForm()
  const [userProfile, setUserProfile] = useState({
    email: null,
    password: null
  })
  const [profilePic, setProfilePic] = useState()


  const updateProfile = async () => {
    const formData = new FormData
    if (!userProfile.email && !profilePic) {
      return onInfo(true, "Email atau foto tidak boleh kosong");
    }

    if (userProfile.email) {
      formData.append('userProfile', JSON.stringify(userProfile));
    } else {
      formData.append('userProfile', JSON.stringify({ password: userProfile.password }))
    }
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }
    console.log(JSON.stringify(userProfile))
    const token = Cookies.get('usertoken')

    const { error, message } = await handleUpdateProfile(formData, token)
    if (!error) {
      setTimeout(() => window.location.reload(), 2000)

      return onInfo(false, message)
    }
    return onInfo(true, message)
  }

  return (
    <>
      <form className="flex flex-col w-full h-full px-3">
        <div className="flex flex-col py-2 gap-y-1 w-full">
          <label className='text-slate-50 font-light' htmlFor="email">Email Baru</label>
          <input className="py-2 rounded-md px-3" type="email" {...registerFormProfile('email', { pattern: /^\S+@\S+$/i, onChange: (e) => setUserProfile({ ...userProfile, [e.target.name]: e.target.value }) })} id="email" placeholder="Masukkan email baru" />
        </div>
        <div className="flex flex-col py-2 gap-y-1">
          <label className='text-slate-50 font-light' htmlFor="file">Update Foto Profile</label>
          <input className="py-2 rounded-md px-3 text-gray-700 bg-gray-200 font-light" type="file" {...registerFormProfile('file', {
            onChange: (e) => setProfilePic(e.target.files[0]), validate: (value) => {
              if (value[0]) {
                const fileType = value[0].type;
                const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
                return allowedFileTypes.includes(fileType) || 'Hanya menerima gambar untuk foto profile'
              }
            }
          })} accept=".jpg,.jpeg,.png,.gif" id="file" />
        </div>
        <div className="flex flex-col py-2 gap-y-1">
          <label className='text-slate-50 font-light' htmlFor="password">Password</label>
          <input className="py-2 rounded-md px-3 " type="password" {...registerFormProfile('password', { required: 'Password harus diisi', onChange: (e) => setUserProfile({ ...userProfile, [e.target.name]: e.target.value }) })} id="password" placeholder="*******" />
          <p className="text-xs text-yellow-300">{formStateProfile.errors.password?.message}</p>
        </div>
        <div className="w-full py-2 gap-y-1">
          <button onClick={handleSubmitProfile(updateProfile)} className="w-full text-center text-slate-50 py-3 px-5 bg-cyan-700 font-semibold hover:bg-cyan-600 rounded-md">Simpan Perubahan</button>
        </div>
      </form>
    </>
  )
}

export default UserUpdateProfile