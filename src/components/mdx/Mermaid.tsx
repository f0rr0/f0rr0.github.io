"use client";

import { Maximize2, Minimize2, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import type { Mermaid, MermaidConfig, RenderResult } from "mermaid";
import { useTheme } from "next-themes";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface MermaidProps {
  chart: string;
  className?: string;
}

interface RenderedDiagram {
  diagramType: string;
  naturalWidth: number;
  svg: string;
}

type RenderStatus = "error" | "loading" | "ready";
type SiteTheme = "dark" | "light";

const MAX_ZOOM = 2;
const MIN_ZOOM = 0.75;
const ZOOM_STEP = 0.25;
const FALLBACK_DIAGRAM_WIDTH = 720;
const ELK_LAYOUT_PATTERN =
  /(?:^|\n)\s*flowchart-elk\b|layout\s*:\s*["']?elk(?:\.[a-zA-Z]+)?["']?/u;

const diagramTypeNames: Record<string, string> = {
  architecture: "Architecture",
  block: "Block diagram",
  c4: "C4 architecture",
  class: "Class diagram",
  classDiagram: "Class diagram",
  er: "Entity relationship",
  eventModeling: "Event model",
  flowchart: "Flowchart",
  "flowchart-elk": "Flowchart",
  "flowchart-v2": "Flowchart",
  gantt: "Gantt chart",
  gitGraph: "Git graph",
  journey: "User journey",
  mindmap: "Mind map",
  pie: "Pie chart",
  sankey: "Sankey diagram",
  sequence: "Sequence diagram",
  stateDiagram: "State diagram",
  "stateDiagram-v2": "State diagram",
  timeline: "Timeline",
};

const siteThemeVariables: Record<
  SiteTheme,
  Record<string, boolean | string>
> = {
  dark: {
    background: "#1a1918",
    clusterBkg: "#242322",
    clusterBorder: "#3a3836",
    darkMode: true,
    edgeLabelBackground: "#1a1918",
    lineColor: "#a8a29e",
    mainBkg: "#322619",
    nodeBorder: "#d97706",
    noteBkgColor: "#2b2319",
    noteBorderColor: "#6a4b24",
    noteTextColor: "#e8ae58",
    primaryBorderColor: "#d97706",
    primaryColor: "#322619",
    primaryTextColor: "#e7e5e4",
    secondaryBorderColor: "#6a4b24",
    secondaryColor: "#2b2927",
    secondaryTextColor: "#d6d3d1",
    tertiaryBorderColor: "#3a3836",
    tertiaryColor: "#242322",
    tertiaryTextColor: "#a8a29e",
    textColor: "#e7e5e4",
  },
  light: {
    background: "#faf9f6",
    clusterBkg: "#f2efea",
    clusterBorder: "#d6d3d1",
    darkMode: false,
    edgeLabelBackground: "#faf9f6",
    lineColor: "#78716c",
    mainBkg: "#fff7ed",
    nodeBorder: "#b45309",
    noteBkgColor: "#f9ebd2",
    noteBorderColor: "#e4c184",
    noteTextColor: "#835018",
    primaryBorderColor: "#b45309",
    primaryColor: "#fff7ed",
    primaryTextColor: "#292524",
    secondaryBorderColor: "#e4c184",
    secondaryColor: "#f7ead8",
    secondaryTextColor: "#57534e",
    tertiaryBorderColor: "#d6d3d1",
    tertiaryColor: "#f2efea",
    tertiaryTextColor: "#57534e",
    textColor: "#292524",
  },
};

let mermaidPromise: Promise<Mermaid> | undefined;
let elkRegistrationPromise: Promise<void> | undefined;
let renderQueue: Promise<null> = Promise.resolve(null);

const fullscreenSubscribers = new Set<() => void>();

function emitFullscreenChange() {
  for (const subscriber of fullscreenSubscribers) {
    subscriber();
  }
}

function subscribeToFullscreen(subscriber: () => void) {
  fullscreenSubscribers.add(subscriber);

  if (fullscreenSubscribers.size === 1) {
    document.addEventListener("fullscreenchange", emitFullscreenChange);
  }

  return () => {
    fullscreenSubscribers.delete(subscriber);

    if (fullscreenSubscribers.size === 0) {
      document.removeEventListener("fullscreenchange", emitFullscreenChange);
    }
  };
}

function getFullscreenSnapshot() {
  return document.fullscreenElement?.id ?? null;
}

function getServerFullscreenSnapshot() {
  return null;
}

async function importMermaid() {
  const { default: mermaid } = await import("mermaid");
  return mermaid;
}

async function loadMermaid() {
  mermaidPromise ??= importMermaid();
  return await mermaidPromise;
}

async function importAndRegisterElk(mermaid: Mermaid) {
  // Keep this lazy. The compatible 0.1.9 release is pinned because 0.2.x
  // serializes live DOM nodes while rendering inside React.
  const { default: elkLayouts } = await import("@mermaid-js/layout-elk");
  mermaid.registerLayoutLoaders(elkLayouts);
}

async function registerElkLayouts(mermaid: Mermaid) {
  elkRegistrationPromise ??= importAndRegisterElk(mermaid);
  await elkRegistrationPromise;
}

async function enqueueRender<T>(render: () => Promise<T>) {
  const previousRender = renderQueue;
  const queueTurn = Promise.withResolvers<null>();
  renderQueue = queueTurn.promise;

  await previousRender;

  try {
    return await render();
  } finally {
    queueTurn.resolve(null);
  }
}

function createHandDrawnSeed(chart: string) {
  let seed = 17;

  for (const character of chart) {
    seed = (seed * 31 + (character.codePointAt(0) ?? 0)) % 2_147_483_647;
  }

  return seed === 0 ? 7 : seed;
}

function getDiagramTypeName(diagramType: string) {
  const knownName = diagramTypeNames[diagramType];

  if (knownName !== undefined) {
    return knownName;
  }

  return diagramType
    .replaceAll(/[-_]+/gu, " ")
    .replaceAll(/([a-z])([A-Z])/gu, "$1 $2")
    .replaceAll(/\bv\d+\b/gu, "")
    .trim()
    .replace(/^./u, (character) => character.toUpperCase());
}

function createMermaidConfig({
  id,
  seed,
  theme,
}: {
  id: string;
  seed: number;
  theme: SiteTheme;
}): MermaidConfig {
  const isDark = theme === "dark";

  return {
    darkMode: isDark,
    deterministicIDSeed: id,
    deterministicIds: true,
    flowchart: {
      curve: "basis",
      nodeSpacing: 44,
      padding: 16,
      rankSpacing: 52,
      useMaxWidth: true,
    },
    fontFamily: "var(--font-sans), ui-sans-serif, sans-serif",
    fontSize: 16,
    handDrawnSeed: seed,
    look: "handDrawn",
    markdownAutoWrap: true,
    securityLevel: "strict",
    startOnLoad: false,
    suppressErrorRendering: true,
    theme: "base",
    themeCSS: `
      .label, .nodeLabel, .edgeLabel, .messageText, .loopText {
        font-weight: 600;
      }
      .edgeLabel {
        border-radius: 0.375rem;
      }
    `,
    themeVariables: siteThemeVariables[theme],
    wrap: true,
  };
}

function normalizeSvg(svg: string, diagramType: string) {
  const template = document.createElement("template");
  template.innerHTML = svg.trim();
  const element = template.content.querySelector("svg");

  if (element === null) {
    throw new Error("Mermaid did not return an SVG element");
  }

  const viewBox = element
    .getAttribute("viewBox")
    ?.trim()
    .split(/\s+/u)
    .map(Number);
  const viewBoxWidth = viewBox?.length === 4 ? viewBox[2] : undefined;
  const naturalWidth =
    viewBoxWidth !== undefined && Number.isFinite(viewBoxWidth)
      ? Math.max(viewBoxWidth, 1)
      : FALLBACK_DIAGRAM_WIDTH;

  element.classList.add("mermaid-svg");
  element.removeAttribute("height");
  element.removeAttribute("style");
  element.removeAttribute("width");
  element.setAttribute("focusable", "false");
  element.setAttribute("preserveAspectRatio", "xMidYMid meet");

  if (
    !element.hasAttribute("aria-label") &&
    !element.hasAttribute("aria-labelledby")
  ) {
    element.setAttribute(
      "aria-label",
      `${getDiagramTypeName(diagramType)} diagram`
    );
  }

  if (!element.hasAttribute("role")) {
    element.setAttribute("role", "img");
  }

  return {
    naturalWidth,
    svg: element.outerHTML,
  };
}

export default function Mermaid({ chart, className }: Readonly<MermaidProps>) {
  const { resolvedTheme } = useTheme();
  const generatedId = useId();
  const mermaidId = useMemo(
    () => `mermaid-${generatedId.replaceAll(/[^a-zA-Z0-9-_]/gu, "")}`,
    [generatedId]
  );
  const frameId = `${mermaidId}-frame`;
  const seed = useMemo(() => createHandDrawnSeed(chart), [chart]);
  const frameRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const bindFunctionsRef = useRef<RenderResult["bindFunctions"] | null>(null);
  const [diagram, setDiagram] = useState<RenderedDiagram | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<RenderStatus>("loading");
  const [zoom, setZoom] = useState(1);
  const fullscreenElementId = useSyncExternalStore(
    subscribeToFullscreen,
    getFullscreenSnapshot,
    getServerFullscreenSnapshot
  );
  const isFullscreen = fullscreenElementId === frameId;
  const siteTheme: SiteTheme = resolvedTheme === "dark" ? "dark" : "light";

  useEffect(() => {
    let cancelled = false;

    const renderDiagram = async () => {
      const mermaid = await loadMermaid();

      if (ELK_LAYOUT_PATTERN.test(chart)) {
        await registerElkLayouts(mermaid);
      }

      return await enqueueRender(async () => {
        mermaid.initialize(
          createMermaidConfig({
            id: mermaidId,
            seed,
            theme: siteTheme,
          })
        );

        return await mermaid.render(mermaidId, chart);
      });
    };

    const runRender = async () => {
      try {
        const result = await renderDiagram();
        const normalizedSvg = normalizeSvg(result.svg, result.diagramType);

        if (cancelled) {
          return;
        }

        bindFunctionsRef.current = result.bindFunctions;
        setDiagram({
          diagramType: getDiagramTypeName(result.diagramType),
          naturalWidth: normalizedSvg.naturalWidth,
          svg: normalizedSvg.svg,
        });
        setStatus("ready");
      } catch (error) {
        if (!cancelled) {
          bindFunctionsRef.current = null;
          setDiagram(null);
          setErrorMessage(
            error instanceof Error ? error.message : "Unknown rendering error"
          );
          setStatus("error");
        }
      }
    };

    if (resolvedTheme === "dark" || resolvedTheme === "light") {
      setErrorMessage(null);
      setStatus("loading");
      void runRender();
    }

    return () => {
      cancelled = true;
    };
  }, [chart, mermaidId, resolvedTheme, seed, siteTheme]);

  useEffect(() => {
    if (status === "ready" && canvasRef.current !== null) {
      bindFunctionsRef.current?.(canvasRef.current);
    }
  }, [diagram, status]);

  const changeZoom = (change: number) => {
    setZoom((currentZoom) =>
      Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, currentZoom + change))
    );
  };

  const toggleFullscreen = async () => {
    const frame = frameRef.current;

    if (frame === null) {
      return;
    }

    try {
      await (document.fullscreenElement === frame
        ? document.exitFullscreen()
        : frame.requestFullscreen());
    } catch {
      frame.focus();
    }
  };

  const diagramStyle =
    diagram === null
      ? undefined
      : ({
          "--mermaid-render-width": `${Math.round(
            diagram.naturalWidth * zoom
          )}px`,
        } as CSSProperties);
  const diagramType = diagram?.diagramType ?? "Diagram";

  return (
    <figure
      aria-busy={status === "loading"}
      className={cn(
        "mermaid-block min-w-0 overflow-hidden [border:1px_solid_color-mix(in_oklab,_var(--border)_88%,_var(--foreground))] [border-radius:0.875rem] [background:color-mix(in_oklab,_var(--card)_94%,_var(--muted))] [box-shadow:0_1px_2px_rgb(41_37_36_/_8%),_0_18px_42px_-34px_rgb(41_37_36_/_34%)] dark:[box-shadow:0_1px_2px_rgb(0_0_0_/_30%),_0_18px_42px_-30px_rgb(0_0_0_/_80%)] [&:fullscreen]:flex [&:fullscreen]:[width:100vw] [&:fullscreen]:[height:100vh] [&:fullscreen]:[margin:0] [&:fullscreen]:flex-col [&:fullscreen]:border-0 [&:fullscreen]:rounded-none [&:fullscreen]:bg-background print:break-inside-avoid print:shadow-none",
        className
      )}
      data-error={status === "error" ? errorMessage : null}
      data-rendering={
        status === "loading" && diagram !== null ? "true" : "false"
      }
      id={frameId}
      ref={frameRef}
      tabIndex={-1}
    >
      <div
        aria-label={`${diagramType}. Scroll horizontally to inspect larger diagrams.`}
        className="mermaid-viewport relative min-h-44 overflow-x-auto [overscroll-behavior-inline:contain] [background-color:color-mix(in_oklab,_var(--card)_94%,_var(--background))] [background-image:radial-gradient(_circle,_color-mix(in_oklab,_var(--muted-foreground)_19%,_transparent)_0.75px,_transparent_0.8px_)] [background-position:0.25rem_0.25rem] [background-size:1rem_1rem] p-7 [scrollbar-color:color-mix(in_oklab,_var(--muted-foreground)_52%,_transparent)_color-mix(in_oklab,_var(--muted)_58%,_transparent)] [scrollbar-width:thin] [&:focus-visible]:[outline:2px_solid_var(--ring)] [&:focus-visible]:[outline-offset:-2px] [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:[border-top:1px_solid_color-mix(in_oklab,_var(--border)_72%,_transparent)] [&::-webkit-scrollbar-track]:[background:color-mix(in_oklab,_var(--muted)_58%,_transparent)] [&::-webkit-scrollbar-thumb]:[border:0.2rem_solid_transparent] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:[background:color-mix(in_oklab,_var(--muted-foreground)_52%,_transparent)] [&::-webkit-scrollbar-thumb]:[background-clip:padding-box] [.mermaid-block:fullscreen_&]:flex [.mermaid-block:fullscreen_&]:[min-height:0] [.mermaid-block:fullscreen_&]:flex-1 [.mermaid-block:fullscreen_&]:items-center [.mermaid-block:fullscreen_&]:[padding:clamp(1rem,_4vw,_4rem)] max-sm:min-h-38 max-sm:[padding:1.25rem_1rem] print:[min-height:0] print:overflow-visible print:bg-transparent print:p-3"
        tabIndex={diagram === null ? -1 : 0}
      >
        {diagram === null ? null : (
          <div
            className="mermaid-canvas flex w-max min-w-full items-start justify-center [transition:opacity_180ms_ease] [&_.mermaid-svg]:block [&_.mermaid-svg]:[width:var(--mermaid-render-width)] [&_.mermaid-svg]:max-w-none [&_.mermaid-svg]:h-auto [&_.mermaid-svg]:flex-none [&_.mermaid-svg]:overflow-visible [&_.mermaid-svg]:bg-transparent [.mermaid-block[data-rendering='true']_&]:[opacity:0.58] [.mermaid-block:fullscreen_&]:items-center print:w-full print:[&_.mermaid-svg]:w-full print:[&_.mermaid-svg]:[max-width:100%]"
            dangerouslySetInnerHTML={{ __html: diagram.svg }}
            ref={canvasRef}
            style={diagramStyle}
          />
        )}
        {status === "loading" && diagram === null ? (
          <div
            aria-live="polite"
            className="mermaid-placeholder flex min-h-30 items-center justify-center gap-3 text-muted-foreground font-sans [font-size:0.875rem]"
            role="status"
          >
            <span
              aria-hidden="true"
              className="mermaid-placeholder-mark motion-reduce:[animation:none] w-9 [height:1.4rem] [border:2px_solid_color-mix(in_oklab,_var(--primary)_72%,_transparent)] [border-radius:48%_54%_46%_52%] animate-mermaid-sketch-pulse [transform:rotate(-3deg)]"
            />
            <span>Drawing diagram…</span>
          </div>
        ) : null}
        {status === "error" ? (
          <div
            className="mermaid-error flex min-h-30 items-center justify-center gap-3 text-muted-foreground font-sans [font-size:0.875rem] flex-col [gap:0.2rem] text-center [&_strong]:text-foreground [&_strong]:[font-size:0.875rem] [&_strong]:[font-weight:650] [&_span]:[font-size:0.75rem]"
            role="alert"
          >
            <strong>Diagram unavailable</strong>
            <span>The Mermaid source could not be rendered.</span>
          </div>
        ) : null}
      </div>
      <div className="mermaid-toolbar flex min-h-11 items-center justify-between gap-3 [border-top:1px_solid_color-mix(in_oklab,_var(--border)_88%,_transparent)] [background:color-mix(in_oklab,_var(--muted)_72%,_var(--card))] [padding:0.35rem_0.5rem_0.35rem_1rem] font-sans max-sm:min-h-10.5 max-sm:pl-3 print:hidden">
        <span className="mermaid-diagram-type overflow-hidden [color:color-mix(in_oklab,_var(--foreground)_88%,_var(--muted-foreground))] [font-size:0.75rem] [font-weight:650] [line-height:1] text-ellipsis whitespace-nowrap">
          {diagramType}
        </span>
        <div className="mermaid-toolbar-actions flex shrink-0 items-center [gap:0.2rem]">
          <button
            aria-label="Zoom diagram out"
            className="mermaid-control inline-flex h-7.5 min-w-7.5 items-center justify-center gap-1.5 [border:1px_solid_transparent] [border-radius:0.5rem] [padding:0_0.5rem] text-muted-foreground cursor-pointer [font-size:0.75rem] font-normal [line-height:1] [transition:background-color_150ms_ease,_border-color_150ms_ease,_color_150ms_ease] [&:hover:not(:disabled)]:[border-color:color-mix(in_oklab,_var(--border)_86%,_var(--foreground))] [&:hover:not(:disabled)]:[background:color-mix(in_oklab,_var(--card)_75%,_transparent)] [&:hover:not(:disabled)]:text-foreground [&:focus-visible]:border-ring [&:focus-visible]:[outline:2px_solid_color-mix(in_oklab,_var(--ring)_38%,_transparent)] [&:focus-visible]:outline-offset-1 [&_svg]:w-4 [&_svg]:h-4 motion-reduce:transition-none [&:disabled]:cursor-default [&:disabled]:[opacity:0.35] max-sm:[padding-inline:0.35rem]"
            disabled={zoom <= MIN_ZOOM || diagram === null}
            onClick={() => {
              changeZoom(-ZOOM_STEP);
            }}
            title="Zoom out"
            type="button"
          >
            <ZoomOut aria-hidden="true" />
          </button>
          <button
            aria-label="Reset diagram zoom"
            className="mermaid-control inline-flex h-7.5 min-w-7.5 items-center justify-center gap-1.5 [border:1px_solid_transparent] [border-radius:0.5rem] [padding:0_0.5rem] text-muted-foreground cursor-pointer [font-size:0.75rem] font-normal [line-height:1] [transition:background-color_150ms_ease,_border-color_150ms_ease,_color_150ms_ease] [&:hover:not(:disabled)]:[border-color:color-mix(in_oklab,_var(--border)_86%,_var(--foreground))] [&:hover:not(:disabled)]:[background:color-mix(in_oklab,_var(--card)_75%,_transparent)] [&:hover:not(:disabled)]:text-foreground [&:focus-visible]:border-ring [&:focus-visible]:[outline:2px_solid_color-mix(in_oklab,_var(--ring)_38%,_transparent)] [&:focus-visible]:outline-offset-1 [&_svg]:w-4 [&_svg]:h-4 motion-reduce:transition-none [&:disabled]:cursor-default [&:disabled]:[opacity:0.35] max-sm:[padding-inline:0.35rem] mermaid-zoom-reset [min-width:3.9rem] max-sm:min-w-7.5 max-sm:[&_span]:hidden"
            disabled={zoom === 1 || diagram === null}
            onClick={() => {
              setZoom(1);
            }}
            title="Reset zoom"
            type="button"
          >
            <RotateCcw aria-hidden="true" />
            <span>{Math.round(zoom * 100)}%</span>
          </button>
          <button
            aria-label="Zoom diagram in"
            className="mermaid-control inline-flex h-7.5 min-w-7.5 items-center justify-center gap-1.5 [border:1px_solid_transparent] [border-radius:0.5rem] [padding:0_0.5rem] text-muted-foreground cursor-pointer [font-size:0.75rem] font-normal [line-height:1] [transition:background-color_150ms_ease,_border-color_150ms_ease,_color_150ms_ease] [&:hover:not(:disabled)]:[border-color:color-mix(in_oklab,_var(--border)_86%,_var(--foreground))] [&:hover:not(:disabled)]:[background:color-mix(in_oklab,_var(--card)_75%,_transparent)] [&:hover:not(:disabled)]:text-foreground [&:focus-visible]:border-ring [&:focus-visible]:[outline:2px_solid_color-mix(in_oklab,_var(--ring)_38%,_transparent)] [&:focus-visible]:outline-offset-1 [&_svg]:w-4 [&_svg]:h-4 motion-reduce:transition-none [&:disabled]:cursor-default [&:disabled]:[opacity:0.35] max-sm:[padding-inline:0.35rem]"
            disabled={zoom >= MAX_ZOOM || diagram === null}
            onClick={() => {
              changeZoom(ZOOM_STEP);
            }}
            title="Zoom in"
            type="button"
          >
            <ZoomIn aria-hidden="true" />
          </button>
          <button
            aria-label={
              isFullscreen
                ? "Exit full screen diagram"
                : "View diagram full screen"
            }
            className="mermaid-control inline-flex h-7.5 min-w-7.5 items-center justify-center gap-1.5 [border:1px_solid_transparent] [border-radius:0.5rem] [padding:0_0.5rem] text-muted-foreground cursor-pointer [font-size:0.75rem] font-normal [line-height:1] [transition:background-color_150ms_ease,_border-color_150ms_ease,_color_150ms_ease] [&:hover:not(:disabled)]:[border-color:color-mix(in_oklab,_var(--border)_86%,_var(--foreground))] [&:hover:not(:disabled)]:[background:color-mix(in_oklab,_var(--card)_75%,_transparent)] [&:hover:not(:disabled)]:text-foreground [&:focus-visible]:border-ring [&:focus-visible]:[outline:2px_solid_color-mix(in_oklab,_var(--ring)_38%,_transparent)] [&:focus-visible]:outline-offset-1 [&_svg]:w-4 [&_svg]:h-4 motion-reduce:transition-none [&:disabled]:cursor-default [&:disabled]:[opacity:0.35] max-sm:[padding-inline:0.35rem]"
            disabled={diagram === null}
            onClick={() => {
              void toggleFullscreen();
            }}
            title={isFullscreen ? "Exit full screen" : "Full screen"}
            type="button"
          >
            {isFullscreen ? (
              <Minimize2 aria-hidden="true" />
            ) : (
              <Maximize2 aria-hidden="true" />
            )}
          </button>
          <span className="mermaid-language [color:color-mix(in_oklab,_var(--muted-foreground)_88%,_var(--foreground))] [font-size:0.75rem] font-semibold [letter-spacing:0.075em] [line-height:1] uppercase [margin-inline:0.35rem_0.25rem] max-sm:[margin-inline:0.25rem_0.125rem]">
            Mermaid
          </span>
        </div>
      </div>
    </figure>
  );
}
