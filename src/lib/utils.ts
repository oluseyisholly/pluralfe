export function cn(...inputs: Array<string | undefined | false | null>): string {
  return inputs.filter(Boolean).join(" ");
}

export const formatMoney = (value: number): string =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  })
    .format(value)
    .replace(/^NGN\s?/, "₦");

export const formatTime = (date: Date): string =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);

export const formatFullDate = (date: Date): string =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
  }).format(date);

export const formatDateShort = (date: Date): string =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  }).format(date);
