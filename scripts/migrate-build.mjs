import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

// Bound the entire migration, including initialization and interactive prompts.
console.log("[migration] Starting Payload migration (120-second limit).");
const child = spawn(process.execPath, [
  fileURLToPath(new URL("../node_modules/payload/bin.js", import.meta.url)),
  "migrate",
], {
  env: { ...process.env, PAYLOAD_MIGRATING: "true" },
  stdio: ["ignore", "pipe", "pipe"],
});

let failure = false;
let recentOutput = "";
function stop(message) {
  if (failure) return;
  failure = true;
  console.error(`[migration] ${message}`);
  child.kill("SIGKILL");
}

function forward(stream, chunk) {
  stream.write(chunk);
  recentOutput = (recentOutput + chunk.toString()).slice(-4096);
  if (recentOutput.includes("you've run Payload in dev mode")) {
    stop("Payload requires a database-history confirmation. Stopping for review instead of waiting or skipping the migration.");
  }
}
child.stdout.on("data", (chunk) => forward(process.stdout, chunk));
child.stderr.on("data", (chunk) => forward(process.stderr, chunk));
const timeout = setTimeout(() => {
  stop("Timed out after 120 seconds. Check database reachability and the migration output above. The website build will not proceed.");
}, 120_000);

child.on("error", (error) => {
  clearTimeout(timeout);
  failure = true;
  console.error(`[migration] Could not start: ${error.message}`);
  process.exitCode = 1;
});
child.on("close", (code) => {
  clearTimeout(timeout);
  process.exitCode = failure || code !== 0 ? 1 : 0;
  if (process.exitCode === 0) {
    console.log("[migration] Completed. Starting Next.js build.");
  } else {
    console.error("[migration] Failed. Next.js build has been stopped.");
  }
});
