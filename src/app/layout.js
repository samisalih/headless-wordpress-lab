import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Viktoria 03 - Fussball e.V.",
  description: "Offizielle Website des Fußballvereins Viktoria 03",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
