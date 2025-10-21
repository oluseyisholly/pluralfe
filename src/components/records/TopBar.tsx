import { Bell, UserCircle2 } from "lucide-react";
import { formatFullDate, formatTime } from "../../lib/utils";
import LogoSrc from "../../assets/Plural.svg";
import LogoBell from "../../assets/bell.svg";
import userSrc from "../../assets/Avatars.svg";


export interface TopBarProps {
  currentDate: Date;
  userName: string;
}

export function TopBar({ currentDate, userName }: TopBarProps) {
  return (
    <header className="md:sticky md:top-0 md:z-40 md:bg-white/80 md:backdrop-blur">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 md:px-10">
        <div className="flex items-center gap-2 text-lg font-semibold text-indigo-600">
          <img src={LogoSrc} />
        </div>
        <div className="hidden flex gap-[16px] uppercase items-center text-sm font-semibold text-slate-600 sm:flex">
          <span className="font-bold text-[18px] leading-[22px] text-[#051438] tracking-[0]">
            {formatFullDate(currentDate)}
          </span>
          <span className="font-bold text-[18px] leading-[22px] tracking-[0]">
            {formatTime(currentDate)}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden text-right text-sm sm:block">
            <p className="text-base font-semibold text-slate-900">
              Hi {userName}
            </p>
          </div>

          <img src={LogoBell} />

          <img src={userSrc} />

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
