import React, { useEffect, useState } from 'react';

const Budget = (props) => {
  const [showBudget, setShowBudget] = useState();
  //loop through all months and sum the monthly income since a date that user inputs
  const [showIncomeInput, setShowIncomeInput] = useState(false);
  const [incomeInput, setIncomeInput] = useState('');
  const [monthlyIncome, setIncome] = useState();
  const [budget, setBudget] = useState(0);
  const [amount, setAmount] = useState(0);
  const [finalBudget, setFinalBudget] = useState(0);
  // const firstMonth = props.chartData[0].date_part;
  // const lastMonth = props.chartData[props.chartData.length - 1].date_part;

  const getYearExpenses = async (year) => {
    console.log('called');
    const response = await fetch(
      `http://localhost:5000/expenses/chart?year=${year}`
    );
    const data = await response.json();
    return data;
  };

  const getIncome = async () => {
    const response = await fetch('http://localhost:5000/income');
    const data = await response.json();
    setIncome(data[0].income_amount);
  };

  const budgetCalc = () => {
    setBudget(0);
    setAmount(0);
    props.years.forEach((year) => {
      getYearExpenses(year.date_part).then((data) => {
        console.log(year.date_part);
        data.forEach((value) => {
          setAmount((prev) => prev + parseFloat(value.amount));
        });
        setBudget(
          (prev) =>
            prev +
            monthlyIncome *
              (data[data.length - 1].date_part - data[0].date_part + 1)
        );
      });

      // console.log(amount);
      console.log(budget);
    });
  };

  useEffect(() => {});

  useEffect(() => {
    console.log('final budget', budget);
    console.log('final amount', amount);
    if (amount > 0 && budget > 0) setFinalBudget((budget - amount).toFixed(2));
  }, [amount, budget]);

  // const budgetCalc = () => {
  //   console.log();
  //   // let finalBudget = monthlyIncome * props.chartData.length;
  //   let finalBudget = monthlyIncome * (lastMonth - firstMonth + 1);
  //   props.chartData.forEach((month) => {
  //     finalBudget = finalBudget - month.amount;
  //   });
  //   setBudget(finalBudget.toFixed(2));
  // };

  useEffect(() => {
    if ((budget === 0) & (amount === 0)) {
      budgetCalc();
    }
  }, [amount, budget]);

  const reset = () => {
    setAmount(0);
    setBudget(0);
  };

  useEffect(() => {
    if (monthlyIncome) {
      reset();
      // budgetCalc();
    }
  }, [monthlyIncome]);

  useEffect(() => {
    // budgetCalc();
    reset();
  }, [props]);

  const postIncome = () => {
    const body = {
      income_amount: incomeInput,
    };
    fetch(`http://localhost:5000/income`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  };

  const handleChange = (e) => {
    setIncomeInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postIncome();
  };

  useEffect(() => {
    getIncome();
    console.log('render');
  }, []);

  return (
    <div className="flex gap-2 items-center justify-center">
      {monthlyIncome ? (
        <div className="text-white flex flex-col items-center">
          <h2 className="text-3xl text-white font-normal">Income</h2>
          <div className="bg-neonPurple px-2 rounded-md font-normal text-2xl">
            {'$' + monthlyIncome}
          </div>
          <h2 className="text-3xl text-white font-normal">Budget</h2>
          <div className="bg-neonPurple px-2 rounded-md font-normal text-2xl">
            {'$' + finalBudget}
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            className="text-white bg-neonPurple px-4 py-2 rounded-md font-normal"
            onClick={() => setShowIncomeInput(!showIncomeInput)}
          >
            {!showIncomeInput ? 'Add Monthly Income' : 'x'}
          </button>
          {showIncomeInput ? (
            <form onSubmit={handleSubmit}>
              <input
                type="tel"
                placeholder="...Income"
                className="bg-neonPurple p-2 rounded-md font-normal text-white placeholder-white outline-none z-1"
                value={incomeInput}
                onChange={handleChange}
              />
              <button className="bg-black text-white p-2 -ml-2 rounded-r-md z-0">
                Add
              </button>
            </form>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Budget;
