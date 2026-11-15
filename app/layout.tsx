import type { Metadata } from "next";
import { Rozha_One, Anek_Odia, Space_Mono } from "next/font/google";
import "./globals.css";

const display = Rozha_One({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });
const text = Anek_Odia({ subsets: ["latin", "oriya"], axes: ["wdth"], variable: "--font-text", display: "swap" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
    metadataBase: new URL("https://sachidanandamallick.vercel.app"),
    title: "Sachin Dada — Cinematic Creator & Dev Freelancer",
    description:
        "B.Tech student from Odisha. Developer, Video Editor, and Creator. Building websites, editing reels, and teaching coding in Odia.",
    keywords: [
        "Sachin Dada",
        "Sachidananda Mallick",
        "Web Developer",
        "Video Editor",
        "Freelancer",
        "Odia Tech Creator",
        "Odisha",
    ],
    openGraph: {
        title: "Sachin Dada — Cinematic Creator & Dev Freelancer",
        description: "B.Tech student from Odisha. Developer, Video Editor, and Creator.",
        type: "website",
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`antialiased ${display.variable} ${text.variable} ${mono.variable}`}>{children}</body>
        </html>
    );
}
