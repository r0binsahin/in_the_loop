import { Lexend } from "next/font/google";

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
