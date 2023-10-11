import React from "react";
import DataEntryStatisticsHeader from "./components/data-entry-statistics-header/data-entry-statistics-header.component";
import DataEntryStatisticsTile from "./components/data-entry-tile/data-entry-statistics-tile.component";

const Home: React.FC = () => {
  return (
    <div className={`omrd-main-content`}>
      <DataEntryStatisticsHeader />

      <DataEntryStatisticsTile />

    </div>
  );
};

export default Home;
