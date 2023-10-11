import React, { useState } from "react";
import { Tile, DataTableSkeleton, Layer } from "@carbon/react";
import DataEntryStatisticsTable from "../data-entry-statistics-table/data-entry-statistics-table.component";
import EmptyStateIllustration from "../../empty-state-illustration.component";
import styles from "./data-entry-statistics-container.scss";
import { useTranslation } from "react-i18next";

const DataEntryStatisticsContainer: React.FC = () => {
  const [tableHeaders, setTableHeaders] = useState([]);
  const [hasUpdatedFilters, setHasUpdatedFilters] = useState(false);
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(true);
  

  // if (!isLoading && !setHasUpdatedFilters) {
  //   let headers = [];
  //   let dataForReport = [];
  //   const responseReportName = Object.keys(encounterData)[0];
  //   if (
  //     encounterData[responseReportName] &&
  //     encounterData[responseReportName][0]
  //   ) {
  //     const columnNames = Object.keys(encounterData[responseReportName][0]);
  //     headers = createColumns(columnNames).slice(0, 10);
  //     dataForReport = encounterData[responseReportName];
  //     setLoading(false);
  //     setShowFilters(false);
  //   } else {
  //     setShowTable(false);
  //   }
  //   setTableHeaders(headers);
  //   setData(dataForReport);
  //   setHasUpdatedFixedReport(true);
  // }

  return (
    <>
      {/* {showTable ? (
        <>
          {loading && <DataTableSkeleton role="progressbar" />}
          {!loading && (
            <div className={styles.reportContainer}>
              <DataEntryStatisticsTable columns={tableHeaders} data={data} />
            </div>
          )}
        </>
      ) : (
        <Layer className={styles.layerTable}>
          <Tile className={styles.tileTable}>
            <EmptyStateIllustration />
            <p className={styles.contentTable}>No data to display</p>
            <p className={styles.explainerTable}>
              Use the data entry statistics filters above to view your
              statistics
            </p>
          </Tile>
        </Layer>
      )} */}
    </>
  );
};

export default DataEntryStatisticsContainer;
