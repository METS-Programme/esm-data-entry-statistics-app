import { openmrsFetch } from "@openmrs/esm-framework";
import useSWR, { useSWRConfig } from "swr";

type encounterRequest = {
  fromDate: string;
  toDate: string;
  encUserColumn: string;
  groupBy: string;
};

export function useGetDataEntryStatistics(params: encounterRequest) {
  const apiUrl = params.fromDate
    ? `/ws/rest/v1/dataentrystatistics?fromDate=${params.fromDate}&toDate=${params.toDate}&encUserColumn=${params.encUserColumn}&groupBy=${params.groupBy}`
    : null;
  const abortController = new AbortController();

  const { mutate } = useSWRConfig();
  const clearCache = () => mutate(() => true, undefined, { revalidate: false });

  const fetcher = () =>
    openmrsFetch(apiUrl.toString(), {
      signal: abortController.signal,
    });

  const { data, error, isLoading, isValidating } = useSWR<
    { data: { encounterData: [] } },
    Error
  >(apiUrl, fetcher);
  return {
    encounterData: data ? data.data : [],
    isLoading,
    isError: error,
    isValidating,
    mutate,
    clearCache,
  };
}
