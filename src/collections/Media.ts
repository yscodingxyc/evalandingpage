import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";

const Media: CollectionConfig = {
  slug: "media",
  upload: {
    mimeTypes: ["image/*", "video/mp4", "video/webm"],
  },
  admin: {
    group: "Inhalte",
    description: "Bilder und Videos (MP4 oder WebM) hochladen. Für Videos empfiehlt sich MP4 mit H.264. Große Videos werden unverändert gespeichert; für schnelle Wiedergabe vorab für das Web optimieren. Dateien über die integrierte Upload-Steuerung ersetzen.",
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
      name: "alt",
      type: "text",
      label: "Alternativtext",
    },
  ],
};

export default Media;
