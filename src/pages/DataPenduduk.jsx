import { FaPeopleGroup } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import NavDashboard from '../components/NavDashboard';
import MainPenduduk from '../components/MainPenduduk';
import { ImExit } from "react-icons/im";

const DataPenduduk = () => {
  const location = useLocation()
  const pathname = location.pathname
  const newLinks = [
    { key: 0, icon: <MdDashboard fontSize={20} />, href: '/admin/dashboard', label: 'Dashboard' },
    { key: 1, icon: <FaPeopleGroup fontSize={20} />, href: '/admin/dataPenduduk/kelolaPenduduk', label: 'Kelola Data' },
    { key: 2, icon: <ImExit fontSize={20} />, href: '/admin/logout', label: 'Logout' },
  ]
  return (
    <>
      <div className="flex flex-col h-full items-center w-full">
        <NavDashboard newLinks={newLinks} pathname={pathname} />
        <MainPenduduk />
      </div>
    </>
  )
}

export default DataPenduduk