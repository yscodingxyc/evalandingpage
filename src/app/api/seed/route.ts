import { getPayload } from "payload";
import configPromise from "@/payload-config";
import { del, list } from "@vercel/blob";
import fs from "fs";
import path from "path";

const GALLERY_ITEMS = [
  { file: "brautkleider.jpg", title: "Brautkleider", copy: "individuell gefertigt f\u00fcr den gro\u00dfen Tag", slug: "brautkleider", category: "brautkleider" as const, order: 1 },
  { file: "anlassmode.jpg", title: "Anlassmode", copy: "f\u00fcr Feiern, B\u00e4lle und besondere Auftritte", slug: "anlassmode", category: "anlassmode" as const, order: 2 },
  { file: "dirndl.jpg", title: "Dirndl & Tracht", copy: "ma\u00dfgeschneiderte Modelle mit feinen Details", slug: "dirndl-tracht", category: "dirndl" as const, order: 3 },
  { file: "festlich.jpg", title: "Festliche Kleider", copy: "starke Silhouetten f\u00fcr besondere Momente", slug: "festliche-kleider", category: "festlich" as const, order: 4 },
  { file: "1950er.jpg", title: "1950er-Stil", copy: "charaktervolle Retro-Looks mit eigener Handschrift", slug: "1950er-stil", category: "1950er" as const, order: 5 },
  { file: "casual.jpg", title: "Casual", copy: "Lieblingsst\u00fccke f\u00fcr Alltag, Saison und Pers\u00f6nlichkeit", slug: "casual", category: "casual" as const, order: 6 },
];

export async function GET() {
  const results: string[] = [];
  const errors: string[] = [];

  try {
    const payload = await getPayload({ config: configPromise });

    // Clean up existing blobs from Vercel Blob store
    try {
      const { blobs } = await list();
      for (const blob of blobs) {
        await del(blob.url);
      }
      results.push(`Deleted ${blobs.length} existing blobs from store`);
    } catch (e: any) {
      results.push(`Blob cleanup skipped (${e.message})`);
    }

    // Delete existing gallery entries
    const existingGallery = await payload.find({ collection: "gallery", limit: 100 });
    for (const doc of existingGallery.docs) {
      await payload.delete({ collection: "gallery", id: doc.id });
    }
    results.push(`Deleted ${existingGallery.docs.length} existing gallery entries`);

    // Delete existing media
    const existingMedia = await payload.find({ collection: "media", limit: 100 });
    for (const doc of existingMedia.docs) {
      try {
        await payload.delete({ collection: "media", id: doc.id });
      } catch {
        // media might be referenced elsewhere, skip
      }
    }
    results.push(`Deleted ${existingMedia.docs.length} existing media entries`);

    // Seed new entries
    const imagesDir = path.join(process.cwd(), "public", "assets", "images", "gallery");

    for (const item of GALLERY_ITEMS) {
      const filePath = path.join(imagesDir, item.file);
      if (!fs.existsSync(filePath)) {
        errors.push(`File not found: ${item.file}`);
        continue;
      }

      const fileBuffer = fs.readFileSync(filePath);
      const media = await payload.create({
        collection: "media",
        data: { alt: item.title },
        file: {
          data: fileBuffer,
          mimetype: "image/jpeg",
          name: item.file,
          size: fileBuffer.length,
        },
      });

      await payload.create({
        collection: "gallery",
        data: {
          title: item.title,
          copy: item.copy,
          slug: item.slug,
          category: item.category,
          order: item.order,
          image: media.id,
        },
      });

      results.push(`\u2713 ${item.title} (media: ${media.url ?? media.id})`);
    }
  } catch (err: any) {
    errors.push(`Fatal: ${err.message}`);
  }

  // Verify blobs after upload
  const hasToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
  results.push(`BLOB_READ_WRITE_TOKEN set: ${hasToken}`);
  try {
    const { blobs } = await list();
    if (blobs.length > 0) {
      results.push(`Blobs in store after seed: ${blobs.length}`);
      for (const b of blobs) results.push(`  ${b.pathname}: ${b.url}`);
    } else {
      results.push("No blobs found in store after seed!");
    }
  } catch (e: any) {
    errors.push(`Blob list after seed failed: ${e.message}`);
  }

  const html = `<!DOCTYPE html>
<html><head><title>Seed Results</title><style>body{font-family:monospace;padding:2rem;background:#111;color:#eee}li{margin:0.5rem 0}.ok{color:#4f4}.err{color:#f44}</style></head><body>
<h1>Seed Results</h1><ul>${results.map(r => `<li class="ok">${r}</li>`).join("")}</ul>
${errors.length ? `<h2>Errors</h2><ul>${errors.map(e => `<li class="err">${e}</li>`).join("")}</ul>` : ""}
<p><a href="/admin">Go to Admin</a></p>
</body></html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
