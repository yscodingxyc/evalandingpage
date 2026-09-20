import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";

// Only the reviewed, additive gallery migration may accept the dev-history prompt.
// New or modified migrations must be reviewed before extending this approval.
const migrationDir = new URL("../src/migrations/", import.meta.url);
const reviewedFile = "20260920_174047_gallery_additional_images.ts";
const migrationFiles = readdirSync(migrationDir).filter((name) =>
  /\.(ts|js|mjs|cjs)$/.test(name) && !/^index\./.test(name));
const mayConfirm = migrationFiles.length === 1 && migrationFiles[0] === reviewedFile &&
  createHash("sha256").update(
    readFileSync(new URL(reviewedFile, migrationDir), "utf8").replace(/\r\n/g, "\n"),
  ).digest("hex") === "dae86a89f700fb183c0df28ca89f401639fab453a6e2a2414e26730e6e125441";

// Bound the entire migration, including initialization and interactive prompts.
console.log("[migration] Starting Payload migration (120-second limit).");
const child = spawn(process.execPath, [
  fileURLToPath(new URL("../node_modules/payload/bin.js", import.meta.url)),
  "migrate",
], {
  env: { ...process.env, PAYLOAD_MIGRATING: "true" },
  stdio: ["pipe", "pipe", "pipe"],
});

let failure = false;
let recentOutput = "";
let confirmed = false;
function stop(message) {
  if (failure) return;
  failure = true;
  console.error(`[migration] ${message}`);
  child.kill("SIGKILL");
}

function forward(stream, chunk) {
  stream.write(chunk);
  recentOutput = (recentOutput + chunk.toString()).slice(-4096);
  if (!confirmed && recentOutput.includes("you've run Payload in dev mode")) {
    if (!mayConfirm) {
      stop("Database-history confirmation requires review of the current migration files.");
      return;
    }
    confirmed = true;
    console.log("[migration] Confirming development history for the reviewed additive gallery migration.");
    child.stdin.write("y\n");
  }
}
child.stdin.on("error", (error) => stop(`Migration input failed: ${error.message}`));
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
