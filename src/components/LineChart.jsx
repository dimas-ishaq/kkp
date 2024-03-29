import React from 'react'
import { Line } from "react-chartjs-2";
const LineChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Data Pendidikan Penduduk</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Retang Pendidikan Penduduk"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  )
}

export default LineChart