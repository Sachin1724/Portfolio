"use client";

import { useRef, useEffect, useState } from "react";
import { EQUIPMENT } from "@/lib/constants";
import { EquipmentItem } from "@/types";

const GEAR_ICONS: Record<string, React.ReactNode> = {
    camera: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
        </svg>
    ),
    laptop: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M0 21h24"/>
        </svg>
    ),
    smartphone: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
        </svg>
    ),
    microphone: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
        </svg>
    ),
    headphones: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
        </svg>
    ),
    light: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
    ),
};

const TYPE_ACCENT: Record<string, string> = {
    camera:      "#f97316",
    laptop:      "#22c55e",
    smartphone:  "#3b82f6",
    microphone:  "#a855f7",
    headphones:  "#ec4899",
    light:       "#f59e0b",
};

// Hero items — first 3
const HERO_COUNT = 3;

export default function Gadgets() {
    const sectionRef  = useRef<HTMLElement>(null);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) e.target.classList.add("visible");
                });
            },
            { threshold: 0.04 }
        );
        const els = sectionRef.current?.querySelectorAll(".fade-in") ?? [];
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const heroGear  = EQUIPMENT.slice(0, HERO_COUNT);
    const restGear  = EQUIPMENT.slice(HERO_COUNT);

    return (
        <section
            id="gadgets"
            ref={sectionRef}
            className="relative z-[1] overflow-hidden"
            style={{
                background: "var(--bg)",
                borderTop: "1px solid var(--border)",
            }}
        >
            {/* Dramatic radial spotlight */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse at top, rgba(249,115,22,0.06) 0%, transparent 70%)",
                    filter: "blur(20px)",
                }}
            />

            <div
                style={{
                    padding: "var(--section-py) var(--container-px)",
                    maxWidth: "var(--container-max)",
                    margin: "0 auto",
                }}
            >
                {/* Section label */}
                <div className="section-label fade-in">05 — Gear</div>

                {/* Header */}
                <div className="flex items-end justify-between mb-14 fade-in">
                    <h2
                        className="font-syne font-extrabold tracking-tight leading-tight"
                        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                    >
                        My Gear
                    </h2>
                    <span className="font-mono text-[0.62rem] text-[var(--muted)] uppercase tracking-[0.15em]">
                        Hover to inspect
                    </span>
                </div>

                {/* Hero gear — 3 large cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5 fade-in">
                    {heroGear.map((item, i) => (
                        <GadgetCard key={`hero-${i}`} item={item} featured />
                    ))}
                </div>

                {/* Expandable rest */}
                {restGear.length > 0 && (
                    <>
                        <div
                            className="overflow-hidden transition-all duration-600"
                            style={{
                                maxHeight: expanded ? `${restGear.length * 300}px` : "0",
                                opacity: expanded ? 1 : 0,
                                marginBottom: expanded ? "20px" : "0",
                            }}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-1">
                                {restGear.map((item, i) => (
                                    <GadgetCard key={`rest-${i}`} item={item} />
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center fade-in">
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] px-8 py-3 transition-all duration-300"
                                style={{
                                    border: "1px solid var(--border)",
                                    color: "var(--muted)",
                                    background: "var(--glass-border-subtle)",
                                    borderRadius: "var(--radius-pill)",
                                    backdropFilter: "blur(8px)",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.4)";
                                    (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                                    (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                                    (e.currentTarget as HTMLElement).style.transform = "";
                                }}
                            >
                                {expanded ? "↑ Show Less" : `+ Show All ${restGear.length} More Items`}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

function GadgetCard({ item, featured = false }: { item: EquipmentItem; featured?: boolean }) {
    const accent = TYPE_ACCENT[item.icon] ?? "#f97316";

    return (
        <div
            className="group relative overflow-hidden transition-all duration-400"
            style={{
                background: "linear-gradient(180deg, var(--glass-bg), var(--glass-bg-subtle))",
                border: "1px solid var(--glass-border)",
                borderRadius: "var(--radius-card)",
                backdropFilter: "blur(12px)",
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${accent}40`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 24px 64px rgba(0,0,0,0.5), 0 0 30px ${accent}12`;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
                (e.currentTarget as HTMLElement).style.transform = "";
            }}
        >
            {/* Product Image */}
            <div
                className="relative overflow-hidden"
                style={{ aspectRatio: featured ? "4/3" : "16/9", borderRadius: "var(--radius-card) var(--radius-card) 0 0", background: "var(--surface2)" }}
            >
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.model}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        style={{ padding: "12px" }}
                        loading="lazy"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                        }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ opacity: 0.15, color: accent }}>
                        {GEAR_ICONS[item.icon]}
                    </div>
                )}

                {/* Type badge — glass pill */}
                <div className="absolute top-3 left-3">
                    <span
                        className="font-mono text-[0.55rem] uppercase tracking-[0.14em] px-2.5 py-1"
                        style={{ color: accent, borderColor: `${accent}50`, backgroundColor: `${accent}14`, border: "1px solid", textShadow: `0 0 8px ${accent}80`, borderRadius: "var(--radius-sm)" }}
                    >
                        {item.type}
                    </span>
                </div>

                {/* Hover overlay with specs */}
                <div
                    className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-350"
                    style={{ background: "var(--overlay)", backdropFilter: "blur(16px)" }}
                >
                    <div className="flex items-center gap-3 mb-3">
                        <span style={{ color: accent, filter: `drop-shadow(0 0 8px ${accent})` }}>
                            {GEAR_ICONS[item.icon]}
                        </span>
                        <div>
                            <div className="font-syne text-sm font-extrabold text-[var(--text)] leading-tight">{item.model}</div>
                            <div className="font-mono text-[0.58rem] text-[var(--muted)] mt-0.5">{item.usage}</div>
                        </div>
                    </div>
                    {item.specs && (
                        <ul className="space-y-1 border-t pt-3" style={{ borderColor: "var(--glass-border-light)" }}>
                            {item.specs.slice(0, 4).map((spec) => (
                                <li key={spec} className="flex items-start gap-2">
                                    <span className="font-mono text-[0.5rem] mt-[2px] flex-shrink-0" style={{ color: accent }}>◆</span>
                                    <span className="font-mono text-[0.58rem] text-[var(--glass-text-dim)] leading-tight">{spec}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 flex items-center justify-between" style={{ borderTop: "1px solid var(--glass-border)" }}>
                <div>
                    <div className="font-syne text-sm font-extrabold text-[var(--text)]">{item.model}</div>
                    <div className="font-mono text-[0.56rem] text-[var(--muted)] mt-0.5 truncate max-w-[180px]">{item.usage}</div>
                </div>
                <span style={{ color: accent, filter: `drop-shadow(0 0 6px ${accent}90)` }}>
                    {GEAR_ICONS[item.icon]}
                </span>
            </div>

            {/* Bottom accent line */}
            <div
                className="h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
            />
        </div>
    );
}
