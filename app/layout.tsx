import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";
import CursorGlow from "@/components/CursorGlow";
import SmoothScroll from "@/components/SmoothScroll";

const syne = Syne({ subsets: ["latin"] });

export const metadata: Metadata = {
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
        description:
            "B.Tech student from Odisha. Developer, Video Editor, and Creator.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var stored = localStorage.getItem('theme');
                                    if (stored) {
                                        document.documentElement.setAttribute('data-theme', stored);
                                    } else {
                                        document.documentElement.setAttribute('data-theme', 'dark');
                                    }
                                } catch (e) {}
                            })();
                        `,
                    }}
                />
            </head>
            <body className="antialiased" suppressHydrationWarning>
                <SmoothScroll>
                    {children}
                </SmoothScroll>
            </body>
        </html>
    );
}
