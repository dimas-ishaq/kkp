import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Layanan from "./pages/Layanan.jsx"
import Faq from "./pages/Faq.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import UserLogin from "./pages/UserLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import DataPenduduk from "./pages/DataPenduduk.jsx";
import DataPelayanan from "./pages/DataPelayanan.jsx";
import KelolaPenduduk from "./pages/KelolaPenduduk.jsx";
import DataPengaduan from "./pages/DataPengaduan.jsx";
import UserStatus from "./pages/UserStatus.jsx";
import UserSuratKelahiran from "./pages/userSuratKelahiran.jsx";
import UserSuratKematian from "./pages/UserSuratKematian.jsx";
import UserPengaduan from "./pages/UserPengaduan.jsx";
import UserSuratDomisili from "./pages/UserSuratDomisili.jsx";
import UserSuratSKTM from "./pages/UserSuratSKTM.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import UserRegister from "./pages/UserRegister.jsx";
import Logout from "./components/Logout.jsx";



const App = () => {
  AOS.init();
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/layanan' element={<Layanan />} />
      <Route path='/pertanyaan' element={<Faq />} />
      <Route path='/adminLogin' element={<AdminLogin />} />
      <Route path='/userLogin' element={<UserLogin />} />
      <Route path='/userRegister' element={<UserRegister />} />
      <Route path='/user/logout' element={<PrivateRoute role='user'><Logout role='user' /></PrivateRoute>} />
      <Route path='/admin/logout' element={<PrivateRoute role='admin'><Logout role='admin' /></PrivateRoute>} />
      <Route path='/admin/dashboard' element={<PrivateRoute role='user'><AdminDashboard /></PrivateRoute>} />
      <Route path='/admin/dataPenduduk' element={<PrivateRoute role='user'><DataPenduduk /></PrivateRoute>} />
      <Route path='/admin/dataPenduduk/kelolaPenduduk' element={<PrivateRoute role='user'><KelolaPenduduk /></PrivateRoute>} />
      <Route path='/admin/dataPelayanan' element={<PrivateRoute role='user'><DataPelayanan /></PrivateRoute>} />
      <Route path='/admin/dataPengaduan' element={<PrivateRoute role='user'><DataPengaduan /></PrivateRoute>} />
      <Route path='/user/dashboard' element={<PrivateRoute role='user'><UserDashboard /></PrivateRoute>} />
      <Route path='/user/status' element={<PrivateRoute role='user'><UserStatus /></PrivateRoute>} />
      <Route path='/user/suratKelahiran' element={<PrivateRoute role='user'><UserSuratKelahiran /></PrivateRoute>} />
      <Route path='/user/suratKematian' element={<PrivateRoute role='user'><UserSuratKematian /></PrivateRoute>} />
      <Route path='/user/suratDomisili' element={<PrivateRoute role='user'><UserSuratDomisili /></PrivateRoute>} />
      <Route path='/user/pengaduan' element={<PrivateRoute role='user'><UserPengaduan /></PrivateRoute>} />
      <Route path='/user/suratSKTM' element={<PrivateRoute role='user'><UserSuratSKTM /></PrivateRoute>} />
      <Route path='/user/profile' element={<PrivateRoute role='user'><UserProfile /></PrivateRoute>} />
    </Routes>
  )
}

export default App