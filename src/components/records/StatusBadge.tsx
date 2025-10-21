import { ChevronRight, Plus } from "lucide-react";
import { AppointmentStatus } from "../../data/appointments";
import { cn } from "../../lib/utils";

const statusStyles: Record<AppointmentStatus, { container: string; dot: string; icon?: "plus" | "chevron" }> = {
  Processing: {
    container: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
  },
  "Not arrived": {
    container: "bg-rose-100 text-rose-600",
    dot: "bg-rose-500",
  },
  "Awaiting vitals": {
    container: "bg-purple-100 text-purple-600",
    dot: "bg-purple-500",
  },
  "Awaiting doctor": {
    container: "bg-indigo-100 text-indigo-600",
    dot: "bg-indigo-500",
  },
  "Admitted to ward": {
    container: "bg-orange-100 text-orange-600",
    dot: "bg-orange-500",
    icon: "plus",
  },
  "Transferred to A&E": {
    container: "bg-violet-100 text-violet-600",
    dot: "bg-violet-500",
    icon: "chevron",
  },
  "Seen doctor": {
    container: "bg-emerald-100 text-emerald-600",
    dot: "bg-emerald-500",
  },
};

export interface StatusBadgeProps {
  status: AppointmentStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { container, dot, icon } = statusStyles[status];

  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium", container)}>
      {icon ? (
        icon === "plus" ? (
          <Plus className="h-3.5 w-3.5" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5" />
        )
      ) : (
        <span className={cn("h-2.5 w-2.5 rounded-full", dot)} aria-hidden="true" />
      )}
      {status}
    </span>
  );
}
