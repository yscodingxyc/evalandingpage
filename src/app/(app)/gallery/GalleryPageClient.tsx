"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export type GalleryItem = {
  id: string;
  title: string;
  copy: string;
  image: string;
  className?: string;
  large?: boolean;
};

interface GalleryPageClientProps {
  galleryItems: GalleryItem[];
}

export default function GalleryPageClient({ galleryItems }: GalleryPageClientProps) {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!activeItem) {
      document.body.style.overflow = "";
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeItem]);

  useEffect(() => {
    if (!activeItem) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveItem(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItem]);

  return (
    <div className="gallery-page">
      <header className={isScrolled ? "site-header gallery-page-header is-scrolled" : "site-header gallery-page-header"} id="top">
        <div className="container header-inner">
          <Link className="brand" href="/#top" aria-label="Genoveva Startseite">
            <img src="/assets/images/logo.png" alt="Genoveva" />
          </Link>

          <Link className="gallery-back-link" href="/#gallery">
            Zurück zur Startseite
          </Link>
        </div>
      </header>

      <main>
        <section className="section section-gallery section-gallery-page">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">Galerie</p>
              <h2>Einblicke in meine Arbeiten</h2>
              <p className="section-intro">
                Eine Auswahl maßgeschneiderter Kleider, inspiriert von den Bereichen
                Brautmode, Anlassmode, Tracht, 1950er-Stil und Casual.
              </p>
            </div>

            {galleryItems.length > 0 ? (
              <div className="gallery-grid">
                {galleryItems.map((item) => (
                  <figure
                    className={
                      item.large
                        ? `gallery-card gallery-card-large${item.className ? ` ${item.className}` : ""}`
                        : `gallery-card${item.className ? ` ${item.className}` : ""}`
                    }
                    id={item.id}
                    key={item.id}
                  >
                    <button
                      type="button"
                      className="gallery-card-hitbox"
                      aria-label={`${item.title} vergrößern`}
                      onClick={() => setActiveItem(item)}
                    />
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <figcaption>
                      <strong>{item.title}</strong>
                      <span>{item.copy}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="gallery-empty">
                <p>Noch keine Galerie-Einträge vorhanden.</p>
                <Link className="button button-primary" href="/">
                  Zurück zur Startseite
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      {activeItem ? (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Galeriebild: ${activeItem.title}`}
          onClick={() => setActiveItem(null)}
        >
          <div className="gallery-lightbox-inner" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="gallery-lightbox-close"
              aria-label="Bildansicht schließen"
              onClick={() => setActiveItem(null)}
            >
              <span></span>
              <span></span>
            </button>

            <img
              src={activeItem.image}
              alt={activeItem.title}
              loading="eager"
            />

            <div className="gallery-lightbox-caption">
              <strong>{activeItem.title}</strong>
              <span>{activeItem.copy}</span>
            </div>
          </div>
        </div>
      ) : null}

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/assets/images/logo.png" alt="Genoveva" />
          </div>

          <div className="footer-address-block">
            <p className="footer-title">Genoveva Maßschneiderei für Damenkleidung</p>
            <p>Eva Maria Handl-Lagler</p>
            <p>Marktstraße 3/2, 3324 Euratsfeld</p>

            <div className="footer-meta-links">
              <Link href="/agb">AGB</Link>
              <Link href="/datenschutz">Datenschutz</Link>
              <Link href="/impressum">Impressum</Link>
            </div>
          </div>

          <div className="footer-links">
            <a
              className="footer-social-link"
              href="https://www.facebook.com/profile.php?id=100054353779769&fref=ts#"
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/assets/icons/facebook.svg" alt="Facebook" />
            </a>
            <a
              className="footer-social-link"
              href="https://www.instagram.com/explore/locations/306370189394786/"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/assets/icons/instagram.svg" alt="Instagram" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
