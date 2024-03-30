import { FaPerson, FaHandsHoldingCircle, FaDatabase } from "react-icons/fa6";
import { MdFamilyRestroom } from "react-icons/md";
import { useState, useEffect } from 'react';
import BarChart from "../components/BarChart";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import LineChart from "./LineChart";
import { getDataUser } from "../utils/api";
import Cookies from "js-cookie";
import TableAdminDashboard from '../components/TableAdminDashboard'

Chart.register(CategoryScale);

const MainDashboard = () => {
  const [totalPenduduk, setTotalPenduduk] = useState(0)
  const [totalPenduduk_1, setTotalPenduduk_1] = useState(0)
  const [totalPenduduk_21, setTotalPenduduk_21] = useState(0)
  const [totalPenduduk_41, setTotalPenduduk_41] = useState(0)
  const [totalPenduduk_SMK, setTotalPenduduk_SMK] = useState(0)
  const [totalPenduduk_SD, setTotalPenduduk_SD] = useState(0)
  const [totalPenduduk_SMP, setTotalPenduduk_SMP] = useState(0)
  const [totalPendudukSarjana, setTotalPendudukSarjana] = useState(0)
  const [totalTidakBersekolah, setTotalTidakBersekolah] = useState(0)
  const [totalUser, setTotalUsers] = useState([])
  const adminToken = Cookies.get('admintoken')

  useEffect(() => {
    const fetchData = async () => {
      const { error, users, total_penduduk, total_penduduk_1_20,
        total_penduduk_21_40, total_penduduk_41_60, total_penduduk_smk,
        total_penduduk_sd, total_penduduk_smp, total_penduduk_sarjana,
        total_penduduk_tidak_sekolah, sudah_menikah, belum_menikah,
        total_penduduk_pandanwangi, total_penduduk_beyan, total_penduduk_bencal,
        total_penduduk_butuh } = await getDataUser(adminToken)
      if (!error) {
        console.log(total_penduduk_sarjana)
        setTotalPenduduk(total_penduduk)
        setTotalPenduduk_1(total_penduduk_1_20)
        setTotalPenduduk_21(total_penduduk_21_40)
        setTotalPenduduk_41(total_penduduk_41_60)
        setTotalUsers(users)
        setTotalPenduduk_SD(total_penduduk_sd)
        setTotalPenduduk_SMP(total_penduduk_smp)
        setTotalPenduduk_SMK(total_penduduk_smk)
        setTotalPendudukSarjana(total_penduduk_sarjana)
        setTotalTidakBersekolah(total_penduduk_tidak_sekolah)
        const usiaPenduduk = [
          total_penduduk_1_20,
          total_penduduk_21_40,
          total_penduduk_41_60
        ]
        const statusPernikahan = [
          sudah_menikah, belum_menikah
        ]
        const dusun = [
          total_penduduk_pandanwangi, total_penduduk_beyan, total_penduduk_bencal,
          total_penduduk_butuh
        ]
        localStorage.setItem('usia_penduduk', JSON.stringify(usiaPenduduk))
        localStorage.setItem('status_pernikahan', JSON.stringify(statusPernikahan))
        localStorage.setItem('dusun', JSON.stringify(dusun))
        setChartData({
          ...chartData,
          datasets: [
            {
              ...chartData.datasets[0],
              data: [
                total_penduduk_1_20,
                total_penduduk_21_40,
                total_penduduk_41_60,
              ]
            }
          ]
        })
        setChartDataLine({
          ...chartDataLine,
          datasets: [
            {
              ...chartDataLine.datasets[0],
              data: [
                total_penduduk_sd, total_penduduk_smp, total_penduduk_smk, total_penduduk_sarjana, total_penduduk_tidak_sekolah
              ]
            }
          ]
        })
      }
    }
    fetchData()
  }, [])

  const [chartData, setChartData] = useState(() => {
    try {
      return {
        labels: ['1-20 Tahun', '21-40 Tahun', '41-60+ Tahun'],
        datasets: [
          {
            label: "Data Usia Penduduk",
            data: [totalPenduduk_1, totalPenduduk_21, totalPenduduk_41],
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      };
    } catch (error) {
      console.error("Error creating chart data:", error);
      return {
        labels: [],
        datasets: [],
      };
    }
  });
  const [chartDataLine, setChartDataLine] = useState(() => {
    try {
      return {
        labels: ['SD/MI', 'SMP/SLTP', 'SLTA/SMA/SMK/MA', 'Sarjana', 'Tdk Sekolah'],
        datasets: [
          {
            label: "Data Pendidikan",
            data: [totalPenduduk_SD, totalPenduduk_SMP, totalPenduduk_SMK, totalPendudukSarjana, totalTidakBersekolah],
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      };
    } catch (error) {
      console.error("Error creating chart data:", error);
      return {
        labels: [],
        datasets: [],
      };
    }
  });

  return (
    <div className="flex flex-col w-full overflow-auto">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center overflow-hidden w-full">
        <div className="p-4 flex flex-col bg-sky-600 border shadow-lg m-2 hover:bg-sky-700">
          <h4 className="text-slate-100 text-sm font-semibold text-center">Total Penduduk Terdata</h4>
          <FaDatabase className="mx-auto" color="white" fontSize={32} />
          <p className="text-xl font-semibold text-slate-100 text-center">{totalPenduduk}</p>
        </div>
        <div className="p-4 flex flex-col bg-sky-600 border shadow-lg m-2 hover:bg-sky-700">
          <h4 className="text-slate-100 text-sm font-semibold text-center">Penduduk Usia 1-20 Tahun</h4>
          <FaPerson className="mx-auto" color="white" fontSize={32} />
          <p className="text-xl font-semibold text-slate-100 text-center">{totalPenduduk_1}</p>
        </div>
        <div className="p-4 flex flex-col bg-sky-600 border shadow-lg m-2 hover:bg-sky-700">
          <h4 className="text-slate-100 text-sm font-semibold text-center">Penduduk Usia 21-40 Tahun</h4>
          <MdFamilyRestroom className="mx-auto" color="white" fontSize={32} />
          <p className="text-xl font-semibold text-slate-100 text-center">{totalPenduduk_21}</p>
        </div>
        <div className="p-4 flex flex-col bg-sky-600 border shadow-lg m-2 hover:bg-sky-700">
          <h4 className="text-slate-100 text-sm font-semibold text-center">Penduduk Usia 41-60+ Tahun</h4>
          <FaHandsHoldingCircle className="mx-auto" color="white" fontSize={32} />
          <p className="text-xl font-semibold text-slate-100 text-center">{totalPenduduk_41}</p>
        </div>
      </div>
      <div className="chart grid sm:grid-cols-2 gap-x-10 w-full">
        <BarChart chartData={chartData} />
        <LineChart chartData={chartDataLine} />
      </div>
      <div className=" ">
        <div className="overflow-x-auto">
          <TableAdminDashboard items={totalUser} itemsPerPage={5} />
        </div>
      </div>
    </div>
  )
}

export default MainDashboard