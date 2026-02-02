"use client";
import {
  MonthlySalesofDistributorOrder,
  MonthlySalesofRetailerOrder,
} from "@/app/store/Actions/orderAction";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch } from "react-redux";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" },
    tooltip: {
      callbacks: {
        label: (ctx) => `₹ ${ctx.raw.toLocaleString()}`,
      },
    },
  },
};

const BarChart = () => {
  const [chartData, setChartData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const distributorRes = await dispatch(MonthlySalesofDistributorOrder());
      const retailerRes = await dispatch(MonthlySalesofRetailerOrder());

      const distributorData = distributorRes?.data?.monthlyData || [];
      const retailerData = retailerRes?.data?.monthlyData || [];

      // 1️⃣ Collect all months
      const allMonthsSet = new Set([
        ...distributorData.map((d) => d.month),
        ...retailerData.map((r) => r.month),
      ]);

      const allMonths = Array.from(allMonthsSet).sort(
        (a, b) => new Date(a) - new Date(b),
      );

      // 2️⃣ Create lookup maps (SALES)
      const distributorMap = {};
      distributorData.forEach((item) => {
        distributorMap[item.month] = Number(item.totalSales);
      });

      const retailerMap = {};
      retailerData.forEach((item) => {
        retailerMap[item.month] = Number(item.totalSales);
      });

      // 3️⃣ Build chart
      setChartData({
        labels: allMonths.map((month) =>
          new Date(month + "-01").toLocaleString("default", {
            month: "short",
          }),
        ),
        datasets: [
          {
            label: "Distributor Sales",
            data: allMonths.map((month) => distributorMap[month] || 0),
            backgroundColor: "#0095FF",
            yAxisID: "y1",
             barThickness: 10,
          },
          {
            label: "Retailer Sales",
            data: allMonths.map((month) => retailerMap[month] || 0),
            backgroundColor: "#00E096",
            yAxisID: "y2",
             barThickness: 10,
          },
        ],
        options: {
          scales: {
            y1: { position: "left" },
            y2: {
              position: "right",
              grid: { drawOnChartArea: false },
            },
          },
        },
      });
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="w-[90%] h-[90%] p-4">
      {chartData && <Bar data={chartData} options={options} />}
    </div>
  );
};

export default BarChart;
