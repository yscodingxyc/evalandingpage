import "dotenv/config";
import { getPayload } from "payload";
import config from "./payload.config";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const EXISTING_IMAGES = [
  { file: "brautkleider.jpg", title: "Brautkleider", copy: "individuell gefertigt für den großen Tag", slug: "brautkleider", category: "brautkleider" as const, order: 1 },
  { file: "anlassmode.jpg", title: "Anlassmode", copy: "für Feiern, Bälle und besondere Auftritte", slug: "anlassmode", category: "anlassmode" as const, order: 2 },
  { file: "dirndl.jpg", title: "Dirndl & Tracht", copy: "maßgeschneiderte Modelle mit feinen Details", slug: "dirndl-tracht", category: "dirndl" as const, order: 3 },
  { file: "festlich.jpg", title: "Festliche Kleider", copy: "starke Silhouetten für besondere Momente", slug: "festliche-kleider", category: "festlich" as const, order: 4 },
  { file: "1950er.jpg", title: "1950er-Stil", copy: "charaktervolle Retro-Looks mit eigener Handschrift", slug: "1950er-stil", category: "1950er" as const, order: 5 },
  { file: "casual.jpg", title: "Casual", copy: "Lieblingsstücke für Alltag, Saison und Persönlichkeit", slug: "casual", category: "casual" as const, order: 6 },
];

const seed = async () => {
  const payload = await getPayload({ config });

  const existingDocs = await payload.find({ collection: "gallery", limit: 1 });
  if (existingDocs.docs.length > 0) {
    console.log("Galerie-Daten existieren bereits – Seed übersprungen.");
    process.exit(0);
  }

  const imagesDir = path.resolve(dirname, "..", "public", "assets", "images", "gallery");

  for (const item of EXISTING_IMAGES) {
    const filePath = path.join(imagesDir, item.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`Datei nicht gefunden: ${item.file} – überspringe`);
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

    console.log(`  ✓ ${item.title}`);
  }

  console.log("\nSeed abgeschlossen! Alle Galerie-Daten wurden importiert.\n");
  process.exit(0);
};

seed().catch((error) => {
  console.error("Seed fehlgeschlagen:", error);
  process.exit(1);
});
