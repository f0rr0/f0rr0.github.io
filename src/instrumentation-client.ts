import { posthog } from "posthog-js";

import { env } from "@/env";
import { captureLink, sanitizeProperties } from "@/lib/analytics";
import { CANONICAL_SITE_URL } from "@/lib/site-url";

const projectToken = env.NEXT_PUBLIC_POSTHOG_KEY;

if (
  projectToken !== undefined &&
  env.NEXT_PUBLIC_DEPLOYMENT_ENV === "production" &&
  location.origin === CANONICAL_SITE_URL
) {
  posthog.init(projectToken, {
    api_host: "/_r7k2",
    ui_host: `https://${env.NEXT_PUBLIC_POSTHOG_REGION ?? "us"}.posthog.com`,
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
