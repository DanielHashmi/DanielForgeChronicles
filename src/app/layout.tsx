import type { Metadata } from "next";
import "./globals.css";
import { BigProMan } from "@/context/context";
import Navbar from "@/components/Navber/Navbar";
import ComicNeue_Regular from "./fonts/Font_Objects/ComicNeue_Regular";
import { ThemeProvider } from "@/components/DarkMode/ThemeProvider";


export const metadata: Metadata = {
  title: "DanielForgeChronicles",
  description: "DanielForgeChronicles is a blog website which is a sub-website of the official DanielCodeForge, DanielForgeChronicles has a wide range of content include code, snippets, tech information, learning resource etc... related content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-pt-40 scroll-smooth">
      <body
        className={`${ComicNeue_Regular.className} antialiased overflow-x-hidden grid`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>

          <BigProMan>
            <Navbar />
            {children}
          </BigProMan>
        </ThemeProvider>
      </body>
    </html>
  );
}
