"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const SkillsTicker = dynamic(() => import("@/components/SkillsTicker"), { ssr: true });
const ClientScroller = dynamic(() => import("@/components/ClientScroller"), { ssr: true });
const About = dynamic(() => import("@/components/About"), { ssr: true });
const Work = dynamic(() => import("@/components/Work"), { ssr: true });
const Skills = dynamic(() => import("@/components/Skills"), { ssr: true });
const Gadgets = dynamic(() => import("@/components/Gadgets"), { ssr: true });
const Packages = dynamic(() => import("@/components/Packages"), { ssr: true });
const ContentSection = dynamic(() => import("@/components/ContentSection"), { ssr: true });
const Experience = dynamic(() => import("@/components/Experience"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true });
const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: true });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setTimeout(() => setLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) return null;

    return (
        <>
            {loading && <Preloader />}
            <Navbar />
            <main className={`transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}>
                {/* 01 Hero */}
                <Hero />

                {/* Ticker + Clients */}
                <SkillsTicker />
                <ClientScroller />

                {/* 02 About */}
                <About />

                {/* 03 Work — Media + Dev Projects */}
                <Work />

                {/* 04 Skills Panel */}
                <Skills />

                {/* 05 Gadgets */}
                <Gadgets />

                {/* 06 Packages / Services */}
                <Packages />

                {/* 07 Content / Instagram */}
                <ContentSection />

                {/* 08 Experience & Education */}
                <Experience />

                {/* 09 Testimonials */}
                <Testimonials />

                {/* 10 FAQ */}
                <FAQ />

                {/* 11 Contact */}
                <Contact />
            </main>
            <Footer />
        </>
    );
}
