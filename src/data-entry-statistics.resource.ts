import { openmrsFetch, restBaseUrl } from "@openmrs/esm-framework";
import useSWR from "swr";

type encounterRequest = {
  fromDate: string;
  toDate: string;
  encUserColumn: string;
  groupBy: string;
};

export function useGetEncounterType(params: encounterRequest) {
  const apiUrl = `/ws/rest/v1/dataentrystatistics?fromDate=${params.fromDate}&toDate=${params.toDate}&encUserColumn=${params.encUserColumn}&groupBy=${params.groupBy}`;
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    { data: { encounterRequest } },
    Error
  >(apiUrl, openmrsFetch);
  return {
    encounterData: data ? data.data : [],
    isLoading,
    isError: error,
    isValidating,
    mutate,
  };
}

export function createColumns(columns: Array<string>) {
  const dataColumn: Array<Record<string, string>> = [];
  columns.map((column: string, index) => {
    dataColumn.push({
      id: `${index++}`,
      key: column,
      header: column,
      accessor: column,
    });
  });
  return dataColumn;
}
