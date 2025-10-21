import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  fetchAppointments,
  FetchAppointmentsResult,
  AppointmentsQueryParams,
} from "../services/appointments";

const appointmentsKeys = {
  all: ["appointments"] as const,
  list: (params?: AppointmentsQueryParams) =>
    params && Object.keys(params).length
      ? (["appointments", params] as const)
      : (["appointments"] as const),
};

export const useAppointmentsQuery = (
  params?: AppointmentsQueryParams,
): UseQueryResult<FetchAppointmentsResult> => {
  return useQuery({
    queryKey: appointmentsKeys.list(params),
    queryFn: () => fetchAppointments(params),
  });
};

export const appointmentsQueryKeys = appointmentsKeys;
