import React, { useState } from 'react';
import NewExpense from './NewExpense';
import { useEffect } from 'react';
import SingleTransaction from './SingleTransaction';
import { monthNames } from '../utils/data';
import Barchart from './BarChart';
import PieChart from './PieChart';
import NewIncome from './NewIncome';
import Selectors from './Selectors';
import SingleIncome from './SingleIncome';
import DisplayFormBtn from './DisplayFormBtn';
import { useContext } from 'react';
import { ValuesContext } from '../utils/Context';
import { GetCurrencyChange } from '../utils/CurrencyApi';
import { BarChartData, ChartDataIncome, PieData } from '../utils/chartsData';

const Transactions = (props) => {
  const { expenses, incomes, getUser, getExpenses, getIncomes } =
    useContext(ValuesContext);
  const [showForm, setShowForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  let dt = new Date();
  const initalValues = {
    year: dt.getFullYear().toString(),
    month: dt.getMonth().toString(),
  };
  const [formValues, setFormValues] = useState(initalValues);
  const [chartData, setChartData] = useState();
  const [chartDataIncome, setChartDataIncome] = useState();
  const [pieData, setPieData] = useState();
  const [currentUser, setCurrentUser] = useState();
  const { currentCurrency, setCurrentCurrency, rate, setRate } = props;

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleCurrencyChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    let value = e.target.value.split('-');
    setCurrentCurrency(value);
  };

  useEffect(() => {
    GetCurrencyChange(currentCurrency).then((data) => setRate(data.info.rate));
  }, [currentCurrency]);

  const getChartData = () => {
    BarChartData(formValues, currentUser).then((data) => {
      setChartData(data);
    });
  };

  const getChartDataIncome = () => {
    ChartDataIncome(formValues, currentUser).then((data) =>
      setChartDataIncome(data)
    );
  };

  const getPieData = () => {
    if (currentUser) {
      PieData(formValues, currentUser).then((data) => setPieData(data));
    }
  };

  useEffect(() => {
    getUser().then((data) => setCurrentUser(data));
  }, []);

  useEffect(() => {
    if (currentUser) {
      getChartData();
      getPieData();
      getChartDataIncome();
    }
  }, [formValues.year, currentUser, expenses, incomes]);

  useEffect(() => {
    getPieData();
  }, [formValues.month]);

  return (
    <div className="w-full flex flex-col px-5 md:px-10 lg:px-20 gap-10 mx-auto font-light items-center pb-20">
      <Selectors
        formValues={formValues}
        handleChange={handleChange}
        handleCurrencyChange={handleCurrencyChange}
      />
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-2 justify-between w-full">
        {/*------Transaction section------------*/}
        <div className="rounded-md px-2 h-[20rem] bg-bg lg:w-1/2 shadow-md shadow-neon2">
          <div className="flex items-center my-2 gap-2 justify-between ">
            <h2 className="text-3xl font-bold text-white">Transactions</h2>
            <DisplayFormBtn setShowForm={setShowForm} showForm={showForm} />
          </div>

          {showForm ? (
            <NewExpense
              setShowForm={setShowForm}
              getChartData={getChartData}
              getPieData={getPieData}
              currentUser={currentUser}
            />
          ) : null}

          {pieData?.length > 0 && expenses ? (
            <div className="w-full">
              {!showForm ? (
                <div className=" h-[15rem] overflow-y-scroll overflow-x-hidden mb-10">
                  {expenses.map((expense) => (
                    <SingleTransaction
                      key={expense.expense_id}
                      expense={expense}
                      formValues={formValues}
                      currentCurrency={currentCurrency}
                      rate={rate}
                      user={currentUser}
                      getExpenses={getExpenses}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
        {/* -------------------------- */}
        {/*--------------Income section----------- */}
        <div className="px-2 rounded-md h-[20rem] bg-bg lg:w-1/2 shadow-md shadow-neon2">
          <div className="flex items-center my-2 gap-2 justify-between ">
            <h2 className="text-3xl font-bold text-white">Income</h2>
            <DisplayFormBtn
              setShowForm={setShowIncomeForm}
              showForm={showIncomeForm}
            />
          </div>

          {!showIncomeForm ? (
            <div className="w-f">
              {incomes ? (
                <div className=" h-[15rem] overflow-y-scroll overflow-x-hidden mb-10">
                  {incomes.map((income, i) => (
                    <SingleIncome
                      key={income.income_id}
                      income={income}
                      formValues={formValues}
                      user={currentUser}
                      currentCurrency={currentCurrency}
                      rate={rate}
                      getIncomes={getIncomes}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <NewIncome
              setShowForm={setShowIncomeForm}
              getChartData={getChartDataIncome}
              currentUser={currentUser}
            />
          )}
        </div>
        {/* ----------------------------- */}
      </div>
      <div className="flex flex-col-reverse w-full gap-5 lg:gap-2 lg:flex-row items-center lg:items-end">
        {/*------- Bar chart ----------*/}
        <div className="px-5 pb-0 w-full lg:w-2/3 mx-auto flex flex-col bg-bg rounded-md shadow-md shadow-neon2 h-[39rem] box-border">
          <h2 className="text-4xl text-white font-bold m-3">
            {formValues.year}
          </h2>
          <div className="h-full">
            {chartData ? (
              <Barchart
                data={chartData}
                incomeData={chartDataIncome}
                rate={rate}
              />
            ) : null}
          </div>
        </div>
        {/* ------------------------------ */}
        {/*-------- Pie chart-------------- */}
        <div className="flex flex-col w-full lg:w-1/3 justify-start items-center bg-bg rounded-md shadow-md shadow-neon2 h-[39rem]">
          <h2 className="text-3xl font-bold p-4 text-white">
            {monthNames[formValues.month]}
          </h2>

          {chartData && pieData?.length > 0 ? (
            <div className="w-full sm:w-2/3 lg:w-full flex items-center justify-center h-[35rem] p-5 lg:p-0">
              <PieChart data={pieData} rate={rate} />
            </div>
          ) : (
            <div className="flex justify-self-start bg-neonPurple p-2 text-white rounded-sm mx-auto my-2">
              No expenses this month
            </div>
          )}
        </div>
        {/* ---------------------------------- */}
      </div>
    </div>
  );
};

export default Transactions;
