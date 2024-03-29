import React from 'react'
import { Link } from 'react-router-dom'
import { userMenu } from '../utils/menu'

const DashboardUserMenu = () => {
    return (
        <>
            <div className="flex flex-col w-full h-full pt-16 pb-10 px-8 mx-auto">
                <div className="flex flex-col gap-y-5 mx-auto py-10">
                    <span className="rounded-full text-sm static font-medium text-indigo-500 bg-indigo-50 px-3 py-2 w-32 text-center shadow mx-auto">Layanan Desa</span>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center mx-auto max-w-md leading-tight sm:leading-snug drop-shadow-sm">Layanan yang kami miliki untuk membantu anda</h3>
                    <p className="text-sm medium text-gray-600 text-center mx-aut max-w-md">Kami memiliki banyak layanan yang kamu butuhkan, anda bisa
                        menikmati dan menggunakan dengan mudah dan cepat</p>
                </div>
                <div className="grid md:grid-cols-3 gap-5 lg:px-32 p-10">
                    {userMenu.map((item) => (
                        <div key={item.key} className="flex  flex-col w-full h-auto rounded-xl shadow-xl items-center md:items-baseline gap-y-5 lg:p-10 md:p-5 p-10 border" data-aos="fade-up" data-aos-delay={50 * item.key}
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-out">
                            <img src={item.src} className="w-10 h-auto" alt="" />
                            <div className="flex flex-col gap-y-1">
                                <h4 className="text-md font-semibold text-center md:text-left">{item.label}</h4>
                                <p className="text-xs font-light text-center md:text-left text-gray-500">{item.text}</p>
                            </div>
                            <Link to={item.href} className="text-sm font-semibold text-white hover:bg-violet-600 px-3 py-2.5 rounded-full border-2 bg-violet-700">Buat Sekarang</Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DashboardUserMenu