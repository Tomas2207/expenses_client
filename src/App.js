import React, { useState } from 'react';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Transactions from './components/Transactions';
import { ErrorBoundary } from 'react-error-boundary';
import welcome from './assets/welcome_img.png';

const App = () => {
  console.log(process.env.REACT_APP_CURRENCY_API);
  const [expenses, setExpenses] = useState();
  const [years, setYears] = useState();
  const [incomes, setIncomes] = useState();

  const getExpenses = async () => {
    const response = await fetch(`http://localhost:5000/expenses`);
    const data = await response.json();
    console.log(data);
    if (!data.message) setExpenses(data);
  };
  const getIncomes = async () => {
    const response = await fetch(`http://localhost:5000/income`);
    const data = await response.json();
    if (!data.message) setIncomes(data);
  };

  const getYear = async () => {
    const response = await fetch(`http://localhost:5000/expenses/years`);
    const data = await response.json();
    if (!data.message) setYears(data);
  };

  useEffect(() => {
    getExpenses();
    getYear();
    getIncomes();
  }, []);

  function ErrorFallback({ error, resetErrorBoundary }) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      

      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
        <Transactions
          getExpenses={getExpenses}
          expenses={expenses}
          years={years}
          getYear={getYear}
          incomes={incomes}
          getIncomes={getIncomes}
        />
      </ErrorBoundary>
    </div>
  );
};

export default App;
