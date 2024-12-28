import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BigProMan } from "@/context/context";
import Navbar from "@/components/Navber/Navbar";
import ComicNeue_Regular from "./fonts/Font_Objects/ComicNeue_Regular";
import { ThemeProvider } from "@/components/DarkMode/ThemeProvider";
import SessionWrapper from "./api/auth/[...nextauth]/SessionWrapper";
import Footer from "@/components/Footer/Footer";

const APP_NAME = "DanielForgeChronicles";
const APP_DEFAULT_TITLE = "DanielForgeChronicles";
const APP_TITLE_TEMPLATE = "%s - DanielForgeChronicles";
const APP_DESCRIPTION = "DanielForgeChronicles is a blog website which is a subsidiary of the official DanielCodeForge, DanielForgeChronicles has a wide range of content including code, snippets, tech information, learning resource etc... related content.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  metadataBase: new URL(process.env.BASE_URL),
  verification: {
    google: 'Kl332XRCTkGZ8QmsHARl35yrMYRiv-poWdUH-TfnDEs',
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-pt-40 scroll-smooth select-none touch-pan-y">
      <body
        className={`${ComicNeue_Regular.className} antialiased grid`}
      >
        <SessionWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>

            <BigProMan>
              <Navbar />
              {children}
              <Footer />
            </BigProMan>
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
