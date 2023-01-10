import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Info from './Info';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';

const Landing = ({ isAuth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate('/dashboard');
  }, [isAuth]);
  return (
    <div className="px-5 md:px-10 lg:px-20">
      <Navbar />
      <Hero />
      <Info />
      <Footer />
    </div>
  );
};

export default Landing;
