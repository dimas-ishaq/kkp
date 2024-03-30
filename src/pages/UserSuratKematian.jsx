import { React, useEffect, useState } from 'react'
import NavUserDashboard from '../components/NavUserDashboard'
import { ToastContainer, toast } from 'react-toastify';
import UserKematianInput from '../components/UserKematianInput';
import { ColorRing } from 'react-loader-spinner'
import FaqContent from '../components/FaqContent';
const UserSuratKematian = () => {
    useEffect(() => {
        // Ketika komponen pertama kali dimuat, atur posisi scroll window ke atas
        window.scrollTo(0, 0);
    }, []);
    const [loading, setLoading] = useState(false)
    const notifyError = (data) => toast.error(data, {
        theme: "colored",
        autoClose: 2000
    })
    const notifySuccess = (data) => toast.success(data, {
        theme: "colored",
        autoClose: 2000
    })
    const notifHandler = (error, errInput) => {
        if (error && errInput) {
            return notifyError('Pastikan semua filed terisi')
        }
        if (error) {
            return notifyError(error)
        } else {
            return notifySuccess('Data berhasil disimpan')
        }
    }
    const handleLoading = (bool) => {
        setLoading(bool)
    }


    return (
        <> <ToastContainer />
            <div className="flex w-full h-full flex-col">
                <NavUserDashboard />
                {loading ?
                    <div className="w-full h-full justify-center items-center flex p-32  ">
                        <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="my-auto"
                            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        />
                    </div> :
                    <div className="flex flex-col w-full h-full py-10 md:py-5 bg-blue-950/95">
                        <div className="p-3">
                            <h3 className="text-center font-semibold text-2xl text-slate-100">Pengajuan Surat Kematian</h3>
                            <p className='text-center font-light text-slate-100 text-xs'>Isi dan Ajukan Formulir Pengajuan dengan mudah dan cepat</p>
                        </div>
                        <div className="grid lg:grid-cols-2 w-full md:px-10 px-3 py-5 items-center" >
                            <UserKematianInput onInfo={notifHandler} onLoading={handleLoading} />
                            <div className="items-center hidden lg:block sm:max-w-md mx-auto my-auto sm:w-full">
                                <img src="/images/form-kematian.png" alt="" />
                            </div>
                        </div>

                    </div>}
                <FaqContent />
            </div>
        </>
    )
}

export default UserSuratKematian