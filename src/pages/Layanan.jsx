
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"


const Layanan = () => {
    return (
        <>
            <Navbar />
            <div className="layanan py-20 bg-dark" data-aos="fade-down" data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out">
                <div className="text-center bg-sky-950 h-100 text-white-50 p-10">
                    <div className="p-10">
                        <h1 className='text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl'>Layanan Kami</h1>
                        <p className='py-3 text-slate-100 lg:w-9/12 w-full mx-auto'>Layanan digital sensus memberikan berbagai layanan yang tersedia untuk membantu masyarakat mengatasi segala kebutuhan permintaan surat, layanan sensus, administrasi dan pengaduan</p>
                    </div>
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="px-5">
                            <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden hover:-mt-3">
                                <img className="w-64 h-64 mx-auto object-cover object-center py-5" src="/images/layanan1.png" alt="Card Image" />
                                <div className="p-3">
                                    <h2 className="text-xl font-bold text-gray-800">Pengajuan Surat</h2>
                                    <p className="mt-2 text-gray-600 text-sm">Kirimkan pengajuan surat secara online melalui website digital sensus dengan mudah dan cepat. Prosesnya sederhana dan efisien, memudahkan Anda untuk mendapatkan surat yang Anda butuhkan.</p>
                                    <div className="py-6">
                                        <Link to="/userLogin" className="rounded-md bg-sky-700 px-4 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Ajukan</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-5">
                            <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden hover:-mt-3">
                                <img className="w-64 h-64 mx-auto object-cover object-center py-5" src="/images/layanan2.png" alt="Card Image" />
                                <div className="p-3">
                                    <h2 className="text-xl font-bold text-gray-800">Pengaduan</h2>
                                    <p className="mt-2 text-gray-600 text-sm">Kami menerima laporan masalah atau keluhan Anda melalui fitur pengaduan. Kami siap menerima dan menanggapi setiap pengaduan dengan cepat, memberikan solusi terbaik untuk memperbaiki situasi.</p>
                                    <div className="py-6">
                                        <Link to="/userLogin" className="rounded-md bg-sky-700 px-4 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Pengaduan</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-5">
                            <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden hover:-mt-3">
                                <img className="w-64 h-64 mx-auto object-cover object-center py-5" src="/images/layanan3.png" alt="Card Image" />
                                <div className="p-3 h-100">
                                    <h2 className="text-xl font-bold text-gray-800">Bantuan Administrasi</h2>
                                    <p className="mt-2 text-gray-600 text-sm">Dapatkan bantuan administrasi dengan mudah. Pegawai kami siap membantu masyarakat dalam proses administratif, menjawab pertanyaan, dan memberikan panduan dan solusi yang diperlukan masyarakat.</p>
                                    <div className="py-6">
                                        <Link to="/userLogin" className="rounded-md bg-sky-700 px-4 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Bantuan</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </>

    )

}

export default Layanan