import React from 'react';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useEffect } from 'react';
import { monthNames } from '../utils/data';

const Barchart = (chartData) => {
  const [data, setData] = useState({ datasets: [] });

  useEffect(() => {
    if (chartData)
      setData({
        labels: chartData.data.map((data) => monthNames[data.date_part - 1]),
        datasets: [
          {
            label: 'Monthly Expenses',
            backgroundColor: '#900d09',
            data: chartData.data.map((data) => data.amount),
          },
        ],
      });
  }, [chartData]);

  return <Bar data={data} />;
};

export default Barchart;
