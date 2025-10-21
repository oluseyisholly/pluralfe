import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { AppointmentRecord } from "../../data/appointments";
import { Button } from "../ui/button";
import { AppointmentRow } from "./AppointmentRow";

export interface AppointmentsListProps {
  appointments: AppointmentRecord[];
  searchQuery: string;
  clinic: string;
  sort: string;
  page: number;
  pageSize: number;
  onTotalChange: (total: number) => void;
  isLoading?: boolean;
  isFetching?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  applyLocalProcessing?: boolean;
  serverTotal?: number;
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
  isLoading = false,
  isFetching = false,
  isError = false,
  errorMessage,
  onRetry,
  applyLocalProcessing = true,
  serverTotal,
}: AppointmentsListProps) {
  const loading = Boolean(isLoading);
  const refreshing = Boolean(isFetching && !isLoading);

  const filtered = React.useMemo(() => {
    if (!applyLocalProcessing) {
      return appointments;
    }

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
  }, [appointments, searchQuery, clinic, applyLocalProcessing]);

  const sorted = React.useMemo(() => {
    if (!applyLocalProcessing) {
      return filtered;
    }

    const sorter = sorters[sort] ?? sorters["time-asc"];
    return [...filtered].sort(sorter);
  }, [filtered, sort, applyLocalProcessing]);

  const paged = React.useMemo(() => {
    if (!applyLocalProcessing) {
      return sorted;
    }

    const start = page * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize, applyLocalProcessing]);

  const appointmentsCount = appointments.length;

  React.useEffect(() => {
    if (!loading) {
      const totalValue = applyLocalProcessing ? sorted.length : serverTotal ?? appointments.length;
      onTotalChange(totalValue);
    }
  }, [
    sorted,
    onTotalChange,
    loading,
    applyLocalProcessing,
    serverTotal,
    appointmentsCount,
  ]);

  React.useEffect(() => {
    if (isError) {
      onTotalChange(0);
    }
  }, [isError, onTotalChange]);

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: Math.min(pageSize, 6) }).map((_, index) => (
          <div
            key={index}
            className="h-24 animate-pulse rounded-2xl border border-slate-200 bg-slate-100/60"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-rose-200 bg-rose-50/60 p-12 text-center">
        <AlertTriangle className="h-10 w-10 text-rose-400" aria-hidden="true" />
        <div className="space-y-2">
          <p className="text-lg font-semibold text-rose-500">Unable to load appointments</p>
          {errorMessage ? (
            <p className="text-sm text-rose-400">{errorMessage}</p>
          ) : (
            <p className="text-sm text-rose-400">Please try again in a moment.</p>
          )}
        </div>
        {onRetry ? (
          <Button variant="outline" onClick={onRetry} className="border-rose-300 text-rose-500 hover:bg-rose-100">
            Retry
          </Button>
        ) : null}
      </div>
    );
  }

  if (!paged.length) {
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
      {refreshing ? (
        <div className="text-xs font-medium text-slate-400">Refreshing appointments…</div>
      ) : null}
      {paged.map((appointment) => (
        <AppointmentRow key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
}
