import {   Inter, Kanit, Syne } from "next/font/google";
import localFont from "next/font/local";


export const kanit = Kanit({
    weight:["300","400","500","600","700","800","900"],
    subsets:["latin"],
    display:"swap",
    variable:"--font-kanit",
    style:["normal"]
})
export const inter = Inter({
    weight:["400","500","600","700","800","900"],
    subsets:["latin"],
    display:"swap",
    style:["normal"],
    variable:"--font-inter"
})

/**
 * Arabic Font Configuration
 * 
 * To change the Arabic font:
 * 1. Place your new font file in /public/assets/fonts/
 * 2. Update the 'src' path below to point to your new font file
 * 3. Update the 'variable' name if you want a different CSS variable name
 * 4. Update the fallback font in globals.css (--font-arabic-fallback)
 * 
 * Example for a different font:
 * src: "../../public/assets/fonts/YourArabicFont.ttf",
 */
export const notoKufiArabic = localFont({
    src: [
        {
            path: "../../public/assets/fonts/NotoKufiArabic-VariableFont_wght.ttf",
            weight: "100 900",
            style: "normal",
        }
    ],
    variable: "--font-arabic",
    display: "swap",
    fallback: ["Arial", "sans-serif"]
})