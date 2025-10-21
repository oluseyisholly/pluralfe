import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "../ui/button";

export interface ActionsBarProps {
  onAddPatient: () => void;
  onCreateAppointment: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  disablePrev: boolean;
  disableNext: boolean;
  page: number;
  pageSize: number;
  total: number;
}

export function ActionsBar({
  onAddPatient,
  onCreateAppointment,
  onPrevPage,
  onNextPage,
  disablePrev,
  disableNext,
  page,
  pageSize,
  total,
}: ActionsBarProps) {
  const start = total === 0 ? 0 : page * pageSize + 1;
  const end = Math.min(total, (page + 1) * pageSize);

  return (
    <div className="flex flex-col gap-3 border-b border-slate-200 bg-white px-4 py-4 md:flex-row md:items-center md:justify-between md:px-10">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary" onClick={onAddPatient} className="gap-2">
          <Plus className="h-4 w-4" /> Add new patient
        </Button>
        <Button variant="soft" onClick={onCreateAppointment} className="gap-2">
          <Plus className="h-4 w-4" /> Create appointment
        </Button>
      </div>
      <div className="flex items-center justify-between gap-3 text-sm text-slate-500 md:justify-end">
        <span>
          {start}
          {total > 0 ? `–${end}` : ""} of {total}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            iconOnly
            onClick={onPrevPage}
            disabled={disablePrev}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            iconOnly
            onClick={onNextPage}
            disabled={disableNext}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
