import { chromium } from '/home/sid/.npm/_npx/e41f203b7505f1fb/node_modules/playwright-core/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
const out = `build/face-motion-live/${process.argv[2] || 'before'}`;
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/home/sid/.cache/ms-playwright/chromium-1223/chrome-linux64/chrome', args: ['--no-sandbox'] });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2, recordVideo: { dir: out, size: { width: 1440, height: 1000 } } });
const page = await context.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
await page.goto('http://localhost:3109/resume');
const stage = page.locator('[role="img"][data-face-motion-status]');
await stage.waitFor();
await page.waitForFunction(() => document.querySelector('[data-face-motion-frame]')?.dataset.faceMotionStatus === 'ready');
await page.screenshot({ path: `${out}/lockup.png` });
await page.evaluate(() => {
  const portrait = document.querySelector('[data-face-motion-frame]');
  window.frameLog = [];
  new MutationObserver(() => {
    const frame = portrait.dataset.faceMotionFrame;
    if (window.frameLog.at(-1)?.frame !== frame) window.frameLog.push({ time: performance.now(), frame, target: portrait.dataset.faceMotionTarget });
  }).observe(portrait, { attributes: true, attributeFilter: ['data-face-motion-frame'] });
});
const rect = await stage.boundingBox();
const anchor = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
const move = async (angle, delay = 220) => {
  await page.mouse.move(anchor.x + 100 * Math.cos(angle), anchor.y + 100 * Math.sin(angle));
  await page.waitForTimeout(delay);
};
await page.mouse.move(anchor.x, anchor.y);
await page.waitForTimeout(500);
// Slow ring, all center spokes, rapid directional changes, and the right seam.
for (let i = 0; i <= 16; i++) await move(i * Math.PI / 4);
for (let i = 0; i < 8; i++) {
  await page.mouse.move(anchor.x, anchor.y);
  await page.waitForTimeout(450);
  await move(i * Math.PI / 4, 450);
}
for (let i = 0; i < 32; i++) await move(i * Math.PI / 4, 35);
await page.waitForTimeout(500);
await move(0, 450);
await move(Math.PI / 4, 20);
await move(Math.PI / 2, 450);
await page.screenshot({ path: `${out}/bottom.png` });
const log = await page.evaluate(() => window.frameLog);
await page.emulateMedia({ reducedMotion: 'reduce' });
await move(0);
const reducedFrame = await page.locator('[data-face-motion-frame]').getAttribute('data-face-motion-frame');
await writeFile(`${out}/report.json`, JSON.stringify({ rect, errors, reducedFrame, log }, null, 2));
await context.close();
await browser.close();
console.log(JSON.stringify({ out, rect, errors, reducedFrame, frames: log.length }));
