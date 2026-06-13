import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";

const HeroSlides: CollectionConfig = {
  slug: "hero-slides",
  admin: {
    useAsTitle: "alt",
    defaultColumns: ["alt", "order", "updatedAt"],
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
        } catch (err) {
          console.error("Failed to revalidate on hero-slides change:", err);
        }
      },
    ],
    afterDelete: [
      () => {
        try {
          revalidatePath("/");
        } catch (err) {
          console.error("Failed to revalidate on hero-slides delete:", err);
        }
      },
    ],
  },
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Bild",
    },
    {
      name: "alt",
      type: "text",
      label: "Beschreibung (Alt-Text)",
    },
    {
      name: "order",
      type: "number",
      label: "Reihenfolge",
      admin: {
        placeholder: "niedrige Zahl = zuerst angezeigt",
      },
    },
  ],
};

export default HeroSlides;
