import {
  DataTable,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarMenu,
  TableToolbarSearch,
  Tile,
} from "@carbon/react";
import {
  isDesktop,
  useLayoutType,
  usePagination,
} from "@openmrs/esm-framework";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./data-entry-statistics-table.scss";

interface ListProps {
  data: any;
}

const DataEntryStatisticsTable: React.FC<ListProps> = ({ data }) => {
  const { t } = useTranslation();
  const layout = useLayoutType();
  const isTablet = useLayoutType() === "tablet";
  const responsiveSize = isTablet ? "lg" : "sm";
  const [allRows, setAllRows] = useState([]);
  const pageSizes = [10, 20, 30, 40, 50];
  const [currentPageSize, setPageSize] = useState(10);
  const {
    goTo,
    results: paginatedEncounterTypesList,
    currentPage,
  } = usePagination(data, currentPageSize);

  const columns = [
    { id: 0, header: t("userFullName", "User Full Name"), key: "userFullName" },
    { id: 1, header: t("entryType", "Encounter Types"), key: "entryType" },
    {
      id: 2,
      header: t("numberOfEntries", "Number of Entries"),
      key: "numberOfEntries",
    },
    { id: 3, header: t("numberOfObs", "Number of Obs"), key: "numberOfObs" },
    { id: 4, header: t("groupBy", "Group By"), key: "groupBy" },
  ];

  const tableRows = useMemo(() => {
    return data?.map((enctType) => ({
      ...enctType,
      userFullName: {
        content: <span>{enctType.userFullName}</span>,
      },
      entryType: {
        content: <span>{enctType.entryType}</span>,
      },
      numberOfEntries: {
        content: <span>{enctType.numberOfEntries}</span>,
      },
      numberOfObs: {
        content: <span>{enctType.numberOfObs}</span>,
      },
      groupBy: {
        content: <span>{enctType.groupBy}</span>,
      },
    }));
  }, [paginatedEncounterTypesList]);

  return (
    <DataTable
      data-floating-menu-container
      rows={allRows}
      headers={columns}
      overflowMenuOnHover={isDesktop(layout) ? true : false}
      size={isTablet ? "lg" : "sm"}
      useZebraStyles
    >
      {({ rows, headers, getHeaderProps, getTableProps, onInputChange }) => (
        <TableContainer className={styles.tableContainer}>
          <div className={styles.toolbarWrapper}>
            <TableToolbar size={responsiveSize}>
              <TableToolbarContent className={styles.toolbarContent}>
                <TableToolbarSearch
                  className={styles.searchbox}
                  expanded
                  onChange={onInputChange}
                  placeholder={t("searchThisList", "Search this list")}
                  size={responsiveSize}
                />

                {/* <TableToolbarMenu>
                      <TableToolbarAction
                        className={styles.toolbarAction}
                        onClick={() => setDocumentType("json")}
                      >
                        Download as JSON
                      </TableToolbarAction>
                    </TableToolbarMenu> */}
              </TableToolbarContent>
            </TableToolbar>
          </div>
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {rows.length === 0 ? (
            <div className={styles.tileContainer}>
              <Tile className={styles.tile}>
                <div className={styles.tileContent}>
                  <p className={styles.content}>
                    {t("No data", "No data to display")}
                  </p>
                </div>
              </Tile>
            </div>
          ) : null}
          <Pagination
            forwardText="Next page"
            backwardText="Previous page"
            page={currentPage}
            pageSize={currentPageSize}
            pageSizes={pageSizes}
            totalItems={data?.length}
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
  );
};

export default DataEntryStatisticsTable;
