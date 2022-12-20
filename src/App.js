import React, { useState } from 'react';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Transactions from './components/Transactions';
import { ErrorBoundary } from 'react-error-boundary';

const App = () => {
  const [expenses, setExpenses] = useState();
  const [years, setYears] = useState();

  useEffect(() => {
    console.log(expenses);
  }, [expenses]);

  const getExpenses = async () => {
    const response = await fetch(`http://localhost:5000/expenses`);
    const data = await response.json();
    console.log(data);
    if (!data.message) setExpenses(data);
    console.log('here');
  };

  const getYear = async () => {
    const response = await fetch(`http://localhost:5000/expenses/years`);
    const data = await response.json();
    if (!data.message) setYears(data);
  };

  useEffect(() => {
    getExpenses();
    getYear();
  }, []);

  useEffect(() => {
    console.log(expenses);
  }, [expenses]);

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
      <h1 className="text-white text-2xl px-2 py-4">Good Morning, Tomas</h1>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
        <Transactions
          getExpenses={getExpenses}
          expenses={expenses}
          years={years}
          getYear={getYear}
        />
      </ErrorBoundary>
    </div>
  );
};

export default App;
