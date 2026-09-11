"use client";

import { useEffect, useRef } from "react";

export function AskAiFace() {
  const face = useRef<HTMLSpanElement>(null);
  const eyes = useRef<HTMLSpanElement>(null);
  const blink = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = matchMedia("(hover: hover) and (pointer: fine)");
    const eyeNode = eyes.current;
    const glanceAnimation = eyeNode?.animate(
      {
        transform: [
          "translate(0, 0)",
          "translate(0, 0)",
          "translate(-4px, -2px)",
          "translate(-4px, -2px)",
          "translate(0, 0)",
          "translate(3px, 1px)",
          "translate(3px, 1px)",
          "translate(0, 0)",
        ],
        offset: [0, 0.15, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
      },
      { duration: 9000, iterations: Infinity, easing: "ease-in-out" }
    );
    const blinkAnimation = blink.current?.animate(
      {
        scale: ["1 1", "1 1", "1 0.12", "1 1", "1 1"],
        offset: [0, 0.44, 0.46, 0.48, 1],
      },
      { duration: 6500, iterations: Infinity }
    );
    let idleTimer: ReturnType<typeof setTimeout>;
    const idle = () => {
      clearTimeout(idleTimer);
      eyeNode?.style.removeProperty("--gaze-x");
      eyeNode?.style.removeProperty("--gaze-y");
      glanceAnimation?.cancel();
      blinkAnimation?.cancel();
      if (!reducedMotion.matches) {
        glanceAnimation?.play();
        blinkAnimation?.play();
      }
    };
    const follow = (event: PointerEvent) => {
      if (
        reducedMotion.matches ||
        !pointer.matches ||
        event.pointerType !== "mouse" ||
        !face.current
      ) {
        return;
      }
      const rect = face.current.getBoundingClientRect();
      glanceAnimation?.cancel();
      eyeNode?.style.setProperty(
        "--gaze-x",
        `${Math.tanh((event.clientX - rect.x - rect.width / 2) / 400) * 6}px`
      );
      eyeNode?.style.setProperty(
        "--gaze-y",
        `${Math.tanh((event.clientY - rect.y - rect.height / 2) / 300) * 5}px`
      );
      clearTimeout(idleTimer);
      idleTimer = setTimeout(idle, 2500);
    };
    idle();
    window.addEventListener("pointermove", follow, { passive: true });
    window.addEventListener("blur", idle);
    document.addEventListener("pointerleave", idle);
    reducedMotion.addEventListener("change", idle);
    pointer.addEventListener("change", idle);
    return () => {
      clearTimeout(idleTimer);
      glanceAnimation?.cancel();
      blinkAnimation?.cancel();
      window.removeEventListener("pointermove", follow);
      window.removeEventListener("blur", idle);
      document.removeEventListener("pointerleave", idle);
      reducedMotion.removeEventListener("change", idle);
      pointer.removeEventListener("change", idle);
    };
  }, []);

  return (
    <span
      ref={face}
      aria-hidden="true"
      className="relative flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground"
    >
      <span
        ref={eyes}
        className="[transform:translate(var(--gaze-x,0px),var(--gaze-y,0px))] transition-transform duration-180 ease-settle motion-reduce:transform-none motion-reduce:transition-none"
      >
        <span
          ref={blink}
          className="flex items-center gap-1.25 [&>span]:h-2 [&>span]:w-0.75 [&>span]:rounded-full [&>span]:bg-current [&>span]:transition-[height] [&>span]:duration-180 [&>span]:ease-settle group-hover:[&>span]:h-1.5 group-focus-visible:[&>span]:h-1.5 group-data-popup-open:[&>span]:h-1.5 motion-reduce:[&>span]:transition-none"
        >
          <span />
          <span />
        </span>
      </span>
    </span>
  );
}
