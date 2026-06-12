"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";

export type GalleryItem = {
  id: string;
  title: string;
  copy: string;
  image: string;
  className?: string;
  large?: boolean;
};

type NavItem = {
  id: "about" | "services" | "gallery";
  label: string;
};

type Service = {
  index: string;
  title: string;
  copy: string;
  className?: string;
  galleryItemId?: string;
};

type ProcessStep = {
  index: string;
  title: string;
  paragraphs: string[];
};

const navItems: readonly NavItem[] = [
  { id: "about", label: "Über mich" },
  { id: "services", label: "Leistungen" },
  { id: "gallery", label: "Galerie" },
];

const footerPages: readonly { path: string; label: string }[] = [
  { path: "/agb", label: "AGB" },
  { path: "/datenschutz", label: "Datenschutz" },
  { path: "/impressum", label: "Impressum" },
];

const heroSlides = [
  "/assets/images/hero/hero-1.jpg",
  "/assets/images/hero/hero-2.jpg",
  "/assets/images/hero/hero-3.jpg",
] as const;

const services: readonly Service[] = [
  {
    index: "01",
    title: "Anlassmode & festliche Kleidung",
    galleryItemId: "gallery-anlassmode",
    copy:
      "Unikate für Hochzeit, Ball, Feier oder Event. Elegant, individuell und genau auf den Anlass abgestimmt.",
  },
  {
    index: "02",
    title: "Brautmode",
    galleryItemId: "gallery-brautkleider",
    copy:
      "Ihr Brautkleid entsteht von der Stoffauswahl bis zur finalen Anprobe als persönliches Einzelstück nach Ihren Vorstellungen.",
  },
  {
    index: "03",
    title: "Dirndl & Tracht",
    galleryItemId: "gallery-dirndl-tracht",
    copy:
      "Maßgeschneiderte Trachtenmode mit beständigen Stoffen, naturverbundenen Farben und präzisen Details.",
  },
  {
    index: "04",
    title: "1950er & Lieblingsstücke",
    galleryItemId: "gallery-1950er-stil",
    copy:
      "Von Retro-Silhouetten bis Freizeitkleid: gemeinsam entstehen Kleidungsstücke mit Charakter und perfekter Passform.",
  },
  {
    index: "05",
    title: "Upcycling & Änderungsarbeiten",
    copy:
      "Neben maßgeschneiderter Kleidung biete ich auch Upcycling und Änderungsarbeiten an. Ob ein vertrautes Lieblingsstück besser sitzen soll, ein Erbstück behutsam modernisiert wird oder ein Kleid neue Lebendigkeit erhält - ich arbeite mit dem, was bereits da ist, und entwickle es weiter.",
    className: "service-card-featured",
  },
];

const processSteps: readonly ProcessStep[] = [
  {
    index: "01",
    title: "Erstgespräch & Entwurf",
    paragraphs: [
      "In einem unverbindlichen Erstgespräch lernen wir uns kennen und sprechen über den Anlass sowie Ihre Wünsche.",
      "Auf dieser Basis entsteht ein erster Entwurf, bei dem Schnitt und Silhouette so abgestimmt werden, dass das Design Ihre Persönlichkeit optimal widerspiegelt.",
    ],
  },
  {
    index: "02",
    title: "Stoffe, Farben & Richtpreis",
    paragraphs: [
      "Gleichzeitig besprechen wir geeignete Stoffe und Ihre Wunschfarben. Nach einer ersten Einschätzung Ihrer Wünsche kann ich Ihnen eine erste Auskunft über den voraussichtlichen Preis geben.",
      "Da jedes Kleidungsstück ein echtes Unikat ist und sich der zeitliche Aufwand individuell entwickelt, nenne ich zu Beginn einen Richtpreis.",
      "Sollten sich während der Anfertigung grundlegende Designänderungen ergeben, kann sich der Arbeitsaufwand und damit auch der Preis erhöhen. Je klarer Ihre Vorstellungen sind, desto genauer kann ich den Preis am Anfang einschätzen.",
    ],
  },
  {
    index: "03",
    title: "Maßnehmen",
    paragraphs: [
      "Präzise Maße bilden die Grundlage für den individuellen Schnitt, der für jedes Unikat neu gezeichnet wird, damit das Kleid später optimal sitzt.",
      "Sollten Sie formgebende Unterwäsche tragen wollen, bringen Sie diese bitte bereits zum Maßnehmen und zu den folgenden Anproben mit, damit die Passform korrekt angepasst werden kann.",
    ],
  },
  {
    index: "04",
    title: "Zuschneiden & Anfertigen",
    paragraphs: [
      "Aus Stoff und Schnitt entstehen Schritt für Schritt die einzelnen Teile Ihres Kleidungsstücks. Jede Naht wird sorgfältig gesetzt und kontrolliert.",
    ],
  },
  {
    index: "05",
    title: "Anproben",
    paragraphs: [
      "Bei der ersten Anprobe wird die Idee für Sie zum ersten Mal greifbar, und ich nehme die ersten Anpassungen in der Passform vor.",
      "Nun ist es an der Zeit, Ihr Wunschstück auf der Haut zu fühlen und in sich zu gehen, um herauszufinden, ob es sich richtig anfühlt.",
      "Weitere Anproben sorgen dafür, dass das Kleidungsstück sich immer besser anpasst und perfekter wird - bis jedes Detail stimmt.",
    ],
  },
  {
    index: "06",
    title: "Übergabe",
    paragraphs: [
      "Erst wenn alles makellos ist und Sie sich in Ihrer vollen Präsenz zeigen können, verlässt Ihr Unikat meine Werkstatt.",
    ],
  },
] as const;

