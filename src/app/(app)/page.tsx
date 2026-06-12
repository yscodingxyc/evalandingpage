import { getPayload } from "payload";
import configPromise from "@/payload-config";
import LandingPageClient, { type GalleryItem } from "./LandingPageClient";

export const revalidate = 60; // ISR - revalidate page content every 60 seconds

export default async function Page() {
  let galleryItems: GalleryItem[] = [];

  try {
    const payload = await getPayload({ config: configPromise });
    const galleryData = await payload.find({
      collection: "gallery",
      sort: "order",
      depth: 1,
      limit: 50,
    });

    if (galleryData?.docs) {
      galleryItems = galleryData.docs.map((doc: any) => {
        // Handle image relation which could be ID string or nested object
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

  return <LandingPageClient initialGalleryItems={galleryItems} />;
}
