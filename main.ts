// Entry for make.fun's "Roast the Smart Fridge: One Line, Best Laugh Wins".
//
// The competition asks for a single line roasting a smart home gadget.
// This program's whole job is to place that line in entry.txt inside the
// output directory the grader provides, byte for byte, nothing added.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The roast itself: one line, written to land on the blackmail punchline.
const ROAST_LINE =
  'My smart fridge films me opening the door 14 times an hour hoping new food spawns, and honestly the blackmail potential is the smartest thing about it.';

// The grader hands us a directory through the environment; when the
// variable is missing or blank we fall back to a local "out" folder so
// the program also behaves sensibly when run by hand.
function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (typeof fromEnv === 'string' && fromEnv.trim().length > 0) {
    return fromEnv;
  }
  return 'out';
}

// The sealed scorer accepts UTF-8 text of 1 to 160 characters that is
// not only white space. Checking the line against that gate up front
// means a careless future edit fails loudly here instead of quietly
// scoring zero on the server.
function checkGate(line: string): void {
  const length = [...line].length;
  if (length < 1 || length > 160) {
    throw new Error(`entry is ${length} characters; the gate allows 1 to 160`);
  }
  if (line.trim().length === 0) {
    throw new Error('entry is only white space; the gate refuses it');
  }
  console.log(`gate check passed: ${length} characters, within 1..160`);
}

function main(): void {
  checkGate(ROAST_LINE);
  const outDir = resolveOutputDir();
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, 'entry.txt');
  // No trailing newline: the file should hold exactly the one line.
  writeFileSync(target, ROAST_LINE, 'utf8');
  console.log(`wrote ${target} (${ROAST_LINE.length} characters)`);
}

main();
