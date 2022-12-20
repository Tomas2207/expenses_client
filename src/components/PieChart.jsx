import React from 'react';
import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useEffect } from 'react';
import { monthNames } from '../utils/data';

const PieChart = (pieData) => {
  console.log(pieData.data);
  const [data, setData] = useState({ datasets: [] });
  useEffect(() => {
    if (pieData)
      setData({
        labels: pieData.data.map((data) => data.expense_category),
        datasets: [
          {
            label: 'Monthly Expenses',
            data: pieData.data.map((data) => data.amount),
          },
        ],
      });
  }, [pieData]);

  return <Pie data={data} />;
};

export default PieChart;
