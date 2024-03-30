import { FaCity } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { ImExit } from "react-icons/im";
import { useLocation } from 'react-router-dom';
import NavDashboard from '../components/NavDashboard';
import MainDashboard from '../components/MainDashboard';

const AdminDashboard = () => {
  const location = useLocation()
  const pathname = location.pathname
  const newLinks = [
    { key: 1, icon: <FaCity fontSize={20} />, href: '/admin/dataPenduduk', label: 'Data Penduduk' },
    { key: 2, icon: <IoDocumentText fontSize={20} />, href: '/admin/dataPelayanan', label: 'Data Pelayanan' },
    { key: 3, icon: <HiClipboardDocumentList fontSize={20} />, href: '/admin/dataPengaduan', label: 'Data Pengaduan' },
    { key: 4, icon: <ImExit fontSize={20} />, href: '/admin/logout', label: 'Logout' },
  ]

  return (
    <>
      <div className='flex-auto overflow-hidden'>
        <div className="flex flex-col h-full items-center w-full">
          <NavDashboard newLinks={newLinks} pathname={pathname} />
          <MainDashboard />
        </div>
      </div>
    </>
  )
}

export default AdminDashboard