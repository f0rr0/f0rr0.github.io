"use client";

/*
 * Adapted from starc007/ui-components CopyButton and ActionSwapIcon (blur variant).
 * Source: https://github.com/starc007/ui-components/tree/b64c092b63b99c7340376b522325ea309156ba00
 * Uses our Button and motion tokens, with lifecycle-safe clipboard feedback.
 *
 * MIT License
 *
 * Copyright (c) 2026 Saurabh Chauhan
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Check, Copy } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

export function AnimatedCopyButton({
  value,
  label = "Copy",
  className,
}: Readonly<{ value: string; label?: string; className?: string }>) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const request = useRef(0);
  // React requires an initial value, including for an empty ref.
  // oxlint-disable-next-line unicorn/no-useless-undefined
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const reducedMotion = useReducedMotion() === true;
  const copied = status === "copied";
  const Icon = copied ? Check : Copy;

  useEffect(
    () => () => {
      request.current += 1;
      clearTimeout(timeout.current);
    },
    []
  );

  const copy = async () => {
    const currentRequest = ++request.current;
    clearTimeout(timeout.current);
    try {
      await navigator.clipboard.writeText(value);
      if (currentRequest !== request.current) {
        return;
      }
      setStatus("copied");
      timeout.current = setTimeout(() => {
        setStatus("idle");
      }, 1500);
    } catch {
      if (currentRequest === request.current) {
        setStatus("error");
      }
    }
  };

  return (
    <>
      <Button
        className={className}
        variant="ghost"
        data-copy-state={status}
        onClick={() => {
          void copy();
        }}
      >
        <span
          aria-hidden="true"
          className="relative inline-grid size-4 shrink-0 place-items-center"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={copied ? "check" : "copy"}
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, scale: 0.25, filter: "blur(4px)" }
              }
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={
                reducedMotion
                  ? undefined
                  : { opacity: 0, scale: 0.25, filter: "blur(4px)" }
              }
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.18, ease: [0.23, 1, 0.32, 1] }
              }
              className="col-start-1 row-start-1 inline-flex"
            >
              <Icon className="size-4" />
            </motion.span>
          </AnimatePresence>
        </span>
        {label}
      </Button>
      <p
        role="status"
        className={
          status === "error" ? "text-xs text-muted-foreground" : "sr-only"
        }
      >
        {status === "error"
          ? "Select and copy the text below."
          : copied
            ? "Copied"
            : ""}
      </p>
      {status === "error" ? (
        <textarea
          aria-label="Text to copy"
          className="mt-2 min-h-32 w-full resize-y rounded-lg border border-border bg-background p-3 text-sm text-foreground"
          readOnly
          value={value}
          onFocus={(event) => {
            event.currentTarget.select();
          }}
        />
      ) : null}
    </>
  );
}
