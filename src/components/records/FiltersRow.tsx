import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Select } from "../ui/select";

export interface FiltersRowProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  clinic: string;
  onClinicChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
}

const clinicOptions = [
  { label: "All clinics", value: "All clinics" },
  { label: "Neurology", value: "Neurology" },
  { label: "ENT", value: "ENT" },
  { label: "A&E", value: "A&E" },
];

const sortOptions = [
  { label: "Time ascending", value: "time-asc" },
  { label: "Time descending", value: "time-desc" },
  { label: "Status", value: "status" },
  { label: "Wallet", value: "wallet" },
  { label: "Clinic", value: "clinic" },
];

export function FiltersRow({
  activeTab,
  onTabChange,
  clinic,
  onClinicChange,
  sort,
  onSortChange,
}: FiltersRowProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-200 bg-white px-4 py-4 md:flex-row md:items-center md:justify-between md:px-10">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="records" className="hidden sm:inline-flex" disabled>
            Records
          </TabsTrigger>
          <TabsTrigger value="billing" className="hidden sm:inline-flex" disabled>
            Billing
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-400 sm:text-[0.7rem]">
          Clinic
          <Select value={clinic} onChange={(event) => onClinicChange(event.target.value)} options={clinicOptions} />
        </label>
        <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-400 sm:text-[0.7rem]">
          Sort by
          <Select value={sort} onChange={(event) => onSortChange(event.target.value)} options={sortOptions} />
        </label>
      </div>
    </div>
  );
}
