"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

function TooltipProvider({
  delay = 250,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      closeDelay={100}
      timeout={400}
      {...props}
    />
  );
}

function TooltipGroup({ children }: { children: ReactNode }) {
  return (
    <TooltipPrimitive.Root<ReactNode>>
      {({ payload }) => (
        <>
          {children}
          {payload}
        </>
      )}
    </TooltipPrimitive.Root>
  );
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  anchor,
  children,
  preview = false,
  ...props
}: TooltipPrimitive.Popup.Props & { preview?: boolean } & Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "anchor"
  >) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        anchor={anchor}
        align={align}
        alignOffset={alignOffset}
        className="isolate z-50 motion-safe:transition-[top,left,right,bottom,transform] motion-safe:duration-100 motion-safe:ease-out"
        side={side}
        sideOffset={sideOffset}
        collisionPadding={preview ? 16 : undefined}
        collisionAvoidance={
          preview
            ? { side: "flip", align: "shift", fallbackAxisSide: "end" }
            : undefined
        }
      >
        <TooltipPrimitive.Popup
          className={cn(
            preview
              ? "site-preview block h-[var(--popup-height,auto)] overflow-hidden motion-safe:transition-[height,opacity] motion-safe:duration-100"
              : "z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 duration-150 motion-reduce:animate-none",
            preview ? undefined : className
          )}
          data-slot="tooltip-content"
          {...props}
        >
          {preview ? (
            <TooltipPrimitive.Viewport className="preview-viewport">
              <div className={cn("p-4", className)}>{children}</div>
            </TooltipPrimitive.Viewport>
          ) : (
            children
          )}
          {preview ? null : (
            <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" />
          )}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export { TooltipGroup, TooltipContent, TooltipProvider, TooltipTrigger };
