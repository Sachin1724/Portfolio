"use client";

import { useState, useRef, useEffect } from "react";
import { MEDIA_PROJECTS, DEV_PROJECTS } from "@/lib/constants";
import { Project } from "@/types";

type Tab = "media" | "dev";

function ArrowIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}
function GithubIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
    );
}

export default function Work() {
    const [activeTab, setActiveTab] = useState<Tab>("media");
    const sectionRef = useRef<HTMLElement>(null);

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
    }, [activeTab]);

    const projects = activeTab === "media" ? MEDIA_PROJECTS : DEV_PROJECTS;

    return (
        <section
            id="work"
            ref={sectionRef}
            style={{
                padding: "var(--section-py) var(--container-px)",
                maxWidth: "var(--container-max)",
                margin: "0 auto",
            }}
            className="relative z-[1]"
        >
            {/* Section label */}
            <div className="section-label fade-in">03 — Selected Work</div>

            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 fade-in">
                <h2
                    className="font-syne font-extrabold tracking-tight leading-tight"
                    style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                >
                    Selected Work
                </h2>

                {/* Pill tab switcher — rounded */}
                <div
                    className="flex items-center gap-1 p-1 self-start sm:self-auto"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-pill)" }}
                    role="tablist"
                >
                    {(["media", "dev"] as Tab[]).map((tab) => (
                        <button
                            key={tab}
                            role="tab"
                            aria-selected={activeTab === tab}
                            onClick={() => setActiveTab(tab)}
                            className="font-mono text-[0.62rem] uppercase tracking-[0.12em] px-5 py-2 transition-all duration-200"
                            style={{
                                background: activeTab === tab ? "var(--accent)" : "transparent",
                                color: activeTab === tab ? "#000" : "var(--muted)",
                                fontWeight: activeTab === tab ? 700 : 400,
                                borderRadius: "var(--radius-sm)",
                            }}
                        >
                            {tab === "media" ? "Media" : "</> Dev"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Simple Grid */}
            <div
                key={activeTab}
                style={{ animation: "fadeUp 0.4s cubic-bezier(0.22,1,0.36,1) forwards" }}
            >
                {projects.length === 0 ? (
                    <div className="text-center py-20 text-[var(--muted)] font-mono text-sm">
                        More projects coming soon...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, i) => (
                            <ProjectCard key={project.id} project={project} index={i} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

function ProjectCard({ project, index, featured = false }: { project: Project; index: number; featured?: boolean }) {
    const imgRef   = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hovering, setHovering] = useState(false);

    // Video preview on hover (if video_url exists)
    const videoUrl = (project as Project & { video_url?: string }).video_url;

    const handleMouseEnter = () => {
        setHovering(true);
    };
    const handleMouseLeave = () => {
        setHovering(false);
    };

    const link = (project.live_url ?? project.link);
    const tags  = (project.tags ?? project.tech_stack ?? []).slice(0, 3);

    return (
        <a
            href={link || "#"}
            target={link ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="group relative block overflow-hidden cursor-pointer fade-in"
            style={{
                background: "linear-gradient(180deg, var(--glass-bg), var(--glass-bg-subtle))",
                border: "1px solid var(--glass-border)",
                borderRadius: "var(--radius-card)",
                backdropFilter: "blur(12px)",
                transition: "border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                animationDelay: `${index * 80}ms`,
            }}
            onMouseEnter={(e) => {
                handleMouseEnter();
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.35)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 64px rgba(0,0,0,0.5), 0 0 30px rgba(249,115,22,0.08)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
            }}
            onMouseLeave={(e) => {
                handleMouseLeave();
                (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
                (e.currentTarget as HTMLElement).style.transform = "";
            }}
        >
            {/* Image / Video container */}
            <div
                ref={imgRef}
                className="relative overflow-hidden bg-[#0a0a0f]"
                style={{ aspectRatio: featured ? "21/9" : "16/9", borderRadius: "var(--radius-card) var(--radius-card) 0 0" }}
            >
                {/* Still image (fallback/thumbnail) */}
                {project.image && !videoUrl && (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-700"
                        style={{ transform: hovering ? "scale(1.06)" : "scale(1)" }}
                        loading="lazy"
                        onError={(e) => {
                            const wrap = (e.target as HTMLElement).parentElement!;
                            (e.target as HTMLElement).style.display = "none";
                            wrap.style.background = "#0f0f1a";
                        }}
                    />
                )}

                {/* Autoplaying Video */}
                {videoUrl && (
                    <video
                        ref={videoRef}
                        src={videoUrl}
                        muted
                        loop
                        autoPlay
                        playsInline
                        poster={project.image}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                        style={{ transform: hovering ? "scale(1.06)" : "scale(1)" }}
                    />
                )}

                {/* Gradient overlay */}
                <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                        background: "linear-gradient(to top, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.2) 40%, transparent 100%)",
                        opacity: hovering ? 1 : 0.4,
                    }}
                />

                {/* Tags on image — glass pills */}
                <div className="absolute top-4 left-4 flex gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="font-mono text-[0.55rem] uppercase tracking-[0.12em] px-2.5 py-1"
                            style={{
                                background: "rgba(10,10,15,0.7)",
                                border: "1px solid rgba(249,115,22,0.35)",
                                color: "var(--accent)",
                                backdropFilter: "blur(8px)",
                                borderRadius: "var(--radius-sm)",
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Play indicator for media */}
                {project.tags && (
                    <div
                        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                        style={{ opacity: hovering ? 0 : 0 }}
                    />
                )}
            </div>

            {/* Bottom info strip — minimal */}
            <div className="flex items-center justify-between px-5 py-4 border-t border-[var(--glass-border)]">
                <div>
                    <div
                        className="font-syne font-extrabold text-[var(--text)] transition-colors duration-200 group-hover:text-[var(--accent)]"
                        style={{ fontSize: featured ? "1.15rem" : "0.95rem" }}
                    >
                        {project.title}
                    </div>
                    <div className="font-mono text-[0.6rem] text-[var(--muted)] uppercase tracking-[0.1em] mt-0.5">
                        {project.category === "media" ? "Media / Film" : "Dev Project"}
                    </div>
                </div>
                <div
                    className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.1em] transition-all duration-200 group-hover:gap-3"
                    style={{ color: "var(--accent)" }}
                >
                    {project.github_url ? (
                        <span className="text-[var(--muted)] hover:text-[var(--odia)] transition-colors">
                            <GithubIcon />
                        </span>
                    ) : null}
                    <span style={{ textShadow: "0 0 10px rgba(249,115,22,0.5)" }}>
                        ↗ {project.tags ? "Watch" : "View"}
                    </span>
                </div>
            </div>
        </a>
    );
}
