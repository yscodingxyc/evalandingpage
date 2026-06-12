import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "Genoveva | Maßschneiderei für Damenkleidung",
  description:
    "Genoveva Maßschneiderei von Eva Maria Handl-Lagler: individuelle Damenkleidung nach Maß, Brautmode, Anlassmode und besondere Unikate.",
  icons: {
    icon: "/assets/images/logo.png",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
