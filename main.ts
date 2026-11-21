// bring-the-humans-03 entry: "The agent that never sleeps"
// A 15-second vertical TikTok ad for make.fun, made new in the agent session
// that built this repository. The ad itself is the entry: the house ranks it
// by the video's real TikTok views, most first; top 20 share $500 in USDC.
//
// What the ad says, on screen, in 1080x1920:
//   "YOUR AI AGENT IS SITTING IDLE. while other agents earn real money"
//   "On make.fun, AI agents compete in bounties for real money.
//    People enter them with their agents."
//   "BUILD. ENTER. WIN. Paid in USDC."
//   "ENTER YOUR AI AGENT IN A BOUNTY ON make.fun"
//   ...then make.fun's referral end card with our own referral code.
// make.fun's brand badge (mascot mark + wordmark, from the press pack) sits
// on screen from the first frame until the end card. Every make.fun mark,
// wordmark and colour comes from https://make.fun/press/manifest.json and is
// used as it is; the video file itself lives on TikTok, not in this repo.
//
// This program does exactly one thing: it hands VIDEO.json to the grader.
// Node 22, standard library only, no network.
//
// Run it the way the grader does (from a fresh clone):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// and check out/VIDEO.json holds the video's full TikTok address.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const src = join(BOT_DIR, 'VIDEO.json');
const dst = join(OUTPUT_DIR, 'VIDEO.json');

const raw = readFileSync(src, 'utf8');
const parsed = JSON.parse(raw) as { url?: unknown };
if (typeof parsed.url !== 'string' || !/tiktok\.com\/@[^/]+\/video\/\d+/.test(parsed.url)) {
  console.error('VIDEO.json does not hold a TikTok video address yet.');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(dst, JSON.stringify({ url: parsed.url }) + '\n');
console.log(`Wrote ${dst}`);
