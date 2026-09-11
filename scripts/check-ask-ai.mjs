// bun scripts/check-ask-ai.mjs http://localhost:3000
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
  for (const width of [1440, 390, 320]) {
    const mobile = width < 600;
    const page = await browser.newPage({
      viewport: { width, height: 844 },
      isMobile: mobile,
      hasTouch: mobile,
    });
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(new URL("/journey", process.argv[2]).href);
    const trigger = page.getByRole("button", {
      name: "Ask an AI about Sid",
      exact: true,
    });
    const popup = page.getByRole("dialog", { name: "Ask about Sid" });
    await trigger.waitFor();
    await page.waitForTimeout(300);
    assert.equal(await trigger.getAttribute("aria-expanded"), "false");
    await (mobile ? trigger.tap() : trigger.hover());
    await popup.waitFor();
    await page.waitForTimeout(200);
    const box = await popup.boundingBox();
    assert.ok(
      box.x >= 15 && box.x + box.width <= width - 15,
      "Panel must fit the viewport"
    );
    assert.ok(
      box.y >= 0 && box.y + box.height <= 844,
      "Panel must stay on screen"
    );
    assert.equal(await popup.getByRole("link").count(), 4);
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth
      )
    );
    const links = await popup
      .getByRole("link")
      .evaluateAll((items) => items.map((item) => item.href));
    const prompt = new URL(links[0]).searchParams.get("q");
    for (const href of links) {
      assert.equal(new URL(href).searchParams.get("q"), prompt);
    }
    assert.equal(
      await popup.getByRole("textbox", { name: "AI prompt" }).isVisible(),
      false
    );
    // Exercise the denied-clipboard path without browser permissions.
    await page.evaluate(() =>
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: undefined,
      })
    );
    await popup
      .getByRole("button", { name: "Copy prompt", exact: true })
      .click();
    assert.match(
      await popup.getByRole("status").textContent(),
      /Select and copy/
    );
    assert.ok(
      await popup.getByRole("textbox", { name: "AI prompt" }).isVisible()
    );
    await page.evaluate(() =>
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: {
          writeText: async (text) => {
            window.copiedPrompt = text;
          },
        },
      })
    );
    await popup
      .getByRole("button", { name: "Copy prompt", exact: true })
      .click();
    await page.waitForTimeout(50);
    assert.equal(await page.evaluate(() => window.copiedPrompt), prompt);
    assert.match(
      await popup.getByRole("status").textContent(),
      /Prompt copied/
    );
    await popup.getByRole("button", { name: "Close AI picker" }).click();
    await popup.waitFor({ state: "hidden" });
    await page.mouse.move(0, 0);
    await trigger.focus();
    await page.keyboard.press("Enter");
    await popup.waitFor();
    await page.keyboard.press("Escape");
    await popup.waitFor({ state: "hidden" });
    assert.ok(
      await trigger.evaluate((button) => document.activeElement === button),
      "Escape returns focus"
    );
    await page.evaluate(() => {
      scrollTo(0, document.body.scrollHeight);
    });
    const footer = await page.locator("footer").boundingBox();
    const launcher = await trigger.boundingBox();
    assert.ok(
      footer.y + footer.height <= launcher.y,
      "Launcher must not cover footer links at the end of the page"
    );
    await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });
    await page.mouse.move(20, 20);
    assert.equal(
      await page
        .locator(".ask-ai-eyes")
        .evaluate((eyes) => getComputedStyle(eyes).transform),
      "none"
    );
    await trigger.click();
    await popup.waitFor();
    assert.equal(
      await popup.evaluate(
        (panel) => getComputedStyle(panel).transitionProperty
      ),
      "none"
    );
    await page.mouse.click(8, 150);
    await popup.waitFor({ state: "hidden" });
    await page.emulateMedia({ media: "print" });
    assert.equal(await trigger.isVisible(), false);
    await page.close();
  }
  assert.deepEqual(errors, []);
  console.log(
    "Ask AI: desktop hover, mobile tap, viewport fit, prompt handoff, clipboard fallback, keyboard, footer clearance, reduced motion and print passed."
  );
} finally {
  await browser.close();
}
