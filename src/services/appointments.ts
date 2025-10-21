import { APPOINTMENTS, AppointmentRecord } from "../data/appointments";
import { apiClient } from "../utils/apiClient";

export interface AppointmentsQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  clinic?: string;
  sort?: string;
}

type AppointmentApiRecord = Omit<AppointmentRecord, "scheduledFor"> & {
  scheduledFor: string | Date;
};

interface AppointmentsEnvelope {
  data?: AppointmentApiRecord[];
  items?: AppointmentApiRecord[];
  appointments?: AppointmentApiRecord[];
  total?: number;
  count?: number;
}

export interface FetchAppointmentsResult {
  items: AppointmentRecord[];
  total: number;
  fromFallback: boolean;
}

const toDate = (value: string | Date): Date => {
  if (value instanceof Date) {
    return value;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
};

const hydrateAppointment = (record: AppointmentApiRecord): AppointmentRecord => ({
  ...record,
  scheduledFor: toDate(record.scheduledFor),
});

const buildQueryString = (params: AppointmentsQueryParams = {}) => {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined) {
    searchParams.set("page", String(params.page));
  }

  if (params.pageSize !== undefined) {
    searchParams.set("pageSize", String(params.pageSize));
  }

  if (params.search) {
    searchParams.set("search", params.search);
  }

  if (params.clinic) {
    searchParams.set("clinic", params.clinic);
  }

  if (params.sort) {
    searchParams.set("sort", params.sort);
  }

  const query = searchParams.toString();
  return query ? `?${query}` : "";
};

const extractAppointments = (payload: AppointmentsEnvelope | AppointmentApiRecord[]) => {
  if (Array.isArray(payload)) {
    return {
      raw: payload,
      total: payload.length,
    };
  }

  const raw = payload.data ?? payload.items ?? payload.appointments ?? [];
  const total = payload.total ?? payload.count ?? raw.length;

  return { raw, total };
};

export const fetchAppointments = async (
  params: AppointmentsQueryParams = {},
): Promise<FetchAppointmentsResult> => {
  const query = buildQueryString(params);
  const path = `/appointments${query}`;

  try {
    const response = await apiClient.get<AppointmentsEnvelope | AppointmentApiRecord[]>(path);
    const { raw, total } = extractAppointments(response);
    const items = raw.map(hydrateAppointment);

    return {
      items,
      total: total ?? items.length,
      fromFallback: false,
    };
  } catch (error) {
    const fallbackItems = APPOINTMENTS.map((appointment) => ({
      ...appointment,
      scheduledFor: new Date(appointment.scheduledFor.getTime()),
    }));

    return {
      items: fallbackItems,
      total: fallbackItems.length,
      fromFallback: true,
    };
  }
};
