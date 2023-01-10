import React from 'react';
import transactions from '../../assets/transactions.png';
import budget_hero from '../../assets/budget_hero.png';
import visual_data from '../../assets/visual_data.svg';

const Info = () => {
  return (
    <div className="text-white flex flex-col gap-20  items-centers">
      <div className="flex flex-col-reverse lg:flex-row justify-start gap-10 items-center">
        <img src={budget_hero} alt="budget hero" className="rounded-md" />
        <div>
          <h2 className="text-3xl font-bold border-b border-b-neon2 mb-2">
            Visualize your budget
          </h2>
          <p className="text-xl">
            Easily visualize the result of your expenses and income
          </p>
        </div>
      </div>
      <div className="flex  flex-col lg:flex-row  justify-end gap-2 items-center">
        <div>
          <h2 className="text-3xl font-bold border-b border-b-neon2 mb-2">
            Track your expenses and income
          </h2>
          <p className="text-xl">Add every income and transaction</p>
        </div>
        <img src={transactions} alt="transactions" className="rounded-md" />
      </div>
      <div className="flex flex-col-reverse lg:flex-row  justify-start gap-2 items-center">
        <img src={visual_data} alt="data chart" className="rounded-md filter" />
        <div>
          <h2 className="text-3xl font-bold border-b border-b-neon2 mb-2">
            Use data charts
          </h2>
          <p className="text-xl">
            All your data on intuitive charts, tracking both yearly and monthly
            expenses
          </p>
        </div>
      </div>
      <div className="bg-neon2 px-2 md:p-4 self-center md:2/3 lg:w-1/2 rounded-md h-[20rem] flex flex-col items-center">
        <div className="my-10 text-center">
          <h2 className="font-bold text-3xl md:text-4xl">
            Start using Expense Manager!
          </h2>
          <p className="text-lg md:text-xl text-bg">
            And make tracking your finances easy.
          </p>
        </div>
        <a href="/login">
          <button className="bg-bg px-4 py-1 md:py-2 rounded-md my-4 font-bold text-2xl w-52 hover:brightness-150 duration-150">
            Get Started
          </button>
        </a>
      </div>
    </div>
  );
};

export default Info;
