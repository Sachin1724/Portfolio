"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Project } from "@/types";

type Tab = "media" | "dev";

// ─── Thumbnail cache (session-level, no re-fetching)
const thumbCache = new Map<string, string | null>();

// ─── Auto-fetch thumbnail for a given URL
async function fetchThumbnail(url: string): Promise<string | null> {
    if (!url) return null;
    if (thumbCache.has(url)) return thumbCache.get(url)!;
    try {
        const res = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
        const data = await res.json();
        const thumb = data.thumbnail ?? null;
        thumbCache.set(url, thumb);
        return thumb;
    } catch {
        thumbCache.set(url, null);
        return null;
    }
}

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

function PlayIcon() {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <circle cx="12" cy="12" r="11" fill="rgba(0,0,0,0.55)" />
            <path d="M9.5 7.5l8 4.5-8 4.5V7.5z" fill="white" />
        </svg>
    );
}

// ─── Single card — self-contained thumbnail resolution
function MediaCard({ project, index }: { project: Project; index: number }) {
    const link = project.live_url ?? project.link ?? "#";
    const tags = (project.tags ?? []).slice(0, 2);

    // Resolved thumbnail: manual image → auto-fetched from link
    const [thumb, setThumb] = useState<string | null>(project.image ?? null);
    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        if (project.image) {
            setThumb(project.image);
            return;
        }
        if (!link || link === "#") return;
        let cancelled = false;
        fetchThumbnail(link).then((t) => {
            if (!cancelled) setThumb(t);
        });
        return () => { cancelled = true; };
    }, [project.image, link]);

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block group relative overflow-hidden cursor-pointer"
            style={{
                background: "var(--surface)",
                border: "1px solid var(--glass-border)",
                borderRadius: "var(--radius-card)",
                backdropFilter: "blur(12px)",
                transition: "border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)",
                animationDelay: `${index * 60}ms`,
                breakInside: "avoid",
                marginBottom: "1.25rem",
            }}
            onMouseEnter={(e) => {
                setHovering(true);
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.45)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.55), 0 0 24px rgba(249,115,22,0.1)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px) scale(1.015)";
            }}
            onMouseLeave={(e) => {
                setHovering(false);
                (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
                (e.currentTarget as HTMLElement).style.transform = "";
            }}
        >
            {/* Thumbnail area — natural height (Pinterest style) */}
            <div className="relative overflow-hidden bg-[#0a0a0f]" style={{ borderRadius: "var(--radius-card) var(--radius-card) 0 0" }}>
                {thumb ? (
                    <img
                        src={thumb}
                        alt={project.title}
                        className="w-full block object-cover transition-transform duration-700"
                        style={{ transform: hovering ? "scale(1.05)" : "scale(1)" }}
                        loading="lazy"
                        onError={() => setThumb(null)}
                    />
                ) : (
                    // Skeleton while loading
                    <div
                        className="w-full"
                        style={{
                            aspectRatio: "16/9",
                            background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <div
                            style={{
                                width: 40,
                                height: 40,
                                border: "2px solid rgba(249,115,22,0.3)",
                                borderRadius: "50%",
                                borderTopColor: "var(--accent)",
                                animation: "spin 1s linear infinite",
                            }}
                        />
                    </div>
                )}

                {/* Gradient overlay */}
                <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                        background: "linear-gradient(to top, rgba(10,10,15,0.8) 0%, rgba(10,10,15,0.1) 50%, transparent 100%)",
                        opacity: hovering ? 1 : 0.3,
                    }}
                />

                {/* Play button on hover */}
                <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300"
                    style={{ opacity: hovering ? 1 : 0, transform: hovering ? "scale(1)" : "scale(0.8)" }}
                >
                    <PlayIcon />
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                    <div className="absolute top-3 left-3 flex gap-1.5">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="font-mono text-[0.52rem] uppercase tracking-[0.12em] px-2 py-0.5"
                                style={{
                                    background: "rgba(10,10,15,0.75)",
                                    border: "1px solid rgba(249,115,22,0.4)",
                                    color: "var(--accent)",
                                    backdropFilter: "blur(8px)",
                                    borderRadius: "var(--radius-sm)",
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Info strip */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--glass-border)]">
                <div className="truncate pr-2">
                    <div
                        className="font-syne font-extrabold text-[var(--text)] transition-colors duration-200 group-hover:text-[var(--accent)] truncate"
                        style={{ fontSize: "0.88rem" }}
                    >
                        {project.title}
                    </div>
                    <div className="font-mono text-[0.57rem] text-[var(--muted)] uppercase tracking-[0.1em] mt-0.5">
                        Media / Film
                    </div>
                </div>
                <div
                    className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] shrink-0 transition-all duration-200 group-hover:gap-2.5"
                    style={{ color: "var(--accent)", textShadow: "0 0 10px rgba(249,115,22,0.4)" }}
                >
                    ↗ Watch
                </div>
            </div>
        </a>
    );
}

