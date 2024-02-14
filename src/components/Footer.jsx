import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { BsFillTelephoneInboundFill, BsTelephoneFill } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";

const Footer = () => {
    return (
        <>
            <div className="flex md:flex-row flex-col-reverse gap-y-5 w-full h-full justify-between p-14 bg-blue-950">
                <div className="h-full">
                    <img src="/images/logo-desa.png" alt="logo-desa" />
                </div>
                <div className="flex flex-col gap-y-2">
                    <div className="flex gap-x-2 py-2">
                        <span><BsFillTelephoneInboundFill fontSize={20} color='white' /></span>
                        <h4 className="text-md font-semibold text-gray-50">
                            Kontak
                        </h4>
                    </div>
                    <div className="flex gap-x-2">
                        <span><BsTelephoneFill color='white' /></span>
                        <p className='text-sm text-slate-50'>Telp. +6285785150153</p>
                    </div>
                    <div className="flex gap-x-2">
                        <span><IoLogoWhatsapp color='white' /></span>
                        <p className='text-sm text-slate-50 '>WA. +6285785150153</p>
                    </div>
                    <div className="flex gap-x-2">
                        <span><MdEmail color='white' /></span>
                        <p className='text-sm text-slate-50'>Email : desapandawangan_asri@gmail.com</p>
                    </div>
                </div>
                <div className="flex flex-col gap-y-2">
                    <div className="flex gap-x-1 py-2">
                        <span>
                            <FaLocationDot fontSize={20} color='white' />
                        </span>
                        <h4 className="text-md font-semibold text-slate-50 flex">
                            Alamat
                        </h4>
                    </div>
                    <p className='text-sm text-slate-50 '>Kantor Balai Desa Pandawangan</p>
                    <p className='text-sm text-slate-50 '>Dsn/Ds. Pandawangan, Prapatan Watu</p>
                    <p className='text-sm text-slate-50 '>Kab. Wetan</p>
                    <p className='text-sm text-slate-50 '>Kode Pos: 16859</p>
                </div >
            </div >
        </>
    )
}

export default Footer