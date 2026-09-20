import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

// Add only the new relationship table to the existing production database.
// Existing galleries, cover images and media remain untouched.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      IF to_regclass('public.gallery_rels') IS NULL THEN
        CREATE TABLE "gallery_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  ALTER TABLE "gallery_rels" ADD CONSTRAINT "gallery_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_rels" ADD CONSTRAINT "gallery_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
  CREATE INDEX IF NOT EXISTS "gallery_rels_order_idx" ON "gallery_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "gallery_rels_parent_idx" ON "gallery_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "gallery_rels_path_idx" ON "gallery_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "gallery_rels_media_id_idx" ON "gallery_rels" USING btree ("media_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "gallery_rels";`);
}
