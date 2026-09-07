"use client";

import { toast } from "sonner";

export async function copyEmail(email: string) {
  try {
    if (navigator.clipboard === undefined) {
      // HTTP previews lack the Clipboard API; keep this fallback synchronous.
      const field = document.createElement("textarea");
      const focused = document.activeElement;
      field.value = email;
      field.readOnly = true;
      field.style.cssText = "position:fixed;opacity:0;pointer-events:none";
      document.body.append(field);
      try {
        field.select();
        // oxlint-disable-next-line typescript/no-deprecated -- Only fallback available on insecure HTTP previews.
        if (!document.execCommand("copy")) {
          throw new Error("Copy failed");
        }
      } finally {
        field.remove();
        if (focused instanceof HTMLElement) {
          focused.focus({ preventScroll: true });
        }
      }
    } else {
      await navigator.clipboard.writeText(email);
    }
    toast.success("Copied");
  } catch {
    toast.error("Copy failed");
  }
}

export function CopyEmailButton({ email }: Readonly<{ email: string }>) {
  return (
    <button
      aria-label="Copy email address"
      className="site-text-link cursor-pointer"
      onClick={() => {
        void copyEmail(email);
      }}
      title={email}
      type="button"
    >
      Email
    </button>
  );
}
