import {   Inter, Kanit, Syne } from "next/font/google";


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