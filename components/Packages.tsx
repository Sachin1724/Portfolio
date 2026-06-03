"use client";

import { useEffect, useRef, useCallback } from "react";
import { PACKAGES } from "@/lib/constants";

const RECIPIENT_EMAIL = "sachidanandamallick@gmail.com";

function buildMailtoLink(packageName: string, emailSubject: string): string {
    const body = `Hi Sachidananda,

I came across your services and I am interested in learning more about the ${packageName}.

My Details:
Name:
Company/Brand:
Industry:
Project Requirement:

I would like to discuss:
- Project goals
- Timeline
- Deliverables
- Pricing and collaboration opportunities

Looking forward to hearing from you.

Best Regards,
[Client Name]`;

    return `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(body)}`;
}

export default function Packages() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e, i) => {
                    if (e.isIntersecting) {
                        setTimeout(() => e.target.classList.add("visible"), i * 100);
                    }
                });
            },
            { threshold: 0.08 }
        );
        const els = sectionRef.current?.querySelectorAll(".fade-in") ?? [];
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleConnect = useCallback((packageName: string, emailSubject: string) => {
        window.location.href = buildMailtoLink(packageName, emailSubject);
    }, []);

    return (
        <section
            id="packages"
            ref={sectionRef}
            className="relative z-[1]"
            style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
        >
            <div
                style={{
                    padding: "var(--section-py) var(--container-px)",
                    maxWidth: "var(--container-max)",
                    margin: "0 auto",
                }}
            >
                {/* Section label */}
                <div className="section-label fade-in">02 — Services</div>

                {/* Header */}
                <div className="mb-16 fade-in">
                    <h2
                        className="font-syne font-extrabold tracking-tight leading-tight"
                        style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
                    >
                        Pick a Package.
                        <br />
                        <span style={{ color: "var(--accent)" }}>Let&apos;s Connect.</span>
                    </h2>
                    <p
                        className="font-mono text-[0.72rem] text-[var(--muted)] tracking-[0.05em] mt-4"
                        style={{ maxWidth: "460px" }}
                    >
                        Choose a service that fits your vision. Click Connect, and we&apos;ll get
                        moving within 24 hours — no lengthy proposals, just results.
                    </p>
                </div>

                {/* Package cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    {PACKAGES.map((pkg, i) => (
                        <div
                            key={pkg.id}
                            className={`pkg-card fade-in flex flex-col${pkg.featured ? " pkg-card--featured" : ""}`}
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            {/* Gradient top edge */}
                            <div
                                className="absolute top-0 left-0 right-0 h-[2px] z-10"
                                style={{
                                    background: pkg.featured
                                        ? "linear-gradient(90deg, transparent, var(--accent), transparent)"
                                        : "linear-gradient(90deg, transparent, rgba(249,115,22,0.25), transparent)",
                                    borderRadius: "14px 14px 0 0",
                                }}
                            />

                            <div className="p-8 sm:p-9 flex flex-col flex-1 relative z-[1]">
                                {/* Badge */}
                                <div
                                    className="inline-block self-start font-mono text-[0.6rem] tracking-[0.15em] uppercase px-3.5 py-1.5 mb-7"
                                    style={{
                                        color: "var(--accent)",
                                        background: "rgba(249,115,22,0.08)",
                                        border: "1px solid rgba(249,115,22,0.2)",
                                        borderRadius: "6px",
                                    }}
                                >
                                    {pkg.badge}
                                </div>

                                {/* Name */}
                                <div
                                    className="font-syne font-extrabold tracking-tight mb-5"
                                    style={{ fontSize: "1.5rem", lineHeight: 1.2 }}
                                >
                                    {pkg.name}
                                </div>

                                {/* Price */}
                                <div className="mb-1.5 flex flex-wrap items-baseline gap-2">
                                    <span
                                        className="font-syne font-extrabold leading-none whitespace-nowrap"
                                        style={{
                                            fontSize: "clamp(1.8rem, 8vw, 2.4rem)",
                                            color: "var(--accent)",
                                            textShadow: "0 0 24px rgba(249,115,22,0.25)",
                                        }}
                                    >
                                        {pkg.price}
                                    </span>
                                    <span className="font-mono text-sm text-[var(--muted)] whitespace-nowrap">
                                        {pkg.pricePer}
                                    </span>
                                </div>
                                {pkg.priceNote && (
                                    <div className="font-mono text-[0.58rem] text-[var(--muted)] mb-4 italic">
                                        {pkg.priceNote}
                                    </div>
                                )}

                                {/* Description */}
                                <p className="text-sm text-[var(--muted)] leading-relaxed mb-7">
                                    {pkg.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-0 mb-9 flex-1">
                                    {pkg.features.map((feature, fi) => (
                                        <li
                                            key={feature}
                                            className="font-mono text-[0.7rem] text-[var(--muted)] py-3 flex items-center gap-3"
                                            style={{
                                                borderBottom:
                                                    fi < pkg.features.length - 1
                                                        ? "1px solid var(--glass-bg)"
                                                        : "none",
                                            }}
                                        >
                                            <span
                                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                                style={{
                                                    background: "var(--accent)",
                                                    boxShadow: "0 0 8px rgba(249,115,22,0.4)",
                                                }}
                                            />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <button
                                    type="button"
                                    className={`pkg-btn${pkg.featured ? " pkg-btn--featured" : ""}`}
                                    onClick={() => handleConnect(pkg.name, pkg.emailSubject)}
                                    aria-label={`Connect about ${pkg.name}`}
                                >
                                    {pkg.ctaText}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
