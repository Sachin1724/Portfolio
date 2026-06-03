"use client";

import { useState, useRef, useEffect } from "react";
import { Star } from "lucide-react";

const TESTIMONIALS = [
    {
        name: "Rahul Patel",
        role: "Startup Founder",
        text: "Sachin delivered a landing page that actually converts. Clean design, fast delivery, zero drama. Exactly what a startup needs.",
        rating: 5,
    },
    {
        name: "Priya Mohanty",
        role: "YouTube Creator",
        text: "The reel editing quality is insane for the price. My engagement went up 3x after Sachin started editing my content. Highly recommend.",
        rating: 5,
    },
    {
        name: "Ankit Sharma",
        role: "Brand Manager",
        text: "We needed a complete brand identity — logo, colors, typography, social templates. Sachin nailed it in under 2 weeks. Premium quality work.",
        rating: 5,
    },
    {
        name: "Subhashree Das",
        role: "Odia Educator",
        text: "Finally someone creating tech content in Odia! Sachin's tutorials helped my students understand React concepts they were struggling with in English.",
        rating: 5,
    },
    {
        name: "Vikram Nayak",
        role: "E-commerce Owner",
        text: "Built our entire product showcase site. Mobile-first, fast loading, beautiful animations. Customers love it. Will work with Sachin again.",
        rating: 5,
    },
];

export default function Testimonials() {
    const [active, setActive] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) e.target.classList.add("visible");
                });
            },
            { threshold: 0.1 }
        );
        const els = sectionRef.current?.querySelectorAll(".fade-in") ?? [];
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // Auto-advance
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setActive((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 5000);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, []);

    const goTo = (idx: number) => {
        setActive(idx);
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setActive((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 5000);
    };

    const current = TESTIMONIALS[active];

    return (
        <section
            id="testimonials"
            ref={sectionRef}
            className="relative z-[1]"
            style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
        >
            <div
                style={{
                    padding: "var(--section-py) var(--container-px)",
                    maxWidth: "800px",
                    margin: "0 auto",
                }}
            >
                {/* Section label */}
                <div className="section-label fade-in">10 — Testimonials</div>

                <h2
                    className="font-syne font-extrabold tracking-tight leading-tight text-center mb-14 fade-in"
                    style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                >
                    What People
                    <br />
                    <span className="gradient-text-accent">Say</span>
                </h2>

                {/* Active testimonial — glass card */}
                <div
                    key={active}
                    className="relative overflow-hidden text-center px-8 py-10 md:px-12 md:py-14 fade-in"
                    style={{
                        background: "linear-gradient(180deg, var(--glass-bg), var(--glass-bg-subtle))",
                        border: "1px solid rgba(249,115,22,0.15)",
                        borderRadius: "var(--radius-card)",
                        backdropFilter: "blur(16px)",
                        animation: "fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) forwards",
                    }}
                >
                    {/* Quote mark */}
                    <div
                        className="font-syne text-6xl font-extrabold leading-none mb-4 select-none"
                        style={{ color: "rgba(249,115,22,0.15)" }}
                    >
                        &ldquo;
                    </div>

                    <p className="text-lg md:text-xl text-[var(--text)] leading-relaxed font-syne font-medium mb-8" style={{ maxWidth: "560px", margin: "0 auto" }}>
                        {current.text}
                    </p>

                    {/* Stars */}
                    <div className="flex justify-center gap-1 mb-5">
                        {[...Array(current.rating)].map((_, i) => (
                            <Star key={i} size={14} className="text-[var(--accent)] fill-[var(--accent)]" />
                        ))}
                    </div>

                    {/* Author */}
                    <div>
                        <div className="font-syne text-sm font-bold text-[var(--text)]">{current.name}</div>
                        <div className="font-mono text-[0.6rem] text-[var(--muted)] tracking-[0.12em] uppercase mt-1">
                            {current.role}
                        </div>
                    </div>
                </div>

                {/* Dots navigation */}
                <div className="flex justify-center gap-2 mt-8 fade-in">
                    {TESTIMONIALS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className="transition-all duration-300"
                            style={{
                                width: active === i ? "24px" : "8px",
                                height: "8px",
                                borderRadius: "999px",
                                background: active === i ? "var(--accent)" : "var(--glass-bg-hover)",
                                border: "none",
                                cursor: "pointer",
                                boxShadow: active === i ? "0 0 8px rgba(249,115,22,0.5)" : "none",
                            }}
                            aria-label={`Go to testimonial ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
