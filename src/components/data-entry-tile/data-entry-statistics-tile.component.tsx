import React, { useMemo, useState } from "react";
import dayjs from "dayjs";
import {
  Button,
  DataTableSkeleton,
  DatePicker,
  DatePickerInput,
  Dropdown,
  Pagination,
  Layer,
  Tile,
  DataTable,
  TableContainer,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Table,
  TableHead,
  TableRow,
  TableExpandHeader,
  TableHeader,
  TableBody,
  TableExpandRow,
  TableCell,
  TableExpandedRow,
} from "@carbon/react";
import styles from "./data-entry-statistics-tile.scss";
import { Intersect } from "@carbon/react/icons";
import { useTranslation } from "react-i18next";
import {
  createColumns,
  useGetEncounterType,
} from "../../data-entry-statistics.resource";
import {
  age,
  isDesktop,
  useLayoutType,
  usePagination,
} from "@openmrs/esm-framework";
import EmptyStateIllustration from "../../empty-state-illustration.component";
import DataEntryStatisticsTable from "../data-entry-statistics-table/data-entry-statistics-table.component";

const DataEntryStatisticsTile: React.FC = () => {
  const { t } = useTranslation();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [encUserColumn, setEncUserColumn] = useState("");
  const [groupBy, setGroupBy] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasUpdatedParams, setHasUpdatedParams] = useState(false);
  const [data, setData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [showFilters, setShowFilters] = useState(true);

  const layout = useLayoutType();
  const isTablet = useLayoutType() === "tablet";
  const responsiveSize = isTablet ? "lg" : "sm";
  const pageSizes = [10, 20, 30, 40, 50];
  const [currentPageSize, setPageSize] = useState(10);

  const { encounterData, isLoading } = useGetEncounterType({
    fromDate: fromDate,
    toDate: toDate,
    encUserColumn: encUserColumn,
    groupBy: groupBy,
  });

  const handleStartDateChange = (e) => {
    setFromDate(dayjs(e.target.value).format("YYYY-MM-DD"));
    console.info("Start Date", e.target.value);
  };

  const handleEndDateChange = (e) => {
    setToDate(dayjs(e.target.value).format("YYYY-MM-DD"));
    console.info("End Date", e.target.value);
  };

  const handleUpdateReport = () => {
    setShowTable(true);
    setLoading(true);
    setData([encounterData]);
    setHasUpdatedParams(true);
    console.info("Data", encounterData);
    console.info("Params status", hasUpdatedParams);
    setData([]);
  };

  const items = [
    {
      id: "option-1",
      text: "Data Entry Assistant",
    },
    {
      id: "option-2",
      text: "creator",
    },
  ];

  const handleEncounterDropdownChange = (event) => {
    setEncUserColumn(event.selectedItem.text);
  };

  const handleProviderDropdownChange = (event) => {
    setGroupBy(event.selectedItem.text);
  };

  return (
    <>
      <Tile className={styles.tile}>
        <div className={styles.tileContainer}>
          <Dropdown
            id="encounteruser"
            titleText={t("encounterUser", "Encounter User")}
            label="creator"
            items={items}
            itemToString={(item) => (item ? item.text : "")}
            onChange={handleEncounterDropdownChange}
          />
          <Dropdown
            id="orderedby"
            titleText={t("orderedBy", "Ordered By")}
            label="creator"
            items={items}
            itemToString={(item) => (item ? item.text : "")}
            onChange={handleProviderDropdownChange}
          />
          <DatePicker datePickerType="single">
            <DatePickerInput
              id="date-picker-input-start"
              placeholder="mm/dd/yyyy"
              labelText="Start date"
              size="md"
              onChange={handleStartDateChange}
            />
          </DatePicker>
          <DatePicker datePickerType="single">
            <DatePickerInput
              id="date-picker-input-finish"
              placeholder="mm/dd/yyyy"
              labelText="End date"
              size="md"
              onChange={handleEndDateChange}
            />
          </DatePicker>
          <Button
            size="sm"
            kind="primary"
            onClick={handleUpdateReport}
            className={styles.actionButton}
          >
            <Intersect />
            <span>View</span>
          </Button>
        </div>
      </Tile>

      {showTable ? (
        <></>
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
      )}
    </>
  );
};

export default DataEntryStatisticsTile;
