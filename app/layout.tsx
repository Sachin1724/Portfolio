import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-plus-jakarta",
    weight: ["300", "400", "500", "600", "700", "800"],
});

// Using Plus Jakarta Sans for both until General Sans is provided
const generalSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-general-sans",
    weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
    title: "Sachin Mallick - Designer, Video Editor & Developer",
    description: "Portfolio of Sachidananda Mallick (Sachin Mallick) - CSE student at BPUT, designer, video editor, and developer. Showcasing projects in media and development.",
    keywords: ["Sachin Mallick", "Sachidananda Mallick", "Portfolio", "Web Developer", "Video Editor", "Designer", "BPUT", "CSE"],
    authors: [{ name: "Sachin Mallick" }],
    openGraph: {
        title: "Sachin Mallick - Designer, Video Editor & Developer",
        description: "Portfolio showcasing media and development projects",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${plusJakarta.variable} ${generalSans.variable}`}>
            <body className="antialiased" suppressHydrationWarning>
                {children}
                <NavbarWrapper />
            </body>
        </html>
    );
}
