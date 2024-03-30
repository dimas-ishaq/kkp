import React from 'react'
import { Doughnut } from 'react-chartjs-2';
const DoughnutChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Status Pernikahan</h2>
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Presentase Status Pernikahan"
            }
          }
        }}
      />
    </div>
  );
}

export default DoughnutChart