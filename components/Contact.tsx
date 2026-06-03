"use client";

import { useEffect, useRef, FormEvent } from "react";
import { MessageSquare, ClipboardList, CreditCard, CheckCircle } from "lucide-react";
import { PROCESS_STEPS } from "@/lib/constants";

const STEP_ICONS = [
    <MessageSquare key="msg" className="w-5 h-5 text-[var(--accent)]" />,
    <ClipboardList key="clip" className="w-5 h-5 text-[var(--accent)]" />,
    <CreditCard key="card" className="w-5 h-5 text-[var(--accent)]" />,
    <CheckCircle key="check" className="w-5 h-5 text-[var(--accent)]" />
];

export default function Contact() {
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
            { threshold: 0.06 }
        );
        const els = sectionRef.current?.querySelectorAll(".fade-in") ?? [];
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleMailSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const subject = (form.elements.namedItem("subject") as HTMLInputElement).value;
        const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
        const mailtoLink = `mailto:sachinmallickff.19@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        window.location.href = mailtoLink;
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative z-[1] overflow-hidden"
            style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
        >
            {/* Ambient glow */}
            <div
                className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none"
                style={{ background: "radial-gradient(circle at bottom right, rgba(249,115,22,0.05), transparent 60%)" }}
            />

            <div
                style={{
                    padding: "var(--section-py) var(--container-px)",
                    maxWidth: "var(--container-max)",
                    margin: "0 auto",
                }}
            >
                {/* Section label */}
                <div className="section-label fade-in">08 — Hire Me</div>

                {/* Two columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 mb-16">
                    {/* ── LEFT: DM Info ── */}
                    <div className="space-y-7 fade-in">
                        <h2
                            className="font-syne font-extrabold tracking-tight leading-tight"
                            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
                        >
                            Let&apos;s Work
                            <br />
                            <span style={{ color: "var(--accent)" }}>Together.</span>
                        </h2>

                        <p className="text-[1.05rem] text-[var(--muted)] leading-relaxed" style={{ maxWidth: "440px" }}>
                            I don&apos;t do cold calls or long email chains.{" "}
                            <strong className="text-[var(--text)]">Just DM me on Instagram</strong>{" "}
                            with a keyword below, tell me what you need, and we get started.
                        </p>

                        {/* DM keywords — glass card */}
                        <div
                            className="p-5"
                            style={{
                                border: "1px solid rgba(34,197,94,0.25)",
                                background: "rgba(34,197,94,0.03)",
                                borderRadius: "var(--radius-card)",
                                backdropFilter: "blur(8px)",
                            }}
                        >
                            <div className="font-mono text-[0.62rem] text-[var(--odia)] tracking-[0.18em] uppercase mb-4">
                                How to reach me
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                                {[
                                    { keyword: "REELS",   desc: "Reel editing package" },
                                    { keyword: "VIDEO",   desc: "Full-size video package" },
                                    { keyword: "BRAND",   desc: "Brand starter package" },
                                    { keyword: "WEBSITE", desc: "Landing page" },
                                    { keyword: "COLLAB",  desc: "Brand deals / sponsorship" },
                                ].map(({ keyword, desc }) => (
                                    <div key={keyword} className="flex items-center gap-3 py-1.5">
                                        <span
                                            className="font-mono text-[0.62rem] font-bold px-2 py-0.5 flex-shrink-0"
                                            style={{
                                                color: "var(--odia)",
                                                background: "rgba(34,197,94,0.1)",
                                                border: "1px solid rgba(34,197,94,0.25)",
                                                borderRadius: "var(--radius-sm)",
                                            }}
                                        >
                                            &quot;{keyword}&quot;
                                        </span>
                                        <span className="font-mono text-[0.65rem] text-[var(--muted)]">→ {desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social links — glass cards */}
                        <div className="space-y-3">
                            {[
                                { href: "https://instagram.com/iamsachindada", label: "Instagram — @iamsachindada", badge: "Primary", accent: "#e1306c" },
                                { href: "https://youtube.com/@sachindadaorginals", label: "YouTube — @sachindadaorginals", badge: "Content", accent: "#ff0000" },
                            ].map(({ href, label, badge, accent }) => (
                                <a
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 px-5 py-4 transition-all duration-300 group"
                                    style={{
                                        background: "linear-gradient(180deg, var(--glass-bg), var(--glass-bg-subtle))",
                                        border: "1px solid var(--glass-border)",
                                        borderRadius: "var(--radius-card)",
                                        backdropFilter: "blur(8px)",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = `${accent}50`;
                                        (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 36px rgba(0,0,0,0.4), 0 0 16px ${accent}15`;
                                        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
                                        (e.currentTarget as HTMLElement).style.boxShadow = "";
                                        (e.currentTarget as HTMLElement).style.transform = "";
                                    }}
                                >
                                    <div
                                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                        style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
                                    />
                                    <span className="font-mono text-sm text-[var(--text)] group-hover:text-[var(--text)] flex-1">{label}</span>
                                    <span className="font-mono text-[0.6rem] text-[var(--muted)] uppercase tracking-[0.1em]">{badge}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT: Glowing process timeline ── */}
                    <div className="fade-in">
                        <div className="font-mono text-[0.65rem] text-[var(--accent)] tracking-[0.18em] uppercase mb-8">
                            How it works
                        </div>

                        <div className="relative">
                            {/* Vertical glowing line */}
                            <div
                                className="absolute left-[19px] top-0 bottom-0 w-px"
                                style={{
                                    background: "linear-gradient(180deg, var(--accent), rgba(249,115,22,0.2), transparent)",
                                }}
                            />

                            <div className="space-y-0">
                                {PROCESS_STEPS.map((step, i) => (
                                    <div
                                        key={step.num}
                                        className="relative flex gap-6 pb-8 last:pb-0 group"
                                    >
                                        {/* Icon node — glass circle */}
                                        <div
                                            className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg transition-all duration-300 group-hover:scale-110"
                                            style={{
                                                background: "var(--glass-border-subtle)",
                                                border: "1px solid rgba(249,115,22,0.3)",
                                                boxShadow: "0 0 0 4px var(--surface), 0 0 12px rgba(249,115,22,0.1)",
                                                fontSize: "1.1rem",
                                                backdropFilter: "blur(8px)",
                                            }}
                                        >
                                            {STEP_ICONS[i]}
                                        </div>

                                        {/* Content */}
                                        <div className="pt-2">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-mono text-[0.6rem] text-[var(--accent)] tracking-[0.1em]">
                                                    {step.num}
                                                </span>
                                                <h3 className="font-syne text-[0.95rem] font-bold text-[var(--text)]">
                                                    {step.title}
                                                </h3>
                                            </div>
                                            <p className="text-sm text-[var(--muted)] leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Glass email form panel ── */}
                <div className="fade-in" style={{ maxWidth: "680px", margin: "0 auto" }}>
                    <div
                        className="relative overflow-hidden"
                        style={{
                            background: "linear-gradient(180deg, var(--glass-bg), var(--glass-bg-subtle))",
                            backdropFilter: "blur(16px)",
                            border: "1px solid var(--glass-border)",
                            borderRadius: "var(--radius-card)",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(249,115,22,0.05)",
                        }}
                    >
                        {/* Top glow line */}
                        <div
                            className="absolute top-0 left-0 right-0 h-px"
                            style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)", opacity: 0.6, borderRadius: "var(--radius-card) var(--radius-card) 0 0" }}
                        />

                        <div className="p-8 md:p-10">
                            <h3 className="font-syne text-2xl font-extrabold tracking-tight mb-1">
                                Direct Mail
                            </h3>
                            <p className="text-sm text-[var(--muted)] mb-8 leading-relaxed">
                                Prefer email? This form formats a direct email straight to my inbox.
                            </p>

                            <form onSubmit={handleMailSubmit} className="space-y-5">
                                <div>
                                    <label className="block font-mono text-[0.65rem] text-[var(--accent)] uppercase tracking-[0.12em] mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="What are we building?"
                                        required
                                        className="w-full px-4 py-3.5 text-sm outline-none transition-all duration-300 font-syne"
                                        style={{
                                            background: "var(--bg)",
                                            border: "1px solid var(--glass-border-light)",
                                            color: "var(--text)",
                                            borderRadius: "var(--radius-pill)",
                                        }}
                                        onFocus={(e) => {
                                            (e.target as HTMLElement).style.borderColor = "rgba(249,115,22,0.5)";
                                            (e.target as HTMLElement).style.boxShadow = "0 0 12px rgba(249,115,22,0.08)";
                                        }}
                                        onBlur={(e) => {
                                            (e.target as HTMLElement).style.borderColor = "var(--glass-border-light)";
                                            (e.target as HTMLElement).style.boxShadow = "";
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block font-mono text-[0.65rem] text-[var(--accent)] uppercase tracking-[0.12em] mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        placeholder="Describe your project, budget, and timeline..."
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3.5 text-sm outline-none transition-all duration-300 resize-y font-syne"
                                        style={{
                                            background: "var(--bg)",
                                            border: "1px solid var(--glass-border-light)",
                                            color: "var(--text)",
                                            borderRadius: "var(--radius-pill)",
                                        }}
                                        onFocus={(e) => {
                                            (e.target as HTMLElement).style.borderColor = "rgba(249,115,22,0.5)";
                                            (e.target as HTMLElement).style.boxShadow = "0 0 12px rgba(249,115,22,0.08)";
                                        }}
                                        onBlur={(e) => {
                                            (e.target as HTMLElement).style.borderColor = "var(--glass-border-light)";
                                            (e.target as HTMLElement).style.boxShadow = "";
                                        }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 font-mono text-sm font-bold tracking-[0.12em] uppercase transition-all duration-300"
                                    style={{
                                        background: "var(--accent)",
                                        color: "#000",
                                        border: "none",
                                        cursor: "pointer",
                                        borderRadius: "var(--radius-pill)",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.background = "var(--accent2)";
                                        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(249,115,22,0.35)";
                                        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.background = "var(--accent)";
                                        (e.currentTarget as HTMLElement).style.boxShadow = "";
                                        (e.currentTarget as HTMLElement).style.transform = "";
                                    }}
                                >
                                    Send Message →
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
