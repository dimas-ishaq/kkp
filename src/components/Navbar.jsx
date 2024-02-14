import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

const navigation = [
  { name: 'Beranda', href: '/' },
  { name: 'Layanan Desa', href: '/layanan' },
  { name: 'Pertanyaan', href: '/pertanyaan' }
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

    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Digital Sensus Pandanwangi</span>
              <img
                className="h-10 w-auto"
                src="/images/logo-desa.png"
                alt="logo-desa"
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
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} className="text-md font-bold leading-6 text-gray-900 hover:border-b-[1px] border-indigo-500">
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
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
                    <Link
                      key={item.name}
                      to={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
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