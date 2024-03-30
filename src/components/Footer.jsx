import React from 'react'
import { FaInstagram } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { RxTwitterLogo } from "react-icons/rx";

const Footer = () => {
    return (
        <>
            <div className="flex flex-col w-full h-auto bg-indigo-700 mt-16">
                <div className="flex md:flex-row flex-col gap-y-10 w-full h-auto py-14 justify-between px-10 ">
                    <div className="h-auto w-full flex flex-col gap-y-3">
                        <img src="/images/logo-footer.png" className='w-36' alt="logo" />
                        <p className='text-gray-50 text-sm font-light'>Kantor Balai Desa Pandanwangi <br />
                            Dsn/Ds. Pandanwangi, Kec.Diwek,<br /> Kab. Jombang
                            16471</p>
                    </div>
                    <div className=" w-96 pr-5 flex flex-col gap-y-2 ">
                        <h4 className='text-sm font-semibold text-gray-50'>Menu</h4>
                        <ul>
                            <li className='text-gray-50 text-xs font-medium pt-4'><a href="/">Beranda</a></li>
                            <li className='text-gray-50 text-xs font-medium pt-4'><a href="#profile-desa">Profile Desa</a></li>
                            <li className='text-gray-50 text-xs font-medium pt-4'><a href="#layanan">Layanan Desa</a></li>
                            <li className='text-gray-50 text-xs font-medium pt-4'><a href="#artikel">Berita Desa</a></li>
                            <li className='text-gray-50 text-xs font-medium pt-4'><a href="#faq">Pertanyaan</a></li>
                        </ul>
                    </div>
                    <div className=" w-96 pr-5 flex flex-col gap-y-2 ">
                        <h4 className="text-sm font-semibold text-gray-50 pb-3">
                            Kontak
                        </h4>
                        <div className="flex gap-x-2">
                            <span><BsTelephoneFill color='white' /></span>
                            <p className='text-xs text-gray-50'>Telp. +6285785150153</p>
                        </div>
                        <div className="flex gap-x-2">
                            <span><IoLogoWhatsapp color='white' /></span>
                            <p className='text-xs text-gray-50 '>WA. +6285785150153</p>
                        </div>
                        <div className="flex gap-x-2">
                            <span><MdEmail color='white' /></span>
                            <p className='text-xs text-gray-50'>Email : desapandanwangi@gmail.com</p>
                        </div>
                    </div>
                    <div className=" w-96 pr-5 flex flex-col gap-y-2 ">
                        <h4 className="text-sm font-semibold text-gray-50 pb-3">
                            Media Sosial
                        </h4>
                        <div className="flex gap-x-2">
                            <span><FaInstagram color='white' /></span>
                            <p className='text-xs text-gray-50'>Instagram</p>
                        </div>
                        <div className="flex gap-x-2">
                            <span><FaFacebook color='white' /> </span>
                            <p className='text-xs text-gray-50'>Facebook</p>
                        </div>
                        <div className="flex gap-x-2">
                            <span><RxTwitterLogo color='white' /> </span>
                            <p className='text-xs text-gray-50'>Twitter</p>
                        </div>
                    </div >

                </div >
                <div className="flex w-xl border-t py-10">
                    <p className='text-xs font-semibold text-center text-white mx-auto'>Hak Cipta Situs &copy; Desa Pandanwangi</p>

                </div>

            </div>

        </>
    )
}

export default Footer