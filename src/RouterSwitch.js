import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import App from './App';
import Footer from './components/Footer';
import Landing from './components/landingPage/Landing';
import LogIn from './components/LogIn';

const RouterSwitch = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState();
  const [currentCurrency, setCurrentCurrency] = useState(['$', 'USD']);
  const [rate, setRate] = useState(1);
  useEffect(() => {
    isAuthenticated();
  }, []);

  const getUser = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_ORIGIN_URL}/profile`,
        {
          method: 'GET',
          headers: { token: localStorage.token },
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error.message);
    }
  };

  const isAuthenticated = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_ORIGIN_URL}/auth/is-verified`,
        {
          method: 'GET',
          headers: { token: localStorage.token },
        }
      );
      const data = await response.json();
      if (data === true) {
        setIsAuth(true);
        getUser().then((data) => setUser(data));
      } else {
        setIsAuth(false);
        localStorage.clear();
      }
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing isAuth={isAuth} />} />
        <Route
          path="/login"
          element={<LogIn setIsAuth={setIsAuth} isAuth={isAuth} />}
        />
        <Route
          path="/dashboard"
          element={
            <App
              getUser={getUser}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
              currentCurrency={currentCurrency}
              setCurrentCurrency={setCurrentCurrency}
              rate={rate}
              setRate={setRate}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterSwitch;
