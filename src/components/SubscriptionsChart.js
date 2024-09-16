// src/components/SubscriptionsChart.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { SubscriptionsCount } from '../api/apiService';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const SubscriptionsChart = ({ subscriptions }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SubscriptionsCount(); // Call your API method to fetch data
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subscriptions]); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const labels = data.map(item => formatDate(item._id));
  const exteriorCounts = data.map(item => item.exteriorCount);
  const interiorCounts = data.map(item => item.interiorCount);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Exterior Count',
        data: exteriorCounts,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
      },
      {
        label: 'Interior Count',
        data: interiorCounts,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            if (label) {
              return `${label}: ${context.parsed.y}`;
            }
            return context.parsed.y;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-800">
      <div className="container w-full max-w-4xl bg-white border border-gray-300 rounded-lg shadow-md p-4 dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-4 text-center">Subscriptions Chart</h1>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SubscriptionsChart;
