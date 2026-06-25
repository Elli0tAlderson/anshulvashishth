import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Cursor from "./components/Cursor";
import SmoothScrolling from "./components/SmoothScrolling";
import Loader from "./components/Loader";
import { LoadingProvider } from "./components/LoadingContext";

const dirtyline = localFont({
  src: "../../public/fonts/Dirtyline.otf", 
  variable: "--font-dirtyline",
});

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
      <body className={`${dirtyline.variable} ${durer.variable} ${geist.variable} font-sans antialiased`}>
        <LoadingProvider>
          <Loader />
          <Cursor />
          <SmoothScrolling>
            {children}
          </SmoothScrolling>
        </LoadingProvider>
      </body>
    </html>
  );
}