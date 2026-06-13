import { getPayload } from "payload";
import configPromise from "@/payload-config";
import LandingPageClient, { type GalleryItem } from "./LandingPageClient";

export const revalidate = 60; // ISR - revalidate page content every 60 seconds

export default async function Page() {
  let galleryPreviewItems: GalleryItem[] = [];
  let heroSlideUrls: string[] = [];

  try {
    const payload = await getPayload({ config: configPromise });

    const galleryData = await payload.find({
      collection: "gallery",
      sort: "order",
      depth: 1,
      limit: 6,
    });

    if (galleryData?.docs) {
      galleryPreviewItems = galleryData.docs.map((doc: any) => {
        const imageUrl = doc.image && typeof doc.image === "object" ? doc.image.url : "";
        return {
          id: `gallery-${doc.slug ?? doc.id}`,
          title: doc.title || "",
          copy: doc.copy || "",
          image: imageUrl || "",
        };
      });
    }

    const heroData = await payload.find({
      collection: "hero-slides",
      sort: "order",
      depth: 1,
      limit: 10,
    });

    if (heroData?.docs) {
      heroSlideUrls = heroData.docs
        .map((doc: any) => {
          const imageUrl = doc.image && typeof doc.image === "object" ? doc.image.url : "";
          return imageUrl || "";
        })
        .filter(Boolean);
    }
  } catch (error) {
    console.error("Failed to fetch data from database:", error);
  }

  return <LandingPageClient initialGalleryItems={galleryPreviewItems} initialHeroSlides={heroSlideUrls} />;
}
