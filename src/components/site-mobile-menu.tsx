"use client";

import { Popover } from "@base-ui/react/popover";
import { Menu } from "lucide-react";
import type { ReactNode } from "react";

export function SiteMobileMenu({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Popover.Root>
      <Popover.Trigger
        aria-label="Navigation menu"
        className="site-icon-button inline-flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:hidden"
      >
        <Menu aria-hidden="true" className="size-5" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner
          align="end"
          sideOffset={8}
          className="z-50 md:hidden"
        >
          <Popover.Popup
            aria-label="Navigation menu"
            className="site-menu-panel rounded-lg bg-popover p-2 text-popover-foreground shadow-site-floating ring-1 ring-border outline-none [--popup-enter-x:0px] [--popup-enter-y:-4px] [transform-origin:var(--transform-origin)] [transition:opacity_160ms_ease-out,_transform_220ms_var(--ease-settle),_height_240ms_var(--ease-settle)] [&[data-side='top']]:[--popup-enter-y:4px] [&[data-side='left']]:[--popup-enter-x:4px] [&[data-side='left']]:[--popup-enter-y:0px] [&[data-side='right']]:[--popup-enter-x:-4px] [&[data-side='right']]:[--popup-enter-y:0px] [&:is(_[data-starting-style],_[data-ending-style]_)]:opacity-0 [&:is(_[data-starting-style],_[data-ending-style]_)]:[transform:translate(var(--popup-enter-x),_var(--popup-enter-y))_scale(0.985)] [&[data-ending-style]]:[transition-duration:100ms] motion-reduce:transition-none w-48"
          >
            <ul className="[&_.site-nav-link]:flex">{children}</ul>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
