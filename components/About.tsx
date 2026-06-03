"use client";

import { useEffect, useRef } from "react";
import { FiInstagram, FiArrowUpRight, FiCamera, FiFilm, FiMonitor, FiScissors, FiImage, FiBox } from "react-icons/fi";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiFigma, SiBlender } from "react-icons/si";

// Skill pills — monotone with icons
const SKILL_PILLS = [
    { name: "React",           icon: SiReact },
    { name: "Next.js",         icon: SiNextdotjs },
    { name: "TypeScript",      icon: SiTypescript },
    { name: "Tailwind CSS",    icon: SiTailwindcss },
    { name: "Premiere Pro",    icon: FiFilm },
    { name: "After Effects",   icon: FiBox },
    { name: "DaVinci Resolve", icon: FiMonitor },
    { name: "Motion Graphics", icon: FiScissors },
    { name: "Cinematography",  icon: FiCamera },
    { name: "Blender",         icon: SiBlender },
    { name: "Node.js",         icon: SiNodedotjs },
    { name: "Figma",           icon: SiFigma },
];

const CREATOR_STATS = [
    { value: "2.4K+", label: "Followers" },
    { value: "77",    label: "Posts" },
    { value: "107K",  label: "Views/Month" },
    { value: "12+",   label: "Clients Served" },
];

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e, i) => {
                    if (e.isIntersecting) {
                        setTimeout(() => e.target.classList.add("visible"), i * 70);
                    }
                });
            },
            { threshold: 0.08 }
        );
        const els = sectionRef.current?.querySelectorAll(".fade-in") ?? [];
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative z-[1]"
            style={{
                padding: "var(--section-py) var(--container-px)",
                maxWidth: "var(--container-max)",
                margin: "0 auto",
                background: "transparent",
            }}
        >
            {/* Section label */}
            <div className="section-label fade-in">01 — About</div>

            {/* Two-column grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                {/* ── LEFT: Heading + Bio + Pills ── */}
                <div className="space-y-8 md:space-y-10 fade-in">
                    <h2
                        className="font-syne font-extrabold tracking-tight leading-[1.0]"
                        style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
                    >
                        Builder.
                        <br />
                        Creator.
                        <br />
                        <span style={{ color: "var(--accent)" }}>Odia.</span>
                    </h2>

                    <p className="text-[1.05rem] text-[var(--muted)] leading-[1.8]" style={{ maxWidth: "520px" }}>
                        I&apos;m a{" "}
                        <strong className="text-[var(--text)]">B.Tech student from Odisha</strong>{" "}
                        who builds things on the internet — websites, reels, motion graphics, and
                        content that actually makes sense to Odia-speaking people.
                        <br /><br />
                        My audience is mostly{" "}
                        <span style={{ color: "var(--accent)", fontWeight: 600 }}>
                            Odia developers and students
                        </span>{" "}
                        learning to code. I make content in Odia so that language is never a barrier.
                        <br /><br />
                        I take{" "}
                        <strong className="text-[var(--text)]">freelance projects</strong> —
                        from startup landing pages to full video editing retainers. No unnecessary
                        calls. Just clean work delivered on time.
                    </p>

                    {/* Monotone skill pills with icons — rounded glass */}
                    <div>
                        <div className="font-mono text-[0.62rem] text-[var(--muted)] tracking-[0.15em] uppercase mb-5">
                            Skill Stack
                        </div>
                        <div className="flex flex-wrap gap-2 md:gap-2.5">
                            {SKILL_PILLS.map(({ name, icon: Icon }) => (
                                <span
                                    key={name}
                                    className="fade-in flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.06em] uppercase transition-all duration-300 cursor-default"
                                    style={{
                                        padding: "8px 14px",
                                        color: "var(--glass-text-icon)",
                                        borderRadius: "var(--radius-sm)",
                                        border: "1px solid var(--glass-border-light)",
                                        background: "var(--glass-border-subtle)",
                                        backdropFilter: "blur(8px)",
                                    }}
                                    onMouseEnter={(e) => {
                                        const el = e.currentTarget as HTMLElement;
                                        el.style.borderColor = "rgba(249,115,22,0.4)";
                                        el.style.color = "var(--accent)";
                                        el.style.background = "rgba(249,115,22,0.06)";
                                        el.style.transform = "translateY(-2px)";
                                        el.style.boxShadow = "0 4px 16px rgba(249,115,22,0.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                        const el = e.currentTarget as HTMLElement;
                                        el.style.borderColor = "var(--glass-border-light)";
                                        el.style.color = "var(--glass-text-icon)";
                                        el.style.background = "var(--glass-border-subtle)";
                                        el.style.transform = "";
                                        el.style.boxShadow = "";
                                    }}
                                >
                                    <Icon size={16} style={{ color: "var(--glass-text-dim)" }} />
                                    {name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: Stats + Currently Building ── */}
                <div className="space-y-8 fade-in">
                    {/* Creator stats grid — glass cards */}
                    <div className="grid grid-cols-2 gap-5">
                        {CREATOR_STATS.map(({ value, label }) => (
                            <div
                                key={label}
                                className="relative overflow-hidden p-6 transition-all duration-400"
                                style={{
                                    background: "linear-gradient(180deg, var(--glass-bg), var(--glass-bg-subtle))",
                                    border: "1px solid var(--glass-border)",
                                    borderRadius: "var(--radius-card)",
                                    backdropFilter: "blur(12px)",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.3)";
                                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                                    (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(0,0,0,0.4), 0 0 20px rgba(249,115,22,0.06)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
                                    (e.currentTarget as HTMLElement).style.transform = "";
                                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                                }}
                            >
                                <div
                                    className="font-syne text-3xl font-extrabold leading-none mb-2"
                                    style={{ color: "var(--text)" }}
                                >
                                    {value}
                                </div>
                                <div className="font-mono text-[0.6rem] text-[var(--muted)] uppercase tracking-[0.12em]">
                                    {label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Currently building — glass card */}
                    <div
                        className="p-6"
                        style={{
                            background: "linear-gradient(180deg, var(--glass-bg), var(--glass-bg-subtle))",
                            border: "1px solid var(--glass-border)",
                            borderRadius: "var(--radius-card)",
                            backdropFilter: "blur(12px)",
                        }}
                    >
                        <div className="flex items-center gap-2 mb-5">
                            <span
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{
                                    background: "var(--accent)",
                                    boxShadow: "0 0 8px var(--accent)",
                                    animation: "ambientPulse 2s ease-in-out infinite",
                                }}
                            />
                            <span className="font-mono text-[0.62rem] text-[var(--accent)] tracking-[0.15em] uppercase">
                                Currently Building
                            </span>
                        </div>
                        <div className="space-y-0">
                            {[
                                { title: "Bhasa Odia — TTS Platform", tag: "Open Source" },
                                { title: "Client Reels Retainer",    tag: "Freelance"   },
                                { title: "Dev Tutorials in Odia",    tag: "Content"     },
                            ].map(({ title, tag }) => (
                                <div key={title} className="flex items-center justify-between py-3 border-b border-[var(--glass-border)] last:border-0">
                                    <span className="font-syne text-sm font-semibold text-[var(--text)]">{title}</span>
                                    <span
                                        className="font-mono text-[0.55rem] tracking-[0.1em] uppercase px-2 py-0.5"
                                        style={{ border: "1px solid var(--glass-border-light)", color: "var(--muted)", borderRadius: "var(--radius-sm)" }}
                                    >
                                        {tag}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* DM CTA — glass card */}
                    <a
                        href="https://instagram.com/iamsachindada"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full px-6 py-5 transition-all duration-300 group"
                        style={{
                            background: "linear-gradient(180deg, var(--glass-bg), var(--glass-bg-subtle))",
                            border: "1px solid var(--glass-border)",
                            borderRadius: "var(--radius-card)",
                            backdropFilter: "blur(12px)",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.3)";
                            (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(0,0,0,0.4), 0 0 20px rgba(249,115,22,0.06)";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
                            (e.currentTarget as HTMLElement).style.transform = "";
                            (e.currentTarget as HTMLElement).style.boxShadow = "";
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <FiInstagram size={18} style={{ color: "var(--muted)" }} />
                            <div>
                                <div className="font-syne text-sm font-bold text-[var(--text)]">@iamsachindada</div>
                                <div className="font-mono text-[0.6rem] text-[var(--muted)] mt-0.5">DM me on Instagram</div>
                            </div>
                        </div>
                        <FiArrowUpRight
                            size={18}
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            style={{ color: "var(--muted)" }}
                        />
                    </a>
                </div>
            </div>
        </section>
    );
}
