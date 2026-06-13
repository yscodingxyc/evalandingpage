import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

import Media from "./src/collections/Media";
import Gallery from "./src/collections/Gallery";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const isVercel = process.env.VERCEL === "1";
const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET ?? "",
  admin: {
    user: "users",
    meta: {
      titleSuffix: " – Genoveva CMS",
    },
  },
  editor: lexicalEditor({}),
  collections: [
    {
      slug: "users",
      auth: { tokenExpiration: 604800 },
      admin: { group: "Admin" },
      fields: [{ name: "name", type: "text", label: "Name" }],
    },
    Media,
    Gallery,
  ],
  db: hasDatabaseUrl
    ? postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL! }, migrationDir: path.resolve(dirname, "src/migrations") })
    : sqliteAdapter({ client: { url: `file:${path.resolve(dirname, "genoeva.db")}` } }),
  plugins: isVercel && process.env.BLOB_READ_WRITE_TOKEN
    ? [
        vercelBlobStorage({
          enabled: true,
          collections: { media: true },
          token: process.env.BLOB_READ_WRITE_TOKEN,
        }),
      ]
    : [],
  typescript: {
    outputFile: path.resolve(dirname, "src", "payload-types.ts"),
  },
  graphQL: { disable: true },
  cors: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    process.env.FRONTEND_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
  ].filter(Boolean),
  csrf: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    process.env.FRONTEND_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
  ].filter(Boolean),
});
