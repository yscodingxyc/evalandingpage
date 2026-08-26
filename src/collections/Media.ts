import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";
import { compressImageBuffer } from "@/lib/compressImage";

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
    beforeChange: [
      async ({ data }) => {
        const file = data?.file as
          | { data?: Buffer; size?: number }
          | undefined;
        if (file && file.data) {
          const original = Buffer.isBuffer(file.data) ? file.data : Buffer.from(file.data);
          if (original.length > 4_500_000) {
            file.data = await compressImageBuffer(original);
            file.size = file.data.length;
          }
        }
      },
    ],
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
