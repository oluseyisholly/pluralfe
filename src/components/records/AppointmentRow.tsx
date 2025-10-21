import {
  CalendarClock,
  ChevronDown,
  EllipsisVertical,
  FileText,
  Hospital,
  Users,
} from "lucide-react";
import { AppointmentRecord } from "../../data/appointments";
import { formatDateShort, formatMoney, formatTime } from "../../lib/utils";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { StatusBadge } from "./StatusBadge";

export interface AppointmentRowProps {
  appointment: AppointmentRecord;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function AppointmentRow({ appointment }: AppointmentRowProps) {
  return (
    <div className="group grid grid-cols-1 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-lg focus-within:ring-2 focus-within:ring-indigo-200 sm:grid-cols-[auto_auto_minmax(0,1fr)_auto_auto_auto_auto_auto]">
      <Button
        variant="ghost"
        iconOnly
        className="h-9 w-9 rounded-full border border-slate-200 text-slate-500"
        aria-label={`Expand appointment ${appointment.id}`}
      >
        <ChevronDown className="h-4 w-4" />
      </Button>
      <span className="text-sm font-semibold text-slate-400 sm:justify-self-auto">
        #{appointment.index.toString().padStart(2, "0")}
      </span>
      <div className="flex items-center gap-3">
        <Avatar
          fallback={getInitials(appointment.patient.name)}
          className="h-12 w-12"
        />
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-slate-900">
              {appointment.patient.name}
            </p>
            {appointment.patient.isNew ? <Badge>New</Badge> : null}
          </div>
          <p className="text-xs text-slate-500">
            {appointment.patient.id} • {appointment.patient.sex} •{" "}
            {appointment.patient.age} yrs
          </p>
        </div>
      </div>
      <div className="hidden min-w-[150px] items-center gap-2 text-sm font-medium text-slate-600 md:flex">
        <Hospital className="h-4 w-4 text-indigo-500" />
        {appointment.clinic}
      </div>
      <div className="hidden items-center gap-1 text-sm text-slate-500 lg:flex">
        {appointment.attachments ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            <FileText className="h-3.5 w-3.5" /> {appointment.attachments}
          </span>
        ) : null}
        {appointment.dependents ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            <Users className="h-3.5 w-3.5" /> +{appointment.dependents}
          </span>
        ) : null}
      </div>
      <div className="hidden min-w-[160px] flex-col text-right text-sm font-semibold text-slate-700 lg:flex">
        <span>{formatMoney(appointment.wallet.total)}</span>
        <span className="text-xs font-normal text-rose-500">
          Outstanding {formatMoney(appointment.wallet.outstanding)}
        </span>
      </div>
      <div className="flex min-w-[110px] flex-col text-right text-sm font-semibold text-indigo-600 sm:items-end">
        <span>{formatTime(appointment.scheduledFor)}</span>
        <span className="text-xs font-medium text-slate-400">
          <CalendarClock
            className="mr-1 inline h-3.5 w-3.5 text-slate-300"
            aria-hidden="true"
          />
          {formatDateShort(appointment.scheduledFor)}
        </span>
      </div>
      <div className="flex items-center justify-end">
        <StatusBadge status={appointment.status} />
      </div>
      {/* <div>
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label={`Actions for ${appointment.patient.name}`}
          >
            <EllipsisVertical className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>View patient</DropdownMenuItem>
            <DropdownMenuItem>Reschedule</DropdownMenuItem>
            <DropdownMenuItem>Mark arrived</DropdownMenuItem>
            <DropdownMenuItem className="text-rose-600 hover:text-rose-700">
              Cancel appointment
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}
    </div>
  );
}
