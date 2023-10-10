import React, { useState } from "react";
import dayjs from "dayjs";
import {
  Button,
  DatePicker,
  DatePickerInput,
  Dropdown,
  Tile,
  DataTableSkeleton,
  Layer,
} from "@carbon/react";
import DataEntryStatisticsTable from "../data-entry-statistics-table/data-entry-statistics-table.component";
import EmptyStateIllustration from "../../empty-state-illustration.component";
import styles from "./data-entry-statistics-container.scss";
import { useTranslation } from "react-i18next";
import {
  createColumns,
  useGetEncounterType,
} from "../../data-entry-statistics.resource";

const DataEntryStatisticsContainer: React.FC = () => {
  const [tableHeaders, setTableHeaders] = useState([]);
  const { t } = useTranslation();
  const [fromDate, setFromDate] = useState("");
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <>
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
    </>
  );
};

export default DataEntryStatisticsContainer;
