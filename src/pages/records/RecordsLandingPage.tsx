import * as React from "react";
import { useCallback } from "react";
import { ActionsBar } from "../../components/records/ActionsBar";
import { AppointmentsList } from "../../components/records/AppointmentsList";
import { GlobalSearch } from "../../components/records/GlobalSearch";
import { AppLayout } from "../../layouts/AppLayout";
import { fetchAppointments } from "../../lib/appointments";
import { useQuery } from "../../lib/react-query";

const PAGE_SIZE = 20;

export function RecordsLandingPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [clinic, setClinic] = React.useState("All clinics");
  const [sort, setSort] = React.useState("time-asc");
  const [page, setPage] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState("appointments");

  const appointmentsQueryKey = React.useMemo(() => ["appointments"] as const, []);

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: appointmentsQueryKey,
    queryFn: fetchAppointments,
  });

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
      <section className="flex flex-col gap-4 border-slate-200 ">
        <div className="flex  gap-4 px-4 py-4 md:flex-row md:items-center justify-center md:px-10">
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
        {/* <FiltersRow
          activeTab={activeTab}
          onTabChange={setActiveTab}
          clinic={clinic}
          onClinicChange={setClinic}
          sort={sort}
          onSortChange={setSort}
        /> */}
        <div className="flex flex-col gap-4  pb-6">
          <AppointmentsList
            appointments={data}
            searchQuery={searchQuery}
            clinic={clinic}
            sort={sort}
            page={page}
            pageSize={PAGE_SIZE}
            onTotalChange={handleTotalChange}
            isLoading={isLoading}
            isFetching={isFetching}
            isError={isError}
            errorMessage={error instanceof Error ? error.message : undefined}
            onRetry={refetch}
          />
        </div>
      </section>
    </AppLayout>
  );
}
