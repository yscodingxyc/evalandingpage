import type { CollectionConfig } from "payload";

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
