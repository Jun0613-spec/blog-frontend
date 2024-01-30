import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

const Container = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Container;
