import { HiClipboardDocumentList } from "react-icons/hi2";
import { MdDashboard } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import NavDashboard from "../components/NavDashboard";
import { ImExit } from "react-icons/im";
import MainPelayanan from "../components/MainPelayanan";

const DataPelayanan = () => {
  const location = useLocation()
  const pathname = location.pathname

  const newLinks = [
    { key: 0, icon: <MdDashboard fontSize={20} />, href: '/admin/dashboard', label: 'Dashboard' },
    { key: 1, icon: <HiClipboardDocumentList fontSize={20} />, href: '/admin/dataPelayanan', label: 'Data Pelayanan' },
    { key: 2, icon: <ImExit fontSize={20} />, href: '/admin/logout', label: 'Logout' },
  ]

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <NavDashboard newLinks={newLinks} pathname={pathname} />
        <div className="w-full h-full">
          <MainPelayanan />
        </div>
      </div>
    </>
  )
}

export default DataPelayanan