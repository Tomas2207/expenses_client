import React from 'react';
import transactions from '../../assets/transactions.png';
import budget_hero from '../../assets/budget_hero.png';
import visual_data from '../../assets/visual_data.svg';
import CTA from './CTA';

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
      <CTA />
    </div>
  );
};

export default Info;
