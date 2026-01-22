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
 * Arabic Font Configuration - CalibriLight
 * 
 * CalibriLight is used for Arabic text (RTL)
 */
export const calibriLight = localFont({
    src: [
        {
            path: "../../public/assets/fonts/CalibriLight.ttf",
            weight: "300",
            style: "normal",
        }
    ],
    variable: "--font-arabic",
    display: "swap",
    fallback: ["Arial", "sans-serif"],
    preload: true,
    adjustFontFallback: false
})

/**
 * English Font Configuration - Bahnschrift
 * 
 * Bahnschrift is used for English text (LTR)
 */
export const bahnschrift = localFont({
    src: [
        {
            path: "../../public/assets/fonts/Bahnschrift.ttf",
            weight: "100 900",
            style: "normal",
        }
    ],
    variable: "--font-english",
    display: "swap",
    fallback: ["Arial", "sans-serif"],
    preload: true,
    adjustFontFallback: false
})