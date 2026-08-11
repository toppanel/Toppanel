// Uploads the static export (out/) to the production FTP host.
// Usage: npm run deploy
//   1. npm run build   (regenerates ./out)
//   2. npm run deploy  (uploads ./out to FTP_REMOTE_DIR)
//
// Credentials come from .env (gitignored) — see .env.example for the required keys.

import "dotenv/config";
import { Client } from "basic-ftp";
import { existsSync } from "node:fs";
import path from "node:path";

const { FTP_HOST, FTP_USER, FTP_PASSWORD, FTP_REMOTE_DIR, FTP_SECURE } = process.env;

const required = { FTP_HOST, FTP_USER, FTP_PASSWORD, FTP_REMOTE_DIR };
const missing = Object.entries(required).filter(([, v]) => !v).map(([k]) => k);
if (missing.length) {
  console.error(`Missing required env var(s): ${missing.join(", ")}`);
  console.error("Copy .env.example to .env and fill in the values.");
  process.exit(1);
}

const localDir = path.resolve(process.cwd(), "out");
if (!existsSync(localDir)) {
  console.error(`"${localDir}" does not exist — run "npm run build" first.`);
  process.exit(1);
}

const client = new Client();
client.ftp.verbose = true;

try {
  await client.access({
    host: FTP_HOST,
    user: FTP_USER,
    password: FTP_PASSWORD,
    secure: FTP_SECURE === "true",
  });

  console.log(`Uploading ${localDir} -> ${FTP_HOST}:${FTP_REMOTE_DIR}`);
  await client.ensureDir(FTP_REMOTE_DIR);
  // Wipes everything currently in FTP_REMOTE_DIR before uploading the fresh
  // build, so stale/removed pages don't linger on the host. Make sure
  // FTP_REMOTE_DIR points at the site's own folder, not a shared root.
  // .well-known/ is preserved — the host's own SSL auto-renewal (ACME/Let's
  // Encrypt) owns that folder and the FTP account can't delete it anyway.
  const PRESERVE = new Set([".well-known"]);
  for (const item of await client.list()) {
    if (PRESERVE.has(item.name)) continue;
    if (item.isDirectory) await client.removeDir(item.name);
    else await client.remove(item.name);
  }
  await client.uploadFromDir(localDir);

  console.log("Deploy complete.");
} catch (err) {
  console.error("Deploy failed:", err);
  process.exitCode = 1;
} finally {
  client.close();
}
