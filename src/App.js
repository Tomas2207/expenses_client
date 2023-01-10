import { ValuesContext } from './utils/Context';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Transactions from './components/Transactions';
import { ErrorBoundary } from 'react-error-boundary';
import WelcomeBanner from './components/WelcomeBanner';
import { useNavigate } from 'react-router-dom';

const App = ({ isAuth, getUser, ...props }) => {
  const [expenses, setExpenses] = useState();
  const [years, setYears] = useState();
  const [incomes, setIncomes] = useState();
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();
  const { currentCurrency, setCurrentCurrency, rate, setRate, setIsAuth } =
    props;

  const getExpenses = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ORIGIN_URL}/expenses/expense/${currentUser.user_id}`
    );
    const data = await response.json();

    if (!data.message) setExpenses(data);
    else setExpenses('');
  };
  const getIncomes = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ORIGIN_URL}/income/${currentUser.user_id}`
    );
    const data = await response.json();
    if (!data.message) setIncomes(data);
    else setIncomes('');
  };

  const getYear = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ORIGIN_URL}/expenses/years/${currentUser.user_id}`
    );
    const data = await response.json();
    if (!data.message) setYears(data);
  };

  useEffect(() => {
    if (!isAuth) navigate('/');
  }, [isAuth]);

  useEffect(() => {
    getUser().then((data) => {
      setCurrentUser(data);
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      getExpenses();
      getYear();
      getIncomes();
    }
  }, [currentUser]);

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
      <Navbar setIsAuth={setIsAuth} />

      <WelcomeBanner
        expenses={expenses}
        incomes={incomes}
        currentCurrency={currentCurrency}
        rate={rate}
        getUser={getUser}
      />
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
        <ValuesContext.Provider
          value={{
            getExpenses,
            expenses,
            years,
            getYear,
            incomes,
            getIncomes,
            getUser,
          }}
        >
          <Transactions
            currentCurrency={currentCurrency}
            setCurrentCurrency={setCurrentCurrency}
            rate={rate}
            setRate={setRate}
          />
        </ValuesContext.Provider>
      </ErrorBoundary>
    </div>
  );
};

export default App;
