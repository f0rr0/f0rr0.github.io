"use client";

import { Popover } from "@base-ui/react/popover";
import { ArrowUpRight, Copy, Search, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import type { AskAgentAction } from "@/lib/resume";

export function AskAiWidget({
  actions,
  prompt,
}: Readonly<{ actions: AskAgentAction[]; prompt: string }>) {
  const face = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const motion = matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    const reset = () => {
      face.current?.style.removeProperty("--gaze-x");
      face.current?.style.removeProperty("--gaze-y");
    };
    const follow = (event: PointerEvent) => {
      if (!motion.matches || event.pointerType !== "mouse" || !face.current) {
        return;
      }
      const rect = face.current.getBoundingClientRect();
      const x = event.clientX - rect.x - rect.width / 2;
      const y = event.clientY - rect.y - rect.height / 2;
      const distance = Math.max(100, Math.hypot(x, y));
      face.current.style.setProperty("--gaze-x", `${(x / distance) * 3}px`);
      face.current.style.setProperty("--gaze-y", `${(y / distance) * 3}px`);
    };
    window.addEventListener("pointermove", follow, { passive: true });
    window.addEventListener("blur", reset);
    document.addEventListener("pointerleave", reset);
    motion.addEventListener("change", reset);
    return () => {
      window.removeEventListener("pointermove", follow);
      window.removeEventListener("blur", reset);
      document.removeEventListener("pointerleave", reset);
      motion.removeEventListener("change", reset);
    };
  }, []);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setShowPrompt(false);
      setCopyStatus("Prompt copied. Paste it into your assistant.");
    } catch {
      setShowPrompt(true);
      setCopyStatus("Select and copy the prompt below.");
    }
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        aria-label="Ask an AI about Sid"
        className="ask-ai-launcher group fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 inline-flex h-12 items-center gap-3 rounded-full bg-popover py-1 pr-1.5 pl-4 text-sm font-medium text-popover-foreground shadow-site-floating ring-1 ring-border transition-[background-color,transform] duration-150 hover:bg-accent active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transition-none sm:right-6 sm:bottom-6 sm:h-14 sm:pr-2 print:hidden"
        openOnHover
        delay={250}
        closeDelay={300}
      >
        <span>Ask an AI</span>
        <span
          aria-hidden="true"
          className="ask-ai-face relative flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground sm:size-10"
          ref={face}
        >
          <span className="ask-ai-eyes flex gap-1.5">
            <span className="h-2.5 w-1 rounded-full bg-current" />
            <span className="ask-ai-eye h-2.5 w-1 rounded-full bg-current transition-[height,transform] duration-150 motion-reduce:transition-none" />
          </span>
        </span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner
          align="end"
          side="top"
          sideOffset={12}
          collisionPadding={16}
          className="z-50 print:hidden"
        >
          <Popover.Popup className="w-80 max-w-[calc(100vw-2rem)] max-h-[min(70dvh,var(--available-height))] overflow-y-auto overscroll-contain rounded-2xl bg-popover p-4 text-popover-foreground shadow-site-floating ring-1 ring-border outline-none origin-bottom-right transition-[opacity,transform] duration-150 data-starting-style:translate-y-1 data-starting-style:opacity-0 data-ending-style:translate-y-1 data-ending-style:opacity-0 motion-reduce:transition-none">
            <div className="flex items-start justify-between gap-2">
              <div>
                <Popover.Title className="font-medium">
                  Ask about Sid
                </Popover.Title>
                <Popover.Description className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Open your assistant with my résumé and work as context.
                </Popover.Description>
              </div>
              <Popover.Close
                aria-label="Close AI picker"
                render={
                  <Button
                    variant="ghost"
                    className="-mt-2 -mr-2 size-11 rounded-full"
                  />
                }
              >
                <X aria-hidden="true" className="size-4" />
              </Popover.Close>
            </div>
            <ul
              aria-label="AI assistants"
              className="mt-4 grid grid-cols-2 gap-2"
            >
              {actions.map((action) => (
                <li key={action.label}>
                  <a
                    aria-label={action.description}
                    className="flex min-h-12 items-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs font-medium transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    data-analytics-placement="ai-widget"
                    href={action.href}
                    onClick={() => {
                      setOpen(false);
                    }}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {action.iconSrc === undefined ? (
                      <Search aria-hidden="true" className="size-4 shrink-0" />
                    ) : (
                      <Image
                        alt=""
                        className={
                          action.label === "ChatGPT"
                            ? "size-4 dark:invert"
                            : "size-4"
                        }
                        height={16}
                        width={16}
                        src={action.iconSrc}
                      />
                    )}
                    {action.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="ml-auto size-3 shrink-0 text-muted-foreground"
                    />
                  </a>
                </li>
              ))}
            </ul>
            <Button
              className="mt-2 min-h-11 w-full"
              variant="ghost"
              onClick={() => void copyPrompt()}
            >
              <Copy aria-hidden="true" className="size-4" />
              Copy prompt
            </Button>
            <p role="status" className="text-xs text-muted-foreground">
              {copyStatus}
            </p>
            <div hidden={!showPrompt}>
              <textarea
                aria-label="AI prompt"
                className="mt-2 min-h-32 w-full resize-y rounded-lg border border-border bg-background p-3 text-sm text-foreground"
                readOnly
                value={prompt}
                onFocus={(event) => {
                  event.currentTarget.select();
                }}
              />
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
