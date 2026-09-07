"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

type CopyStatus = "copied" | "error" | "idle";

const RESET_DELAY_MS = 2000;

const buttonContent: Record<
  CopyStatus,
  { accessibleLabel: (language: string) => string; label: string }
> = {
  copied: {
    accessibleLabel: (language) => `${language} code copied to clipboard`,
    label: "Copied",
  },
  error: {
    accessibleLabel: (language) => `Copying ${language} code failed. Try again`,
    label: "Retry",
  },
  idle: {
    accessibleLabel: (language) => `Copy ${language} code to clipboard`,
    label: "Copy",
  },
};

export default function CopyCodeButton({
  language,
}: Readonly<{ language: string }>) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const resetTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current);
      }
    },
    []
  );

  const handleCopy = async (event: MouseEvent<HTMLButtonElement>) => {
    const code = event.currentTarget
      .closest(".code-block")
      ?.querySelector("pre code")
      ?.textContent?.replace(/\n$/u, "");

    if (resetTimer.current !== null) {
      window.clearTimeout(resetTimer.current);
    }

    try {
      if (code === undefined) {
        throw new Error("Code content was not found");
      }

      await navigator.clipboard.writeText(code);
      setStatus("copied");
    } catch {
      setStatus("error");
    }

    resetTimer.current = window.setTimeout(() => {
      setStatus("idle");
      resetTimer.current = null;
    }, RESET_DELAY_MS);
  };

  const content = buttonContent[status];

  return (
    <button
      aria-label={content.accessibleLabel(language)}
      className="code-block-copy inline-flex h-7.5 items-center justify-center gap-1.5 [border:1px_solid_transparent] [border-radius:0.5rem] [padding:0_0.5rem] text-muted-foreground cursor-pointer [font-size:0.75rem] font-normal [line-height:1] [transition:background-color_150ms_ease,_border-color_150ms_ease,_color_150ms_ease] min-w-18.5 [&:hover:not(:disabled)]:[border-color:color-mix(in_oklab,_var(--border)_86%,_var(--foreground))] [&:hover:not(:disabled)]:[background:color-mix(in_oklab,_var(--card)_75%,_transparent)] [&:hover:not(:disabled)]:text-foreground [&:focus-visible]:border-ring [&:focus-visible]:[outline:2px_solid_color-mix(in_oklab,_var(--ring)_38%,_transparent)] [&:focus-visible]:outline-offset-1 [&_svg]:w-4 [&_svg]:h-4 motion-reduce:transition-none print:hidden"
      onClick={(event) => {
        void handleCopy(event);
      }}
      type="button"
    >
      {status === "copied" ? (
        <Check aria-hidden="true" />
      ) : (
        <Copy aria-hidden="true" />
      )}
      <span aria-live="polite">{content.label}</span>
    </button>
  );
}
