import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header, ScrollUp } from '../components';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollUp />
      <Footer />
    </>
  );
};

export default MainLayout;
