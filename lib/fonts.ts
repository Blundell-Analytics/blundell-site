import { IBM_Plex_Mono, Inter, Inter_Tight } from "next/font/google";

/** Body / UI text. */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

/** Display face — tight grotesk used for headlines. */
export const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
});

/** Labels, eyebrows, buttons and data readouts. */
export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
});
