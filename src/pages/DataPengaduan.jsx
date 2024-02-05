import NavDashboard from '../components/NavDashboard'
import { useLocation } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { ImExit } from "react-icons/im";
import { TbReport } from "react-icons/tb";
import MainPengaduan from '../components/MainPengaduan';


const DataPengaduan = () => {
    const location = useLocation()
    const pathname = location.pathname
    const newLinks = [
        { key: 0, icon: <MdDashboard fontSize={20} />, href: '/admin/dashboard', label: 'Dashboard' },
        { key: 1, icon: <TbReport fontSize={20} />, href: '/admin/dataPengaduan', label: 'Data Pengaduan' },
        { key: 2, icon: <ImExit fontSize={20} />, href: '/admin/logout', label: 'Logout' },
    ]
    return (
        <>
            <div className="flex flex-col h-full items-center w-full">
                <NavDashboard newLinks={newLinks} pathname={pathname} />
                <MainPengaduan />
            </div>
        </>
    )
}

export default DataPengaduan