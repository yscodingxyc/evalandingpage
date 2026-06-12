"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type NavItem = {
  id: "about" | "services" | "gallery";
  label: string;
};

type LegalPath = "/agb" | "/datenschutz" | "/impressum";

type LegalPage = {
  path: LegalPath;
  title: string;
  intro: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
  }>;
};

const navItems: readonly NavItem[] = [
  { id: "about", label: "Über mich" },
  { id: "services", label: "Leistungen" },
  { id: "gallery", label: "Galerie" },
];

const footerPages: readonly { path: LegalPath; label: string }[] = [
  { path: "/agb", label: "AGB" },
  { path: "/datenschutz", label: "Datenschutz" },
  { path: "/impressum", label: "Impressum" },
];

interface LegalPageClientProps {
  legalPage: LegalPage;
}

export default function LegalPageClient({ legalPage }: LegalPageClientProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isCompactLegalPage = legalPage.path === "/impressum";

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
    const closeOnDesktop = () => {
      if (window.innerWidth > 800) {
        setMobileNavOpen(false);
      }
    };

    window.addEventListener("resize", closeOnDesktop);
    return () => {
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, []);

  useEffect(() => {
    if (mobileNavOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
    return undefined;
  }, [mobileNavOpen]);

  return (
    <div className={mobileNavOpen ? "page-shell nav-open" : "page-shell"}>
      <header className={isScrolled ? "site-header is-scrolled" : "site-header"} id="top">
        <div className="container header-inner">
          <Link className="brand" href="/" aria-label="Genoveva Startseite">
            <img src="/assets/images/logo.png" alt="Genoveva" />
          </Link>

          <button
            className="nav-toggle"
            type="button"
            aria-expanded={mobileNavOpen}
            aria-controls="site-nav"
            aria-label="Navigation öffnen"
            onClick={() => setMobileNavOpen((current) => !current)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className="site-nav" aria-label="Hauptnavigation">
            <button
              className="nav-close"
              type="button"
              aria-label="Navigation schließen"
              onClick={() => setMobileNavOpen(false)}
            >
              <span></span>
              <span></span>
            </button>

            <div className="site-nav-links">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/#${item.id}`}
                  onClick={() => setMobileNavOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <div className="mobile-nav-overlay" id="site-nav" aria-hidden={!mobileNavOpen}>
        <Link
          className="mobile-nav-brand"
          href="/"
          aria-label="Genoveva Startseite"
          onClick={() => setMobileNavOpen(false)}
        >
          <img src="/assets/images/logo.png" alt="Genoveva" />
        </Link>

        <button
          className="mobile-nav-close"
          type="button"
          aria-label="Navigation schliessen"
          onClick={() => setMobileNavOpen(false)}
        >
          <span></span>
          <span></span>
        </button>

        <nav className="mobile-nav" aria-label="Mobile Navigation">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              onClick={() => setMobileNavOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <main className="legal-page">
        <section className="legal-hero">
          <div className="container legal-hero-inner">
            <p className="section-kicker">Rechtliches</p>
            <h1>{legalPage.title}</h1>
            <p className="legal-intro">{legalPage.intro}</p>
          </div>
        </section>

        <section className="legal-content">
          <div className="container legal-content-inner">
            <div className="legal-note">
              Bitte prüfen Sie diese Inhalte vor dem Livegang rechtlich und
              ersetzen Sie Platzhaltertexte durch die finalen Angaben.
            </div>

            {isCompactLegalPage ? (
              <article className="legal-card">
                {legalPage.sections.map((section) => (
                  <section className="legal-section-block" key={section.heading}>
                    <h2>{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}
              </article>
            ) : (
              legalPage.sections.map((section) => (
                <article className="legal-card" key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </article>
              ))
            )}
          </div>
        </section>
      </main>

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
              {footerPages.map((page) => (
                <Link key={page.path} href={page.path}>
                  {page.label}
                </Link>
              ))}
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
