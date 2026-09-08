import { posthog } from "posthog-js";

import { captureLink, sanitizeProperties } from "@/lib/analytics";

// Public browser configuration for the portfolio PostHog project.
const projectToken = "phc_xUiLFUMwb6jrSMxM8yL2iEDPGQZcVMKfWVp4RBsvfmCa";
const posthogHost = "/_r7k2";

if (
  process.env.NODE_ENV === "production" &&
  location.hostname === "f0rr0.dev"
) {
  posthog.init(projectToken, {
    api_host: posthogHost,
    ui_host: "https://us.posthog.com",
    defaults: "2026-08-30",
    cookieless_mode: "always",
    persistence: "memory",
    person_profiles: "never",
    autocapture: false,
    capture_pageview: "history_change",
    capture_pageleave: true,
    disable_capture_url_hashes: true,
    disable_session_recording: true,
    disable_surveys: true,
    capture_heatmaps: false,
    capture_dead_clicks: false,
    capture_exceptions: false,
    capture_performance: false,
    advanced_disable_flags: true,
    disable_external_dependency_loading: true,
    before_send: (event) =>
      event === null
        ? null
        : {
            ...event,
            properties: sanitizeProperties(event.properties),
          },
  });
  // Capture phase also covers links inside menus which close on activation.
  document.addEventListener("click", captureLink, true);
  document.addEventListener("auxclick", captureLink, true);
}