// ─── Dev project card (fixed 16/9 ratio, unchanged)
function DevCard({ project, index }: { project: Project; index: number }) {
    const link = project.live_url ?? project.github_url ?? project.link ?? "#";
    const tags = (project.tech_stack ?? project.tags ?? []).slice(0, 3);
    const [hovering, setHovering] = useState(false);

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block group relative overflow-hidden cursor-pointer fade-in"
            style={{
                background: "linear-gradient(180deg, var(--glass-bg), var(--glass-bg-subtle))",
                border: "1px solid var(--glass-border)",
                borderRadius: "var(--radius-card)",
                backdropFilter: "blur(12px)",
                transition: "border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)",
                animationDelay: `${index * 80}ms`,
            }}
            onMouseEnter={(e) => {
                setHovering(true);
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.35)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 64px rgba(0,0,0,0.5), 0 0 30px rgba(249,115,22,0.08)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
            }}
            onMouseLeave={(e) => {
                setHovering(false);
                (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
                (e.currentTarget as HTMLElement).style.transform = "";
            }}
        >
            <div className="relative overflow-hidden bg-[#0a0a0f]" style={{ aspectRatio: "16/9", borderRadius: "var(--radius-card) var(--radius-card) 0 0" }}>
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700"
                        style={{ transform: hovering ? "scale(1.06)" : "scale(1)" }}
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#0f0f1a,#1a1a2e)" }}>
                        <span className="text-4xl opacity-20">{"</>"}</span>
                    </div>
                )}
                <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{ background: "linear-gradient(to top, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.2) 40%, transparent 100%)", opacity: hovering ? 1 : 0.4 }}
                />
                <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                    {tags.map((tag) => (
                        <span key={tag} className="font-mono text-[0.55rem] uppercase tracking-[0.12em] px-2.5 py-1"
                            style={{ background: "rgba(10,10,15,0.7)", border: "1px solid rgba(249,115,22,0.35)", color: "var(--accent)", backdropFilter: "blur(8px)", borderRadius: "var(--radius-sm)" }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-between px-5 py-4 border-t border-[var(--glass-border)]">
                <div>
                    <div className="font-syne font-extrabold text-[var(--text)] transition-colors duration-200 group-hover:text-[var(--accent)]" style={{ fontSize: "0.95rem" }}>
                        {project.title}
                    </div>
                    <div className="font-mono text-[0.6rem] text-[var(--muted)] uppercase tracking-[0.1em] mt-0.5">
                        Dev Project
                    </div>
                </div>
                <div className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.1em] transition-all duration-200 group-hover:gap-3" style={{ color: "var(--accent)" }}>
                    {project.github_url && (
                        <span className="text-[var(--muted)] hover:text-[var(--odia)] transition-colors"><GithubIcon /></span>
                    )}
                    <span style={{ textShadow: "0 0 10px rgba(249,115,22,0.5)" }}>↗ View</span>
                </div>
            </div>
        </a>
    );
}

// ─── Pinterest masonry columns — pure CSS columns approach
function MasonryGrid({ projects }: { projects: Project[] }) {
    if (projects.length === 0) {
        return (
            <div className="text-center py-20 text-[var(--muted)] font-mono text-sm">
                No projects yet — add some in the Admin Panel!
            </div>
        );
    }

    return (
        <div
            style={{
                columns: "1",
                columnGap: "1.25rem",
            }}
            className="masonry-grid"
        >
            <style>{`
                .masonry-grid { columns: 1; }
                @media (min-width: 640px) { .masonry-grid { columns: 2; } }
                @media (min-width: 1024px) { .masonry-grid { columns: 3; } }
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            {projects.map((project, i) => (
                <div
                    key={project.id}
                    style={{
                        breakInside: "avoid",
                        opacity: 0,
                        animation: `fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 70}ms forwards`,
                    }}
                >
                    <MediaCard project={project} index={i} />
                </div>
            ))}
        </div>
    );
}

// ─── Main Work section
export default function Work() {
    const [activeTab, setActiveTab] = useState<Tab>("media");
    const [mediaProjects, setMediaProjects] = useState<Project[]>([]);
    const [devProjects, setDevProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch live data from API (not build-time constants — so admin changes show instantly)
    useEffect(() => {
        fetch("/api/projects")
            .then((r) => r.json())
            .then((data) => {
                setMediaProjects(data.MEDIA_PROJECTS || []);
                setDevProjects(data.DEV_PROJECTS || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const projects = activeTab === "media" ? mediaProjects : devProjects;

    return (
        <section
            id="work"
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
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 fade-in">
                <h2
                    className="font-syne font-extrabold tracking-tight leading-tight"
                    style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                >
                    Selected Work
                </h2>

                {/* Tab switcher */}
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

            {/* Content */}
            <div key={activeTab} style={{ animation: "fadeUp 0.4s cubic-bezier(0.22,1,0.36,1) forwards" }}>
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="rounded-[var(--radius-card)] overflow-hidden" style={{ background: "var(--surface)", border: "1px solid var(--glass-border)" }}>
                                <div style={{ aspectRatio: "16/9", background: "linear-gradient(135deg,#0f0f1a,#1a1a2e)", animation: "pulse 1.5s ease infinite" }} />
                                <div className="p-4 space-y-2">
                                    <div style={{ height: 14, width: "60%", borderRadius: 4, background: "#1a1a2e" }} />
                                    <div style={{ height: 10, width: "40%", borderRadius: 4, background: "#0f0f1a" }} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : activeTab === "media" ? (
                    <MasonryGrid projects={projects} />
                ) : (
                    // Dev tab — regular grid
                    projects.length === 0 ? (
                        <div className="text-center py-20 text-[var(--muted)] font-mono text-sm">
                            More projects coming soon...
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project, i) => (
                                <DevCard key={project.id} project={project} index={i} />
                            ))}
                        </div>
                    )
                )}
            </div>
        </section>
    );
}
