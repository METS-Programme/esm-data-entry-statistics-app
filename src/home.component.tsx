import React from "react";
import DataEntryStatisticsTile from "./components/data-entry-tile/data-entry-statistics-tile.component";
import { HomeHeader } from "@ugandaemr/esm-ugandaemr-commons-lib";
import { UserActivity } from "@carbon/react/icons";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={`omrd-main-content`}>
      <HomeHeader
        headerTitle={t("dataEntryStatistics", "Data Entry Statistics")}
        icon={<UserActivity />}
      />

      <DataEntryStatisticsTile />
    </div>
  );
};

export default Home;
