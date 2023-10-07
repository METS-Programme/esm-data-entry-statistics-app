import React, { useEffect, useState } from "react";
import DataEntryStatisticsHeader from "./components/data-entry-statistics-header/data-entry-statistics-header.component";
import DataEntryStatisticsTile from "./components/data-entry-tile/data-entry-statistics-tile.component";
import DataEntryStatisticsTable from "./components/data-entry-statistics-table/data-entry-statistics-table.component";
import { DataTableSkeleton, Layer, Tile } from "@carbon/react";
import EmptyStateIllustration from "./empty-state-illustration.component";
import styles from "./data-entry-statistics.scss";
import {
  createColumns,
  useGetEncounterType,
} from "./data-entry-statistics.resource";
import { groupBy } from "rxjs/operators";

const DataEntryStatistics: React.FC = () => {
  const [tableHeaders, setTableHeaders] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [encUserColumn, setEncUserColumn] = useState(null);
  const [groupBy, setGroupBy] = useState(null);

  const { encounterData } = useGetEncounterType({
    fromDate: fromDate,
    toDate: toDate,
    encUserColumn: encUserColumn,
    groupBy: groupBy,
  });

  console.info(JSON.stringify(encounterData));
  const handleViewButtonClick = () => {
    setShowTable(true);
    setLoading(true);
  };

  // console.log("Before infinte loop");
  // if (!isLoading) {
  //   let headers = [];
  //   let dataForReport = [];
  //   const responseReportName = Object.keys(reportData)[0];
  //   if (reportData[responseReportName] && reportData[responseReportName][0]) {
  //     const columnNames = Object.keys(reportData[responseReportName][0]);
  //     headers = createColumns(columnNames).slice(0, 10);
  //     dataForReport = reportData[responseReportName];
  //     setLoading(false);
  //   } else {
  //     setShowTable(false);
  //   }
  //   setTableHeaders(headers);
  //   setData(dataForReport);
  //   console.log(dataForReport);
  //   console.log(!isLoading);
  //   console.log(headers);
  // }
  // console.log("After the infinte loop");
  return (
    <div className={`omrd-main-content`}>
      <DataEntryStatisticsHeader />

      <DataEntryStatisticsTile onViewButtonClick={handleViewButtonClick} />

      {showTable ? (
        <>
          {loading && <DataTableSkeleton role="progressbar" />}
          {!loading && (
            <div className={styles.reportContainer}>
              <DataEntryStatisticsTable columns={tableHeaders} data={data} />
            </div>
          )}
        </>
      ) : (
        <Layer className={styles.layer}>
          <Tile className={styles.tile}>
            <EmptyStateIllustration />
            <p className={styles.content}>No data to display</p>
            <p className={styles.explainer}>
              Use the data entry statistics filters above to view your
              statistics
            </p>
          </Tile>
        </Layer>
      )}
    </div>
  );
};

export default DataEntryStatistics;
