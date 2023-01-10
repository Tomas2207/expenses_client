import React from 'react';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useEffect } from 'react';
import { monthNames } from '../utils/data';

const Barchart = (props) => {
  const [data, setData] = useState({ datasets: [] });

  useEffect(() => {
    if (props.data && props.incomeData)
      setData({
        labels: props.data.map((data) => monthNames[data.date_part - 1]),
        datasets: [
          {
            label: 'Monthly Expenses',
            backgroundColor: '#00c9ff',
            borderColor: '#4666FF',
            data: props.data.map((data) =>
              (data.amount * props.rate).toFixed(2)
            ),
          },
          {
            label: 'Income',
            backgroundColor: '#f472b6',
            borderColor: '#f472b6',
            data: props.incomeData.map((data) =>
              (data.income * props.rate).toFixed(2)
            ),
          },
        ],
      });
  }, [props]);

  return (
    <Bar
      data={data}
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: 'white',
            },
          },
        },
        scales: {
          y: {
            grid: {
              drawBorder: true,
              color: 'gray',
            },
            ticks: {
              color: 'white',
              fontSize: 12,
            },
          },
          x: {
            ticks: {
              color: 'white',
              fontSize: 12,
            },
          },
        },
      }}
    />
  );
};

export default Barchart;