const galleryItemsFallback: readonly GalleryItem[] = [
  {
    id: "gallery-brautkleider",
    title: "Brautkleider",
    copy: "individuell gefertigt für den großen Tag",
    image: "/assets/images/gallery/brautkleider.jpg",
  },
  {
    id: "gallery-anlassmode",
    title: "Anlassmode",
    copy: "für Feiern, Bälle und besondere Auftritte",
    image: "/assets/images/gallery/anlassmode.jpg",
  },
  {
    id: "gallery-dirndl-tracht",
    title: "Dirndl & Tracht",
    copy: "maßgeschneiderte Modelle mit feinen Details",
    image: "/assets/images/gallery/dirndl.jpg",
  },
  {
    id: "gallery-festliche-kleider",
    title: "Festliche Kleider",
    copy: "starke Silhouetten für besondere Momente",
    image: "/assets/images/gallery/festlich.jpg",
  },
  {
    id: "gallery-1950er-stil",
    title: "1950er-Stil",
    copy: "charaktervolle Retro-Looks mit eigener Handschrift",
    image: "/assets/images/gallery/1950er.jpg",
  },
  {
    id: "gallery-casual",
    title: "Casual",
    copy: "Lieblingsstücke für Alltag, Saison und Persönlichkeit",
    image: "/assets/images/gallery/casual.jpg",
  },
];

const getHeroSlideStyle = (slide: string): CSSProperties =>
  ({
    "--hero-image": `url('${slide}')`,
  }) as CSSProperties;

interface LandingPageClientProps {
  initialGalleryItems: GalleryItem[];
}

