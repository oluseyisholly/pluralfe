import * as React from "react";
import { AppointmentRecord } from "../../data/appointments";
import { AppointmentRow } from "./AppointmentRow";

export interface AppointmentsListProps {
  appointments: AppointmentRecord[];
  searchQuery: string;
  clinic: string;
  sort: string;
  page: number;
  pageSize: number;
  onTotalChange: (total: number) => void;
}

const sorters: Record<string, (a: AppointmentRecord, b: AppointmentRecord) => number> = {
  "time-asc": (a, b) => a.scheduledFor.getTime() - b.scheduledFor.getTime(),
  "time-desc": (a, b) => b.scheduledFor.getTime() - a.scheduledFor.getTime(),
  status: (a, b) => a.status.localeCompare(b.status),
  wallet: (a, b) => b.wallet.total - a.wallet.total,
  clinic: (a, b) => a.clinic.localeCompare(b.clinic),
};

export function AppointmentsList({
  appointments,
  searchQuery,
  clinic,
  sort,
  page,
  pageSize,
  onTotalChange,
}: AppointmentsListProps) {
  const filtered = React.useMemo(() => {
    const normalisedQuery = searchQuery.toLowerCase();
    return appointments.filter((appointment) => {
      const matchesQuery = normalisedQuery
        ? appointment.patient.name.toLowerCase().includes(normalisedQuery) ||
          appointment.patient.id.toLowerCase().includes(normalisedQuery)
        : true;

      const matchesClinic =
        clinic === "All clinics" || appointment.clinic.toLowerCase() === clinic.toLowerCase();

      return matchesQuery && matchesClinic;
    });
  }, [appointments, searchQuery, clinic]);

  const sorted = React.useMemo(() => {
    const sorter = sorters[sort] ?? sorters["time-asc"];
    return [...filtered].sort(sorter);
  }, [filtered, sort]);

  const paged = React.useMemo(() => {
    const start = page * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  React.useEffect(() => {
    onTotalChange(sorted.length);
  }, [sorted, onTotalChange]);

  if (!sorted.length) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/50 p-12 text-center">
        <div>
          <p className="text-lg font-semibold text-slate-700">No appointments found</p>
          <p className="mt-2 text-sm text-slate-500">
            Try adjusting your filters or search to find a patient record.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {paged.map((appointment) => (
        <AppointmentRow key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
}
