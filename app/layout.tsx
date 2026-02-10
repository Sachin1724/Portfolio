"use client";

import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "react-hot-toast";

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${plusJakarta.variable} ${generalSans.variable}`} suppressHydrationWarning>
            <body className="antialiased" suppressHydrationWarning>
                <AuthProvider>
                    {children}
                    <NavbarWrapper />
                    <Toaster position="top-right" />
                </AuthProvider>
            </body>
        </html>
    );
}