export default function LandingPageClient({ initialGalleryItems }: LandingPageClientProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeGalleryItem, setActiveGalleryItem] = useState<GalleryItem | null>(null);
  const [activeSection, setActiveSection] = useState<NavItem["id"]>("about");
  const [isScrolled, setIsScrolled] = useState(false);

  const galleryItems = initialGalleryItems.length > 0 ? initialGalleryItems : galleryItemsFallback;

  useEffect(() => {
    if (heroSlides.length < 2) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4800);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

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
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (!visibleEntry) {
          return;
        }

        setActiveSection(visibleEntry.target.id as NavItem["id"]);
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: 0.1,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
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
    const shouldLockScroll = mobileNavOpen || Boolean(activeGalleryItem);

    if (!shouldLockScroll) {
      document.body.style.overflow = "";
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileNavOpen, activeGalleryItem]);

  useEffect(() => {
    if (!activeGalleryItem) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveGalleryItem(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeGalleryItem]);

  return (
    <div className={mobileNavOpen ? "page-shell nav-open" : "page-shell"}>
      <header className={isScrolled ? "site-header is-scrolled" : "site-header"} id="top">
        <div className="container header-inner">
          <Link className="brand" href="/#top" aria-label="Genoveva Startseite">
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
                  href={`#${item.id}`}
                  className={activeSection === item.id ? "is-active" : undefined}
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
          href="/#top"
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
              href={`#${item.id}`}
              className={activeSection === item.id ? "is-active" : undefined}
              onClick={() => setMobileNavOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <main>
        <section className="hero" aria-label="Einführung">
          <div className="hero-slider" aria-hidden="true">
            {heroSlides.map((slide, index) => (
              <div
                key={slide}
                className={index === activeSlide ? "hero-slide is-active" : "hero-slide"}
                style={getHeroSlideStyle(slide)}
              />
            ))}
          </div>

          <div className="hero-scrim"></div>

          <div className="container hero-content">
            <p className="hero-kicker">Willkommen bei Genoveva</p>
            <p className="hero-script">Kleidung, die so einzigartig ist wie Sie</p>
            <h1>Maßgeschneiderte Kleidung, die sich richtig anfühlt und wirklich zu Ihnen passt.</h1>
            <p className="hero-copy">
              Sie sind auf der Suche nach Kleidung, in der Sie sich richtig
              wohlfühlen und die sich perfekt an Ihren Körper anpasst? Dann sind
              Sie bei mir richtig.
            </p>

            <div className="hero-actions">
              <Link className="button button-primary" href="#services">
                Leistungen ansehen
              </Link>
              <Link className="button button-secondary" href="#gallery">
                Galerie öffnen
              </Link>
            </div>
          </div>
        </section>

        <section className="section section-about" id="about">
          <div className="container about-grid">
            <div className="about-media">
              <img
                src="/assets/images/about/eva-portrait.jpg"
                alt="Eva Maria Handl-Lagler in ihrer Schneiderei"
                loading="lazy"
              />
            </div>

            <div className="about-copy">
              <p className="section-kicker">Über mich</p>
              <h2>Eva Maria Handl-Lagler</h2>
              <p>
                Ich bin Eva Maria Handl-Lagler, selbstständige Schneidermeisterin für
                Damenbekleidung. In meiner Werkstatt fertige ich Unikate, die nicht nur gut
                aussehen, sondern sich auch gut anfühlen und Ihre Individualität sichtbar machen.
                Jedes Kleidungsstück entsteht im persönlichen Austausch und in liebevoller
                Handarbeit – von der ersten Idee bis zur finalen Übergabe.
              </p>
              <p>
                Ich kreiere festliche Mode für besondere Momente, maßgeschneiderte Brautkleider
                für Ihren großen Tag, Dirndl und Trachtenkleider mit natürlichen Materialien und
                feinen Details sowie hochwertige Alltagskleidung, die Komfort und Stil harmonisch
                verbindet.
              </p>
            </div>
          </div>
        </section>

        <section className="section section-process" aria-labelledby="process-heading">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">Der Ablauf</p>
              <h2 id="process-heading">Unsere gemeinsame Reise bis zu Ihrem fertigen Maßstück</h2>
            </div>

            <div className="process-intro-card">
              <p>
                Ein maßgeschneidertes Kleidungsstück entsteht in einem kreativen Dialog und
                in feinster Handarbeit. Vom ersten Gespräch bis zur finalen Übergabe begleite
                ich meine Kundinnen Schritt für Schritt auf dem Weg zu ihrem persönlichen Unikat.
              </p>
            </div>

            <ol className="process-flow" aria-label="Ablauf bis zum fertigen Maßstück">
              {processSteps.map((step) => (
                <li className="process-step" key={step.index}>
                  <span className="process-step-index">{step.index}</span>
                  <h3>{step.title}</h3>
                  {step.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={`${step.index}-${paragraphIndex}`}>{paragraph}</p>
                  ))}
                </li>
              ))}
            </ol>

            <p className="process-closing">
              Denn nicht der Mensch passt sich der Kleidung an - die maßgeschneiderte Kleidung
              passt sich der Kundin an.
            </p>
          </div>
        </section>

        <section className="section section-services" id="services">
          <div className="container">
            <div className="section-heading section-heading-centered">
              <p className="section-kicker">Leistungen</p>
              <h2>Leistungen nach Maß</h2>
              <p className="section-intro">
                Jedes Modell wird auf Ihren Stil, Ihre Wünsche und Ihre Silhouette
                abgestimmt. So entsteht Kleidung, die nicht nur gut aussieht,
                sondern sich auch richtig anfühlt.
              </p>
            </div>

            <div className="service-grid">
              {services.map((service) => {
                const serviceCardClassName = service.className
                  ? `service-card ${service.className}`
                  : "service-card";

                if (service.galleryItemId) {
                  return (
                    <a
                      className={`${serviceCardClassName} service-card-link`}
                      href={`#${service.galleryItemId}`}
                      key={service.index}
                    >
                      <span className="service-index">{service.index}</span>
                      <h3>{service.title}</h3>
                      <p>{service.copy}</p>
                    </a>
                  );
                }

                return (
                  <article className={serviceCardClassName} key={service.index}>
                    <span className="service-index">{service.index}</span>
                    <h3>{service.title}</h3>
                    <p>{service.copy}</p>
                  </article>
                );
              })}
            </div>

            <div className="service-note">
              Um Sie bestmöglich zu beraten und genügend Zeit ohne Störungen
              einzuplanen, erfolgt die Beratung ausschließlich nach telefonischer
              Terminvereinbarung.
            </div>
          </div>
        </section>

        <section className="section section-gallery" id="gallery">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">Galerie</p>
              <h2>Einblicke in meine Arbeiten</h2>
              <p className="section-intro">
                Eine Auswahl maßgeschneiderter Kleider, inspiriert von den Bereichen
                Brautmode, Anlassmode, Tracht, 1950er-Stil und Casual.
              </p>
            </div>

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
                    onClick={() => setActiveGalleryItem(item)}
                  />
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <figcaption>
                    <strong>{item.title}</strong>
                    <span>{item.copy}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-contact">
          <div className="container">
            <div className="contact-panel">
              <div>
                <p className="section-kicker">Terminvereinbarung</p>
                <h2>Persönliche Beratung</h2>
                <p>
                  Damit ich mir ausreichend Zeit für Ihre Beratung und Ihre Wünsche
                  nehmen kann, bitte ich um telefonische Terminvereinbarung. So
                  entsteht Raum für ein persönliches Gespräch, in dem wir uns
                  kennen lernen und gemeinsam den Grundstein für Ihr neues
                  Lieblingsstück legen.
                </p>
              </div>

              <div className="contact-links">
                <a href="tel:+436503170889">0650 317 0889</a>
                <a
                  className="contact-link-with-icon"
                  href="https://wa.me/436503170889?text=Guten%20Tag%2C%20ich%20moechte%20einen%20Termin%20vereinbaren."
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="contact-link-icon"
                    src="/assets/icons/whatsapp.svg"
                    alt=""
                    aria-hidden="true"
                  />
                  WhatsApp schreiben
                </a>
              </div>
            </div>

            <div className="contact-closing">
              <p className="section-kicker">Abschließende Worte</p>
              <h3>Ein Unikat für Ihren Stil</h3>
              <p>
                Maßgeschneiderte Kleidung ist die schönste Art, die eigene
                Persönlichkeit auszudrücken. Wenn Sie beim Einkaufen nie das
                finden, was wirklich zu Ihnen passt - sei es wegen Farbe, Schnitt
                oder Tragegefühl - dann ist ein Unikat die perfekte Lösung.
              </p>
              <p>
                Design muss funktionieren. Ein Kleid soll nicht nur schön aussehen,
                sondern sich auch gut anfühlen, praktisch sein und Ihre
                Persönlichkeit widerspiegeln. Ebenso wichtig ist der
                Wohlfühlfaktor: Ein Kleid ist erst dann wirklich perfekt, wenn Sie
                sich darin frei, sicher und ganz Sie selbst fühlen.
              </p>
              <p className="contact-closing-signoff">
                Maßgeschneiderte Kleidung von Genoveva – individuell, hochwertig
                und einzigartig
              </p>
            </div>
          </div>
        </section>
      </main>

      {activeGalleryItem ? (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Galeriebild: ${activeGalleryItem.title}`}
          onClick={() => setActiveGalleryItem(null)}
        >
          <div className="gallery-lightbox-inner" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="gallery-lightbox-close"
              aria-label="Bildansicht schließen"
              onClick={() => setActiveGalleryItem(null)}
            >
              <span></span>
              <span></span>
            </button>

            <img
              src={activeGalleryItem.image}
              alt={activeGalleryItem.title}
              loading="eager"
            />

            <div className="gallery-lightbox-caption">
              <strong>{activeGalleryItem.title}</strong>
              <span>{activeGalleryItem.copy}</span>
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
