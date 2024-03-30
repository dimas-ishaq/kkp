import { IoPersonCircle } from "react-icons/io5";
import NavUserDashboard from '../components/NavUserDashboard'
import { Tab } from '@headlessui/react'
import { BsPersonLinesFill } from "react-icons/bs";
import { HiKey } from "react-icons/hi2";
import { BiSolidLogOut } from "react-icons/bi";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import UserUpdateProfile from "../components/UserUpdateProfile";
import UserUpdatePassword from "../components/UserUpdatePassword";
import { useAuth } from "../contexts/AuthContext";

const UserProfile = () => {
    const { user } = useAuth()

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const notifyError = (user) => toast.error(user, {
        theme: "colored",
        autoClose: 1000,
    })
    const notifySuccess = (user) => toast.success(user, {
        theme: "colored",
        autoClose: 1000,
    })
    const notifHandler = (error, message) => {
        if (error) {
            return notifyError(message)
        } else {
            notifySuccess(message)
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="flex flex-col w-full h-full overflow-hidden">
                <NavUserDashboard />
                <Tab.Group>
                    <div className="grid gap-x-5 gap-y-10 md:grid-cols-2 py-10 md:px-5">
                        <div className="lg:px-18 w-full">
                            <div className="flex flex-col w-full h-full">
                                <div className="flex w-full items-center px-10 gap-x-10 bg-blue-950/90 py-5 shadow-md">
                                    <img className='rounded-full w-20 h-20 object-cover border-2 border-gray-100' src={user.profile_picture ? user.profile_picture : '/profile/user.png'} alt="profile" />
                                    <div className="flex flex-col">
                                        <h3 className="text-md font-semibold text-white">
                                            {user.nama_lengkap}
                                        </h3>
                                        <span className="text-sm text-white">{user.nik}</span>
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
                        <div className="md:px-10 md:py-0 py-20 w-full shadow-md  bg-blue-900">
                            <Tab.Panels className='md:py-10'>
                                <Tab.Panel>
                                    <div className="flex flex-col w-full gap-y-5">
                                        <h3 className="text-center text-md md:text-lg font-semibold text-white">Informasi Pribadi</h3>
                                        <div className="flex gap-x-2 w-full">
                                            <table className="w-full">
                                                <tbody className="text-sm md:text-md text-white">
                                                    <tr>
                                                        <td>Nama</td>
                                                        <td>: {user.nama_lengkap}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Alamat</td>
                                                        <td>: {user.alamat}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>NIK</td>
                                                        <td>: {user.nik}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Email</td>
                                                        <td>: {user.email}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel className='py-15 '>
                                    <div className="flex w-full flex-col ">
                                        <h3 className="text-lg font-semibold text-center text-slate-50">Edit Akun</h3>
                                    </div>
                                    <UserUpdateProfile onInfo={notifHandler} />
                                </Tab.Panel>
                                <Tab.Panel className='p-15'>
                                    <div className="flex w-full flex-col ">
                                        <h3 className="text-lg font-semibold text-center text-slate-50">Update Password</h3>
                                    </div>
                                    <UserUpdatePassword onInfo={notifHandler} />
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