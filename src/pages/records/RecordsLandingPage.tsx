import * as React from "react";
import { useCallback } from "react";
import { APPOINTMENTS } from "../../data/appointments";
import { ActionsBar } from "../../components/records/ActionsBar";
import { AppointmentsList } from "../../components/records/AppointmentsList";
import { FiltersRow } from "../../components/records/FiltersRow";
import { GlobalSearch } from "../../components/records/GlobalSearch";
import { AppLayout } from "../../layouts/AppLayout";

const PAGE_SIZE = 20;

export function RecordsLandingPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [clinic, setClinic] = React.useState("All clinics");
  const [sort, setSort] = React.useState("time-asc");
  const [page, setPage] = React.useState(0);
  const [total, setTotal] = React.useState(APPOINTMENTS.length);
  const [activeTab, setActiveTab] = React.useState("appointments");

  const handleTotalChange = useCallback((count: number) => {
    setTotal(count);
    const maxPage = Math.max(0, Math.ceil(count / PAGE_SIZE) - 1);
    setPage((current) => Math.min(current, maxPage));
  }, []);

  React.useEffect(() => {
    setPage(0);
  }, [searchQuery, clinic, sort, activeTab]);

  const disablePrev = page === 0;
  const disableNext = (page + 1) * PAGE_SIZE >= total;

  return (
    <AppLayout currentDate={new Date()} userName="Mr Daniel">
      <section className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Records</h1>
            <p className="text-sm text-slate-500">Monitor today’s appointments and manage patient flow.</p>
          </div>
          <GlobalSearch onSearch={setSearchQuery} />
        </div>
        <ActionsBar
          onAddPatient={() => {}}
          onCreateAppointment={() => {}}
          onPrevPage={() => setPage((prev) => Math.max(0, prev - 1))}
          onNextPage={() => setPage((prev) => (disableNext ? prev : prev + 1))}
          disablePrev={disablePrev}
          disableNext={disableNext}
          page={page}
          pageSize={PAGE_SIZE}
          total={total}
        />
        <FiltersRow
          activeTab={activeTab}
          onTabChange={setActiveTab}
          clinic={clinic}
          onClinicChange={setClinic}
          sort={sort}
          onSortChange={setSort}
        />
        <div className="flex flex-col gap-4 px-4 pb-6 md:px-10">
          <AppointmentsList
            appointments={APPOINTMENTS}
            searchQuery={searchQuery}
            clinic={clinic}
            sort={sort}
            page={page}
            pageSize={PAGE_SIZE}
            onTotalChange={handleTotalChange}
          />
        </div>
      </section>
    </AppLayout>
  );
}
