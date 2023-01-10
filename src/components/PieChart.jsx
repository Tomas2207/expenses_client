import React from 'react';
import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useEffect } from 'react';
import { monthNames } from '../utils/data';

const PieChart = (props) => {
  const [data, setData] = useState({ datasets: [] });
  useEffect(() => {
    if (props.data)
      setData({
        labels: props.data.map((data) => data.expense_category),
        datasets: [
          {
            label: 'Monthly Expenses',
            data: props.data.map((data) =>
              (data.amount * props.rate).toFixed(2)
            ),
          },
        ],
      });
  }, [props.data, props.rate]);

  return (
    <Pie
      data={data}
      options={{
        plugins: {
          legend: {
            labels: {
              color: 'white',
            },
          },
        },
      }}
    />
  );
};

export default PieChart;
