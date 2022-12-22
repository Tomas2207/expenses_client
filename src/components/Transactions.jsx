import React, { useState } from 'react';
import add from '../assets/add.png';
import cross from '../assets/cross.png';
import NewExpense from './NewExpense';
import { useEffect } from 'react';
import SingleTransaction from './SingleTransaction';
import { monthNames } from '../utils/data';
import Barchart from './BarChart';
import PieChart from './PieChart';
import Budget from './Budget';

const Transactions = ({ getExpenses, expenses, years, getYear }) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  let dt = new Date();
  const initalValues = {
    year: dt.getFullYear().toString(),
    month: dt.getMonth().toString(),
  };
  const [formValues, setFormValues] = useState(initalValues);
  const [chartData, setChartData] = useState();
  const [pieData, setPieData] = useState();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const getChartData = async () => {
    const response = await fetch(
      `http://localhost:5000/expenses/chart?year=${formValues.year}`
    );
    const data = await response.json();
    setChartData(data);
  };
  const getPieData = async () => {
    const response = await fetch(
      `http://localhost:5000/expenses/pie?year=${formValues.year}&month=${formValues.month}`
    );
    const data = await response.json();
    setPieData(data);
  };

  useEffect(() => {
    getChartData();
    getPieData();
  }, [formValues.year]);

  useEffect(() => {
    getPieData();
  }, [formValues.month]);

  useEffect(() => {
    if (expenses) {
      setLoading(false);
    }
  }, [expenses]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-1/2  flex flex-col mx-auto my-10 font-light">
      <Budget years={years} chartData={chartData} />
      <div className="flex items-center my-2 gap-2 justify-between">
        <h2 className="text-2xl text-white font-normal">Transactions</h2>
        <button
          className="bg-neonPurple text-white p-1 rounded-md mt-auto self-end"
          onClick={() => setShowForm(!showForm)}
        >
          {!showForm ? (
            <img src={add} alt="add" className="h-6" />
          ) : (
            <img src={cross} alt="add" className="h-6" />
          )}
        </button>
      </div>
      <div>
        {years ? (
          <select
            name="year"
            id=""
            value={formValues.year}
            onChange={handleChange}
          >
            {years.map((year, i) => (
              <option value={year.date_part} key={i}>
                {year.date_part}
              </option>
            ))}
          </select>
        ) : null}
        <select
          name="month"
          id=""
          value={monthNames.indexOf(monthNames[formValues.month])}
          onChange={handleChange}
        >
          {monthNames.map((month, i) => (
            <option value={i}>{month}</option>
          ))}
        </select>
      </div>
      {/* <div>No Transactions here</div> */}
      {showForm ? (
        <NewExpense
          getExpenses={getExpenses}
          setShowForm={setShowForm}
          getYear={getYear}
          getChartData={getChartData}
          getPieData={getPieData}
        />
      ) : null}
      {pieData.length > 0 ? (
        <div>
          {expenses ? (
            <div className=" h-80 overflow-y-scroll overflow-x-hidden mb-10">
              {expenses.map((expense, i) => (
                <SingleTransaction
                  index={i}
                  category={expense.expense_category}
                  amount={expense.expense_amount}
                  date={expense.expense_date}
                  year={formValues.year}
                  month={formValues.month}
                  pieData={pieData}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div className=" h-80 overflow-y-scroll overflow-x-hidden mb-10">
          <div className="w-full text-center bg-neonPurple p-2 text-white rounded-sm mx-auto my-2">
            No expenses this month
          </div>
        </div>
      )}
      <div className="w-full flex items-center justify-center">
        <h2 className="text-white text-2xl p-4">{formValues.year}</h2>
        {chartData ? <Barchart data={chartData} /> : null}
        <h2 className="text-white text-2xl p-4">
          {monthNames[formValues.month]}
        </h2>
        <div>{chartData ? <PieChart data={pieData} /> : null}</div>
      </div>
    </div>
  );
};

export default Transactions;
