"use client";

import { useEffect } from "react";
import { CONTENT_CARDS, IG_STATS } from "@/lib/constants";
import { Laptop, Video, Sparkles } from "lucide-react";

const getIcon = (title: string) => {
    if (title.includes("Dev")) return <Laptop className="w-5 h-5 text-[var(--accent)]" />;
    if (title.includes("Behind")) return <Video className="w-5 h-5 text-[var(--accent)]" />;
    return <Sparkles className="w-5 h-5 text-[var(--accent)]" />;
};

export default function ContentSection() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e, i) => {
                    if (e.isIntersecting) {
                        setTimeout(() => e.target.classList.add("visible"), i * 80);
                    }
                });
            },
            { threshold: 0.1 }
        );
        const els = document.querySelectorAll("#content .fade-in");
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="content" className="relative z-[1] px-6 md:px-12 py-24 bg-[var(--bg)]">
            <div className="section-label">03 — Content</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center fade-in">
                {/* Left: Content Type Cards */}
                <div>
                    <h2 className="font-syne text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight leading-tight mb-2">
                        Teaching Code
                        <br />
                        in <span className="text-[var(--odia)]">Odia.</span>
                    </h2>
                    <p className="text-[0.95rem] text-[var(--muted)] leading-relaxed mt-4 max-w-lg">
                        Most coding content in India is in Hindi or English. I create dev
                        content in Odia so that students from Odisha don&apos;t have to feel left
                        behind.
                    </p>

                    <div className="mt-8 space-y-4">
                        {CONTENT_CARDS.map((card) => (
                            <div
                                key={card.title}
                                className="flex items-center gap-4 p-4 transition-all duration-300"
                                style={{
                                    background: "linear-gradient(180deg, var(--glass-bg), var(--glass-bg-subtle))",
                                    border: "1px solid var(--glass-border)",
                                    borderRadius: "var(--radius-card)",
                                    backdropFilter: "blur(8px)",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.3)";
                                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                                    (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 36px rgba(0,0,0,0.4), 0 0 16px rgba(249,115,22,0.06)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
                                    (e.currentTarget as HTMLElement).style.transform = "";
                                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                                }}
                            >
                                <span className="flex-shrink-0">{getIcon(card.title)}</span>
                                <div>
                                    <div className="font-syne text-sm font-bold mb-0.5">
                                        {card.title}
                                    </div>
                                    <div className="font-mono text-[0.65rem] text-[var(--muted)] tracking-[0.05em]">
                                        {card.subtitle}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Instagram Box — glass card */}
                <div
                    className="p-8 fade-in"
                    style={{
                        border: "1px solid rgba(249,115,22,0.25)",
                        background: "linear-gradient(180deg, rgba(249,115,22,0.04), rgba(249,115,22,0.01))",
                        borderRadius: "var(--radius-card)",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    {/* Handle */}
                    <div className="font-mono text-lg text-[var(--accent)] mb-4">
                        @iamsachindada
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {IG_STATS.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-2xl font-extrabold text-[var(--text)]">
                                    {stat.value}
                                </div>
                                <div className="font-mono text-[0.6rem] text-[var(--muted)] uppercase tracking-[0.1em]">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[var(--muted)] leading-relaxed">
                        Odia Tech Creator making content for{" "}
                        <span className="text-[var(--odia)] font-semibold">ଓଡ଼ିଆ</span>{" "}
                        developers and students. Building futuristic ideas and digital
                        stories — one reel at a time.
                        <br />
                        <br />
                        Open to{" "}
                        <strong className="text-[var(--text)]">brand collaborations</strong>{" "}
                        and{" "}
                        <strong className="text-[var(--text)]">sponsored content</strong>{" "}
                        from tech brands targeting Odia-speaking students.
                    </p>

                    <a
                        href="https://instagram.com/iamsachindada"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-6 px-6 py-3 font-mono text-xs font-bold tracking-[0.1em] uppercase transition-all duration-300"
                        style={{
                            background: "var(--accent)",
                            color: "#000",
                            borderRadius: "var(--radius-pill)",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "var(--accent2)";
                            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(249,115,22,0.3)";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "var(--accent)";
                            (e.currentTarget as HTMLElement).style.transform = "";
                            (e.currentTarget as HTMLElement).style.boxShadow = "";
                        }}
                    >
                        Follow on Instagram →
                    </a>
                </div>
            </div>
        </section>
    );
}
