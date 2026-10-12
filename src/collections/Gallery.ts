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
      filterOptions: { mimeType: { contains: "image/" } },
      admin: {
        description: "Vorschaubild und erstes Bild der Galerie.",
      },
    },
    {
      name: "additionalImages",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      label: "Weitere Bilder und Videos",
      admin: {
        isSortable: true,
        description: "Bilder und Videos (MP4/WebM) hochladen oder aus der Medienbibliothek auswählen. Reihenfolge per Ziehen ändern und speichern. Videos werden in der vergrößerten Ansicht auf der Startseite und in der Galerie abgespielt.",
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
