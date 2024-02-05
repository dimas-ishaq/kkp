import { FaPerson, FaHandsHoldingCircle, FaDatabase } from "react-icons/fa6";
import { MdFamilyRestroom } from "react-icons/md";
import { useState } from 'react';
import BarChart from "../components/BarChart";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import Data from "../assets/Data";
import LineChart from "./LineChart";


Chart.register(CategoryScale);

const MainDashboard = () => {

  const [chartData, setChartData] = useState(() => {
    try {
      return {
        labels: Data.map((item) => item.year),
        datasets: [
          {
            label: "Users Gained",
            data: Data.map((item) => item.userGain),
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
          <p className="text-xl font-semibold text-slate-100 text-center">1582</p>
        </div>
        <div className="p-4 flex flex-col bg-sky-600 border shadow-lg m-2 hover:bg-sky-700">
          <h4 className="text-slate-100 text-sm font-semibold text-center">Penduduk Usia 1-20 Tahun</h4>
          <FaPerson className="mx-auto" color="white" fontSize={32} />
          <p className="text-xl font-semibold text-slate-100 text-center">628</p>
        </div>
        <div className="p-4 flex flex-col bg-sky-600 border shadow-lg m-2 hover:bg-sky-700">
          <h4 className="text-slate-100 text-sm font-semibold text-center">Penduduk Usia 21-40 Tahun</h4>
          <MdFamilyRestroom className="mx-auto" color="white" fontSize={32} />
          <p className="text-xl font-semibold text-slate-100 text-center">628</p>
        </div>
        <div className="p-4 flex flex-col bg-sky-600 border shadow-lg m-2 hover:bg-sky-700">
          <h4 className="text-slate-100 text-sm font-semibold text-center">Penduduk Usia 41-60 Tahun</h4>
          <FaHandsHoldingCircle className="mx-auto" color="white" fontSize={32} />
          <p className="text-xl font-semibold text-slate-100 text-center">628</p>
        </div>
      </div>
      <div className="chart grid sm:grid-cols-2 gap-x-10 w-full">
        <BarChart chartData={chartData} />
        <LineChart chartData={chartData} />
      </div>
      <div className="table p-10">
        <div className="flex flex-col w-full h-full overflow-x-auto text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Name
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Job
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Employed
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    John Michael
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    Manager
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    23/04/18
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <a href="#" className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                    Edit
                  </a>
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    Alexa Liras
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    Developer
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    23/04/18
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <a href="#" className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                    Edit
                  </a>
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    Laurent Perrier
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    Executive
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    19/09/17
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <a href="#" className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                    Edit
                  </a>
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    Michael Levi
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    Developer
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    24/12/08
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <a href="#" className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                    Edit
                  </a>
                </td>
              </tr>
              <tr>
                <td className="p-4">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    Richard Gran
                  </p>
                </td>
                <td className="p-4">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    Manager
                  </p>
                </td>
                <td className="p-4">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    04/10/21
                  </p>
                </td>
                <td className="p-4">
                  <a href="#" className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                    Edit
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

  )
}

export default MainDashboard