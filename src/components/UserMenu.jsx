import React from 'react'
import { Link } from 'react-router-dom'
import { LuBaby } from "react-icons/lu";
import { GiTombstone } from "react-icons/gi";
import { HiSpeakerphone } from "react-icons/hi";
import { HiHome, HiMiniDocumentText } from "react-icons/hi2";
const UserMenu = () => {

    const links = [
        { key: 0, bg: 'bg-green-500', bgh: 'hover:bg-green-600', icon: <LuBaby fontSize={80} color='white' />, label: 'Surat Kelahiran', href: '/user/suratKelahiran' },
        { key: 1, bg: 'bg-cyan-500', bgh: 'hover:bg-cyan-600', icon: <GiTombstone fontSize={80} color='white' />, label: 'Surat Kematian', href: '/user/suratKematian' },
        { key: 2, bg: 'bg-blue-500', bgh: 'hover:bg-blue-600', icon: <HiSpeakerphone fontSize={80} color='white' />, label: 'Pengaduan', href: '/user/pengaduan' },
        { key: 3, bg: 'bg-violet-500', bgh: 'hover:bg-violet-600', icon: <HiHome fontSize={80} color='white' />, label: 'Surat Domisili', href: '/user/suratDomisili' },
        { key: 4, bg: 'bg-indigo-500', bgh: 'hover:bg-indigo-600', icon: <HiMiniDocumentText fontSize={80} color='white' />, label: 'Surat SKTM', href: '/user/suratSKTM' },
    ]
    return (
        <><div className="flex flex-col w-full h-full" >
            <h3 className="text-center font-medium lg:text-3xl md:text-2xl text-xl text-gray-800">Layanan Desa Pandanwangi</h3>
            <div className="grid md:grid-cols-3 gap-5 lg:px-32 p-10">
                {links.map((item) => (
                    <Link key={item.key} to={item.href} className={`${item.bg} text-slate-100 rounded-md border-gray-700 border-3 justify-center py-5 ${item.bgh}`} data-aos="fade-up" data-aos-delay={50 * item.key}
                        data-aos-duration="1000"
                        data-aos-easing="ease-in-out">
                        <button className='flex flex-col items-center mx-auto'>
                            {item.icon}
                            <span className='text-lg md:text-2xl font-semibold text-center py-1'>{item.label}</span>
                        </button>
                    </Link>
                ))}
            </div>
        </div>
        </>
    )
}

export default UserMenu