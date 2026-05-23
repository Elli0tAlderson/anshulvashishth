import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Cursor from "./components/Cursor";
// import Loader from "./components/Loader";

const durer = localFont({
  src: "../../public/fonts/Durer.otf",
  variable: "--font-durer",
});

const geist = GeistSans;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${durer.variable} ${geist.variable} font-sans antialiased`}>
        {/* <Loader /> */}
        <Cursor />
        {children}
      </body>
    </html>
  );
}
