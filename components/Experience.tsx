"use client";

import { useEffect, useRef } from "react";
import { EXPERIENCE, EDUCATION } from "@/lib/constants";

export default function Experience() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e, i) => {
                    if (e.isIntersecting) {
                        setTimeout(() => e.target.classList.add("visible"), i * 80);
                    }
                });
            },
            { threshold: 0.05 }
        );
        const els = sectionRef.current?.querySelectorAll(".fade-in") ?? [];
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="experience"
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
                <div className="section-label fade-in">06 — Experience</div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
                    {/* ── LEFT: Work Experience ── */}
                    <div>
                        <h2
                            className="font-syne font-extrabold tracking-tight mb-10 fade-in"
                            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
                        >
                            Work
                            <br />
                            <span style={{ color: "var(--accent)" }}>Experience</span>
                        </h2>

                        {/* Timeline */}
                        <div className="relative">
                            {/* Glow line */}
                            <div
                                className="absolute left-4 top-2 bottom-0 w-px"
                                style={{
                                    background: "linear-gradient(180deg, var(--accent) 0%, rgba(249,115,22,0.15) 60%, transparent 100%)",
                                }}
                            />

                            <div className="space-y-0">
                                {EXPERIENCE.map((exp, i) => (
                                    <div
                                        key={`exp-${i}`}
                                        className="relative flex gap-8 pb-10 last:pb-0 fade-in group"
                                        style={{ animationDelay: `${i * 100}ms` }}
                                    >
                                        {/* Node — rounded circle with glass bg */}
                                        <div
                                            className="relative z-10 w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                                            style={{
                                                background: "var(--glass-border-subtle)",
                                                border: "1px solid rgba(249,115,22,0.4)",
                                                boxShadow: "0 0 0 4px var(--surface), 0 0 12px rgba(249,115,22,0.1)",
                                                marginTop: "2px",
                                                backdropFilter: "blur(8px)",
                                            }}
                                        >
                                            <span
                                                className="w-2 h-2 rounded-full"
                                                style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }}
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            {/* Duration badge — rounded */}
                                            <span
                                                className="inline-block font-mono text-[0.55rem] tracking-[0.12em] uppercase mb-2"
                                                style={{
                                                    padding: "3px 10px",
                                                    background: "rgba(249,115,22,0.08)",
                                                    border: "1px solid rgba(249,115,22,0.2)",
                                                    color: "var(--accent)",
                                                    borderRadius: "var(--radius-sm)",
                                                }}
                                            >
                                                {exp.duration}
                                            </span>

                                            <h3 className="font-syne text-[1rem] font-bold text-[var(--text)] leading-tight mb-0.5">
                                                {exp.role}
                                            </h3>
                                            <div className="font-mono text-[0.65rem] text-[var(--muted)] tracking-[0.06em] mb-3">
                                                {exp.organization}
                                            </div>

                                            <ul className="space-y-1.5">
                                                {exp.responsibilities.map((r, ri) => (
                                                    <li key={ri} className="flex items-start gap-2">
                                                        <span
                                                            className="font-mono text-[0.5rem] mt-[3px] flex-shrink-0"
                                                            style={{ color: "var(--accent)" }}
                                                        >
                                                            ◆
                                                        </span>
                                                        <span className="font-mono text-[0.65rem] text-[var(--muted)] leading-relaxed">
                                                            {r}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT: Education + Social Links ── */}
                    <div>
                        {/* Education */}
                        <h2
                            className="font-syne font-extrabold tracking-tight mb-10 fade-in"
                            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
                        >
                            Education &amp;
                            <br />
                            <span style={{ color: "var(--odia)" }}>Credentials</span>
                        </h2>

                        <div className="space-y-4 mb-10 fade-in">
                            {EDUCATION.map((edu, i) => (
                                <div
                                    key={`edu-${i}`}
                                    className="p-5 transition-all duration-300 group"
                                    style={{
                                        background: "linear-gradient(180deg, var(--glass-bg), var(--glass-bg-subtle))",
                                        border: "1px solid var(--glass-border)",
                                        borderRadius: "var(--radius-card)",
                                        backdropFilter: "blur(12px)",
                                        animationDelay: `${i * 80}ms`,
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,197,94,0.3)";
                                        (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(0,0,0,0.4), 0 0 20px rgba(34,197,94,0.06)";
                                        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
                                        (e.currentTarget as HTMLElement).style.boxShadow = "";
                                        (e.currentTarget as HTMLElement).style.transform = "";
                                    }}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span
                                            className="font-mono text-[0.55rem] uppercase tracking-[0.12em]"
                                            style={{ color: "var(--odia)", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", padding: "3px 8px", borderRadius: "var(--radius-sm)" }}
                                        >
                                            {edu.duration}
                                        </span>
                                    </div>
                                    <h3 className="font-syne text-[0.95rem] font-bold text-[var(--text)] mb-1">{edu.degree}</h3>
                                    <div className="font-mono text-[0.62rem] text-[var(--muted)] mb-2">{edu.institute}</div>
                                    <p className="font-mono text-[0.6rem] text-[var(--muted)] leading-relaxed opacity-70">{edu.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Social + Links Panel */}
                        <div className="fade-in">
                            <div className="font-mono text-[0.62rem] text-[var(--accent)] uppercase tracking-[0.18em] mb-4">
                                Connect with me
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: "GitHub",    sub: "@Sachin1724",           href: "https://github.com/Sachin1724",                     color: "#e8e8f0", icon: "GH" },
                                    { label: "LinkedIn",  sub: "sachidananda-mallick",  href: "https://www.linkedin.com/in/sachidananda-mallick/",  color: "#0a66c2", icon: "LI" },
                                    { label: "Instagram", sub: "@iamsachindada",        href: "https://www.instagram.com/iamsachindada",            color: "#e1306c", icon: "IG" },
                                    { label: "YouTube",   sub: "@sachindadaorginals",   href: "https://www.youtube.com/@sachindadaorginals",        color: "#ff0000", icon: "YT" },
                                    { label: "Portfolio", sub: "View live site",        href: "https://sachindada.dev",                            color: "#f97316", icon: "→" },
                                    { label: "Resume",    sub: "Download PDF",          href: "https://drive.google.com/file/d/1_bVTEkGjCqWBnqiH3MIV8Gz5dX1dFPq4/view?usp=sharing", color: "#22c55e", icon: "↓" },
                                ].map(({ label, sub, href, color, icon }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3.5 transition-all duration-300 group"
                                        style={{
                                            background: "linear-gradient(180deg, var(--glass-bg), var(--glass-bg-subtle))",
                                            border: "1px solid var(--glass-border)",
                                            borderRadius: "var(--radius-card)",
                                            backdropFilter: "blur(8px)",
                                        }}
                                        onMouseEnter={(e) => {
                                            const el = e.currentTarget as HTMLElement;
                                            el.style.borderColor = `${color}50`;
                                            el.style.boxShadow = `0 12px 36px rgba(0,0,0,0.4), 0 0 16px ${color}15`;
                                            el.style.transform = "translateY(-4px)";
                                        }}
                                        onMouseLeave={(e) => {
                                            const el = e.currentTarget as HTMLElement;
                                            el.style.borderColor = "var(--glass-border)";
                                            el.style.boxShadow = "";
                                            el.style.transform = "";
                                        }}
                                    >
                                        <div
                                            className="w-8 h-8 flex items-center justify-center flex-shrink-0 font-mono text-xs font-bold transition-all duration-200"
                                            style={{
                                                background: `${color}12`,
                                                border: `1px solid ${color}30`,
                                                color,
                                                borderRadius: "var(--radius-sm)",
                                            }}
                                        >
                                            {icon}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-syne text-xs font-bold text-[var(--text)] leading-tight">{label}</div>
                                            <div className="font-mono text-[0.55rem] text-[var(--muted)] truncate mt-0.5">{sub}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
