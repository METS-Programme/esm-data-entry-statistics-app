import {
  getAsyncLifecycle,
  getSyncLifecycle,
  defineConfigSchema,
} from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import { createDashboardLink } from "./createDashboardLink";

const moduleName = "@ugandaemr/esm-data-entry-statistics-app";
const options = {
  featureName: "data-entry-statistics-app",
  moduleName,
};

export const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

export const root = getAsyncLifecycle(
  () => import("./root.component"),
  options
);

export const dataEntryStatisticsAppDashboardLink = getSyncLifecycle(
  createDashboardLink({
    name: "statistics",
    slot: "data-entry-statistics-slot",
    title: "Statistics",
  }),
  options
);
export const dataEntryStatisticsComponent = getAsyncLifecycle(
  () => import("./data-entry-statistics.component"),
  options
);

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}
