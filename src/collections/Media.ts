import type { CollectionConfig } from "payload";

const Media: CollectionConfig = {
  slug: "media",
  upload: true,
  admin: {
    group: "Inhalte",
  },
  access: {
    read: () => true,
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
