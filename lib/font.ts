import { IBM_Plex_Sans_Arabic } from "next/font/google";

export const arabicFont = IBM_Plex_Sans_Arabic({
  weight: ["400", "700"],
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-arabic",
  fallback: ["sans-serif"],
});

export const arabicFontClass = arabicFont.className;
