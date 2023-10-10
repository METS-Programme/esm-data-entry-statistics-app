import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home.component";

const Root: React.FC = () => {
  return (
    <BrowserRouter basename={window.getOpenmrsSpaBase()}>
      <Routes>
        <Route path="home/statistics" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Root;
