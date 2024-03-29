import { Bar } from "react-chartjs-2";

const BarChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Data Usia Penduduk</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Rentang Usia Penduduk"
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
export default BarChart