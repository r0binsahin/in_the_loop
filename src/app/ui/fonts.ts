import { Lexend } from "next/font/google";
import { Quicksand } from "next/font/google";

// Font definition
// 400 - regular
// 500 - medium
// 700 - bold
// 900 - black

export const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-lexend",
});

export const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
