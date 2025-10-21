import { Bell, UserCircle2 } from "lucide-react";
import { formatFullDate, formatTime } from "../../lib/utils";

export interface TopBarProps {
  currentDate: Date;
  userName: string;
}

export function TopBar({ currentDate, userName }: TopBarProps) {
  return (
    <header className="md:sticky md:top-0 md:z-40 md:bg-white/80 md:backdrop-blur">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 md:px-10">
        <div className="flex items-center gap-2 text-lg font-semibold text-indigo-600">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 font-bold text-indigo-700">
            P
          </span>
          <span className="text-xl font-bold text-slate-900">Plural</span>
        </div>
        <div className="hidden flex-col items-center text-sm font-semibold text-slate-600 sm:flex">
          <span className="text-base font-semibold text-slate-900">
            {formatFullDate(currentDate)}
          </span>
          <span className="text-sm text-slate-500">{formatTime(currentDate)}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden text-right text-sm sm:block">
            <p className="font-semibold text-slate-500">Welcome</p>
            <p className="text-base font-semibold text-slate-900">Hi {userName}</p>
          </div>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
            aria-label="Open profile menu"
          >
            <UserCircle2 className="h-6 w-6" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center border-b border-slate-200 px-4 py-3 text-sm font-medium text-slate-500 sm:hidden">
        <span>
          {formatFullDate(currentDate)} • {formatTime(currentDate)}
        </span>
      </div>
    </header>
  );
}
