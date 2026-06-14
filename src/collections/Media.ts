import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";

const Media: CollectionConfig = {
  slug: "media",
  upload: true,
  admin: {
    group: "Inhalte",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [
      () => {
        try {
          revalidatePath("/");
          revalidatePath("/gallery");
        } catch (err) {
          console.error("Failed to revalidate on media change:", err);
        }
      },
    ],
    afterDelete: [
      () => {
        try {
          revalidatePath("/");
          revalidatePath("/gallery");
        } catch (err) {
          console.error("Failed to revalidate on media delete:", err);
        }
      },
    ],
  },
  fields: [
    {
      name: "replaceFile",
      type: "ui",
      admin: {
        components: {
          Field: "@/components/admin/ReplaceMediaFile#ReplaceMediaFile",
        },
      },
    },
    {
      name: "alt",
      type: "text",
      label: "Alternativtext",
    },
  ],
};

export default Media;
