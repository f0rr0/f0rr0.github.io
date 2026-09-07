"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";

import { cn } from "@/lib/utils";

const menuItemClasses =
  "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive not-data-[variant=destructive]:focus:**:text-accent-foreground min-h-11 gap-2 rounded-sm px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 group/dropdown-menu-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0";

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "site-menu-panel rounded-lg bg-popover p-2 text-popover-foreground shadow-site-floating ring-1 ring-border outline-none [--popup-enter-x:0px] [--popup-enter-y:-4px] [transform-origin:var(--transform-origin)] [transition:opacity_160ms_ease-out,_transform_220ms_var(--ease-settle),_height_240ms_var(--ease-settle)] [&[data-side='top']]:[--popup-enter-y:4px] [&[data-side='left']]:[--popup-enter-x:4px] [&[data-side='left']]:[--popup-enter-y:0px] [&[data-side='right']]:[--popup-enter-x:-4px] [&[data-side='right']]:[--popup-enter-y:0px] [&:is(_[data-starting-style],_[data-ending-style]_)]:opacity-0 [&:is(_[data-starting-style],_[data-ending-style]_)]:[transform:translate(var(--popup-enter-x),_var(--popup-enter-y))_scale(0.985)] [&[data-ending-style]]:[transition-duration:100ms] motion-reduce:transition-none z-50 max-h-(--available-height) min-w-32 w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto data-closed:overflow-hidden",
            className
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

function DropdownMenuLinkItem({
  className,
  ...props
}: MenuPrimitive.LinkItem.Props) {
  return (
    <MenuPrimitive.LinkItem
      data-slot="dropdown-menu-link-item"
      className={cn(menuItemClasses, "cursor-pointer", className)}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLinkItem,
  DropdownMenuTrigger,
};
