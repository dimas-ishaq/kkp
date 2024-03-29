import React, { createContext, useContext, useState, useEffect } from 'react';
import { onUserAuth, onAdminAuth } from '../utils/api'; // Anda mungkin perlu menyesuaikan ini sesuai dengan struktur API Anda
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// Membuat context untuk admin dan pengguna
const AuthContext = createContext();
const AdminAuthContext = createContext();

// Membuat provider untuk admin dan pengguna
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userdata')) || null);
  const userToken = Cookies.get('usertoken');
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = async () => {
      try {
        const { user } = await onUserAuth(userToken);
        if (user !== null) {
          localStorage.setItem('userdata', JSON.stringify(user));
          setUser(user);
        }
      } catch (error) {
        console.error('Terjadi kesalahan saat mengautentikasi pengguna:', error);
      }
    };
    authUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('userdata');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(localStorage.getItem('admindata') || null);
  const adminToken = Cookies.get('admintoken');
  const navigate = useNavigate();

  useEffect(() => {
    const authAdmin = async () => {
      try {
        const { admin } = await onAdminAuth(adminToken);
        if (admin) {
          setAdmin(admin);
          localStorage.setItem('admindata', JSON.stringify(admin));
        }
      } catch (error) {
        console.error('Terjadi kesalahan saat mengautentikasi admin:', error);
      }
    };
    authAdmin();
  }, []);

  const adminLogin = (adminData) => {
    setAdmin(adminData);
  };

  const adminLogout = () => {
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, adminLogin, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

// Custom hook untuk penggunaan context pengguna
export const useAuth = () => useContext(AuthContext);

// Custom hook untuk penggunaan context admin
export const useAdminAuth = () => useContext(AdminAuthContext);
