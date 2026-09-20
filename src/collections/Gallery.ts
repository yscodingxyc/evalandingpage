import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";

const Gallery: CollectionConfig = {
  slug: "gallery",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "order", "updatedAt"],
    group: "Inhalte",
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      () => {
        try {
          revalidatePath("/");
          revalidatePath("/gallery");
        } catch (err) {
          console.error("Failed to revalidate on change:", err);
        }
      },
    ],
    afterDelete: [
      () => {
        try {
          revalidatePath("/");
          revalidatePath("/gallery");
        } catch (err) {
          console.error("Failed to revalidate on delete:", err);
        }
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Titel",
    },
    {
      name: "copy",
      type: "text",
      required: true,
      label: "Beschreibung",
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      label: "Slug (für Links, z. B. 'brautkleider')",
      admin: {
        placeholder: "wird automatisch aus Titel generiert",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Vorschaubild",
      admin: {
        description: "Vorschaubild und erstes Bild der Galerie.",
      },
    },
    {
      name: "additionalImages",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      label: "Weitere Bilder (unbegrenzt)",
      admin: {
        isSortable: true,
        description: "Beliebig viele Fotos: Über „Upload“ / „Create New“ neue Bilder hochladen oder über „Choose from existing“ vorhandene auswählen. Auch nach dem ersten zusätzlichen Bild kannst du hier weitere hinzufügen. Reihenfolge per Ziehen ändern und anschließend die Galerie speichern.",
      },
    },
    {
      name: "order",
      type: "number",
      label: "Reihenfolge",
      admin: {
        placeholder: "niedrige Zahl = weiter vorne",
      },
    },
    {
      name: "category",
      type: "select",
      label: "Kategorie",
      options: [
        { label: "Brautkleider", value: "brautkleider" },
        { label: "Anlassmode", value: "anlassmode" },
        { label: "Dirndl & Tracht", value: "dirndl" },
        { label: "Festliche Kleider", value: "festlich" },
        { label: "1950er-Stil", value: "1950er" },
        { label: "Casual", value: "casual" },
      ],
    },
  ],
};

export default Gallery;
