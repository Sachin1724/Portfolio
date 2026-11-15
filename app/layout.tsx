import type { Metadata, Viewport } from "next";
import { Syne, Space_Grotesk, DM_Mono } from "next/font/google";
import "./globals.css";

const display = Syne({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display", display: "swap" });
const text = Space_Grotesk({ subsets: ["latin"], variable: "--font-text", display: "swap" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const viewport: Viewport = { themeColor: "#f7f1e7" };

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
