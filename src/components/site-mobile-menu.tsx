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
        className="site-icon-button md:hidden"
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
            className="site-menu-panel w-48"
          >
            <ul className="[&_.site-nav-link]:flex">{children}</ul>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
