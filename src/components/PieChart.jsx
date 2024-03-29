import { Pie } from "react-chartjs-2";
const PieChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Status Pernikahan</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Presentase Status Pernikahan",
            }
          }
        }}
      />
    </div>
  );
}

export default PieChart