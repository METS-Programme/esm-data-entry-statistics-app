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

interface DataEntryStatisticsTileProps {
  onViewButtonClick: () => void;
}
const DataEntryStatisticsTile: React.FC<DataEntryStatisticsTileProps> = ({
  onViewButtonClick,
}) => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleStartDateChange = (selectedDate) => {
    setStartDate(dayjs(selectedDate[0]).format("YYYY-MM-DD"));
  };

  const handleEndDateChange = (selectedDate) => {
    setEndDate(dayjs(selectedDate[0]).format("YYYY-MM-DD"));
  };
  return (
    <Tile className={styles.tile}>
      <div className={styles.tileContainer}>
        <Dropdown
          titleText={t("encounterUser", "Encounter User")}
          label="Data Entry Assistant"
          items={["Data Entry Assistant", "Provider"]}
        />
        <Dropdown
          titleText={t("orderedBy", "Ordered By")}
          label="Data Entry Assistant"
          items={["Data Entry Assistant", "Provider"]}
        />
        <DatePicker datePickerType="range">
          <DatePickerInput
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Start date"
            size="md"
            onChange={handleStartDateChange}
          />
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
          onClick={onViewButtonClick}
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
