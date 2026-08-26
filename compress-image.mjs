import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const LIMIT = 4_500_000; // Vercel function body limit (Hobby) ~4.5 MB
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(
    "Usage: node compress-image.mjs <file.jpg> [maxWidth] [quality] [output]"
  );
  console.log("  maxWidth  default 2500, quality default 80");
  process.exit(1);
}

const input = args[0];
if (!fs.existsSync(input)) {
  console.error("File not found:", input);
  process.exit(1);
}

const maxWidth = parseInt(args[1] ?? "2500", 10);
const quality = parseInt(args[2] ?? "80", 10);
const outPath =
  args[3] ??
  path.join(
    path.dirname(input),
    path.basename(input, path.extname(input)) + "-compressed.jpg"
  );

const original = fs.statSync(input).size;
console.log(`Original: ${(original / 1e6).toFixed(2)} MB`);

// Downscale to max width first
let img = sharp(input).rotate(); // respect EXIF orientation
const meta = await img.metadata();
if (meta.width && meta.width > maxWidth) {
  img = img.resize({ width: maxWidth, withoutEnlargement: true });
}

let q = quality;
let buf = await img.jpeg({ quality: q, mozjpeg: true }).toBuffer();

// Reduce quality until under the limit
while (buf.length > LIMIT && q > 20) {
  q -= 10;
  buf = await img.jpeg({ quality: q, mozjpeg: true }).toBuffer();
}

await fs.promises.writeFile(outPath, buf);
const size = buf.length;
console.log(`Output:   ${outPath}`);
console.log(`New size: ${(size / 1e6).toFixed(2)} MB (quality ${q})`);
console.log(size <= LIMIT ? "OK - under 4.5 MB limit" : "STILL OVER - reduce maxWidth/quality manually");
