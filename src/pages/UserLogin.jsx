import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { onLogin } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";

const UserLogin = () => {
  const { user, login } = useAuth()
  const [data, setData] = useState({ email: "", password: "" })
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const notifyError = (data) => toast.error(data, {
    theme: "colored",
    autoClose: 1000,
  })


  const handleLogin = async () => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));

    try {
      const { error, user } = await onLogin(formData);

      if (error === false) {
        login(user)
        return navigate('/user/dashboard');
      } else {
        // Tambahkan pesan kesalahan yang lebih jelas atau penanganan error lainnya
        return notifyError('Gagal login. Mohon coba lagi.');
      }
    } catch (error) {
      // Tangani kesalahan yang terjadi selama panggilan onLogin
      console.error('Terjadi kesalahan saat melakukan login:', error);
      return notifyError('Terjadi kesalahan. Mohon coba lagi.');
    }
  }

  useEffect(() => {
    if (user !== null) {
      navigate('/user/dashboard');
    }
  }, [user, navigate]);

  return (
    <>
      <ToastContainer />
      <div className="flex h-screen bg-gray-100" data-aos="fade-down" data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out">
        <div className="close-button absolute p-5 lg:p-5">
          <Link to='/'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </Link>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="max-w-md w-full p-6 flex flex-col">
            <div className="w-full">
              <img className="mx-auto w-32" src="/images/img-login.png" alt="logo" />
            </div>
            <div className="flex flex-col py-10 gap-y-3 ">
              <h1 className="md:text-3xl text-2xl font-semibold text-gray-900 text-center">Halo, Selamat Datang</h1>
              <h1 className="text-sm mb-2 text-gray-800 text-center">Portal Digital Sensus dan Administrasi Desa Pandawangan Silahkan Login</h1>
              <div className="text-sm text-gray-600 text-center">
                <p>Belum mempunyai akun ? <Link to='/userRegister' className="text-blue-600 hover:text-white hover:bg-blue-600 hover:p-1 hover:rounded-md"> Daftar Sekarang </Link>
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <form className="flex flex-col gap-y-1">
                <div className="flex flex-col gap-y-1">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                  <input type="text" id="email" {...register("email", { required: 'Email harus di isi', pattern: /^\S+@\S+$/i, onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }) })} className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
                  <p className='text-xs text-red-600'>{errors.email?.message}</p>
                </div>
                <div className="flex flex-col gap-y-1">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                  <input type="password" id="password" {...register("password", {
                    required: 'Password harus di isi', onChange: (e) => setData({ ...data, [e.target.name]: e.target.value })
                  })} className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
                  <p className='text-xs text-red-600'>{errors.password?.message}</p>
                </div>
                <div className="flex py-5">
                  <button type="submit" onClick={handleSubmit(handleLogin)} className="w-full bg-sky-500 font-semibold p-2 rounded-md text-white shadow-sm hover:bg-sky-600 focus:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-900 transition-colors duration-300">Login</button>
                </div>
              </form>
            </div>
            <div className="mt-2 text-sm text-gray-600 text-center">
              <p>Lupa email atau password ? <a href="https://wa.me/6285785150153" className="text-blue-600  hover:text-white hover:bg-blue-600 hover:p-1 hover:rounded-md">Hubungi Bantuan</a></p>
            </div>
          </div>
        </div >
        <div className="hidden lg:flex items-center justify-center overflow-y-hidden">
          <div className="w-full text-center ">
            <img src="/images/image-user-login.png" className="object-cover w-full" alt="" />
          </div>
        </div>
      </div >
    </>
  )
}

export default UserLogin