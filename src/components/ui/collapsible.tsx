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
  children,
  ...props
}: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
      className={cn(
        "disclosure-panel [&[hidden]:not([hidden='until-found'])]:hidden",
        className
      )}
      data-slot="collapsible-content"
      {...props}
    >
      <div className="disclosure-panel-body">{children}</div>
    </CollapsiblePrimitive.Panel>
  );
}

function DisclosureChevron() {
  return (
    <ChevronRight
      aria-hidden="true"
      className="disclosure-chevron"
      strokeWidth={1.5}
    />
  );
}

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  DisclosureChevron,
};
