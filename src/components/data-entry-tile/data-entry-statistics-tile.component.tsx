import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Button,
  DatePicker,
  DatePickerInput,
  DataTableSkeleton,
  Dropdown,
  Layer,
  Tile,
  DataTable,
  Pagination,
  TableContainer,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@carbon/react";
import styles from "./data-entry-statistics-tile.scss";
import { Intersect } from "@carbon/react/icons";
import { useTranslation } from "react-i18next";
import { useGetDataEntryStatistics } from "../../data-entry-statistics.resource";
import { useLayoutType, usePagination } from "@openmrs/esm-framework";
import EmptyStateIllustration from "../../empty-state-illustration.component";

type EntryTypeData = {
  userFullName: string;
  entryType: string;
  numberOfEntries: number;
};

type EncounterDataResponse = {
  encounterData: EntryTypeData[];
  clearCache: () => void;
};

const DataEntryStatisticsTile: React.FC = () => {
  const { t } = useTranslation();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [encUserColumn, setEncUserColumn] = useState("");
  const [groupBy, setGroupBy] = useState("");
  const [hasUpdatedParams, setHasUpdatedParams] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [allRows, setAllRows] = useState([]);

  const pageSizes = [10, 20, 30, 40, 50];
  const [currentPageSize, setPageSize] = useState(10);

  const { encounterData, clearCache } = useGetDataEntryStatistics({
    fromDate: fromDate,
    toDate: toDate,
    encUserColumn: encUserColumn,
    groupBy: groupBy,
  }) as EncounterDataResponse;

  const handleStartDateChange = (e) => {
    if (hasUpdatedParams) {
      setFromDate(dayjs(e.target.value).format("YYYY-MM-DD"));
      setHasUpdatedParams(true);
      setLoading(false);
      clearCache();
    } else {
      setHasUpdatedParams(false);
    }
    console.info("test", hasUpdatedParams);
  };

  const handleEndDateChange = (e) => {
    if (hasUpdatedParams) {
      setToDate(dayjs(e.target.value).format("YYYY-MM-DD"));
      setHasUpdatedParams(true);
      setLoading(false);
    } else {
      setHasUpdatedParams(false);
    }
    console.info("status", hasUpdatedParams);
  };

  const items = [
    {
      id: "option-1",
      text: "Data Entry Assistant",
    },
    {
      id: "option-2",
      text: "Provider",
    },
  ];

  const handleEncounterDropdownChange = (event) => {
    if (hasUpdatedParams) {
      if (event.selectedItem.text === "Data Entry Assistant") {
        setEncUserColumn("creator");
      } else {
        setEncUserColumn(event.selectedItem.text);
      }
      setHasUpdatedParams(true);
      setLoading(false);
      clearCache();
    } else {
      setHasUpdatedParams(false);
    }
  };

  const handleProviderDropdownChange = (event) => {
    if (hasUpdatedParams) {
      if (event.selectedItem.text === "Data Entry Assistant") {
        setGroupBy("creator");
      } else {
        setGroupBy(event.selectedItem.text);
      }
      setHasUpdatedParams(true);
      setLoading(false);
      clearCache();
    } else {
      setHasUpdatedParams(false);
      setLoading(true);
    }
  };

  const {
    goTo,
    results: paginatedEncounterTypesList,
    currentPage,
  } = usePagination(tableData, currentPageSize);

  useEffect(() => {
    if (encounterData) {
      const transformedData = {};

      encounterData.forEach((entry) => {
        if (!transformedData[entry.userFullName]) {
          transformedData[entry.userFullName] = {};
        }

        if (!transformedData[entry.userFullName].userFullName) {
          transformedData[entry.userFullName].userFullName = entry.userFullName;
        }

        transformedData[entry.userFullName][entry.entryType] =
          entry.numberOfEntries;
      });

      setTableData(Object.values(transformedData));
    }
  }, [encounterData]);

  let headers = [];
  const generateColumns = () => {
    if (!tableData || tableData.length === 0) {
      return headers;
    }

    const allColumns = new Set();
    tableData.forEach((userEntry) => {
      Object.keys(userEntry).forEach((key) => {
        if (key !== "userFullName") {
          allColumns.add(key);
        }
      });
    });

    const columns = ["userFullName", ...allColumns].map((column) => ({
      key: column,
      header: column === "userFullName" ? "User" : column,
    }));

    return columns;
  };

  headers = generateColumns();

  useEffect(() => {
    const rows: Array<Record<string, string>> = [];

    paginatedEncounterTypesList.map((item: any, index) => {
      return rows.push({ ...item, id: index++ });
    });
    setAllRows(rows);
  }, [paginatedEncounterTypesList, allRows]);

  const handleUpdateReport = () => {
    if (hasUpdatedParams && !loading) {
      setLoading(false);
      setShowTable(true);
    } else {
      setLoading(false);
      setShowTable(false);
      setHasUpdatedParams(false);
    }
    console.info("Table Data", tableData);
    console.info("Encounter Data", encounterData);
    console.info("Paginated List", paginatedEncounterTypesList);
  };

  return (
    <>
      <Tile className={styles.tile}>
        <div className={styles.tileContainer}>
          <Dropdown
            id="encounteruser"
            titleText={t("encounterUser", "Encounter User")}
            label="Data Entry Assistant"
            items={items}
            itemToString={(item) => (item ? item.text : "")}
            onChange={handleEncounterDropdownChange}
            className={styles.customLabel}
          />
          <Dropdown
            id="orderedby"
            titleText={t("orderedBy", "Ordered By")}
            label="Data Entry Assistant"
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
              className={styles.customLabel}
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
        <>
          {loading && <DataTableSkeleton role="progressbar" />}
          {!loading && (
            <DataTable
              rows={allRows}
              headers={headers}
              isSortable
              useZebraStyles
            >
              {({
                rows,
                headers,
                getHeaderProps,
                getTableProps,
                getRowProps,
                onInputChange,
              }) => (
                <TableContainer className={styles.tableContainer}>
                  <TableToolbar
                    style={{
                      position: "static",
                      height: "3rem",
                      overflow: "visible",
                      backgroundColor: "color",
                    }}
                  >
                    <TableToolbarContent>
                      <Layer>
                        <TableToolbarSearch
                          onChange={onInputChange}
                          placeholder={t("searchThisList", "Search this list")}
                          size="sm"
                        />
                      </Layer>
                    </TableToolbarContent>
                  </TableToolbar>
                  <Table
                    {...getTableProps()}
                    className={styles.activePatientsTable}
                  >
                    <TableHead>
                      <TableRow>
                        {generateColumns().map((column) => (
                          <TableHeader {...getHeaderProps({ header: column })}>
                            {column.header}
                          </TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {rows.map((row) => {
                        return (
                          <React.Fragment key={row.id}>
                            <TableRow {...getRowProps({ row })}>
                              {row.cells.map((cell) => (
                                <TableCell key={cell.id}>
                                  {cell.value ?? 0}
                                </TableCell>
                              ))}
                            </TableRow>
                          </React.Fragment>
                        );
                      })}
                    </TableBody>
                  </Table>
                  <Pagination
                    forwardText="Next page"
                    backwardText="Previous page"
                    page={currentPage}
                    pageSize={currentPageSize}
                    pageSizes={pageSizes}
                    totalItems={paginatedEncounterTypesList?.length}
                    className={styles.pagination}
                    onChange={({ pageSize, page }) => {
                      if (pageSize !== currentPageSize) {
                        setPageSize(pageSize);
                      }
                      if (page !== currentPage) {
                        goTo(page);
                      }
                    }}
                  />
                </TableContainer>
              )}
            </DataTable>
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
      )}
    </>
  );
};

export default DataEntryStatisticsTile;
