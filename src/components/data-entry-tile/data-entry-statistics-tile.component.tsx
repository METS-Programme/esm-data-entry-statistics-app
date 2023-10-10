import React, { useState } from "react";
import dayjs from "dayjs";
import {
  Button,
  DatePicker,
  DatePickerInput,
  Dropdown,
  Tile,
} from "@carbon/react";
import styles from "./data-entry-statistics-tile.scss";
import { Intersect } from "@carbon/react/icons";
import { useTranslation } from "react-i18next";
import {
  createColumns,
  useGetEncounterType,
} from "../../data-entry-statistics.resource";

const DataEntryStatisticsTile: React.FC = () => {
  const { t } = useTranslation();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [encUserColumn, setEncUserColumn] = useState("");
  const [groupBy, setGroupBy] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasUpdatedReport, setHasUpdatedReport] = useState(false);
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
    console.info("Data", encounterData);
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
    <Tile className={styles.tile}>
      <div className={styles.tileContainer}>
        <Dropdown
          id="encounteruser"
          titleText={t("encounterUser", "Encounter User")}
          label="Data Entry Assistant"
          items={items}
          itemToString={(item) => (item ? item.text : "")}
          onChange={handleEncounterDropdownChange}
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
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Start date"
            size="md"
            onChange={handleStartDateChange}
          />
        </DatePicker>
        <DatePicker datePickerType="single">
          <DatePickerInput
            id="date-picker-input-id-finish"
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
  );
};

export default DataEntryStatisticsTile;
