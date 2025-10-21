import { type PropsWithChildren } from "react";
import { TopBar } from "../components/records/TopBar";

export interface AppLayoutProps extends PropsWithChildren {
  currentDate: Date;
  userName: string;
}

export function AppLayout({ children, currentDate, userName }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100">
      <TopBar currentDate={currentDate} userName={userName} />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 md:px-10">
        {children}
      </main>
    </div>
  );
}
