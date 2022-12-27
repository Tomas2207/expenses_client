import React, { useState } from 'react';
import add from '../assets/add.png';
import cross from '../assets/cross.png';
import NewExpense from './NewExpense';
import { useEffect } from 'react';
import SingleTransaction from './SingleTransaction';
import { chartArray, currencies, date_array, monthNames } from '../utils/data';
import Barchart from './BarChart';
import PieChart from './PieChart';
import Budget from './Budget';
import NewIncome from './NewIncome';
import Selectors from './Selectors';
import SingleIncome from './SingleIncome';
import DisplayFormBtn from './DisplayFormBtn';

const Transactions = (props) => {
  const { getExpenses, expenses, years, getYear, incomes, getIncomes } = props;
  const [showForm, setShowForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [loading, setLoading] = useState(true);
  let dt = new Date();
  const initalValues = {
    year: dt.getFullYear().toString(),
    month: dt.getMonth().toString(),
  };
  const [formValues, setFormValues] = useState(initalValues);
  const [chartData, setChartData] = useState();
  const [chartDataIncome, setChartDataIncome] = useState();
  const [pieData, setPieData] = useState();
  const [currentCurrency, setCurrentCurrency] = useState(['$', 'USD']);
  const [rate, setRate] = useState(1);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    console.log(formValues);
  };

  const handleCurrencyChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    let value = e.target.value.split('-');
    setCurrentCurrency(value);
  };

  var myHeaders = new Headers();
  myHeaders.append('apikey', process.env.REACT_APP_CURRENCY_API);

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };

  useEffect(() => {
    fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${currentCurrency[1]}&from=USD&amount=1`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setRate(result.info.rate))
      .catch((error) => console.log('error', error));
  }, [currentCurrency]);

  const getChartData = async () => {
    const response = await fetch(
      `http://localhost:5000/expenses/chart?year=${formValues.year}`
    );
    const data = await response.json();

    data.forEach((dat) => {
      date_array[dat.date_part - 1].amount = dat.amount;
      date_array[dat.date_part - 1].date_part = dat.date_part;
    });

    console.log('thearray', date_array);
    setChartData(date_array);
  };
  const getChartDataIncome = async () => {
    const response = await fetch(
      `http://localhost:5000/income/chart?year=${formValues.year}`
    );
    const data = await response.json();

    data.forEach((dat) => {
      date_array[dat.date_part - 1].income = dat.amount;
      date_array[dat.date_part - 1].date_part = dat.date_part;
    });

    console.log('theotherarray', date_array);
    setChartDataIncome(date_array);
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
    getChartDataIncome();
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
    <div className="w-full flex px-20 gap-10 mx-auto font-light items-center">
      <div className="rounded-md px-2 h-[40rem]">
        {/* <Budget years={years} chartData={chartData} /> */}
        <div className="flex items-center my-2 gap-2 justify-between ">
          <h2 className="text-2xl font-bold">Transactions</h2>
          <DisplayFormBtn setShowForm={setShowForm} showForm={showForm} />
        </div>
        <Selectors
          years={years}
          formValues={formValues}
          handleChange={handleChange}
          handleCurrencyChange={handleCurrencyChange}
        />

        {showForm ? (
          <NewExpense
            getExpenses={getExpenses}
            setShowForm={setShowForm}
            getYear={getYear}
            getChartData={getChartData}
            getPieData={getPieData}
          />
        ) : null}
        {!showForm ? (
          <div>
            {pieData.length > 0 ? (
              <div className="w-[25rem]">
                {expenses ? (
                  <div className=" h-[30rem] overflow-y-scroll overflow-x-hidden mb-10">
                    {expenses.map((expense, i) => (
                      <SingleTransaction
                        index={i}
                        category={expense.expense_category}
                        amount={expense.expense_amount}
                        date={expense.expense_date}
                        year={formValues.year}
                        month={formValues.month}
                        pieData={pieData}
                        currentCurrency={currentCurrency}
                        rate={rate}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className=" h-80 overflow-y-scroll overflow-x-hidden mb-10 w-[25rem]">
                <div className="w-[90%] text-center bg-neonPurple p-2 text-white rounded-sm mx-auto my-2">
                  No expenses this month
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
      <div className="px-2 rounded-md h-[40rem]">
        <div className="flex items-center my-2 gap-2 justify-between ">
          <h2 className="text-2xl font-bold">Income</h2>
          <DisplayFormBtn
            setShowForm={setShowIncomeForm}
            showForm={showIncomeForm}
          />
        </div>
        <Selectors
          years={years}
          formValues={formValues}
          handleChange={handleChange}
          handleCurrencyChange={handleCurrencyChange}
        />
        {!showIncomeForm ? (
          <div className="w-[25rem]">
            {incomes ? (
              <div className=" height-full overflow-y-scroll overflow-x-hidden mb-10">
                {incomes.map((income, i) => (
                  <SingleIncome
                    index={i}
                    amount={income.income_amount}
                    date={income.income_date}
                    year={formValues.year}
                    month={formValues.month}
                    pieData={pieData}
                    currentCurrency={currentCurrency}
                    rate={rate}
                  />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <NewIncome
            getIncomes={getIncomes}
            setShowForm={setShowIncomeForm}
            getYear={getYear}
            getChartData={getChartDataIncome}
          />
        )}
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold p-4">
            {monthNames[formValues.month]}
          </h2>
          <div className="flex justify-center">
            {chartData ? <PieChart data={pieData} rate={rate} /> : null}
          </div>
        </div>
        <h2 className="text-2xl">{formValues.year}</h2>
        <div className="w-full">
          {chartData ? (
            <Barchart
              data={chartData}
              incomeData={chartDataIncome}
              rate={rate}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
