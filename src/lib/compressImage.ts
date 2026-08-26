import sharp from "sharp";

const LIMIT = 4_400_000; // stay safely under Vercel's ~4.5 MB function body limit
const MAX_WIDTH = 2500;

export async function compressImageBuffer(buffer: Buffer): Promise<Buffer> {
  if (buffer.length <= LIMIT) return buffer;

  let img = sharp(buffer).rotate();
  const meta = await img.metadata();
  if (meta.width && meta.width > MAX_WIDTH) {
    img = img.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  let q = 85;
  let out = await img.jpeg({ quality: q, mozjpeg: true }).toBuffer();
  while (out.length > LIMIT && q > 25) {
    q -= 10;
    out = await img.jpeg({ quality: q, mozjpeg: true }).toBuffer();
  }
  return out;
}
