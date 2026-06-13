import { getPayload } from "payload";
import configPromise from "@/payload-config";
import GalleryPageClient, { type GalleryItem } from "./GalleryPageClient";

export const revalidate = 60;

export default async function GalleryPage() {
  let galleryItems: GalleryItem[] = [];

  try {
    const payload = await getPayload({ config: configPromise });
    const galleryData = await payload.find({
      collection: "gallery",
      sort: "order",
      depth: 1,
      limit: 100,
    });

    if (galleryData?.docs) {
      galleryItems = galleryData.docs.map((doc: any) => {
        const imageUrl = doc.image && typeof doc.image === "object" ? doc.image.url : "";
        return {
          id: `gallery-${doc.slug ?? doc.id}`,
          title: doc.title || "",
          copy: doc.copy || "",
          image: imageUrl || "",
        };
      });
    }
  } catch (error) {
    console.error("Failed to fetch gallery items from database:", error);
  }

  return <GalleryPageClient galleryItems={galleryItems} />;
}
