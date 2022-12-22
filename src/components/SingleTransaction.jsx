import { useEffect, useState } from 'react';

const { monthNames } = require('../utils/data');

const SingleTransaction = (props) => {
  let date = props.date;
  if (props.pieData.length === 0) console.log('hmm');
  console.log(props.pieData);
  let called = false;

  date = date.split('-');
  if (props.year === date[0] && props.month == date[1] - 1)
    return (
      <div
        key={props.index}
        className="w-full flex justify-between items-center bg-neonPurple p-2 text-white rounded-sm mx-auto my-2"
      >
        <div className="flex gap-2">
          <img
            src={require(`../assets/${props.category}.png`)}
            alt="category"
            className="h-12"
          />
          <div>
            <div className=" text-2xl font-normal">{'$' + props.amount}</div>
            <div>{props.category}</div>
          </div>
        </div>

        <div>{date[0] + ' ' + monthNames[date[1] - 1] + ' ' + date[2]}</div>
      </div>
    );
};

export default SingleTransaction;
