import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";

export const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const playfair = Playfair_Display({
    subsets: ["latin"],
    style: ["normal", "italic"],
    variable: "--font-playfair",
});
