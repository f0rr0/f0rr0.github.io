"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TooltipContent,
  TooltipGroup,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { PublicCodexSeries } from "@/lib/codex/stats";
import { formatDate } from "@/lib/date";

const number = new Intl.NumberFormat("en-US");
const compactNumber = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
  notation: "compact",
});
const date = (day: string) => new Date(`${day}T00:00:00.000Z`);
const weekStart = (day: string) => {
  const value = date(day);
  value.setUTCDate(value.getUTCDate() - value.getUTCDay());
  return value;
};

export const activityIntensity = (
  tokens: number,
  minimum: number,
  maximum: number
) =>
  tokens === 0
    ? 0
    : minimum === maximum
      ? 1
      : (Math.log(tokens) - Math.log(minimum)) /
        (Math.log(maximum) - Math.log(minimum));

const MonthAxis = ({
  calendarOffset,
  values,
}: {
  calendarOffset: number;
  values: PublicCodexSeries["values"];
}) => {
  const columns = Math.ceil((calendarOffset + values.length) / 7);
  const ticks = values.flatMap((point, index) =>
    index === 0 ||
    point.day.slice(0, 7) === (values[index - 1]?.day ?? point.day).slice(0, 7)
      ? []
      : [{ day: point.day, index }]
  );
  return (
    <div
      aria-hidden="true"
      className="relative mt-2 h-4 max-sm:[&>span:nth-child(even)]:hidden"
    >
      {ticks.map((tick) => {
        const position =
          Math.floor((calendarOffset + tick.index) / 7) / (columns - 1);
        return (
          <span
            className={`absolute -translate-x-1/2 font-sans text-xs text-muted-foreground ${position > 0.95 ? "-translate-x-full" : ""}`}
            key={tick.day}
            style={{ left: `${String(position * 100)}%` }}
          >
            {formatDate(tick.day, "month")}
          </span>
        );
      })}
    </div>
  );
};

const ActivityHeatmap = ({
  mode,
  series,
}: {
  mode: "cumulative" | "daily" | "weekly";
  series: PublicCodexSeries;
}) => {
  const positiveTokens = series.values
    .map(({ tokens }) => tokens)
    .filter((tokens) => tokens > 0);
  const minimum = Math.min(...positiveTokens);
  const maximum = Math.max(...positiveTokens);
  const leadingDays = date(series.values[0]?.day ?? "1970-01-04").getUTCDay();
  return (
    <figure>
      <div
        aria-label={`${mode} token activity${series.partial ? ", partial data" : ""}`}
        className="grid grid-flow-col grid-rows-7 auto-cols-fr gap-0.5 sm:gap-1"
        role="group"
      >
        {Array.from({ length: leadingDays }, (_, index) => (
          <span aria-hidden="true" key={`leading-${String(index)}`} />
        ))}
        {series.values.map(({ day, tokens }) => {
          const ratio = activityIntensity(tokens, minimum, maximum);
          const color =
            tokens === 0
              ? "bg-muted/60"
              : ratio < 0.25
                ? "bg-primary/25"
                : ratio < 0.5
                  ? "bg-primary/45"
                  : ratio < 0.75
                    ? "bg-primary/70"
                    : "bg-primary";
          const dayLabel = formatDate(mode === "weekly" ? weekStart(day) : day);
          return (
            <TooltipTrigger
              key={day}
              payload={
                <TooltipContent>
                  {dayLabel} · {compactNumber.format(tokens)} tokens
                </TooltipContent>
              }
              aria-label={`${dayLabel}: ${number.format(tokens)} tokens`}
              className={`aspect-square min-w-0 rounded-[0.2rem] outline-none motion-safe:transition-transform motion-safe:hover:scale-125 focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring ${color}`}
              tabIndex={tokens === 0 ? -1 : 0}
              type="button"
            />
          );
        })}
      </div>
      <MonthAxis calendarOffset={leadingDays} values={series.values} />
      {series.partial ? (
        <figcaption className="mt-1 font-sans text-xs text-muted-foreground">
          Partial history
        </figcaption>
      ) : null}
    </figure>
  );
};

export function CodexActivity({
  cumulative,
  daily,
  weekly,
}: {
  cumulative: PublicCodexSeries;
  daily: PublicCodexSeries;
  weekly: PublicCodexSeries;
}) {
  return (
    <TooltipGroup>
      <Tabs className="mt-6 gap-4" defaultValue="daily">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h3 className="text-sm font-medium text-foreground">Activity</h3>
          <TabsList aria-label="Token activity interval" variant="line">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="cumulative">Cumulative</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="daily">
          <ActivityHeatmap mode="daily" series={daily} />
        </TabsContent>
        <TabsContent value="weekly">
          <ActivityHeatmap mode="weekly" series={weekly} />
        </TabsContent>
        <TabsContent value="cumulative">
          <ActivityHeatmap mode="cumulative" series={cumulative} />
        </TabsContent>
      </Tabs>
    </TooltipGroup>
  );
}
