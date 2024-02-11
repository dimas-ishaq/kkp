import { IoPersonCircle } from "react-icons/io5";
import NavUserDashboard from '../components/NavUserDashboard'
import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import { BsPersonLinesFill } from "react-icons/bs";
import { HiKey } from "react-icons/hi2";
import { BiSolidLogOut } from "react-icons/bi";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

const UserProfile = () => {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const notifyError = (data) => toast.error(data, {
        theme: "colored",
        autoClose: 1000,
    })
    const notifySuccess = (data) => toast.success(data, {
        theme: "colored",
        autoClose: 1000,
    })
    const { register: registerFormProfile, handleSubmit: handleSubmitProfile, formState: formStateProfile } = useForm()
    const { register: registerFormPassword, handleSubmit: handleSubmitPassword, watch: formPasswordWatch, setError: setErrorPassword, formState: formStatePassword } = useForm();
    const [userProfile, setUserProfile] = useState({
        email: null,
        password: null
    })
    const [userPassword, setUserPassword] = useState({
        recent_password: null,
        new_password: null
    })
    const [profilePic, setProfilePic] = useState()
    const [data, setData] = useState({})
    const navigate = useNavigate()
    const api = 'https://db.dimsomnia.cloud/api/user/profile'

    useEffect(() => {
        window.scrollTo(0, 0);
        const usercookie = localStorage.getItem("USER_COOKIE")
        axios.defaults.headers.common['Authorization'] = `Bearer ${usercookie}`;
        axios
            .get(api)
            .then((response) => {
                const { _id, nama_lengkap, nik, alamat, email, profile_picture } = response.data
                setData({ _id, nama_lengkap, nik, alamat, email, profile_picture })
            }).catch((error) => {
                console.log(error.message)
                navigate('/userLogin')
            })

    }, [])

    const updateProfile = async () => {
        const formData = new FormData
        if (!userProfile.email && !profilePic) {
            return notifyError("Email atau foto tidak boleh kosong");
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

        const usercookie = localStorage.getItem("USER_COOKIE")
        axios.defaults.headers.common['Authorization'] = `Bearer ${usercookie}`;
        await axios
            .put(api, formData)
            .then((response) => {
                const token = response.data.newtoken
                Cookies.set("usertoken", token)
                localStorage.setItem("USER_COOKIE", token)
                notifySuccess(response.data.message)
                console.log(token)
                setTimeout(() => window.location.reload(), 2000)
            }).catch((error) => {
                console.log(error)
                notifyError(error.response.data.message)
            })
    }


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
        const usercookie = localStorage.getItem("USER_COOKIE")
        axios.defaults.headers.common['Authorization'] = `Bearer ${usercookie}`;
        await axios
            .put(api + '/password', formData)
            .then((response) => {
                notifySuccess(response.data.message)
            }).catch((error) => {
                notifyError(error.response.data.message)
            })

    }

    return (
        <>
            <ToastContainer />
            <div className="flex flex-col w-full h-full">
                <NavUserDashboard />
                <Tab.Group>
                    <div className="grid gap-x-5 gap-y-10 md:grid-cols-2 py-10 md:px-5">
                        <div className="lg:px-18 w-full">
                            <div className="flex flex-col w-full h-full">
                                <div className="flex w-full items-center px-10 gap-x-10 bg-blue-950/90 py-5 shadow-md">
                                    <img className='rounded-full w-20 h-20 object-cover border-2 border-gray-100' src={data.profile_picture} alt="profile" />
                                    <div className="flex flex-col">
                                        <h3 className="text-md font-semibold text-white">
                                            {data.nama_lengkap}
                                        </h3>
                                        <span className="text-sm text-white">{data.nik}</span>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <Tab.List className=" w-full flex flex-col space-x-1 gap-2 bg-blue-900 py-4 px-3">
                                        <Tab
                                            className={({ selected }) =>
                                                classNames(
                                                    'w-full rounded-lg py-4 text-md font-medium leading-5 text-left flex gap-x-5 px-5 items-center',
                                                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                    selected
                                                        ? 'bg-white text-blue-700 shadow'
                                                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                                )
                                            }
                                        >
                                            <IoPersonCircle fontSize={20} /> <span>Informasi Akun</span>
                                        </Tab>
                                        <Tab
                                            className={({ selected }) =>
                                                classNames(
                                                    'w-full rounded-lg py-4 text-md font-medium leading-5 text-left flex gap-x-5 px-5 items-center',
                                                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                    selected
                                                        ? 'bg-white text-blue-700 shadow'
                                                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                                )
                                            }
                                        >
                                            <BsPersonLinesFill fontSize={20} /> <span>Edit Akun</span>
                                        </Tab>
                                        <Tab
                                            className={({ selected }) =>
                                                classNames(
                                                    'w-full rounded-lg py-4 text-md font-medium leading-5 text-left flex gap-x-5 px-5 items-center',
                                                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                    selected
                                                        ? 'bg-white text-blue-700 shadow'
                                                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                                )
                                            }
                                        >
                                            <HiKey fontSize={20} /> <span>Ubah Password</span>
                                        </Tab>
                                        <Link to='/user/logout'
                                            className='w-full rounded-lg py-4 text-md font-medium leading-5 text-left flex gap-x-5 px-5 items-center ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 text-white hover:bg-gray-100 hover:text-blue-700 hover:shadow'>
                                            <BiSolidLogOut fontSize={20} /><span>Logout</span>
                                        </Link>
                                    </Tab.List>
                                </div>
                            </div>
                        </div>
                        <div className="px-5 md:px-10 md:py-0 py-20 w-full shadow-md  bg-blue-900">
                            <Tab.Panels className='md:py-10'>
                                <Tab.Panel>
                                    <div className="flex flex-col w-full gap-y-5">
                                        <h3 className="text-center text-md md:text-lg font-semibold text-white">Informasi Pribadi</h3>
                                        <div className="flex gap-x-2 w-full">
                                            <table className="w-full">
                                                <tbody className="text-sm md:text-md text-white">
                                                    <tr>
                                                        <td>Nama</td>
                                                        <td>: {data.nama_lengkap}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Alamat</td>
                                                        <td>: {data.alamat}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>NIK</td>
                                                        <td>: {data.nik}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Email</td>
                                                        <td>: {data.email}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel className='p-15'>
                                    <div className="flex w-full flex-col ">
                                        <h3 className="text-lg font-semibold text-center text-slate-50">Edit Akun</h3>
                                    </div>
                                    <form className="flex flex-col w-full h-full">
                                        <div className="flex flex-col py-2 gap-y-1">
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
                                </Tab.Panel>
                                <Tab.Panel className='p-15'>
                                    <div className="flex w-full flex-col ">
                                        <h3 className="text-lg font-semibold text-center text-slate-50">Update Password</h3>
                                    </div>
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
                                </Tab.Panel>
                            </Tab.Panels>
                        </div >
                    </div >
                </Tab.Group >
                <Footer></Footer>

            </div >
        </>
    )
}

export default UserProfile