"use client";

import { useRef, useEffect } from "react";
import {
    FiCode, FiMonitor, FiCamera, FiFilm, FiMic, FiEdit3,
    FiPenTool, FiVideo, FiStar, FiDatabase, FiGitBranch, FiServer,
    FiLayout, FiLayers, FiBox, FiScissors, FiImage,
} from "react-icons/fi";
import {
    SiBlender,
    SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiHtml5, SiFigma,
    SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiGithub,
} from "react-icons/si";

// Toolkit categories — all monotone, brand accent only
const TOOLKIT = [
    {
        id: "editing",
        label: "Editing & Film",
        tools: [
            { name: "Adobe Premiere Pro", icon: FiFilm },
            { name: "After Effects",      icon: FiBox },
            { name: "DaVinci Resolve",    icon: FiMonitor },
            { name: "Adobe Photoshop",    icon: FiImage },
            { name: "Adobe Illustrator",  icon: FiPenTool },
            { name: "Blender",            icon: SiBlender },
            { name: "OBS",                icon: FiVideo },
            { name: "Color Grading",      icon: FiLayers },
            { name: "Audio Mixing",       icon: FiMic },
            { name: "Scriptwriting",      icon: FiEdit3 },
        ],
    },
    {
        id: "frontend",
        label: "Frontend Dev",
        tools: [
            { name: "React",        icon: SiReact },
            { name: "Next.js",      icon: SiNextdotjs },
            { name: "TypeScript",   icon: SiTypescript },
            { name: "JavaScript",   icon: SiJavascript },
            { name: "Tailwind CSS", icon: SiTailwindcss },
            { name: "HTML & CSS",   icon: SiHtml5 },
            { name: "Figma",        icon: SiFigma },
            { name: "UI/UX Design", icon: FiLayout },
        ],
    },
    {
        id: "backend",
        label: "Backend & Tools",
        tools: [
            { name: "Node.js",    icon: SiNodedotjs },
            { name: "Express",    icon: SiExpress },
            { name: "MongoDB",    icon: SiMongodb },
            { name: "PostgreSQL", icon: SiPostgresql },
            { name: "REST APIs",  icon: FiServer },
            { name: "Git/GitHub", icon: SiGithub },
        ],
    },
    {
        id: "creator",
        label: "Creator Skills",
        tools: [
            { name: "Cinematography",  icon: FiCamera },
            { name: "Photography",     icon: FiCamera },
            { name: "Reels Editing",   icon: FiFilm },
            { name: "Motion Graphics", icon: FiStar },
            { name: "Odia Content",    icon: FiPenTool },
            { name: "Storytelling",    icon: FiEdit3 },
        ],
    },
];

const PROFICIENCY = [
    { label: "Video Production", pct: 90 },
    { label: "Frontend Dev",     pct: 80 },
    { label: "Motion Graphics",  pct: 75 },
    { label: "Backend / APIs",   pct: 65 },
];

export default function Skills() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) e.target.classList.add("visible");
                });
            },
            { threshold: 0.06 }
        );
        const els = sectionRef.current?.querySelectorAll(".fade-in") ?? [];
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="relative z-[1]"
            style={{
                background: "var(--surface)",
                borderTop: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
            }}
        >
            <div
                style={{
                    padding: "var(--section-py) var(--container-px)",
                    maxWidth: "var(--container-max)",
                    margin: "0 auto",
                }}
            >
                {/* Section label */}
                <div className="section-label fade-in">04 — Toolkit</div>

                {/* Heading */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 fade-in">
                    <h2
                        className="font-syne font-extrabold tracking-tight leading-tight"
                        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                    >
                        Creative Toolkit
                    </h2>
                    <p className="font-mono text-[0.68rem] text-[var(--muted)] tracking-[0.08em]" style={{ maxWidth: "280px" }}>
                        Every tool I actually use in production — no fluff, no filler.
                    </p>
                </div>

                {/* Toolkit clusters — wrapped in glass cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-6">
                    {TOOLKIT.map((cat, ci) => (
                        <div
                            key={cat.id}
                            className="fade-in p-6"
                            style={{
                                animationDelay: `${ci * 80}ms`,
                                background: "linear-gradient(180deg, var(--glass-border-subtle), var(--glass-bg-subtle))",
                                border: "1px solid var(--glass-border)",
                                borderRadius: "var(--radius-card)",
                                backdropFilter: "blur(12px)",
                            }}
                        >
                            {/* Category header */}
                            <div
                                className="flex items-center gap-3 mb-6 pb-4"
                                style={{ borderBottom: "1px solid var(--glass-border)" }}
                            >
                                <h3
                                    className="font-mono text-[0.65rem] uppercase tracking-[0.18em] font-bold"
                                    style={{ color: "var(--text)" }}
                                >
                                    {cat.label}
                                </h3>
                            </div>

                            {/* Tool pills — rounded glass */}
                            <div className="flex flex-wrap gap-2 md:gap-2.5">
                                {cat.tools.map(({ name, icon: Icon }, i) => (
                                    <div
                                        key={name}
                                        className="fade-in flex items-center gap-2 transition-all duration-300 cursor-default"
                                        style={{
                                            padding: "8px 14px",
                                            border: "1px solid var(--glass-border-light)",
                                            background: "var(--glass-border-subtle)",
                                            borderRadius: "var(--radius-sm)",
                                            animationDelay: `${ci * 80 + i * 40}ms`,
                                        }}
                                        onMouseEnter={(e) => {
                                            const el = e.currentTarget as HTMLElement;
                                            el.style.borderColor = "rgba(249,115,22,0.35)";
                                            el.style.background = "rgba(249,115,22,0.06)";
                                            el.style.transform = "translateY(-2px)";
                                            el.style.boxShadow = "0 4px 12px rgba(249,115,22,0.08)";
                                        }}
                                        onMouseLeave={(e) => {
                                            const el = e.currentTarget as HTMLElement;
                                            el.style.borderColor = "var(--glass-border)";
                                            el.style.background = "var(--glass-bg-active)";
                                            el.style.transform = "";
                                            el.style.boxShadow = "";
                                        }}
                                    >
                                        <Icon size={16} style={{ color: "var(--glass-text-dim)" }} />
                                        <span
                                            className="font-mono text-[0.62rem] tracking-[0.06em] uppercase"
                                            style={{ color: "var(--glass-text-icon)" }}
                                        >
                                            {name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom proficiency bar — animated */}
                <div
                    className="mt-20 pt-10 flex flex-col sm:flex-row sm:items-center gap-6 fade-in"
                    style={{ borderTop: "1px solid var(--border)" }}
                >
                    <span className="font-mono text-[0.65rem] text-[var(--muted)] tracking-[0.15em] uppercase flex-shrink-0">
                        Proficiency
                    </span>
                    <div className="flex gap-8 flex-wrap">
                        {PROFICIENCY.map(({ label, pct }) => (
                            <div key={label} className="flex items-center gap-3">
                                <div
                                    className="w-20 h-[3px] rounded-full overflow-hidden"
                                    style={{ background: "var(--glass-border)" }}
                                >
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            width: `${pct}%`,
                                            background: "var(--accent)",
                                            opacity: 0.7,
                                            animation: "barFill 1.5s ease-out forwards",
                                        }}
                                    />
                                </div>
                                <span className="font-mono text-[0.58rem] text-[var(--muted)] tracking-[0.06em]">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
