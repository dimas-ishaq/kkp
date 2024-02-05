import { IoPersonCircle } from "react-icons/io5";
import NavUserDashboard from '../components/NavUserDashboard'
import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import { BsPersonLinesFill } from "react-icons/bs";
import { HiKey } from "react-icons/hi2";
import { BiSolidLogOut } from "react-icons/bi";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const [data, setData] = useState({})
    const navigate = useNavigate()
    const api = 'https://db.dimsomnia.cloud/api/user/profile'
    useEffect(() => {
        const usercookie = localStorage.getItem("USER_COOKIE")
        axios.defaults.headers.common['Authorization'] = `Bearer ${usercookie}`;
        axios
            .get(api)
            .then((response) => {
                const { _id, long_name, nik, alamat, email } = response.data
                setData({
                    _id, long_name, nik, alamat, email
                })
            }).catch((error) => {
                console.log(error.message)
                navigate('/userLogin')
            })
    }, [])



    return (
        <>
            <div className="flex flex-col w-full h-full">
                <NavUserDashboard />
                <Tab.Group>
                    <div className="grid gap-x-5 gap-y-10 md:grid-cols-2 py-10 md:px-5">
                        <div className="lg:px-18 w-full">
                            <div className="flex flex-col w-full h-full">
                                <div className="flex w-full items-center px-10 gap-x-10 bg-slate-100 py-5 shadow-md rounded-md">
                                    <img className='rounded-full w-20 h-20 object-cover border-2 border-gray-700' src="/images/person.jpg" alt="profile" />
                                    <div className="flex flex-col">
                                        <h3 className="text-md font-semibold ">
                                            {data.long_name}
                                        </h3>
                                        <span className="text-sm text-gray-700">{data.nik}</span>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <Tab.List className=" w-full flex flex-col space-x-1 gap-2 bg-blue-900/90 py-4 px-3">
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
                                        <Link to='/'
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
                                                        <td>: {data.long_name}</td>
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
                                        <h3 className="text-md font-semibold text-center text-slate-50">Edit Akun</h3>
                                    </div>
                                    <form action="" className="flex flex-col w-full h-full">
                                        <div className="flex flex-col py-2 gap-y-1 ">
                                            <label className='text-slate-50 font-semibold' htmlFor="username">Username</label>
                                            <input className="py-2 rounded-md px-3" type="text" name="username" id="username" placeholder="Masukkan username baru" />
                                        </div>
                                        <div className="flex flex-col py-2 gap-y-1">
                                            <label className='text-slate-50 font-semibold' htmlFor="email">Email</label>
                                            <input className="py-2 rounded-md px-3" type="email" name="email" id="email" placeholder="Masukkan email baru" />
                                        </div>
                                        <div className="flex flex-col py-2 gap-y-1">
                                            <label className='text-slate-50 font-semibold' htmlFor="file">Foto Profile</label>
                                            <input className="py-2 rounded-md px-3 text-gray-700 bg-gray-200" type="file" name="file" id="file" />
                                        </div>
                                        <div className="flex flex-col py-2 gap-y-1">
                                            <label className='text-slate-50 font-semibold' htmlFor="password">Password</label>
                                            <input className="py-2 rounded-md px-3 " type="text" name="password" id="password" placeholder="*******" />
                                        </div>
                                        <div className="w-full py-2 gap-y-1">
                                            <button className="w-full text-center text-slate-50 py-3 px-5 bg-cyan-700 hover:bg-cyan-600 rounded-md">Simpan Perubahan</button>
                                        </div>
                                    </form>
                                </Tab.Panel>
                                <Tab.Panel className='p-15'>
                                    <div className="flex w-full flex-col ">
                                        <h3 className="text-md font-semibold text-center text-slate-50">Update Password</h3>
                                    </div>
                                    <form action="" className="flex flex-col w-full h-full">
                                        <div className="flex flex-col py-2 gap-y-1">
                                            <label className='text-slate-50 font-semibold' htmlFor="password">Password Lama</label>
                                            <input className="py-2 rounded-md px-3 " type="text" name="password" id="password" placeholder="*******" />
                                        </div>
                                        <div className="flex flex-col py-2 gap-y-1">
                                            <label className='text-slate-50 font-semibold' htmlFor="password">Password Baru</label>
                                            <input className="py-2 rounded-md px-3 " type="text" name="password" id="password" placeholder="*******" />
                                        </div>
                                        <div className="flex flex-col py-2 gap-y-1">
                                            <label className='text-slate-50 font-semibold' htmlFor="password">Konfirmasi Password Baru</label>
                                            <input className="py-2 rounded-md px-3 " type="text" name="password" id="password" placeholder="*******" />
                                        </div>
                                        <div className="w-full py-2 gap-y-1">
                                            <button className="w-full text-center text-slate-50 py-3 px-5 bg-cyan-700 hover:bg-cyan-600 rounded-md">Simpan Perubahan</button>
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