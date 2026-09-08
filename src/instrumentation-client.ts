import { posthog } from "posthog-js";

import { captureLink, sanitizeProperties } from "@/lib/analytics";

const privacyPreference =
  navigator.doNotTrack === "1" ||
  (navigator as Navigator & { globalPrivacyControl?: boolean })
    .globalPrivacyControl === true;

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (
  process.env.NODE_ENV === "production" &&
  location.hostname === "f0rr0.dev" &&
  projectToken !== undefined &&
  projectToken.length > 0 &&
  posthogHost !== undefined &&
  ["https://us.i.posthog.com", "https://eu.i.posthog.com"].includes(
    posthogHost
  ) &&
  !privacyPreference
) {
  posthog.init(projectToken, {
    api_host: posthogHost,
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
    respect_dnt: true,
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
