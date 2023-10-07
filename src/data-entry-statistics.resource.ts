import { openmrsFetch, restBaseUrl } from "@openmrs/esm-framework";
import useSWR from "swr";

type encounterRequest = {
  fromDate: string;
  toDate: string;
  encUserColumn: string;
  groupBy: string;
};

export function useGetEncounterType(params: encounterRequest) {
  const apiUrl = `http://5.189.138.250:8080/ugandaemr/ws/rest/v1/dataentrystatistics?fromDate=${params.fromDate}&toDate=${params.toDate}&encUserColumn=${params.encUserColumn}&groupBy=${params.groupBy}`;
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    { data: { results: any } },
    Error
  >(apiUrl, openmrsFetch);
  if (error) {
    console.error("Error fetching data:", error);
  }

  return {
    encounterData: data ? data?.data : [],
    isLoading,
    isError: error,
    isValidating,
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
