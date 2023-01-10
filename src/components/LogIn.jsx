import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/landingPage/Navbar';
import Footer from './Footer';
import Register from './Register';

const LogIn = ({ isAuth, setIsAuth }) => {
  const initialValues = { email: '', password: '' };
  const [register, setRegister] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formValues;
    const body = { email, password };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_ORIGIN_URL}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        setIsAuth(true);
      } else {
        setError('invalid email or password');
        setIsAuth(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (isAuth) navigate('/dashboard');
  }, []);

  useEffect(() => {
    if (isAuth) navigate('/dashboard');
  }, [isAuth]);

  return (
    <div className="px-5 md:px-10 lg:px-20 text-white">
      <Navbar />
      {register ? (
        <Register setRegister={setRegister} setIsAuth={setIsAuth} />
      ) : (
        <div className="flex flex-col w-4/6 md:w-3/6 lg:w-2/6 mx-auto gap-2">
          <h2 className="text-3xl">Log in</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            {error ? <div className="text-red-600">{error}</div> : null}
            <input
              type="email"
              name="email"
              value={formValues.name}
              onChange={handleChange}
              placeholder="your@email.com"
              className="rounded-md h-8 px-2"
            />
            <input
              type="password"
              value={formValues.password}
              name="password"
              onChange={handleChange}
              placeholder="password"
              className="rounded-md h-8 px-2"
            />
            <button className="bg-neon2 text-bg rounded-md h-8 hover:bg-bg hover:text-white">
              Submit
            </button>
          </form>
          <div className="flex justify-center gap-2">
            <p>Don't have an account?</p>
            <p
              className="text-neon2 cursor-pointer"
              onClick={() => setRegister(true)}
            >
              Sign Up
            </p>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default LogIn;
