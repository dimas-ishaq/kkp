import React from 'react'
import Chart from "chart.js/auto";
import DoughnutChart from './DoughnutChart';
import { useState, useEffect } from 'react';
import BarChart from './BarChart';
import { CategoryScale } from "chart.js";
import { getDashboardPenduduk } from '../utils/api'
import Cookies from 'js-cookie';


Chart.register(CategoryScale);


const MainPenduduk = () => {
    const dusun = JSON.parse(localStorage.getItem('dusun'))
    const [dataDusun, setDataDusun] = useState(() => {
        try {
            return {
                labels: ['Pandanwangi', 'Beyan', 'Bencal', 'Butuh'],
                datasets: [
                    {
                        label: "Data Persebaran Penduduk",
                        data: dusun,
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
    const statusPernikahan = localStorage.getItem('status_pernikahan')
    const [dataPernikahan, setDataPernikahan] = useState(() => {
        try {
            return {
                labels: ['Sudah Menikah', 'Belum Menikah',],
                datasets: [
                    {
                        label: "Data Usia Penduduk",
                        data: statusPernikahan,
                        backgroundColor: [
                            "#333A73",
                            "#FBA834",
                            "#f3ba2f",
                            "#333A73",
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
    const adminToken = Cookies.get('admintoken')
    const [dusunPandanwangi, setDusunPandanwangi] = useState([])
    const [dusunBeyan, setDusunBeyan] = useState([])
    const [dusunBencal, setDusunBencal] = useState([])
    const [dusunButuh, setDusunButuh] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const { error, data } = await getDashboardPenduduk(adminToken)
            if (!error) {
                const { total_bencal, total_beyan, total_butuh, total_pandanwangi, total_laki_laki_Bencal,
                    total_laki_laki_Beyan, total_laki_laki_Butuh, total_laki_laki_Pandanwangi, total_menikah_Bencal,
                    total_menikah_Beyan, total_menikah_Butuh, total_menikah_Pandanwangi,
                    total_pr_Bencal, total_pr_Beyan, total_pr_Butuh, total_pr_Pandanwangi,
                    total_smk_Bencal, total_smk_Beyan, total_smk_Butuh, total_smk_Pandanwangi,
                } = data
                setDusunPandanwangi(
                    {
                        total_laki_laki_Pandanwangi,
                        total_pr_Pandanwangi,
                        total_smk_Pandanwangi,
                        total_menikah_Pandanwangi,
                        total_pandanwangi
                    }
                )
                setDusunBeyan(
                    {
                        total_laki_laki_Beyan,
                        total_pr_Beyan,
                        total_smk_Beyan,
                        total_menikah_Beyan,
                        total_beyan
                    }
                )
                setDusunButuh(
                    {
                        total_laki_laki_Butuh,
                        total_pr_Butuh,
                        total_smk_Butuh,
                        total_menikah_Butuh,
                        total_butuh
                    }
                )
                setDusunBencal(
                    {
                        total_laki_laki_Bencal,
                        total_pr_Bencal,
                        total_smk_Bencal,
                        total_menikah_Bencal,
                        total_bencal
                    }
                )
            }
        }
        fetchData()
    }, [])




    return (
        <>
            <div className="flex flex-col w-full">
                <div className="grid grid-flow-dense  md:grid-cols-3 md:gap-x-5 gap-x-3 w-full items-center">
                    <div className="m-4 col-span-1 sm:col-span-2" >
                        <BarChart chartData={dataDusun} />
                    </div>
                    <div className="m-4 row-span-1">
                        <DoughnutChart chartData={dataPernikahan} />
                    </div>
                </div>
                <div id="penduduk-table">
                    <div className="flex flex-col w-full py-5">
                        <div className="border-2 rounded-lg ">
                            <div className="flex-col">
                                <div className="flex py-5">
                                    <div className="flex flex-col text-center mx-auto items-center">
                                        <h1 className="text-lg font-semibold">Data Penduduk</h1>
                                        <p className="text-sm font-light text-slate-600">Analisis data penduduk Desa Pandanwani, Kec. Diwek, Kab. Jombang</p>
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
                                                                Sudah Menikah
                                                            </th>
                                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                Total Penduduk
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
                                                                {dusunPandanwangi.total_laki_laki_Pandanwangi}
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {dusunPandanwangi.total_pr_Pandanwangi}
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {dusunPandanwangi.total_smk_Pandanwangi}
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {dusunPandanwangi.total_menikah_Pandanwangi}
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {dusunPandanwangi.total_pandanwangi}
                                                            </td>
                                                        </tr>
                                                        <tr className="bg-gray-100 border-b">
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                Beyan
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {dusunBeyan.total_laki_laki_Beyan}
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {dusunBeyan.total_pr_Beyan}
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {dusunBeyan.total_smk_Beyan}
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {dusunBeyan.total_menikah_Beyan}
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {dusunBeyan.total_beyan}
                                                            </td>
                                                        </tr>
                                                        <tr className="bg-gray-100 border-b">
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                Butuh
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {dusunButuh.total_laki_laki_Butuh}
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {dusunButuh.total_pr_Butuh}
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {dusunButuh.total_smk_Butuh}
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {dusunButuh.total_menikah_Butuh}
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {dusunButuh.total_butuh}
                                                            </td>
                                                        </tr>
                                                        <tr className="bg-gray-100 border-b">
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">4</td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                Bencal
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {dusunBencal.total_laki_laki_Bencal}
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {dusunBencal.total_pr_Bencal}
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {dusunBencal.total_smk_Bencal}
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {dusunBencal.total_menikah_Bencal}
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {dusunBencal.total_bencal}
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