import { privacyPage } from "../privacyContent";
import { notFound } from "next/navigation";
import LegalPageClient from "../LegalPageClient";

const legalPagesData = {
  agb: {
    path: "/agb" as const,
    title: "Allgemeine Geschäftsbedingungen",
    intro: "Stand: September 2026",
    sections: [
      {
        heading: "§ 1 Geltungsbereich",
        paragraphs: [
          "Diese Allgemeinen Geschäftsbedingungen gelten für alle Arbeiten, die ich in meiner Schneiderei für Sie ausführe insbesondere für Maßanfertigungen, Änderungen, Anpassungen, Reparaturen und individuelle Schneiderleistungen. Mir ist wichtig, dass alles klar, fair und persönlich bleibt.",
        ],
      },
      {
        heading: "§ 2 Vertragsschluss",
        paragraphs: [
          "In meiner Schneiderei werden Aufträge in der Regel persönlich und mündlich besprochen. Ein Auftrag kommt zustande, wenn wir gemeinsam festlegen, was gemacht werden soll, und Sie mir die Arbeit an Ihrem Kleidungsstück oder Ihrer Maßanfertigung anvertrauen. Eine schriftliche Vertragsausfertigung ist dafür nicht erforderlich. Wenn sich während der Arbeit neue Wünsche ergeben, besprechen wir diese ebenfalls persönlich; dadurch können sich Preis oder Fertigstellungszeit ändern.",
        ],
      },
      {
        heading: "§ 3 Leistungsumfang",
        paragraphs: [
          "Welche Leistungen ich für Sie erbringe, ergibt sich aus unserem persönlichen Gespräch. Dazu gehören je nach Auftrag Beratung, Maßnehmen, Schnitt- und Passformarbeiten, Anproben, Änderungen, Verarbeitung und die Übergabe des fertigen Kleidungsstücks. Bei Änderungsarbeiten hängt der genaue Umfang davon ab, was am bestehenden Kleidungsstück technisch möglich und sinnvoll ist.",
        ],
      },
      {
        heading: "§ 4 Maßnehmen und Anproben",
        paragraphs: [
          "Bei Maßanfertigungen und größeren Änderungen sind Maßnehmen und Anproben ein wichtiger Teil des gemeinsamen Weges. Bitte kommen Sie zu den vereinbarten Terminen und bringen Sie wenn passend jene Schuhe, Unterwäsche oder Accessoires mit, die für die Passform wichtig sind. Wenn zusätzliche Anproben oder Änderungen durch neue Wünsche oder körperliche Veränderungen nötig werden, besprechen wir die weiteren Kosten offen miteinander.",
        ],
      },
      {
        heading: "§ 5 Materialien und Stoffe",
        paragraphs: [
          "Stoffe, Spitzen, Knöpfe, Bänder und andere Materialien wählen wir nach Möglichkeit gemeinsam aus. Naturmaterialien und besondere Stoffe können leichte Farb-, Struktur- oder Musterabweichungen haben genau das macht sie oft einzigartig. Wenn Sie eigene Stoffe oder Kleidungsstücke mitbringen, verarbeite ich diese sorgfältig; für deren Qualität, Eignung oder spätere Materialreaktionen kann ich jedoch keine Verantwortung übernehmen.",
        ],
      },
      {
        heading: "§ 6 Preise und Zahlungsbedingungen",
        paragraphs: [
          "Preise werden je nach Aufwand, Material und Art der Arbeit persönlich besprochen. Bei Maßanfertigungen kann eine Anzahlung vereinbart werden, damit Materialien bestellt und die Arbeit begonnen werden kann. Der offene Betrag ist spätestens bei Übergabe oder Abholung zu bezahlen. Änderungs- und Reparaturarbeiten werden, sofern nichts anderes vereinbart ist, bei Abholung bezahlt.",
        ],
      },
      {
        heading: "§ 7 Lieferzeiten",
        paragraphs: [
          "Fertigstellungstermine stimme ich mit Ihnen persönlich ab. Ich bemühe mich sehr, vereinbarte Termine einzuhalten. Sollte sich durch Materiallieferungen, Krankheit, zusätzliche Wünsche oder andere unvorhersehbare Umstände etwas verzögern, informiere ich Sie so früh wie möglich.",
        ],
      },
      {
        heading: "§ 8 Abholung",
        paragraphs: [
          "Sobald Ihr Kleidungsstück fertig ist, verständige ich Sie persönlich. Bitte holen Sie Ihr fertiges Stück innerhalb einer angemessenen Zeit ab. Sollte eine Abholung länger nicht möglich sein, finden wir gemeinsam eine Lösung. Bereits erbrachte Arbeiten bleiben jedenfalls zu bezahlen.",
        ],
      },
      {
        heading: "§ 9 Gewährleistung",
        paragraphs: [
          "Ich arbeite sorgfältig und mit viel Liebe zum Detail. Sollte dennoch einmal etwas nicht passen oder ein berechtigter Mangel vorliegen, melden Sie sich bitte möglichst rasch nach der Abholung bei mir. Wir sehen uns die Sache gemeinsam an und ich nehme, soweit möglich und berechtigt, eine Nachbesserung vor. Spätere Änderungen aufgrund neuer Wünsche, anderer Tragevorstellungen oder körperlicher Veränderungen gelten nicht als Mangel und können gesondert verrechnet werden.",
        ],
      },
      {
        heading: "§ 10 Haftung",
        paragraphs: [
          "Ich gehe mit Ihren Kleidungsstücken und Materialien sehr sorgsam um. Sollte dennoch ein Schaden entstehen, gelten die gesetzlichen Bestimmungen. Für Schäden, die auf die Qualität oder Beschaffenheit von mitgebrachten Stoffen, alten Kleidungsstücken oder bereits vorhandenen Materialschäden zurückzuführen sind, kann ich keine Verantwortung übernehmen.",
        ],
      },
      {
        heading: "§ 11 Eigentumsvorbehalt",
        paragraphs: [
          "Das fertige Kleidungsstück bleibt bis zur vollständigen Bezahlung in meiner Schneiderei. Nach der vollständigen Bezahlung übergebe ich Ihnen Ihr Unikat oder Ihre Änderung sehr gerne.",
        ],
      },
      {
        heading: "§ 12 Datenschutz",
        paragraphs: [
          "Ihre persönlichen Daten verwende ich nur, soweit es für Anfrage, Terminvereinbarung, Auftrag, Rechnung oder gesetzliche Pflichten notwendig ist. Genauere Informationen dazu finden Sie in meiner Datenschutzerklärung.",
        ],
      },
      {
        heading: "§ 13 Schlussbestimmungen",
        paragraphs: [
          "Sollte eine einzelne Bestimmung dieser AGB nicht wirksam sein, bleiben die übrigen Punkte weiterhin gültig. Es gilt österreichisches Recht. Bei Kundinnen und Kunden als Verbraucherinnen bzw. Verbraucher gelten die gesetzlichen Gerichtsstände.",
        ],
      },
    ],
  },
  datenschutz: privacyPage,
  impressum: {
    path: "/impressum" as const,
    title: "Impressum",
    intro: "",
    sections: [
      {
        heading: "GENOVEVA",
        paragraphs: [
          "Inh. Eva Maria Handl-Lagler",
          "Marktstraße 3/2, 3324 Euratsfeld",
          "Mail: emh@genoveva-kleider.at",
          "Tel: 0650 / 317 0889",
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
      {
        heading: "Google Analytics",
        paragraphs: [
          "Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. („Google“). Google Analytics verwendet sog. „Cookies“, Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.",
          "Im Falle der Aktivierung der IP-Anonymisierung auf dieser Webseite, wird Ihre IP-Adresse von Google jedoch innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt. Die IP-Anonymisierung ist auf dieser Website aktiv. Im Auftrag des Betreibers dieser Website wird Google diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über die Websiteaktivitäten zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen gegenüber dem Websitebetreiber zu erbringen.",
          "Die im Rahmen von Google Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt. Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich werden nutzen können. Sie können darüber hinaus die Erfassung der durch das Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem sie das unter dem folgenden Link verfügbare Browser-Plugin herunterladen und installieren: http://tools.google.com/dlpage/gaoptout?hl=de.",
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
