import React from 'react';
import HomeHeader from '../components/HomeHeader';
import Home from '../components/Home';
import Footer from '../components/Footer';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page" id="inicio">
      <HomeHeader />
      <main className="home-page-main">
        <Home />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

