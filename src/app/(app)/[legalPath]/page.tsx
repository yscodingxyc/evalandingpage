import { notFound } from "next/navigation";
import LegalPageClient from "../LegalPageClient";

const legalPagesData = {
  agb: {
    path: "/agb" as const,
    title: "AGB",
    intro:
      "Diese Seite ist als sauber gestaltete Unterseite für Ihre Allgemeinen Geschäftsbedingungen angelegt. Den finalen Inhalt sollten Sie noch mit Ihrem rechtlich geprüften Text ersetzen.",
    sections: [
      {
        heading: "Geltungsbereich",
        paragraphs: [
          "Bitte ergänzen Sie hier, für welche Leistungen und Vertragsverhältnisse Ihre AGB gelten.",
          "Typischerweise werden an dieser Stelle die Angebotsgrundlagen, die Vertragspartnerinnen sowie abweichende individuelle Vereinbarungen geregelt.",
        ],
      },
      {
        heading: "Leistungen, Termine und Anproben",
        paragraphs: [
          "Hier kann beschrieben werden, wie Beratung, Anproben, Stoffauswahl, Änderungen und finale Übergabe organisiert sind.",
          "Falls Sie Terminabsagen, Verschiebungen oder Zusatzleistungen regeln möchten, ist das der richtige Abschnitt.",
        ],
      },
      {
        heading: "Zahlung und Storno",
        paragraphs: [
          "Ergänzen Sie hier Ihre Regelungen zu Anzahlungen, Restzahlungen, Fälligkeiten und Stornobedingungen.",
          "Bitte lassen Sie diese Angaben vor Veröffentlichung rechtlich prüfen.",
        ],
      },
    ],
  },
  datenschutz: {
    path: "/datenschutz" as const,
    title: "Datenschutz",
    intro:
      "Diese Unterseite dient als Platzhalter für Ihre Datenschutzerklärung. Den vollständigen, rechtlich geprüften Text sollten Sie noch ergänzen, bevor die Seite produktiv genutzt wird.",
    sections: [
      {
        heading: "Verantwortliche Stelle",
        paragraphs: [
          "Genoveva Maßschneiderei für Damenkleidung",
          "Inhaberin: Eva Maria Handl-Lagler, Marktstraße 3/2, 3324 Euratsfeld, Telefon: 0650 317 0889",
        ],
      },
      {
        heading: "Verarbeitung von Daten",
        paragraphs: [
          "Beschreiben Sie hier, welche personenbezogenen Daten über Kontaktaufnahme, Terminvereinbarung oder Website-Nutzung verarbeitet werden.",
          "Falls Analyse-, Formular- oder Drittanbieter-Tools eingesetzt werden, sollten sie an dieser Stelle vollständig aufgeführt werden.",
        ],
      },
      {
        heading: "Rechte der betroffenen Personen",
        paragraphs: [
          "Hier gehört die Information über Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch hinein.",
          "Bitte ergänzen Sie außerdem die zuständige Datenschutzbehörde und die Kontaktmöglichkeit für Datenschutzanfragen.",
        ],
      },
      {
        heading: "Google Analytics",
        paragraphs: [
          "Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. („Google“). Google Analytics verwendet sogenannte „Cookies“, Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen.",
          "Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Im Falle der Aktivierung der IP-Anonymisierung auf dieser Webseite wird Ihre IP-Adresse von Google jedoch innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt. Die IP-Anonymisierung ist auf dieser Website aktiv.",
          "Im Auftrag des Betreibers dieser Website wird Google diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über die Websiteaktivitäten zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen gegenüber dem Websitebetreiber zu erbringen. Die im Rahmen von Google Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt.",
          "Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich werden nutzen können. Sie können darüber hinaus die Erfassung der durch das Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inklusive Ihrer IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem Sie das unter dem folgenden Link verfügbare Browser-Plugin herunterladen und installieren: http://tools.google.com/dlpage/gaoptout?hl=de.",
        ],
      },
    ],
  },
  impressum: {
    path: "/impressum" as const,
    title: "Impressum",
    intro:
      "Die wichtigsten Kontaktdaten sind bereits hinterlegt. Weitere gesetzlich erforderliche Angaben können Sie in dieser Unterseite ergänzen.",
    sections: [
      {
        heading: "Angaben zum Unternehmen",
        paragraphs: [
          "Genoveva Maßschneiderei für Damenkleidung",
          "Inhaberin: Eva Maria Handl-Lagler",
          "Marktstraße 3/2, 3324 Euratsfeld",
        ],
      },
      {
        heading: "Kontakt",
        paragraphs: [
          "Telefon: 0650 317 0889",
        ],
      },
      {
        heading: "Weitere Pflichtangaben",
        paragraphs: [
          "Schneidermeisterin für Damenbekleidung",
          "Mitgliedschaft bei der Wirtschaftskammer Österreich",
          "Sparte Gewerbe und Handwerk",
          "Bundesinnung Mode und Bekleidungstechnik",
          "Bezirkshauptmannschaft Amstetten",
          "Berufsbezeichnung: Damenkleidermacher (Handwerk) gemäß §94 Z.12 GewO 1994",
          "Meisterbetrieb, Meisterprüfung abgelegt in Österreich",
        ],
      },
    ],
  },
};

type LegalKey = keyof typeof legalPagesData;

interface PageProps {
  params: Promise<{
    legalPath: string;
  }>;
}

export async function generateStaticParams() {
  return [
    { legalPath: "agb" },
    { legalPath: "datenschutz" },
    { legalPath: "impressum" },
  ];
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const path = resolvedParams.legalPath as LegalKey;

  if (!legalPagesData[path]) {
    notFound();
  }

  const legalPage = legalPagesData[path];

  return <LegalPageClient legalPage={legalPage} />;
}
