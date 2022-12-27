import { useEffect, useState } from 'react';

const { monthNames } = require('../utils/data');

const SingleTransaction = (props) => {
  let date = props.date;
  let title = props.category.charAt(0).toUpperCase() + props.category.slice(1);

  date = date.split('-');
  if (props.year === date[0] && props.month == date[1] - 1)
    return (
      <div
        key={props.index}
        className="w-[95%] flex justify-between items-center text-gray-700 p-2 bg-blue-300 rounded-xl mx-auto my-2"
      >
        <div className="flex gap-2">
          <img
            src={require(`../assets/${props.category}.png`)}
            alt="category"
            className="h-12 "
          />
          <div>
            <div className=" text-2xl font-normal">
              {props.currentCurrency[0] +
                (props.amount * props.rate).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </div>
            <div>{title}</div>
          </div>
        </div>

        <div>{date[0] + ' ' + monthNames[date[1] - 1] + ' ' + date[2]}</div>
      </div>
    );
};

export default SingleTransaction;
