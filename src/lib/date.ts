export const WORK_LOG_TIME_ZONE = "Asia/Kolkata";

export const dateFormats = {
  date: { dateStyle: "medium" },
  weekday: {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  },
  day: { dateStyle: "full" },
  month: { month: "short" },
  time: { hour: "numeric", minute: "2-digit", hour12: true },
  clock: {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short",
  },
  dateTime: { dateStyle: "medium", timeStyle: "short", hour12: true },
} satisfies Record<string, Intl.DateTimeFormatOptions>;

const dateFormatters = new Map<string, Intl.DateTimeFormat>();

export const formatDate = (
  value: Date | string,
  format: keyof typeof dateFormats = "date",
  timeZone = "UTC"
) => {
  const key = `${format}:${timeZone}`;
  const formatter =
    dateFormatters.get(key) ??
    new Intl.DateTimeFormat("en-US", { ...dateFormats[format], timeZone });
  dateFormatters.set(key, formatter);
  return formatter.format(new Date(value));
};

export const dateKey = (value: Date | string, timeZone = "UTC") =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
