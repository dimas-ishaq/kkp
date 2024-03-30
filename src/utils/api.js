import axios from "axios"
import Cookies from "js-cookie"
const api = "http://127.0.0.1:5000/api"


const onLogin = async (formData) => {
  try {
    const response = await axios.post(`${api}/userLogin`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Perhatikan pengaturan tipe konten ke 'multipart/form-data'
      }
    });
    const token = response.data.token;
    const user = response.data.user;

    Cookies.set("usertoken", token, { expires: 1 });
    localStorage.setItem("userdata", JSON.stringify(user))
    // Mengembalikan objek hasil tanpa kesalahan dan dengan data pengguna
    return { error: false, user: user };
  } catch (error) {
    // Mengembalikan objek hasil dengan kesalahan dan tanpa data pengguna
    return { error: true, user: null };
  }
}

const handleFormKelahiran = async (data, token) => {
  await axios.post(`${api}/user/suratKelahiran`, data, {
    headers: {
      Authorization: `Bearer ${token}`

    }
  }).then(() => {
    return ({ error: false })
  }).catch(() => {
    return ({ error: true })
  })
}

const handleFormKematian = async (data, token) => {
  await axios.post(`${api}/user/suratKematian`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(() => {
    return ({ error: false })
  }).catch(() => {
    return ({ error: true })
  })
}

const handleFormDomisili = async (data, usertoken) => {
  console.log('hello')
  try {
    const response = await axios.post(`${api}/user/suratDomisili`, data, {
      headers: {
        Authorization: `Bearer ${usertoken}`
      }
    })
    console.log(response.data)
    return { error: false }
  } catch (error) {
    return { error: true }
  }

}

const handleFormSktm = async (data, usertoken) => {
  await axios.post(`${api}/user/suratSKTM`, data, {
    headers: {
      Authorization: `Bearer ${usertoken}`
    }
  }).then(() => {
    return ({ error: false })
  }).catch(() => {
    return ({ error: true })
  })
}

const handleFormPengaduan = async (data, usertoken) => {
  await axios.post(`${api}/user/pengaduan`, data, {
    headers: {
      Authorization: `Bearer ${usertoken}`,
      "Content-Type": "multipart/form-data"
    }
  }).then(() => {
    return ({ error: false })
  }).catch(() => {
    return ({ error: true })
  })

}

const onUserAuth = async (usertoken) => {
  try {
    if (!usertoken) {
      return { error: true, user: null };
    }

    const response = await axios.get(`${api}/userLogin`, {
      headers: {
        Authorization: `Bearer ${usertoken}`
      }
    });
    return { error: false, user: response.data.user };

  } catch (error) {
    console.error("Error in onUserAuth:", error);
    return { error: true, user: null };
  }
}


const getUserStatus = async (usertoken) => {

  try {
    const response = await axios.get(`${api}/user/status`, {
      headers: {
        Authorization: `Bearer ${usertoken}`
      }
    });
    const { Kelahiran, Kematian, Domisili, SKTM } = response.data;
    return { Kelahiran, Kematian, Domisili, SKTM };
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil status pengguna:', error);
    return { error: true, message: error.message };
  }
};

const onRegister = async (data) => {
  try {
    await axios.post(`${api}/register`, data);
    return { error: false, message: 'aman' };
  } catch (error) {
    return { error: true, message: error.response.data?.message };
  }
}

const handleUpdateProfile = async (data, token) => {
  try {
    const response = await axios.put(`${api}/user/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }

    });
    const newtoken = response.data.newtoken
    const user = response.data.user
    localStorage.setItem('userdata', JSON.stringify(user))
    Cookies.set("usertoken", newtoken)
    console.log(response.data?.message)
    return { error: false, message: response.data?.message }
  } catch (error) {
    console.log(error.response.data?.message);
    return { error: true, message: error.response.data?.message }
  }
}

const handleUpdatePassword = async (password, token) => {
  try {
    const response = await axios.put(`${api}/user/profile/password`, password, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return { error: false, message: response.data?.message }
  } catch (error) {
    return { error: true, message: error.response.data?.message }
  }
}

const handleDeleteDataStatus = async (token, item_id, jenis) => {
  try {
    const response = await axios.delete(`${api}/user/status`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        item_id: item_id,
        jenis: jenis
      }
    });
    return { error: false, message: "Successfully deleted data" };
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil status pengguna:', error);
    return { error: true, message: error.response.data?.message };
  }
}

// ADMIN HANDLER

const onAdminLogin = async (data) => {
  try {
    const response = await axios.post(`${api}/adminLogin`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    const token = response.data.token
    Cookies.set('admintoken', token, { expires: 1 })
    return { error: false, message: 'Berhasil login' }
  } catch (error) {
    return { error: true, message: error.response.data?.message }
  }
}

const onAdminAuth = async (admintoken) => {
  try {
    if (!admintoken) {
      return { error: true, user: null };
    }
    const response = await axios.get(`${api}/adminLogin`, {
      headers: {
        Authorization: `Bearer ${admintoken}`
      }
    });
    return { error: false, admin: true };
  } catch (error) {
    console.log("Error in onUserAuth:", error);
    return { error: true, admin: false };
  }
}

const handlerSubmitPenduduk = async (data, admintoken) => {
  try {
    const response = await axios.post(`${api}/admin/dataPenduduk/kelolaPenduduk`, data, {
      headers: {
        Authorization: `Bearer ${admintoken}`
      }
    })
    console.log(response.data.result)
    return { error: false, message: 'Data berhasil disimpan' }
  } catch (error) {
    return { error: true, message: error.response.data.message }
  }
}

const getDataPenduduk = async (admintoken) => {
  try {
    const response = await axios.get(`${api}/admin/dataPenduduk/kelolaPenduduk`, {
      headers: {
        Authorization: `Bearer ${admintoken}`
      }
    })
    return { error: false, data: response.data }
  } catch (error) {
    return { error: true, }
  }
}

const getDataUser = async (admintoken) => {
  try {
    const response = await axios.get(`${api}/admin/dashboard`, {
      headers: {
        Authorization: `Bearer ${admintoken}`
      }
    })
    const { users, total_penduduk, total_penduduk_1_20,
      total_penduduk_21_40, total_penduduk_41_60, total_penduduk_smk,
      total_penduduk_sd, total_penduduk_smp, total_penduduk_sarjana,
      total_penduduk_tidak_sekolah, sudah_menikah, belum_menikah,
      total_penduduk_pandanwangi, total_penduduk_beyan, total_penduduk_bencal,
      total_penduduk_butuh } = response.data
    return {
      error: false, users, total_penduduk, total_penduduk_1_20,
      total_penduduk_21_40, total_penduduk_41_60, total_penduduk_smk,
      total_penduduk_sd, total_penduduk_smp, total_penduduk_sarjana,
      total_penduduk_tidak_sekolah, sudah_menikah, belum_menikah,
      total_penduduk_pandanwangi, total_penduduk_beyan, total_penduduk_bencal,
      total_penduduk_butuh
    }
  } catch (error) {
    console.log(error)
  }
}

const getDashboardPenduduk = async (admintoken) => {
  try {
    const response = await axios.get(`${api}/admin/dataPenduduk`, {
      headers: {
        Authorization: `Bearer ${admintoken}`
      }
    })
    const { ...data } = response.data
    console.log(data)
    return { error: false, data: data }
  } catch (error) {
    console.log('Error : ', error)
  }
}

const getDataLayanan = async (admintoken) => {
  try {
    const response = await axios.get(`${api}/admin/dataPelayanan`, {
      headers: {
        Authorization: `Bearer ${admintoken}`
      }
    })
    const { total_surat, total_diterima, total_ditolak, kelahiran, kematian, domisili, sktm } = response.data
    return { error: false, total_surat, total_diterima, total_ditolak, kelahiran, kematian, domisili, sktm }
  } catch (error) {
    return { error: false }
  }
}

const handleValidateSurat = async (admintoken, data) => {
  try {
    const response = await axios.put(`${api}/admin/dataPelayanan`, data, {
      headers: {
        Authorization: `Bearer ${admintoken}`
      }
    })
    const status = response.data
    console.log((status))
    return { error: false, message: 'Berhasil Validasi Surat' }
  } catch (error) {
    return { error: true, message: 'Gagal Validasi Surat' }
  }

}


const getDataPengaduan = async (admintoken) => {
  try {
    const response = await axios.get(`${api}/admin/dataPengaduan`, {
      headers: {
        Authorization: `Bearer ${admintoken}`
      }
    })
    const { data, total, total_pending, total_diterima } = response.data
    return { error: false, data, total, total_pending, total_diterima }
  } catch (error) {
    return { error: true }
  }
}

const changeStatusPengaduan = async (admintoken, data) => {
  try {
    const response = await axios.put(`${api}/admin/dataPengaduan`, data, {
      headers: {
        Authorization: `Bearer ${admintoken}`
      }
    })
    const res = response.data.result
    return { error: false, res }
  } catch (error) {
    return { error: true }
  }
}

const handleEditDataPenduduk = async (admintoken, data) => {

  try {
    const response = await axios.put(`${api}/admin/dataPenduduk/kelolaPenduduk`, data, {
      headers: {
        Authorization: `Bearer ${admintoken}`
      }
    })

    const res = response.data
    console.log(res)
    return { error: false, message: 'Data berhasil diperbaharui' }
  } catch (error) {
    return { error: true, message: 'Data gagal diperbaharui' }

  }

}

const handleDeleteDataPenduduk = async (admintoken, id) => {
  try {
    const response = await axios.delete(`${api}/admin/dataPenduduk/kelolaPenduduk`, {
      headers: {
        Authorization: `Bearer ${admintoken}`,
      },
      params: {
        doc_id: id
      }
    })

    const res = response.data
    console.log(res)
    return { error: false, message: 'Data berhasil dihapus' }
  } catch (error) {
    return { error: true, message: 'Data gagal dihapus' }

  }

}

const getPendudukById = () => {

}


export {
  handleFormKelahiran, handleFormKematian,
  handleFormDomisili, handleFormSktm, handleFormPengaduan,
  onUserAuth, getUserStatus, onLogin, onRegister, handleUpdateProfile,
  handleUpdatePassword, handleDeleteDataStatus, onAdminLogin, onAdminAuth, handlerSubmitPenduduk,
  getDataPenduduk, getDataUser, getDashboardPenduduk, getDataLayanan, handleValidateSurat,
  getDataPengaduan, changeStatusPengaduan, handleEditDataPenduduk, handleDeleteDataPenduduk
}