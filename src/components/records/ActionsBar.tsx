import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "../ui/button";
import LogoLeft from "../../assets/Stroke 165.svg";
import hospitalAppointment from "../../assets/hospital appointment.svg";
import plusCircle from "../../assets/plus-circle.svg";

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
    <div className="flex flex-col gap-3   py-4  md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-3 justify-between w-full ">
        <Button variant="default" onClick={onAddPatient} className="gap-2">
          <img src={hospitalAppointment} />
          Add new patient
        </Button>

        <Button variant="default" onClick={onCreateAppointment} className="gap-2">
          <img src={plusCircle} />
          Create appointment
        </Button>
      </div>
      <div className="flex items-center justify-end gap-3 text-sm text-slate-500 w-full">
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
            <img src={LogoLeft} />
          </Button>
          <Button
            variant="outline"
            iconOnly
            onClick={onNextPage}
            disabled={disableNext}
            aria-label="Next page"
          >
            <img
              className="transform rotate-180 transition-transform"
              src={LogoLeft}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
