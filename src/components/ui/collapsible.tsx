"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

function Collapsible({ ...props }: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({ ...props }: CollapsiblePrimitive.Trigger.Props) {
  return (
    <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
  );
}

function CollapsibleContent({
  className,
  ...props
}: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
      className={cn(
        "h-[var(--collapsible-panel-height)] overflow-hidden data-ending-style:h-0 data-starting-style:h-0 motion-safe:transition-[height] motion-safe:duration-150 motion-safe:ease-out [&[hidden]:not([hidden='until-found'])]:hidden",
        className
      )}
      data-slot="collapsible-content"
      {...props}
    />
  );
}

function DisclosureChevron() {
  return <ChevronRight aria-hidden="true" className="disclosure-chevron" />;
}

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  DisclosureChevron,
};
