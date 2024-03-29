import { useState, Fragment } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { IoMdArrowDropdown } from "react-icons/io";
import { Popover, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NavUserDashboard = () => {
    const { user } = useAuth()
    const links = [
        { name: 'Dashboard', href: '/user/dashboard' },
        { name: 'Cek Status', href: '/user/status' },
    ]
    const profile = [
        { key: 0, label: 'Beranda', href: '/' },
        { key: 1, label: 'Profile', href: '/user/profile' },
        { key: 2, label: 'Logout', href: '/user/logout' }
    ]
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <>
            <div className="bg-blue-950">
                <header className="w-full h-auto flex flex-col overflow-hidden">
                    <nav className="flex items-center  justify-between lg:p-2 p-5 lg:px-8" aria-label="Global">
                        <div className="flex lg:flex-1">
                            <Link to="/" className="-m-1.5 p-1.5">
                                <span className="sr-only">Digital Sensus dan Administrasi</span>
                                <img
                                    className="h-8 w-auto"
                                    src='/images/logo-desa.png'
                                    alt="logo"
                                />
                            </Link>
                        </div>
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon color='white' className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="hidden lg:flex lg:gap-x-12">
                            {links.map((item) => (
                                <Link key={item.name} to={item.href} className="text-sm font-semibold leading-6 text-gray-200">
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            <div className='flex ms-auto w-36 h-16 items-center'>
                                <Popover className="absolute right-2 top-3" >
                                    <Popover.Button className={`
                ${open ? 'text-white' : 'text-white/90'}inline-flex items-center`}>
                                        <div className="flex items-center">
                                            <img src={user.profile_picture ? user.profile_picture : '/profile/user.png'} alt="" className="w-10 h-10 m-auto rounded-full object-cover lg:w-10 lg:h-10 border-2 border-gray-300 hover:border-slate-50 " />
                                            <span className="px-1"><IoMdArrowDropdown color='white' fontSize={24} className='click' /></span>
                                        </div>
                                    </Popover.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel className="absolute right-1/3 z-10 transform ">
                                            <div className="rounded-md flex flex-col bg-blue-950 p-5 border-2">
                                                <ul>
                                                    {profile.map((item) => (
                                                        <li key={item.key}>
                                                            <Link
                                                                to={item.href}
                                                                className="py-1 px-2 flex items-center transition duration-150 ease-in-out hover:bg-blue-800 hover:rounded-md"
                                                            >
                                                                <div className="">
                                                                    <p className="text-sm font-light text-slate-100">
                                                                        {item.label}
                                                                    </p>
                                                                </div>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </Popover>
                            </div>
                        </div>
                    </nav>
                    <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                        <div className="fixed inset-0 z-50" />
                        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-blue-950 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex items-center justify-between">
                                <a href="/" className="-m-1.5 p-1.5">
                                    <span className="sr-only">Digital Sensus dan Administrasi Desa </span>
                                </a>
                                <button
                                    type="button"
                                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon color='white' className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                    <div className="space-y-2 py-6">
                                        {links.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200 hover:bg-blue-700/60"
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="py-6">
                                        {profile.map((link) => (
                                            <Link key={link.key} to={link.href} className='className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-200 hover:bg-blue-700/60' >{link.label}</Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Dialog>
                </header>
            </div >
        </>
    )
}

export default NavUserDashboard