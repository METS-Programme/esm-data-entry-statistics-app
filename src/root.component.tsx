import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DataEntryStatistics from "./data-entry-statistics.component";

const Root: React.FC = () => {
  return (
    <BrowserRouter basename={window.getOpenmrsSpaBase()}>
      <Routes>
        <Route
          path="home/statistics"
          element={<DataEntryStatistics />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Root;
