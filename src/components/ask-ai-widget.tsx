"use client";

import { Popover } from "@base-ui/react/popover";
import { Copy, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { buildAssistantActions } from "@/lib/ask-ai";
import type { AskAiPageContext } from "@/lib/ask-ai";

export function AskAiWidget({
  profilePrompt,
  pageContext,
}: Readonly<{ profilePrompt: string; pageContext?: AskAiPageContext }>) {
  const face = useRef<HTMLSpanElement>(null);
  const topicId = useId();
  const [topic, setTopic] = useState(
    pageContext === undefined ? "profile" : "page"
  );
  const context = topic === "page" ? pageContext : undefined;
  const prompt = context?.prompt ?? profilePrompt;
  const actions = buildAssistantActions(prompt);
  const subject = context?.title ?? "Sid";
  const [open, setOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const motion = matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    let idleTimer: ReturnType<typeof setTimeout>;
    const reset = () => {
      clearTimeout(idleTimer);
      delete face.current?.dataset.tracking;
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
      face.current.dataset.tracking = "";
      face.current.style.setProperty("--gaze-x", `${Math.tanh(x / 400) * 6}px`);
      face.current.style.setProperty("--gaze-y", `${Math.tanh(y / 300) * 5}px`);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(reset, 2500);
    };
    window.addEventListener("pointermove", follow, { passive: true });
    window.addEventListener("blur", reset);
    document.addEventListener("pointerleave", reset);
    motion.addEventListener("change", reset);
    return () => {
      clearTimeout(idleTimer);
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
        aria-label="Ask an AI"
        className="ask-ai-launcher group fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 inline-flex h-11 items-center gap-2 rounded-full bg-muted py-2 pr-2 pl-3 text-sm font-medium text-popover-foreground shadow-site-floating transition-colors duration-150 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transition-none sm:right-6 sm:bottom-6 print:hidden"
        openOnHover
        delay={250}
        closeDelay={300}
      >
        <span>Ask an AI</span>
        <span
          aria-hidden="true"
          className="ask-ai-face relative flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground"
          ref={face}
        >
          <span className="ask-ai-eyes">
            <span className="ask-ai-blink flex items-center gap-1.25">
              <span className="ask-ai-eye h-2 w-0.75 rounded-full bg-current" />
              <span className="ask-ai-eye h-2 w-0.75 rounded-full bg-current" />
            </span>
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
          <Popover.Popup className="w-80 max-w-[calc(100vw-2rem)] max-h-[min(70dvh,var(--available-height))] overflow-y-auto overscroll-contain rounded-2xl bg-popover px-4 pt-3 pb-4 text-popover-foreground shadow-site-floating outline-none origin-bottom-right transition-[opacity,transform] duration-150 data-starting-style:translate-y-1 data-starting-style:opacity-0 data-ending-style:translate-y-1 data-ending-style:opacity-0 motion-reduce:transition-none">
            <div className="flex items-start justify-between gap-3">
              <Popover.Title className="text-sm leading-6 font-medium">
                Ask an AI
              </Popover.Title>
              <Popover.Close
                aria-label="Close AI picker"
                render={
                  <Button
                    variant="ghost"
                    className="-mt-1 -mr-1 size-8 rounded-full"
                  />
                }
              >
                <X aria-hidden="true" className="size-4" />
              </Popover.Close>
            </div>
            {pageContext === undefined ? null : (
              <fieldset className="mt-2 grid grid-cols-2 gap-1 rounded-lg bg-muted p-1">
                <legend className="sr-only">Question context</legend>
                {[
                  { value: "page", label: pageContext.label },
                  { value: "profile", label: "About Sid" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="relative cursor-pointer text-center text-xs"
                  >
                    <input
                      className="peer sr-only"
                      type="radio"
                      name={topicId}
                      value={option.value}
                      checked={topic === option.value}
                      onChange={() => {
                        setTopic(option.value);
                        setCopyStatus("");
                        setShowPrompt(false);
                      }}
                    />
                    <span className="flex min-h-11 items-center justify-center rounded-md px-2 text-muted-foreground peer-checked:bg-background peer-checked:text-foreground peer-checked:shadow-sm peer-focus-visible:outline-2 peer-focus-visible:outline-ring">
                      {option.label}
                    </span>
                  </label>
                ))}
              </fieldset>
            )}
            <ul
              aria-label="AI assistants"
              className="mt-2 grid grid-cols-2 gap-2"
            >
              {actions.map((action) => (
                <li key={action.label}>
                  <a
                    aria-label={`Ask ${action.label} about ${subject} (opens in a new tab)`}
                    className="flex h-20 flex-col items-center justify-center gap-2 rounded-lg bg-muted px-2 text-xs font-medium transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    data-analytics-placement="ai-widget"
                    href={action.href}
                    onClick={() => {
                      setOpen(false);
                    }}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Image
                      alt=""
                      className={
                        action.label === "ChatGPT" ||
                        action.label === "Perplexity"
                          ? "size-5 dark:invert"
                          : "size-5"
                      }
                      height={20}
                      width={20}
                      src={action.iconSrc}
                    />
                    <span>{action.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <Button
              className="mt-3 min-h-11 w-full text-muted-foreground"
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
