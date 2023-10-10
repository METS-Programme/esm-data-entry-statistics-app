import React from "react";
import DataEntryStatisticsHeader from "./components/data-entry-statistics-header/data-entry-statistics-header.component";
import DataEntryStatisticsContainer from "./components/data-entry-statistics-container/data-entry-statistics-container.component";
import DataEntryStatisticsTile from "./components/data-entry-tile/data-entry-statistics-tile.component";

const Home: React.FC = () => {
  return (
    <div className={`omrd-main-content`}>
      <DataEntryStatisticsHeader />

      <DataEntryStatisticsTile />

      <DataEntryStatisticsContainer />
    </div>
  );
};

export default Home;
