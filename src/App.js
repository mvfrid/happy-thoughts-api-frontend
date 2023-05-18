import React from 'react';
import Header from './components/Header';
import { Feed } from './components/Feed';
import Footer from './components/Footer';

export const App = () => {
  return (
    <div className="main-wrapper">
      <Header />
      <Feed />
      <Footer />
    </div>
  );
}