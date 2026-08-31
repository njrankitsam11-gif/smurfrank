// Resizes/compresses curated wallpaper art from a source folder into
// public/images/<slug>/ as web-ready WebP files. Re-run safely later against
// newly added images — existing outputs are skipped unless --force is passed.
//
// Usage:
//   node scripts/optimize-game-art.mjs [sourceDir] [--force]
//
// Prints a { src, alt: '' } stub for each newly written file — paste those
// into lib/gameArt.js and fill in the alt text by hand (source filenames
// aren't usable as alt text).

import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const MAX_WIDTH = 1920;
const WEBP_QUALITY = 75;
const PUBLIC_IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp']);

// Source subfolders -> destination slug (must match lib/gameTheme.js slugs).
// Folder names are matched exactly, including the trailing space on "Valorant ".
const FOLDERS = [
  { dir: 'CS GO 2', slug: 'cs2', exclude: new Set(['Rainbow Six Siege Spetsnaz.png']) },
  { dir: 'GTA 5', slug: 'gta-v', exclude: new Set() },
  {
    dir: 'Valorant ',
    slug: 'valorant',
    // The 3 macOS screenshot files in this folder are excluded via the
    // filename-prefix check below (not listed here) — their filenames
    // embed a narrow no-break space before "PM" that isn't safe to
    // retype as an exact-match string literal.
    exclude: new Set(['Valorant 2020 Icon v2.ico', 'Valorant Logo HD.png']),
  },
];

// Files loose at the source root, not inside any per-game subfolder.
const LOOSE_FILES = [{ file: 'GTA V CS Wallpaper.jpg', slug: 'crossover' }];

function slugify(filename) {
  const base = filename.replace(/\.[^.]+$/, '');
  return base
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function fileExists(p) {
  return stat(p).then(() => true).catch(() => false);
}

async function processFile(srcPath, destDir, slug, destBaseName, force) {
  await mkdir(destDir, { recursive: true });
  const destPath = path.join(destDir, `${destBaseName}.webp`);
  const relSrc = `/images/${slug}/${destBaseName}.webp`;

  if (!force && (await fileExists(destPath))) {
    console.log(`  skip (exists): ${destBaseName}.webp`);
    return null;
  }

  await sharp(srcPath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(destPath);

  const { size } = await stat(destPath);
  console.log(`  wrote: ${destBaseName}.webp (${(size / 1024).toFixed(0)}KB)`);
  return { src: relSrc, alt: '', bytes: size };
}

async function main() {
  const force = process.argv.includes('--force');
  const sourceArg = process.argv.slice(2).find((a) => !a.startsWith('--'));
  const sourceRoot = sourceArg || '/Users/sam/Downloads/smurfrankpics';

  console.log(`Source: ${sourceRoot}`);
  console.log(`Output: ${PUBLIC_IMAGES_DIR}\n`);

  const stubs = [];
  let totalBytes = 0;
  let writtenCount = 0;

  for (const { dir, slug, exclude } of FOLDERS) {
    const srcDir = path.join(sourceRoot, dir);
    const destDir = path.join(PUBLIC_IMAGES_DIR, slug);
    console.log(`${dir} -> images/${slug}/`);

    const entries = await readdir(srcDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile() || entry.name.startsWith('.')) continue;
      if (exclude.has(entry.name) || entry.name.startsWith('Screenshot')) {
        console.log(`  exclude: ${entry.name}`);
        continue;
      }
      if (!IMAGE_EXT.has(path.extname(entry.name).toLowerCase())) {
        console.log(`  skip (not an image): ${entry.name}`);
        continue;
      }

      const destBaseName = slugify(entry.name);
      const result = await processFile(path.join(srcDir, entry.name), destDir, slug, destBaseName, force);
      if (result) {
        stubs.push({ ...result, game: slug });
        totalBytes += result.bytes;
        writtenCount += 1;
      }
    }
    console.log('');
  }

  for (const { file, slug } of LOOSE_FILES) {
    const destDir = path.join(PUBLIC_IMAGES_DIR, slug);
    console.log(`${file} -> images/${slug}/`);

    const destBaseName = slugify(file);
    const result = await processFile(path.join(sourceRoot, file), destDir, slug, destBaseName, force);
    if (result) {
      stubs.push({ ...result, game: slug });
      totalBytes += result.bytes;
      writtenCount += 1;
    }
    console.log('');
  }

  console.log(`Done. ${writtenCount} file(s) written this run, ${(totalBytes / 1024 / 1024).toFixed(2)}MB.`);

  if (stubs.length) {
    console.log('\nPaste into lib/gameArt.js (fill in alt text):\n');
    for (const s of stubs) {
      console.log(`  // ${s.game}`);
      console.log(`  { src: '${s.src}', alt: '' },`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
