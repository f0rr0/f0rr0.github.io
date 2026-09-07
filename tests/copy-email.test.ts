import { expect, spyOn, test } from "bun:test";

import { toast } from "sonner";

import { copyEmail } from "../src/components/copy-email-button.tsx";

test("email copy confirms success only after clipboard access succeeds", async () => {
  const clipboard = Object.getOwnPropertyDescriptor(navigator, "clipboard");
  const success = spyOn(toast, "success").mockReturnValue(1);
  const error = spyOn(toast, "error").mockReturnValue(2);
  const email = "test@example.com";
  let copied = "";
  try {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (value: string) => {
          copied = value;
          await Promise.resolve();
        },
      },
    });
    await copyEmail(email);
    expect(copied).toBe(email);
    expect(success).toHaveBeenCalledWith("Copied");
    expect(error).not.toHaveBeenCalled();

    success.mockClear();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {
          throw new Error("Denied");
        },
      },
    });
    await copyEmail(email);
    expect(success).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalledWith("Copy failed");
  } finally {
    if (clipboard === undefined) {
      Reflect.deleteProperty(navigator, "clipboard");
    } else {
      Object.defineProperty(navigator, "clipboard", clipboard);
    }
    success.mockRestore();
    error.mockRestore();
  }
});

test("HTTP copy fallback reports the command result and removes its field", async () => {
  const clipboard = Object.getOwnPropertyDescriptor(navigator, "clipboard");
  const documentDescriptor = Object.getOwnPropertyDescriptor(
    globalThis,
    "document"
  );
  const elementDescriptor = Object.getOwnPropertyDescriptor(
    globalThis,
    "HTMLElement"
  );
  const success = spyOn(toast, "success").mockReturnValue(1);
  const error = spyOn(toast, "error").mockReturnValue(2);
  let copied = false;
  let selected = false;
  let removed = false;
  const field = {
    value: "",
    readOnly: false,
    style: { cssText: "" },
    select: () => {
      selected = true;
    },
    remove: () => {
      removed = true;
    },
  };
  try {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });
    Object.defineProperty(globalThis, "HTMLElement", {
      configurable: true,
      value: Object,
    });
    Object.defineProperty(globalThis, "document", {
      configurable: true,
      value: {
        activeElement: null,
        createElement: () => field,
        body: { append: () => {} },
        execCommand: () => copied,
      },
    });
    await copyEmail("test@example.com");
    expect(error).toHaveBeenCalledWith("Copy failed");
    expect(success).not.toHaveBeenCalled();
    expect(removed).toBe(true);
    copied = true;
    removed = false;
    await copyEmail("test@example.com");
    expect(field.value).toBe("test@example.com");
    expect(selected).toBe(true);
    expect(removed).toBe(true);
    expect(success).toHaveBeenCalledWith("Copied");
  } finally {
    for (const [target, key, descriptor] of [
      [navigator, "clipboard", clipboard],
      [globalThis, "document", documentDescriptor],
      [globalThis, "HTMLElement", elementDescriptor],
    ] as const) {
      if (descriptor === undefined) {
        Reflect.deleteProperty(target, key);
      } else {
        Object.defineProperty(target, key, descriptor);
      }
    }
    success.mockRestore();
    error.mockRestore();
  }
});
