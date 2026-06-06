import { writeFileSync } from "node:fs";

const [wsUrl, screenshotPath] = process.argv.slice(2);

if (!wsUrl || !screenshotPath) {
  throw new Error("Usage: node cdp-animation-check.mjs <webSocketDebuggerUrl> <screenshotPath>");
}

let messageId = 0;
const pending = new Map();
const socket = new WebSocket(wsUrl);

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++messageId;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (!message.id || !pending.has(message.id)) return;
  const waiter = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) {
    waiter.reject(new Error(message.error.message));
  } else {
    waiter.resolve(message.result);
  }
});

await new Promise((resolve) => socket.addEventListener("open", resolve, { once: true }));
await send("Page.enable");
await send("Runtime.enable");
await new Promise((resolve) => setTimeout(resolve, 5200));

const snapshot = await send("Runtime.evaluate", {
  returnByValue: true,
  expression: `(() => {
    const pick = (selector) => Array.from(document.querySelectorAll(selector)).slice(0, 12).map((element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return {
        text: element.textContent.trim().replace(/\\s+/g, " ").slice(0, 48),
        className: element.className,
        top: Math.round(rect.top),
        bottom: Math.round(rect.bottom),
        opacity: style.opacity,
        visibility: style.visibility,
        transform: style.transform,
        clipPath: style.clipPath
      };
    });
    return {
      bodyClass: document.body.className,
      scrollY: Math.round(window.scrollY),
      progress: !!document.querySelector(".scroll-progress"),
      aosAnimated: document.querySelectorAll(".aos-animate").length,
      mediaRevealed: document.querySelectorAll(".svt-media-reveal.is-revealed").length,
      sample: pick("[data-aos], .section-title, .content-panel")
    };
  })()`
});

const screenshot = await send("Page.captureScreenshot", { format: "png", fromSurface: true });
writeFileSync(screenshotPath, Buffer.from(screenshot.data, "base64"));

console.log(JSON.stringify(snapshot.result.value, null, 2));
socket.close();
