"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    const btnRef = useRef<HTMLAnchorElement>(null);

    // Magnetic button effect
    useEffect(() => {
        const el = btnRef.current;
        if (!el) return;
        const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.22;
            const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.22;
            el.style.transform = `translate(${dx}px, ${dy}px)`;
        };
        const onLeave = () => { el.style.transform = ""; };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
    }, []);

    return (
        <section
            id="home"
            className="relative min-h-screen overflow-hidden flex flex-col"
            style={{ background: "#0a0a0f" }}
        >
            {/* ══════════════════════════════════════════
                DESK SETUP — cinematic background
            ══════════════════════════════════════════ */}
            <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 z-[1] pointer-events-none"
            >
                <Image
                    src="/assets/images/desk-setup.png"
                    alt="Sachin Dada's desk setup"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                    style={{ opacity: 0.4 }}
                />
                {/* Heavy top vignette — keeps nav readable */}
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, #0a0a0f 0%, rgba(10,10,15,0.6) 30%, transparent 55%)" }}
                />
                {/* Heavy bottom vignette — fades into stats */}
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, #0a0a0f 0%, rgba(10,10,15,0.7) 25%, transparent 50%)" }}
                />
                {/* Strong left vignette — text readability on mobile */}
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to right, #0a0a0f 0%, rgba(10,10,15,0.6) 30%, transparent 55%)" }}
                />
                {/* Right edge vignette */}
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to left, rgba(10,10,15,0.5) 0%, transparent 25%)" }}
                />
            </motion.div>

            {/* Subtle ambient glow */}
            <div
                className="absolute top-[55%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] pointer-events-none rounded-full z-[1]"
                style={{
                    background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 60%)",
                    filter: "blur(80px)",
                }}
            />

            {/* Giant Background Text */}
            <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-[1]">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="font-syne font-extrabold leading-none tracking-[-0.04em] select-none"
                    style={{
                        fontSize: "clamp(3rem, 12vw, 15rem)",
                        color: "transparent",
                        WebkitTextStroke: "1px var(--glass-bg)",
                        whiteSpace: "nowrap",
                    }}
                >
                    @IAMSACHINDADA
                </motion.h1>
            </div>

            {/* ══════════════════════════════════════════
                MAIN CONTENT — Profile card top on mobile, right on desktop
            ══════════════════════════════════════════ */}
            <div className="relative z-[2] w-full flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-28 md:pt-36 pb-0">
                
                <div className="flex flex-col-reverse lg:flex-row items-center lg:items-center justify-between gap-10 lg:gap-16 w-full">
                    {/* LEFT — Headline block */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-2xl flex-1"
                    >
                        {/* Status badge */}
                        <div
                            className="inline-flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.15em] uppercase mb-8"
                            style={{
                                padding: "7px 14px",
                                background: "rgba(34,197,94,0.05)",
                                border: "1px solid rgba(34,197,94,0.15)",
                                color: "#22c55e",
                                borderRadius: "999px",
                            }}
                        >
                            <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{
                                    background: "#22c55e",
                                    boxShadow: "0 0 8px #22c55e",
                                    animation: "ambientPulse 2s ease-in-out infinite",
                                }}
                            />
                            Available for Work
                        </div>

                        {/* Typography — primary focus */}
                        <h2 className="font-syne font-bold text-[clamp(2.2rem,7vw,4.5rem)] leading-[1.05] tracking-tight text-white">
                            Build Brands
                            <br />
                            People <span className="italic font-light gradient-text-accent">Remember</span>
                            <br />
                            <span className="text-gray-500">& Content That Converts</span>
                        </h2>

                        {/* Bio — short, minimal */}
                        <p className="font-mono text-[0.72rem] text-[var(--muted)] leading-[1.8] tracking-wide max-w-md mt-8 md:mt-10">
                            Video, Web, Branding & Content Systems — crafted for Odia creators, startups, and brands that want to stand out.
                        </p>

                        {/* CTA — Primary + Secondary */}
                        <div className="flex flex-wrap items-center gap-4 mt-8 md:mt-10">
                            <a
                                ref={btnRef}
                                href="#work"
                                className="magnetic-btn inline-flex items-center justify-center gap-2.5 font-mono text-[0.62rem] font-bold tracking-[0.12em] uppercase transition-all duration-300"
                                style={{
                                    padding: "14px 32px",
                                    background: "var(--accent)",
                                    color: "#000",
                                    borderRadius: "999px",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(249,115,22,0.4)";
                                    (e.currentTarget as HTMLElement).style.background = "var(--accent2)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                                    (e.currentTarget as HTMLElement).style.background = "var(--accent)";
                                }}
                            >
                                <span>→</span> Explore Works
                            </a>
                            <a
                                href="#contact"
                                className="glass-btn"
                            >
                                <span>✦</span> Connect
                            </a>
                        </div>
                    </motion.div>

                    {/* RIGHT — Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-shrink-0"
                    >
                        <a
                            href="https://www.instagram.com/iamsachindada"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative block overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                            style={{
                                width: "320px",
                                aspectRatio: "4/5",
                                background: "var(--glass-bg)",
                                border: "1px solid var(--glass-border)",
                                borderRadius: "var(--radius-card)",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.25)";
                                (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(249,115,22,0.06)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
                                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                            }}
                        >
                            <Image
                                src="/assets/images/profile-pic.png"
                                alt="Sachin Dada"
                                fill
                                sizes="320px"
                                priority
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Dark gradient overlay for text readability */}
                            <div
                                className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
                                style={{ background: "linear-gradient(to top, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.6) 30%, transparent 70%)" }}
                            />

                            {/* Info fixed to bottom */}
                            <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end z-[1]">
                                <div className="font-syne text-[1.35rem] leading-none font-bold text-white mb-1.5">Sachidananda Mallick</div>
                                <div className="font-mono text-[0.62rem] text-gray-300 tracking-[0.12em] uppercase">
                                    Designer • Developer • Creator
                                </div>
                                <div className="w-full h-[1px] bg-white/10 my-4" />
                                <div className="flex items-center justify-between font-mono text-[0.62rem] tracking-[0.1em] uppercase text-gray-400">
                                    <span className="group-hover:text-[var(--accent)] transition-colors duration-300">@iamsachindada</span>
                                    <span className="group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 text-sm">↗</span>
                                </div>
                            </div>
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* ══════════════════════════════════════════
                BOTTOM — Socials + Stats
            ══════════════════════════════════════════ */}
            <div className="relative z-[3] px-6 md:px-12 lg:px-20 pb-10 md:pb-14">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-6 border-t border-white/[0.06]"
                >
                    {/* Socials — glass pills */}
                    <div className="flex flex-wrap gap-2.5">
                        {[
                            { label: "Github", href: "https://github.com/Sachin1724" },
                            { label: "LinkedIn", href: "https://www.linkedin.com/in/sachidananda-mallick/" },
                            { label: "Instagram", href: "https://www.instagram.com/iamsachindada" },
                            { label: "YouTube", href: "https://www.youtube.com/@sachindadaorginals" },
                        ].map(({ label, href }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-[0.58rem] tracking-[0.1em] transition-all duration-300"
                                style={{
                                    padding: "7px 14px",
                                    border: "1px solid var(--glass-border)",
                                    color: "var(--muted)",
                                    background: "var(--glass-bg-active)",
                                    backdropFilter: "blur(8px)",
                                    borderRadius: "999px",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.3)";
                                    (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                                    (e.currentTarget as HTMLElement).style.background = "rgba(249,115,22,0.06)";
                                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(249,115,22,0.1)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
                                    (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                                    (e.currentTarget as HTMLElement).style.background = "var(--glass-bg-active)";
                                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                                }}
                            >
                                {label}
                            </a>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="flex gap-8 md:gap-14">
                        {[
                            { value: "2.4K+", label: "Followers" },
                            { value: "170K",  label: "Views/mo" },
                            { value: "12+",   label: "Clients" },
                        ].map(({ value, label }) => (
                            <div key={label} className="text-left md:text-right">
                                <div className="font-syne text-2xl md:text-3xl font-extrabold text-white">{value}</div>
                                <div className="font-mono text-[0.55rem] text-[var(--muted)] tracking-[0.15em] uppercase mt-1.5">
                                    {label}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
            
            <style jsx>{`
                @keyframes ambientPulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </section>
    );
}
