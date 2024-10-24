import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ change }) => {
  const [data, setData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Jobs',
        data: [],
        fill: true,
        borderColor: '#7bdcbd',
        tension: 1,
      },
      {
        label: 'Workers',
        data: [],
        fill: true,
        borderColor: 'orange',
        tension: 1,
      },
    ],
  });

  // دالة لتوليد بيانات عشوائية
  const generateRandomData = () => {
    return [
      Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)), // بيانات عشوائية للوظائف
      Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)), // بيانات عشوائية للعمال
    ];
  };

  useEffect(() => {
    const [jobsData, workersData] = generateRandomData();
    setData((prevData) => ({
      ...prevData,
      datasets: [
        { ...prevData.datasets[0], data: jobsData },
        { ...prevData.datasets[1], data: workersData },
      ],
    }));
  }, [change]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
