import { Popover, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { Fragment, useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const NavDashboard = ({ newLinks, pathname }) => {
    const profile = [
        { key: 0, label: 'Home', href: '/' },
        { key: 1, label: 'Profile', href: '/admin/profile' },
        { key: 2, label: 'Logout', href: '/admin/logout' }
    ]

    const [isLink, setLink] = useState(newLinks)
    const [isSidebar, setSidebar] = useState(false)
    const [isOpen, setOpen] = useState(false)

    const formatPathName = (pathname) => {
        // Memisahkan path name menjadi bagian-bagian
        const pathParts = pathname.split('/');
        // Mendapatkan bagian terakhir dari pathname
        const lastPathPart = pathParts[pathParts.length - 1];
        // Mengganti garis bawah dengan spasi dan mengonversi ke huruf kapital pada setiap kata
        const formattedPath = lastPathPart
            .replace(/([A-Z])/g, ' $1') // Memisahkan huruf kapital dengan spasi
            .replace(/^./, str => str.toUpperCase()); // Mengonversi huruf pertama menjadi huruf kapital
        return formattedPath;
    }

    return (
        <>
            <div className="flex overflow-auto relative">
                <div className={`${isSidebar ? 'w-52' : 'hidden'} flex h-full ease-in-out duration-300`}>
                    <div className={`${isSidebar ? 'w-52' : 'hidden'}  fixed flex flex-col top-0 left-0 right-0 bg-sky-600 dark:bg-sky-900 h-full text-white transition-all duration-300 border-none z-10`}>
                        <div className=' relative w-10 py-3 '>
                            <button className='absolute top-0 left-36 lg:p-5 p-3' onClick={() => { isSidebar ? setSidebar(false) : setSidebar(true) }}>
                                {isSidebar ? <IoCloseOutline fontSize={20} /> : <RxHamburgerMenu fontSize={20} />}
                            </button>
                        </div>
                        <ul className="flex flex-col py-4 space-y-1 mx-auto">
                            <li className="px-3" >
                                <div className="flex flex-row items-center h-8 py-5">
                                    <div className={`${isSidebar ? 'block' : 'hidden'} text-md font-semibold text-center tracking-wide text-slate-200 `}>{pathname ? formatPathName(pathname) : null}</div>
                                </div>
                            </li>
                            {!isLink ? '' : isLink.map((item) => {
                                return (
                                    <li key={item.key} >
                                        <Link className="relative items-center h-11 flex flex-row focus:outline-none hover:bg-sky-600 hover:rounded-md text-white-600 hover:text-white-800 border-l-4 border-transparent" to={item.href}>
                                            <span className="inline-flex justify-center items-center ml-2">
                                                {item.icon}
                                            </span>
                                            <span className={`${isSidebar ? 'block' : 'hidden'} ml-3 pr-3 text-sm font-semibold tracking-wide truncate`} >
                                                {item.label}
                                            </span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>

                    </div>
                </div>
            </div>

            <div className="h-16 w-full relative">
                <div className="flex h-16 bg-sky-700 w-full fixed top-0">
                    <div className="relative">
                        <button className='absolute mr-auto top-5 left-5' onClick={() => { isSidebar ? setSidebar(false) : setSidebar(true) }}>
                            {isSidebar ? <IoCloseOutline color='white' fontSize={20} /> : <RxHamburgerMenu color='white' fontSize={20} />}
                        </button>
                    </div>
                    <div className="ps-32 sm:ps-36 w-full py-5 ">
                        <h3 className='text-sm sm:text-md pr-5 font-semibold text-center text-slate-200'>{pathname ? formatPathName(pathname) : null}</h3>
                    </div>
                    <div className='relative flex ms-auto w-36 h-16 items-center'>
                        <Popover className="absolute right-2 top-3">
                            <Popover.Button className={`
                ${open ? 'text-white' : 'text-white/90'}inline-flex items-center`}>
                                <div className="flex items-center">
                                    <img src="/images/person.jpg" alt="" className="w-10 h-10 m-auto rounded-full object-cover lg:w-10 lg:h-10 border-2 " />
                                    <span className="px-1">{open ? <AiFillCaretDown color='white' /> : <AiFillCaretUp color='white' />}</span>
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
                                    <div className="rounded-md flex flex-col bg-sky-800 p-5">
                                        <ul>
                                            {profile.map((item) => (
                                                <li key={item.key}>
                                                    <Link
                                                        to={item.href}
                                                        className="py-1 px-2 flex items-center transition duration-150 ease-in-out hover:bg-sky-600 hover:rounded-md"
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
            </div>
        </>
    )
}

export default NavDashboard