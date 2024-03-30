import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

const navigation = [
  { name: 'Beranda', href: '/' },
  { name: 'Profile Desa', href: '#profile-desa' },
  { name: 'Layanan', href: '#layanan' },
  { name: 'Berita', href: '#artikel' },
  { name: 'Pertanyaan', href: '#faq' }

]

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const api = 'https://db.dimsomnia.cloud/api'
  const usercookie = Cookies.get('usertoken')

  const handleLogin = () => {
    if (!usercookie === null) {
      return navigate('/userLogin')
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${usercookie}`;
    axios
      .get(api)
      .then(() => {
        navigate('/user/dashboard')
      }).catch(() => {
        navigate('/userLogin')
      })
  }

  return (

    <div className="bg-white border-b">
      <header className="w-full h-auto flex flex-col overflow-hidden">
        <nav className="flex items-center justify-between lg:justify-start shadow p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-initial lg:ps-5 w-48">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Digital Sensus Pandanwangi</span>
              <img
                className="sm:h-8 h-4 "
                src="/images/logo.png"
                alt="logo"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-10">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-medium leading-6 text-gray-900 hover:border-b-[1px] border-indigo-500">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-5">
            <Link to='/adminLogin'>
              <button className='px-3.5 py-2 text-indigo-600 bg-purple-50 hover:bg-purple-100 text-sm font-medium rounded-md'>Layanan Admin</button>
            </Link>
            <Link to='/userLogin'>
              <button className='px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-slate-50 text-sm font-medium rounded-md'>Layanan User</button>
            </Link>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 overflow-x-hidden">
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="flex flex-col gap-y-3 items-center w-full">
                  <button onClick={handleLogin}
                    className=" rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 w-full"
                  >
                    Masuk
                  </button>
                  <div className="w-full">
                    {(usercookie && <Link to='/user/logout' ><button className=' rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 w-full'>Logout</button></Link>)}
                  </div>

                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

    </div >
  )
}


export default Navbar