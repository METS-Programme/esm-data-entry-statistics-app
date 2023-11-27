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
import {
  isDesktop,
  useLayoutType,
  usePagination,
} from "@openmrs/esm-framework";
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

type FilterProps = {
  rowIds: Array<string>;
  headers: any;
  cellsById: any;
  inputValue: string;
  getCellId: (row, key) => string;
};

const DataEntryStatisticsTile: React.FC = () => {
  const { t } = useTranslation();
  const layout = useLayoutType();
  const isTablet = useLayoutType() === "tablet";
  const responsiveSize = isTablet ? "lg" : "sm";
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

  const {
    goTo,
    results: paginatedEncounterTypesList,
    currentPage,
  } = usePagination(tableData, currentPageSize);

  const { encounterData, clearCache } = useGetDataEntryStatistics({
    fromDate: fromDate,
    toDate: toDate,
    encUserColumn: encUserColumn,
    groupBy: groupBy,
  }) as EncounterDataResponse;

  const handleStartDateChange = (selectedDate) => {
    setFromDate(dayjs(selectedDate[0]).format("YYYY-MM-DD"));
  };

  const handleEndDateChange = (selectedDate) => {
    setToDate(dayjs(selectedDate[0]).format("YYYY-MM-DD"));
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
    } else {
      setHasUpdatedParams(false);
      setLoading(true);
    }
  };

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

  const handleFilter = ({
    rowIds,
    headers,
    cellsById,
    inputValue,
    getCellId,
  }: FilterProps): Array<string> => {
    return rowIds.filter((rowId) =>
      headers.some(({ key }) => {
        const cellId = getCellId(rowId, key);
        const filterableValue = cellsById[cellId].value;
        const filterTerm = inputValue.toLowerCase();

        if (typeof filterableValue === "boolean") {
          return false;
        }

        return ("" + filterableValue).toLowerCase().includes(filterTerm);
      })
    );
  };

  const handleUpdateReport = () => {
    if (hasUpdatedParams && !loading) {
      setLoading(false);
      setShowTable(true);
    } else {
      setLoading(true);
      setShowTable(true);
      setHasUpdatedParams(false);
    }
  };

  return (
    <>
      <Tile className={styles.tile}>
        <div className={styles.tileDiv}>
          <Dropdown
            id="encounteruser"
            titleText={t("encounterUser", "Encounter User")}
            initialSelectedItem={items[0]}
            items={items}
            itemToString={(item) => (item ? item.text : "")}
            onChange={handleEncounterDropdownChange}
          />
        </div>
        <div className={styles.tileDiv}>
          <Dropdown
            id="orderedby"
            titleText={t("orderedBy", "Ordered By")}
            initialSelectedItem={items[0]}
            items={items}
            itemToString={(item) => (item ? item.text : "")}
            onChange={handleProviderDropdownChange}
          />
        </div>
        <div className={styles.tileDiv}>
          <DatePicker datePickerType="single" onChange={handleStartDateChange}>
            <DatePickerInput
              id="date-picker-input-start"
              placeholder="mm/dd/yyyy"
              labelText="Start date"
              size="md"
            />
          </DatePicker>
        </div>
        <div className={styles.tileDiv}>
          <DatePicker datePickerType="single" onChange={handleEndDateChange}>
            <DatePickerInput
              id="date-picker-input-finish"
              placeholder="mm/dd/yyyy"
              labelText="End date"
              size="md"
            />
          </DatePicker>
        </div>
        <div className={styles.tileDiv}>
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
          {!loading && paginatedEncounterTypesList?.length <= 0 && (
            <DataTableSkeleton role="progressbar" />
          )}
          {!loading && (
            <div className={styles.container}>
              <DataTable
                rows={allRows}
                headers={headers}
                filterRows={handleFilter}
                overflowMenuOnHover={isDesktop(layout) ? true : false}
                size={isTablet ? "lg" : "sm"}
                isSortable
                useZebraStyles
              >
                {({
                  rows,
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
                            placeholder={t(
                              "searchThisList",
                              "Search this list"
                            )}
                            size={responsiveSize}
                          />
                        </Layer>
                      </TableToolbarContent>
                    </TableToolbar>
                    <Table {...getTableProps()}>
                      <TableHead>
                        <TableRow>
                          {generateColumns().map((column) => (
                            <TableHeader
                              {...getHeaderProps({ header: column })}
                            >
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
                      totalItems={tableData?.length}
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
            </div>
          )}
        </>
      ) : (
        <Layer className={styles.layerTable}>
          <Tile className={styles.tileTable}>
            <EmptyStateIllustration />
            <p className={styles.contentTable}>No data to display</p>
            <p className={styles.explainerTable}>
              Use the data entry statistics filters above to view statistics
            </p>
          </Tile>
        </Layer>
      )}
    </>
  );
};

export default DataEntryStatisticsTile;
