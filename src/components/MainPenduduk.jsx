import React from 'react'
import Chart from "chart.js/auto";
import DoughnutChart from './DoughnutChart';
import { useState } from 'react';
import Data from '../assets/Data';
import BarChart from './BarChart';
import { CategoryScale } from "chart.js";


Chart.register(CategoryScale);


const MainPenduduk = () => {
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
        <>
            <div className="flex flex-col w-full">
                <div className="grid grid-flow-dense  md:grid-cols-3 md:gap-x-5 gap-x-3 w-full items-center">
                    <div className="m-4 col-span-1 sm:col-span-2" >
                        <BarChart chartData={chartData} />
                    </div>
                    <div className="m-4 row-span-1">
                        <DoughnutChart chartData={chartData} />
                    </div>
                </div>
                <div id="penduduk-table">
                    <div className="flex flex-col w-full py-5">
                        <div className="border-2 rounded-lg ">
                            <div className="flex-col">
                                <div className="flex py-5">
                                    <div className="flex flex-col text-center mx-auto items-center">
                                        <h1 className="text-lg font-semibold">Data Penduduk</h1>
                                        <p className="text-sm font-light text-slate-600">A list of all the users in your account including their name, title, email and role.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                            <div className="overflow-hidden">
                                                <table className="min-w-full">
                                                    <thead className="bg-white border-b">
                                                        <tr>
                                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                No
                                                            </th>
                                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                Dusun
                                                            </th>
                                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                Laki-Laki
                                                            </th>
                                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                Perempuan
                                                            </th>
                                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                Tamat SMA/SMK/MA
                                                            </th>
                                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                Bekerja
                                                            </th>
                                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                Sudah Menikah
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="bg-gray-100 border-b">
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                Pandanwangi
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                1529
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                1761
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                852
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                485
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                485
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPenduduk