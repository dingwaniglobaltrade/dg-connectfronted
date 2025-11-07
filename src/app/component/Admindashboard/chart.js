// components/BarChart.js
"use client";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Orders",
      data: [400, 300, 500, 600, 600, 600, 600],
      backgroundColor: "#0095FF",
      barThickness: 10,
    },
    {
      label: "Returns",
      data: [300, 200, 404, 500, 200, 200, 200],
      backgroundColor: "#00E096",
      barThickness: 10,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
  scales: {
    x: {
      grid: {
        display: false, 
      },
    },
    y: {
      grid: {
        display: true, 
      },
    },
  },
};

const BarChart = () => {
  return (
    <div className="w-[90%] h-[90%] p-4 ">
      <Bar className="" data={data} options={options} />
    </div>
  );
};

export default BarChart;
