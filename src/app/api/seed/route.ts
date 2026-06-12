import { getPayload } from "payload";
import configPromise from "@/payload-config";
import path from "path";
import fs from "fs";

const EXISTING_IMAGES = [
  { file: "brautkleider.jpg", title: "Brautkleider", copy: "individuell gefertigt für den großen Tag", slug: "brautkleider", category: "brautkleider" as const, order: 1 },
  { file: "anlassmode.jpg", title: "Anlassmode", copy: "für Feiern, Bälle und besondere Auftritte", slug: "anlassmode", category: "anlassmode" as const, order: 2 },
  { file: "dirndl.jpg", title: "Dirndl & Tracht", copy: "maßgeschneiderte Modelle mit feinen Details", slug: "dirndl-tracht", category: "dirndl" as const, order: 3 },
  { file: "festlich.jpg", title: "Festliche Kleider", copy: "starke Silhouetten für besondere Momente", slug: "festliche-kleider", category: "festlich" as const, order: 4 },
  { file: "1950er.jpg", title: "1950er-Stil", copy: "charaktervolle Retro-Looks mit eigener Handschrift", slug: "1950er-stil", category: "1950er" as const, order: 5 },
  { file: "casual.jpg", title: "Casual", copy: "Lieblingsstücke für Alltag, Saison und Persönlichkeit", slug: "casual", category: "casual" as const, order: 6 },
];

export async function GET() {
  const payload = await getPayload({ config: configPromise });

  const existingDocs = await payload.find({ collection: "gallery", limit: 1 });
  if (existingDocs.docs.length > 0) {
    return Response.json({ message: "Galerie-Daten existieren bereits – Seed übersprungen." });
  }

  const imagesDir = path.resolve(process.cwd(), "public", "assets", "images", "gallery");
  const results: string[] = [];

  for (const item of EXISTING_IMAGES) {
    const filePath = path.join(imagesDir, item.file);
    if (!fs.existsSync(filePath)) {
      results.push(`Datei nicht gefunden: ${item.file} – überspringe`);
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

    results.push(`✓ ${item.title}`);
  }

  return Response.json({ message: "Seed abgeschlossen!", results });
}
