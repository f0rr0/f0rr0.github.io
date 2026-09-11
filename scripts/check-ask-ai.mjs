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
    const popup = page.getByRole("dialog", { name: "Ask an AI" });
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
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(
    new URL("/writing/the-website-that-waited-2776-days", process.argv[2]).href
  );
  await page
    .getByRole("button", { name: "Ask an AI about this article", exact: true })
    .tap();
  const panel = page.getByRole("dialog", { name: "Ask an AI", exact: true });
  await panel.waitFor();
  assert.equal(
    await page.getByRole("radio", { name: "This article" }).isChecked(),
    true
  );
  const articlePrompt = new URL(
    await panel.getByRole("link").first().getAttribute("href")
  ).searchParams.get("q");
  assert.match(
    articlePrompt,
    /\/writing\/the-website-that-waited-2776-days\.md/
  );
  const tileSizes = await panel.getByRole("link").evaluateAll((links) =>
    links.map((link) => ({
      width: link.offsetWidth,
      height: link.offsetHeight,
    }))
  );
  assert.ok(
    tileSizes.every(
      (size) =>
        size.width === tileSizes[0].width && size.height === tileSizes[0].height
    )
  );
  assert.ok(
    await panel
      .locator("img")
      .evaluateAll((images) =>
        images.every(
          (image) => image.complete === true && image.naturalWidth > 0
        )
      )
  );
  await panel.getByText("About Sid", { exact: true }).click();
  assert.equal(
    await page.getByRole("radio", { name: "About Sid" }).isChecked(),
    true
  );
  for (const href of await panel
    .getByRole("link")
    .evaluateAll((links) => links.map((link) => link.href))) {
    assert.match(new URL(href).searchParams.get("q"), /\/llms.txt/);
    assert.doesNotMatch(
      new URL(href).searchParams.get("q"),
      /the-website-that-waited/
    );
  }
  await page.getByRole("radio", { name: "About Sid" }).focus();
  await page.keyboard.press("ArrowLeft");
  assert.equal(
    await page.getByRole("radio", { name: "This article" }).isChecked(),
    true
  );
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Navigation menu" }).tap();
  await page.getByRole("link", { name: "Writing", exact: true }).last().click();
  await page.getByRole("button", { name: "Ask an AI about my writing" }).tap();
  assert.equal(
    await page.getByRole("radio", { name: "My writing" }).isChecked(),
    true
  );
  assert.match(
    new URL(
      await panel.getByRole("link").first().getAttribute("href")
    ).searchParams.get("q"),
    /published articles/
  );
  await page.getByRole("button", { name: "Close AI picker" }).tap();
  await page
    .locator('a[href="/writing/the-website-that-waited-2776-days"]')
    .first()
    .click();
  await page
    .getByRole("button", { name: "Ask an AI about this article", exact: true })
    .tap();
  assert.equal(
    await page.getByRole("radio", { name: "This article" }).isChecked(),
    true
  );
  await page.close();

  const desktop = await browser.newPage({
    viewport: { width: 1440, height: 844 },
  });
  await desktop.goto(new URL("/journey", process.argv[2]).href);
  await desktop.locator(".ask-ai-face").waitFor();
  await desktop.waitForTimeout(300);
  const gaze = () =>
    desktop
      .locator(".ask-ai-eyes")
      .evaluate((eyes) => getComputedStyle(eyes).transform);
  await desktop.mouse.move(100, 100);
  await desktop.waitForTimeout(220);
  const left = await gaze();
  await desktop.mouse.move(1430, 700);
  await desktop.waitForTimeout(220);
  assert.notEqual(await gaze(), left, "Eyes must visibly track the pointer");
  await desktop.waitForTimeout(2600);
  assert.equal(
    await desktop.locator(".ask-ai-face").getAttribute("data-tracking"),
    null
  );
  assert.equal(
    await desktop
      .locator(".ask-ai-eyes")
      .evaluate((eyes) => getComputedStyle(eyes).animationName),
    "ask-ai-glance"
  );
  assert.equal(
    await desktop
      .locator(".ask-ai-blink")
      .evaluate((eyes) => getComputedStyle(eyes).animationName),
    "ask-ai-blink"
  );
  await desktop.locator(".ask-ai-launcher").hover();
  await desktop.mouse.down();
  assert.equal(
    await desktop
      .locator(".ask-ai-launcher")
      .evaluate((button) => getComputedStyle(button).scale),
    "none",
    "Launcher must not shrink on press"
  );
  await desktop.mouse.up();
  await desktop.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(
    await desktop
      .locator(".ask-ai-eyes")
      .evaluate((eyes) => getComputedStyle(eyes).animationName),
    "none"
  );
  assert.equal(
    await desktop
      .locator(".ask-ai-blink")
      .evaluate((eyes) => getComputedStyle(eyes).animationName),
    "none"
  );
  await desktop.close();
  assert.deepEqual(errors, []);
  console.log(
    "Ask AI: desktop/mobile, context switching, icons, symmetric tiles, gaze/idle motion, no press scaling, clipboard, keyboard, footer clearance, reduced motion and print passed."
  );
} finally {
  await browser.close();
}
