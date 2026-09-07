"use client";

import { PreviewCard as HoverCardPrimitive } from "@base-ui/react/preview-card";
import { createContext, use, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const WarmPreview = createContext(false);

function HoverCardGroup({ children }: { children: ReactNode }) {
  const [warm, setWarm] = useState(false);
  const reset = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (reset.current !== null) {
        clearTimeout(reset.current);
      }
    },
    []
  );
  return (
    <WarmPreview value={warm}>
      <HoverCardPrimitive.Root<ReactNode>
        onOpenChange={(open) => {
          if (reset.current !== null) {
            clearTimeout(reset.current);
          }
          if (open) {
            setWarm(true);
          } else {
            reset.current = setTimeout(() => {
              setWarm(false);
            }, 400);
          }
        }}
      >
        {({ payload }) => (
          <>
            {children}
            {payload}
          </>
        )}
      </HoverCardPrimitive.Root>
    </WarmPreview>
  );
}

function HoverCardTrigger(props: HoverCardPrimitive.Trigger.Props) {
  const warm = use(WarmPreview);
  return (
    <HoverCardPrimitive.Trigger
      delay={warm ? 0 : 250}
      closeDelay={100}
      {...props}
    />
  );
}

function HoverCardContent({
  className,
  children,
  side = "right",
  ...props
}: HoverCardPrimitive.Popup.Props &
  Pick<HoverCardPrimitive.Positioner.Props, "side">) {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Positioner
        align="start"
        className="z-50 motion-safe:transition-[top,left,right,bottom,transform] motion-safe:duration-100 motion-safe:ease-out"
        side={side}
        sideOffset={24}
        collisionPadding={16}
        collisionAvoidance={{
          side: "flip",
          align: "shift",
          fallbackAxisSide: "end",
        }}
      >
        <HoverCardPrimitive.Popup
          className={cn(
            "site-preview h-[var(--popup-height,auto)] origin-(--transform-origin) overflow-hidden outline-none motion-safe:transition-[height,opacity] motion-safe:duration-100",
            className
          )}
          data-slot="hover-card-content"
          {...props}
        >
          <HoverCardPrimitive.Viewport className="preview-viewport">
            {children}
          </HoverCardPrimitive.Viewport>
        </HoverCardPrimitive.Popup>
      </HoverCardPrimitive.Positioner>
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCardGroup, HoverCardContent, HoverCardTrigger };
