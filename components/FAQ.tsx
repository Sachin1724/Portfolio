"use client";

import { useState, useRef, useEffect } from "react";

const FAQ_ITEMS = [
    {
        q: "What services do you offer?",
        a: "I offer brand identity design, UI/UX design, web development (React/Next.js), video editing (reels, YouTube, cinematic), motion graphics, and Odia-language content creation.",
    },
    {
        q: "How do I hire you for a project?",
        a: "Just DM me on Instagram @iamsachindada with a keyword like REELS, VIDEO, BRAND, or WEBSITE. Tell me what you need, your budget, and timeline — I'll get back within 24 hours.",
    },
    {
        q: "What are your rates?",
        a: "Rates depend on scope. Reel editing starts at ₹1,500/reel, brand packages from ₹15,000, and websites from ₹25,000. Check the Packages section for detailed pricing.",
    },
    {
        q: "Do you work with international clients?",
        a: "Yes! I work with clients globally. Communication happens over Instagram DMs or email. Payments can be handled via PayPal or UPI for Indian clients.",
    },
    {
        q: "What's your turnaround time?",
        a: "Reels: 2-3 days. Brand packages: 1-2 weeks. Websites: 2-4 weeks depending on complexity. Rush delivery is available at an additional cost.",
    },
    {
        q: "Why do you create content in Odia?",
        a: "Because language shouldn't be a barrier to learning tech. Most coding content is in Hindi or English — I create content in Odia so students from Odisha can learn in their mother tongue.",
    },
];

export default function FAQ() {
    const [openIdx, setOpenIdx] = useState<number | null>(null);
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
            id="faq"
            ref={sectionRef}
            className="relative z-[1]"
            style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}
        >
            <div
                style={{
                    padding: "var(--section-py) var(--container-px)",
                    maxWidth: "800px",
                    margin: "0 auto",
                }}
            >
                {/* Section label */}
                <div className="section-label fade-in">09 — FAQ</div>

                <h2
                    className="font-syne font-extrabold tracking-tight leading-tight text-center mb-4 fade-in"
                    style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                >
                    Frequently Asked
                    <br />
                    <span className="gradient-text-accent">Questions</span>
                </h2>
                <p className="text-center text-[var(--muted)] text-sm mb-14 fade-in">
                    Everything you need to know before we start working together.
                </p>

                {/* Accordion */}
                <div className="space-y-3">
                    {FAQ_ITEMS.map((item, i) => {
                        const isOpen = openIdx === i;
                        return (
                            <div
                                key={i}
                                className="fade-in overflow-hidden transition-all duration-400"
                                style={{
                                    background: isOpen
                                        ? "linear-gradient(180deg, rgba(249,115,22,0.04), rgba(249,115,22,0.01))"
                                        : "linear-gradient(180deg, var(--glass-border-subtle), var(--glass-bg-subtle))",
                                    border: isOpen
                                        ? "1px solid rgba(249,115,22,0.25)"
                                        : "1px solid var(--glass-border)",
                                    borderRadius: "var(--radius-card)",
                                    backdropFilter: "blur(12px)",
                                    animationDelay: `${i * 60}ms`,
                                }}
                            >
                                <button
                                    onClick={() => setOpenIdx(isOpen ? null : i)}
                                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200"
                                    style={{ cursor: "pointer", background: "transparent", border: "none" }}
                                >
                                    <span className="font-syne text-[0.95rem] font-bold text-[var(--text)]">
                                        {item.q}
                                    </span>
                                    <span
                                        className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300"
                                        style={{
                                            background: isOpen ? "rgba(249,115,22,0.15)" : "var(--glass-border-dim)",
                                            border: isOpen ? "1px solid rgba(249,115,22,0.4)" : "1px solid var(--glass-bg-hover)",
                                            color: isOpen ? "var(--accent)" : "var(--muted)",
                                            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        +
                                    </span>
                                </button>

                                {/* Answer */}
                                <div
                                    className="overflow-hidden transition-all duration-400"
                                    style={{
                                        maxHeight: isOpen ? "300px" : "0",
                                        opacity: isOpen ? 1 : 0,
                                    }}
                                >
                                    <div className="px-6 pb-5 pt-0">
                                        <p className="text-sm text-[var(--muted)] leading-relaxed">
                                            {item.a}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
