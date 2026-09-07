"use client";

import { useSyncExternalStore } from "react";
import type { ComponentProps } from "react";

import { formatDate, WORK_LOG_TIME_ZONE } from "@/lib/date";
import type { dateFormats } from "@/lib/date";

const subscribe = () => () => {
  /* Read the browser timezone after hydration; no event subscription is needed. */
};
const getTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;
const getServerTimeZone = () => WORK_LOG_TIME_ZONE;

export const useViewerTimeZone = () =>
  useSyncExternalStore(subscribe, getTimeZone, getServerTimeZone);

export function LocalDateTime({
  dateTime,
  format = "date",
  ...props
}: Omit<ComponentProps<"time">, "dateTime" | "children"> & {
  dateTime: string;
  format?: keyof typeof dateFormats;
}) {
  const timeZone = useViewerTimeZone();
  return (
    <time
      {...props}
      dateTime={new Date(dateTime).toISOString()}
      title={`${formatDate(dateTime, "dateTime", timeZone)} (${timeZone})`}
    >
      {formatDate(dateTime, format, timeZone)}
    </time>
  );
}
