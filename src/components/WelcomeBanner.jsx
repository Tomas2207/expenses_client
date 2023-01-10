import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import CountUp from 'react-countup';

const WelcomeBanner = ({ incomes, expenses, getUser, ...props }) => {
  const [sumIncome, setSumIncome] = useState();
  const [sumExpenses, setSumExpenses] = useState();
  const [budget, setBudget] = useState();
  const [currentUser, setCurrentUser] = useState('');
  const { currentCurrency, rate } = props;

  const getSumExpenses = () => {
    fetch(
      `${process.env.REACT_APP_ORIGIN_URL}/expenses/sum/${currentUser.user_id}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data[0].sum) setSumExpenses(data[0].sum);
        else setSumExpenses(0.0);
      });
  };

  const getSumIncome = () => {
    fetch(
      `${process.env.REACT_APP_ORIGIN_URL}/income/sum/${currentUser.user_id}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data[0].sum) setSumIncome(data[0].sum);
        else setSumIncome(0.0);
      });
  };

  useEffect(() => {
    getUser().then((data) => setCurrentUser(data));
  }, []);

  useEffect(() => {
    if (currentUser) {
      getSumExpenses();
      getSumIncome();
    }
  }, [incomes, expenses, currentUser]);

  useEffect(() => {
    if (sumIncome >= 0 && sumExpenses >= 0)
      setBudget(((sumIncome - sumExpenses) * rate).toFixed(2));
  }, [sumIncome, sumExpenses, rate]);

  return (
    <div className="px-5 md:px-10 lg:px-20 flex flex-col justify-start gap-2 items-start">
      <div>
        <h2 className="text-white text-3xl mt-6">
          Welcome Back, {currentUser?.user_name}
        </h2>
      </div>
      <div className="text-4xl flex text-bg px-6 py-8 my-4 bg-neon2 w-full md:w-2/3  rounded-xl h-52 relative overflow-hidden justify-between">
        <div className="flex flex-col">
          <h1 className="text-cyan-900 text-2xl">Budget</h1>
          <CountUp
            start={budget - budget / 2}
            end={budget}
            duration={1}
            separator=" "
            prefix={currentCurrency[0]}
            decimals={2}
          >
            {({ countUpRef }) => (
              <div
                ref={countUpRef}
                className={`${
                  budget < 0 ? 'text-red-600' : 'text-white font-bold'
                } text-3xl sm:text-5xl md:text-6xl`}
              >
                {'$' + budget}
              </div>
            )}
          </CountUp>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
