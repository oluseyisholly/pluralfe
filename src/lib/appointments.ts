import { AppointmentRecord } from "../data/appointments";
import { apiClient } from "../utils/apiClient";

type AppointmentApiRecord = Omit<AppointmentRecord, "scheduledFor"> & {
  scheduledFor: string | number | Date;
};

const toDate = (value: string | number | Date): Date => {
  const date = value instanceof Date ? new Date(value.getTime()) : new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
};

const normaliseAppointment = (raw: AppointmentApiRecord): AppointmentRecord => ({
  ...raw,
  scheduledFor: toDate(raw.scheduledFor),
});

export async function fetchAppointments(): Promise<AppointmentRecord[]> {
  const response = await apiClient.get("/appointments");

  if (!Array.isArray(response)) {
    throw new Error("Invalid appointments payload received from server");
  }

  return response.map((item) => normaliseAppointment(item as AppointmentApiRecord));
}
