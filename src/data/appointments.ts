export type AppointmentStatus =
  | "Processing"
  | "Not arrived"
  | "Awaiting vitals"
  | "Awaiting doctor"
  | "Admitted to ward"
  | "Transferred to A&E"
  | "Seen doctor";

export interface AppointmentPatient {
  id: string;
  name: string;
  sex: "M" | "F";
  age: number;
  isNew?: boolean;
}

export interface AppointmentWalletSnapshot {
  total: number;
  outstanding: number;
}

export interface AppointmentRecord {
  id: string;
  index: number;
  patient: AppointmentPatient;
  clinic: string;
  attachments?: number;
  dependents?: number;
  wallet: AppointmentWalletSnapshot;
  scheduledFor: Date;
  status: AppointmentStatus;
  notes?: string;
}

const baseDate = new Date("2024-09-22T09:00:00+01:00");

const hours = (offset: number) => {
  const copy = new Date(baseDate);
  copy.setHours(copy.getHours() + offset);
  return copy;
};

export const APPOINTMENTS: AppointmentRecord[] = [
  {
    id: "APPT-001",
    index: 1,
    patient: { id: "PL-34211", name: "Irene Abiola", sex: "F", age: 29, isNew: true },
    clinic: "Neurology",
    attachments: 2,
    dependents: 1,
    wallet: { total: 78500, outstanding: 12500 },
    scheduledFor: hours(0),
    status: "Processing",
  },
  {
    id: "APPT-002",
    index: 2,
    patient: { id: "PL-20398", name: "Sunkanmi Bello", sex: "M", age: 41 },
    clinic: "ENT",
    wallet: { total: 50200, outstanding: 0 },
    scheduledFor: hours(0.5),
    status: "Awaiting doctor",
  },
  {
    id: "APPT-003",
    index: 3,
    patient: { id: "PL-83012", name: "Obinna Nwachukwu", sex: "M", age: 35 },
    clinic: "A&E",
    attachments: 1,
    wallet: { total: 9100, outstanding: 9100 },
    scheduledFor: hours(1),
    status: "Transferred to A&E",
  },
  {
    id: "APPT-004",
    index: 4,
    patient: { id: "PL-11904", name: "Chiamaka Ezike", sex: "F", age: 32 },
    clinic: "Neurology",
    dependents: 2,
    wallet: { total: 64400, outstanding: 2200 },
    scheduledFor: hours(1.5),
    status: "Awaiting vitals",
  },
  {
    id: "APPT-005",
    index: 5,
    patient: { id: "PL-45290", name: "Yusuf Garba", sex: "M", age: 54 },
    clinic: "All clinics",
    wallet: { total: 32000, outstanding: 5000 },
    scheduledFor: hours(2),
    status: "Not arrived",
  },
  {
    id: "APPT-006",
    index: 6,
    patient: { id: "PL-99210", name: "Halima Musa", sex: "F", age: 61 },
    clinic: "Neurology",
    attachments: 4,
    wallet: { total: 128600, outstanding: 32600 },
    scheduledFor: hours(2.5),
    status: "Admitted to ward",
  },
  {
    id: "APPT-007",
    index: 7,
    patient: { id: "PL-63109", name: "Tunde Aremu", sex: "M", age: 47 },
    clinic: "ENT",
    wallet: { total: 27600, outstanding: 0 },
    scheduledFor: hours(3),
    status: "Seen doctor",
  },
  {
    id: "APPT-008",
    index: 8,
    patient: { id: "PL-77834", name: "Bola Ojo", sex: "F", age: 38 },
    clinic: "A&E",
    wallet: { total: 18400, outstanding: 8400 },
    scheduledFor: hours(3.5),
    status: "Processing",
  },
  {
    id: "APPT-009",
    index: 9,
    patient: { id: "PL-31220", name: "Sarah Onoh", sex: "F", age: 26 },
    clinic: "Neurology",
    attachments: 1,
    dependents: 3,
    wallet: { total: 75000, outstanding: 15000 },
    scheduledFor: hours(4),
    status: "Awaiting vitals",
  },
  {
    id: "APPT-010",
    index: 10,
    patient: { id: "PL-44312", name: "Peter Ajayi", sex: "M", age: 52 },
    clinic: "ENT",
    wallet: { total: 48200, outstanding: 8200 },
    scheduledFor: hours(4.5),
    status: "Awaiting doctor",
  },
  {
    id: "APPT-011",
    index: 11,
    patient: { id: "PL-90011", name: "Ngozi Dike", sex: "F", age: 44 },
    clinic: "All clinics",
    wallet: { total: 102000, outstanding: 12000 },
    scheduledFor: hours(5),
    status: "Processing",
  },
  {
    id: "APPT-012",
    index: 12,
    patient: { id: "PL-72245", name: "Kunle Owolabi", sex: "M", age: 33 },
    clinic: "A&E",
    attachments: 3,
    wallet: { total: 56200, outstanding: 16200 },
    scheduledFor: hours(5.5),
    status: "Not arrived",
  },
];
