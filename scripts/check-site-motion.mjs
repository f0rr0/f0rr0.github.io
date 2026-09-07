// Run against a local dev server: bun scripts/check-site-motion.mjs http://localhost:3000
// Uses an existing Playwright installation (or PLAYWRIGHT_MODULE) and optional CHROMIUM_EXECUTABLE.
import assert from "node:assert/strict";

const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE ?? "playwright"
);
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_EXECUTABLE,
  headless: true,
});
const errors = [];

try {
  for (const width of [1280, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 844 } });
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(new URL("/journey", process.argv[2]).href);
    const toggle = page.getByRole("button", { name: "Details", exact: true });
    await toggle.waitFor();
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    // Let hydration attach the interaction and Motion's layout measurements.
    await page.waitForTimeout(300);

    const titleCount = await page.locator(".journey-role-title").count();
    const { heights, pointSamples } = await toggle.evaluate(async (button) => {
      const content = document.querySelector(
        `#${CSS.escape(button.getAttribute("aria-controls"))}`
      );
      const viewport = content.parentElement;
      const samples = [viewport.getBoundingClientRect().height];
      const pointSamples = [];
      button.click();
      const start = performance.now();
      while (performance.now() - start < 700) {
        // Frame sampling needs the browser's callback-based animation clock.
        // oxlint-disable-next-line promise/avoid-new
        await new Promise((resolve) => {
          requestAnimationFrame(() => {
            resolve();
          });
        });
        samples.push(viewport.getBoundingClientRect().height);
        const first = content.querySelector(".journey-role-detail li");
        const last = content.querySelector(
          ".journey-role-detail li:last-child"
        );
        if (first !== null && last !== null) {
          pointSamples.push([
            Number(getComputedStyle(first).opacity),
            Number(getComputedStyle(last).opacity),
          ]);
        }
      }
      return { heights: samples, pointSamples };
    });
    const travel = heights.at(-1) - heights[0];
    assert.ok(travel > 100, "Journey should expand");
    assert.ok(
      pointSamples.some(([first, last]) => first > last + 0.1),
      "Supporting points should reveal in reading order"
    );
    assert.deepEqual(
      pointSamples.at(-1),
      [1, 1],
      "The cascade must finish without leaving content faded"
    );
    assert.ok(
      heights
        .slice(1)
        .every(
          (height, index) => Math.abs(height - heights[index]) < travel * 0.5
        ),
      "Journey's document height should animate instead of snapping"
    );
    assert.ok((await page.locator(".journey-role-detail").count()) > 0);
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth
      )
    );

    // Interrupt both opening and closing; the final click must always win.
    for (let i = 0; i < 4; i += 1) {
      await toggle.evaluate((button) => button.click());
      await page.waitForTimeout(40);
    }
    await page.waitForTimeout(700);
    assert.equal(await toggle.getAttribute("aria-expanded"), "true");
    assert.ok(
      await page
        .locator(".journey-role-detail li")
        .evaluateAll((points) =>
          points.every((point) => getComputedStyle(point).opacity === "1")
        ),
      "Reversing a reveal must not strand partially faded points"
    );
    await toggle.click();
    await page.waitForTimeout(400);
    assert.equal(await toggle.getAttribute("aria-expanded"), "false");
    assert.equal(await page.locator(".journey-role-detail").count(), 0);
    assert.equal(await page.locator(".journey-role-title").count(), titleCount);

    // Keyboard activation and reduced motion must retain the same content.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    await toggle.waitFor();
    await page.waitForTimeout(300);
    await toggle.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(100);
    assert.equal(await toggle.getAttribute("aria-expanded"), "true");
    assert.ok((await page.locator(".journey-role-detail").count()) > 0);
    assert.ok(
      await toggle.evaluate((button) => {
        const content = document.querySelector(
          `#${CSS.escape(button.getAttribute("aria-controls"))}`
        );
        return (
          Math.abs(
            content.offsetHeight -
              content.parentElement.getBoundingClientRect().height
          ) < 1
        );
      }),
      "Reduced motion should update the document height immediately"
    );
    assert.equal(
      await page
        .locator(".disclosure-chevron")
        .first()
        .evaluate((icon) => getComputedStyle(icon).transitionDuration),
      "0s"
    );
    assert.ok(
      await page
        .locator(".journey-role-detail li")
        .first()
        .evaluate((point) => getComputedStyle(point).opacity === "1"),
      "Reduced motion should reveal the points immediately"
    );
    const company = page.locator(".journey-company-trigger").first();
    await company.hover();
    assert.equal(
      await page
        .locator(".journey-logo > div")
        .first()
        .evaluate((logo) => getComputedStyle(logo).scale),
      "none"
    );
    await toggle.focus();
    await page.keyboard.press("Space");
    await page.waitForTimeout(100);
    assert.equal(await page.locator(".journey-role-detail").count(), 0);
    await page.close();
  }
  assert.deepEqual(errors, []);
  console.log(
    "Journey motion: desktop, mobile, interruption, keyboard and reduced motion passed."
  );
} finally {
  await browser.close();
}
