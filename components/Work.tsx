"use client";

import { useState, useEffect, useRef } from "react";
import { Project } from "@/types";

type Tab = "media" | "dev";

// ─── Thumbnail cache (session-level)
const thumbCache = new Map<string, string | null>();

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

// ─── Icons
function GithubIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
    );
}

function ExternalIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// ─── Media Card — masonry-friendly, variable aspect ratio
function MediaCard({ project, index }: { project: Project; index: number }) {
    const link = project.live_url ?? project.link ?? "#";
    const tags = (project.tags ?? []).slice(0, 2);
    const aspectRatio = (project as any).aspect_ratio || "16/9";
    const [thumb, setThumb] = useState<string | null>(project.image ?? null);
    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        if (project.image && project.image.trim()) { setThumb(project.image.trim()); return; }
        if (!link || link === "#") return;
        let cancelled = false;
        fetchThumbnail(link).then((t) => { if (!cancelled) setThumb(t); });
        return () => { cancelled = true; };
    }, [project.image, link]);

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block group relative overflow-hidden work-card"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            style={{ animationDelay: `${index * 70}ms` }}
        >
            {/* Thumbnail */}
            <div className="relative overflow-hidden bg-[#08080f]" style={{ aspectRatio }}>
                {thumb ? (
                    <img
                        src={thumb}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                            transform: hovering ? "scale(1.07)" : "scale(1)",
                            transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
                        }}
                        loading="lazy"
                        onError={() => setThumb(null)}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#0c0c1a,#1a1020)" }}>
                        <div className="work-spinner" />
                    </div>
                )}
                {/* Gradient overlay */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "linear-gradient(to top, rgba(5,5,10,0.9) 0%, rgba(5,5,10,0.2) 50%, transparent 100%)",
                        opacity: hovering ? 1 : 0.35,
                        transition: "opacity 0.4s ease",
                    }}
                />
                {/* Tags */}
                {tags.length > 0 && (
                    <div className="absolute top-3 left-3 flex gap-1.5">
                        {tags.map((tag) => (
                            <span key={tag} className="work-tag">{tag}</span>
                        ))}
                    </div>
                )}
                {/* Watch CTA on hover */}
                <div
                    className="absolute inset-0 flex items-end justify-end p-4 pointer-events-none"
                    style={{ opacity: hovering ? 1 : 0, transition: "opacity 0.3s ease" }}
                >
                    <div className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-white">
                        <span style={{ color: "var(--accent)" }}>↗</span> Watch
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="work-card-info">
                <div className="min-w-0">
                    <div className="work-card-title group-hover:text-[var(--accent)] transition-colors duration-200">
                        {project.title}
                    </div>
                    <div className="work-card-sub">Film &amp; Motion</div>
                </div>
                <div className="work-card-action" style={{ opacity: hovering ? 1 : 0.4, transition: "opacity 0.3s ease" }}>
                    <ExternalIcon />
                </div>
            </div>
        </a>
    );
}

// ─── Dev Card
function DevCard({ project, index }: { project: Project; index: number }) {
    const link = project.live_url ?? project.github_url ?? project.link ?? "#";
    const tags = (project.tech_stack ?? project.tags ?? []).slice(0, 4);
    const [hovering, setHovering] = useState(false);

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block group relative overflow-hidden work-card"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            style={{ animationDelay: `${index * 90}ms` }}
        >
            <div className="relative overflow-hidden bg-[#08080f]" style={{ aspectRatio: "16/9" }}>
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        style={{
                            transform: hovering ? "scale(1.06)" : "scale(1)",
                            transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
                        }}
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#0c0c1a,#0f1a1a)" }}>
                        <span className="font-mono text-5xl font-bold" style={{ color: "rgba(249,115,22,0.12)", letterSpacing: "-0.05em" }}>{"</>"}</span>
                    </div>
                )}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(to top, rgba(5,5,10,0.92) 0%, rgba(5,5,10,0.15) 50%, transparent 100%)",
                        opacity: hovering ? 1 : 0.4,
                        transition: "opacity 0.4s ease",
                    }}
                />
                {/* Tech tags */}
                <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                    {tags.map((tag) => (
                        <span key={tag} className="work-tag">{tag}</span>
                    ))}
                </div>
            </div>

            <div className="work-card-info">
                <div className="min-w-0">
                    <div className="work-card-title group-hover:text-[var(--accent)] transition-colors duration-200">
                        {project.title}
                    </div>
                    <div className="work-card-sub">Digital Product</div>
                </div>
                <div className="flex items-center gap-2.5" style={{ opacity: hovering ? 1 : 0.4, transition: "opacity 0.3s ease" }}>
                    {project.github_url && (
                        <span className="text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                            <GithubIcon />
                        </span>
                    )}
                    <span style={{ color: "var(--accent)" }}><ExternalIcon /></span>
                </div>
            </div>
        </a>
    );
}

// ─── Masonry for media
function MasonryGrid({ projects }: { projects: Project[] }) {
    if (projects.length === 0) {
        return <EmptyState label="No media projects yet." />;
    }
    return (
        <div className="masonry-work">
            {projects.map((p, i) => (
                <div key={p.id} className="masonry-work-item work-reveal" style={{ animationDelay: `${i * 70}ms` }}>
                    <MediaCard project={p} index={i} />
                </div>
            ))}
        </div>
    );
}

// ─── Regular grid for dev
function DevGrid({ projects }: { projects: Project[] }) {
    if (projects.length === 0) {
        return <EmptyState label="Dev projects coming soon." />;
    }
    return (
        <div className="dev-grid-work">
            {projects.map((p, i) => (
                <div key={p.id} className="work-reveal" style={{ animationDelay: `${i * 90}ms` }}>
                    <DevCard project={p} index={i} />
                </div>
            ))}
        </div>
    );
}

function EmptyState({ label }: { label: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-28 gap-4">
            <div style={{ width: 48, height: 48, border: "1px solid var(--border)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "var(--muted)", fontSize: "1.2rem" }}>✦</span>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>{label}</p>
        </div>
    );
}

// ─── Skeleton loader
function SkeletonGrid() {
    return (
        <div className="dev-grid-work">
            {[1, 2, 3].map((n) => (
                <div key={n} className="work-card skeleton-card">
                    <div style={{ aspectRatio: "16/9", background: "linear-gradient(135deg,#0f0f1a,#1a1a2e)", animation: "skeletonPulse 1.6s ease infinite" }} />
                    <div className="work-card-info">
                        <div className="space-y-2">
                            <div style={{ height: 13, width: "55%", borderRadius: 4, background: "#1a1a2e", animation: "skeletonPulse 1.6s ease infinite 0.2s" }} />
                            <div style={{ height: 9, width: "35%", borderRadius: 4, background: "#111122", animation: "skeletonPulse 1.6s ease infinite 0.4s" }} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ─── THE MAIN SECTION
export default function Work() {
    const [activeTab, setActiveTab] = useState<Tab>("media");
    const [mediaProjects, setMediaProjects] = useState<Project[]>([]);
    const [devProjects, setDevProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [sliderStyle, setSliderStyle] = useState({ left: "0%", width: "50%" });
    const tabBarRef = useRef<HTMLDivElement>(null);
    const mediaBtnRef = useRef<HTMLButtonElement>(null);
    const devBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        fetch("/api/projects", { cache: "no-store" })
            .then((r) => r.json())
            .then((data) => {
                setMediaProjects(data.MEDIA_PROJECTS || []);
                setDevProjects(data.DEV_PROJECTS || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // Animate slider pill position
    useEffect(() => {
        const bar = tabBarRef.current;
        const btn = activeTab === "media" ? mediaBtnRef.current : devBtnRef.current;
        if (!bar || !btn) return;
        const barRect = bar.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();
        const left = ((btnRect.left - barRect.left) / barRect.width) * 100;
        const width = (btnRect.width / barRect.width) * 100;
        setSliderStyle({ left: `${left}%`, width: `${width}%` });
    }, [activeTab]);

    const projects = activeTab === "media" ? mediaProjects : devProjects;
    const projectCount = projects.length;

    return (
        <section id="work" className="work-section">
            <style>{`
                /* ─── Work Section Styles ─── */
                .work-section {
                    padding: var(--section-py) 0;
                    position: relative;
                    overflow: hidden;
                }

                /* Ambient glow behind section */
                .work-section::before {
                    content: '';
                    position: absolute;
                    top: 20%;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 800px;
                    height: 400px;
                    background: radial-gradient(ellipse, rgba(249,115,22,0.04) 0%, transparent 70%);
                    pointer-events: none;
                }

                .work-inner {
                    max-width: var(--container-max);
                    margin: 0 auto;
                    padding-inline: var(--container-px);
                }

                /* ─── Divider line above */
                .work-divider {
                    width: 100%;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, var(--border) 20%, var(--border) 80%, transparent);
                    margin-bottom: 80px;
                }

                /* ─── Section meta row */
                .work-meta {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 56px;
                }

                /* ─── Agency-style bold header */
                .work-heading-row {
                    margin-bottom: 0;
                }

                .work-eyebrow {
                    font-family: 'Space Mono', monospace;
                    font-size: 0.62rem;
                    color: var(--accent);
                    letter-spacing: 0.28em;
                    text-transform: uppercase;
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .work-eyebrow::before {
                    content: '';
                    display: block;
                    width: 28px;
                    height: 1px;
                    background: var(--accent);
                    opacity: 0.6;
                }

                .work-count {
                    font-family: 'Space Mono', monospace;
                    font-size: 0.58rem;
                    color: var(--muted);
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .work-count-dot {
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: var(--accent);
                    animation: glow-dot 2s ease infinite;
                }

                /* ─── THE SWITCHER — agency-grade */
                .work-switcher-wrap {
                    margin-bottom: 64px;
                    border-bottom: 1px solid var(--border);
                }

                .work-switcher {
                    display: flex;
                    align-items: stretch;
                    position: relative;
                    overflow-x: auto;
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .work-switcher::-webkit-scrollbar {
                    display: none;
                }

                /* Animated underline indicator */
                .work-switcher-indicator {
                    position: absolute;
                    bottom: -1px;
                    height: 2px;
                    background: var(--accent);
                    transition: left 0.45s cubic-bezier(0.22,1,0.36,1), width 0.45s cubic-bezier(0.22,1,0.36,1);
                    box-shadow: 0 0 16px rgba(249,115,22,0.7);
                    border-radius: 1px;
                }

                .work-tab-btn {
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 16px 0 12px;
                    margin-right: 32px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    text-align: left;
                    transition: all 0.3s ease;
                    white-space: nowrap;
                }
                @media (min-width: 768px) {
                    .work-tab-btn {
                        padding: 28px 0 24px;
                        margin-right: 56px;
                        gap: 14px;
                    }
                }
                .work-tab-btn:last-child {
                    margin-right: 0;
                }

                .work-tab-label {
                    font-family: 'Syne', sans-serif;
                    font-weight: 800;
                    font-size: clamp(1.4rem, 6vw, 2.8rem);
                    letter-spacing: -0.03em;
                    line-height: 1;
                    transition: color 0.35s ease, opacity 0.35s ease;
                }

                .work-tab-btn[aria-selected="true"] .work-tab-label {
                    color: var(--text);
                    opacity: 1;
                }
                .work-tab-btn[aria-selected="false"] .work-tab-label {
                    color: var(--muted);
                    opacity: 0.45;
                }
                .work-tab-btn[aria-selected="false"]:hover .work-tab-label {
                    opacity: 0.7;
                    color: var(--text);
                }

                /* small badge showing count */
                .work-tab-badge {
                    font-family: 'Space Mono', monospace;
                    font-size: 0.52rem;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    padding: 4px 9px;
                    border-radius: 999px;
                    border: 1px solid;
                    transition: all 0.35s ease;
                    align-self: flex-start;
                    margin-top: 4px;
                }
                .work-tab-btn[aria-selected="true"] .work-tab-badge {
                    background: rgba(249,115,22,0.12);
                    border-color: rgba(249,115,22,0.4);
                    color: var(--accent);
                }
                .work-tab-btn[aria-selected="false"] .work-tab-badge {
                    background: transparent;
                    border-color: var(--border);
                    color: var(--muted);
                }

                /* type descriptor under label */
                .work-tab-desc {
                    font-family: 'Space Mono', monospace;
                    font-size: 0.55rem;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    transition: color 0.35s ease, opacity 0.35s ease;
                    margin-top: 4px;
                }
                .work-tab-btn[aria-selected="true"] .work-tab-desc {
                    color: var(--accent);
                    opacity: 0.8;
                }
                .work-tab-btn[aria-selected="false"] .work-tab-desc {
                    color: var(--muted);
                    opacity: 0.3;
                }

                /* ─── Grid layouts */
                .masonry-work {
                    columns: 2;
                    column-gap: 1rem;
                    width: 100%;
                }
                @media (min-width: 768px)  { .masonry-work { column-gap: 1.25rem; } }
                @media (min-width: 900px)  { .masonry-work { columns: 3; } }
                @media (min-width: 1300px) { .masonry-work { columns: 4; } }

                .masonry-work-item {
                    break-inside: avoid;
                    margin-bottom: 1rem;
                }
                @media (min-width: 768px)  { .masonry-work-item { margin-bottom: 1.25rem; } }

                .dev-grid-work {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    width: 100%;
                }
                @media (min-width: 768px)  { .dev-grid-work { gap: 1.25rem; } }
                @media (min-width: 1024px) { .dev-grid-work { grid-template-columns: repeat(3, 1fr); } }

                /* ─── Card shared styles */
                .work-card {
                    border-radius: var(--radius-card);
                    overflow: hidden;
                    border: 1px solid var(--glass-border);
                    background: var(--surface);
                    transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1);
                }
                .work-card:hover {
                    border-color: rgba(249,115,22,0.3);
                    box-shadow: 0 24px 64px rgba(0,0,0,0.55), 0 0 28px rgba(249,115,22,0.07);
                    transform: translateY(-5px);
                }

                .work-card-info {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 10px 12px;
                    border-top: 1px solid var(--glass-border);
                    gap: 8px;
                }
                @media (min-width: 768px) {
                    .work-card-info {
                        padding: 14px 18px;
                        gap: 10px;
                    }
                }

                .work-card-title {
                    font-family: 'Syne', sans-serif;
                    font-weight: 800;
                    font-size: 0.75rem;
                    color: var(--text);
                    line-height: 1.2;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                @media (min-width: 768px) {
                    .work-card-title { font-size: 0.88rem; }
                }

                .work-card-sub {
                    font-family: 'Space Mono', monospace;
                    font-size: 0.52rem;
                    color: var(--muted);
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                    margin-top: 3px;
                }

                .work-card-action {
                    color: var(--accent);
                    flex-shrink: 0;
                }

                .work-tag {
                    font-family: 'Space Mono', monospace;
                    font-size: 0.45rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    padding: 2px 6px;
                    background: rgba(5,5,10,0.75);
                    border: 1px solid rgba(249,115,22,0.35);
                    color: var(--accent);
                    backdrop-filter: blur(8px);
                    border-radius: 4px;
                    white-space: nowrap;
                }
                @media (min-width: 768px) {
                    .work-tag {
                        font-size: 0.5rem;
                        padding: 3px 8px;
                        letter-spacing: 0.12em;
                    }
                }

                /* ─── Reveal animation */
                @keyframes workReveal {
                    from { opacity: 0; transform: translateY(22px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .work-reveal {
                    opacity: 0;
                    animation: workReveal 0.55s cubic-bezier(0.22,1,0.36,1) forwards;
                }

                /* ─── Section header reveal */
                @keyframes workFadeIn {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .work-header-reveal {
                    opacity: 0;
                    animation: workFadeIn 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
                }

                /* ─── Tab content transition */
                .work-content {
                    opacity: 0;
                    animation: workReveal 0.4s cubic-bezier(0.22,1,0.36,1) forwards;
                }

                /* ─── Spinner */
                @keyframes spin { to { transform: rotate(360deg); } }
                .work-spinner {
                    width: 26px;
                    height: 26px;
                    border: 2px solid rgba(249,115,22,0.18);
                    border-top-color: var(--accent);
                    border-radius: 50%;
                    animation: spin 0.9s linear infinite;
                }

                /* ─── Skeleton pulse */
                @keyframes skeletonPulse {
                    0%, 100% { opacity: 0.5; }
                    50%       { opacity: 0.25; }
                }

                /* ─── Live dot */
                @keyframes glow-dot {
                    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(249,115,22,0.5); }
                    50%       { opacity: 0.7; box-shadow: 0 0 0 4px rgba(249,115,22,0); }
                }
            `}</style>

            <div className="work-inner">
                {/* Divider line */}
                <div className="work-divider work-header-reveal" style={{ animationDelay: "0ms" }} />

                {/* Meta row */}
                <div className="work-meta work-header-reveal" style={{ animationDelay: "80ms" }}>
                    <div className="work-eyebrow">03 — Selected Work</div>
                    <div className="work-count">
                        <span className="work-count-dot" />
                        {loading ? "—" : projectCount} {activeTab === "media" ? "Films" : "Projects"}
                    </div>
                </div>

                {/* ── THE SWITCHER (Segmented Pill) ── */}
                <div className="work-switcher-wrap work-header-reveal flex mb-10 border-none" style={{ animationDelay: "160ms" }}>
                    <div className="relative grid grid-cols-2 p-1 rounded-full bg-[rgba(255,255,255,0.03)] border border-[var(--glass-border)] w-[260px] sm:w-[320px] mx-auto md:mx-0" role="tablist">
                        {/* Sliding Pill Background */}
                        <div
                            className="absolute top-1 bottom-1 rounded-full bg-[var(--accent)] transition-all duration-400 ease-out"
                            style={{
                                left: activeTab === 'media' ? '4px' : '50%',
                                width: 'calc(50% - 4px)',
                                boxShadow: '0 2px 10px rgba(249,115,22,0.2)'
                            }}
                        />

                        {/* Media Tab */}
                        <button
                            role="tab"
                            aria-selected={activeTab === "media"}
                            onClick={() => setActiveTab("media")}
                            className={`relative z-10 flex flex-row items-center justify-center gap-1.5 px-2 py-2 rounded-full transition-colors duration-300 ${
                                activeTab === "media" ? "text-black" : "text-[var(--muted)] hover:text-[var(--text)]"
                            }`}
                        >
                            <span className="font-mono text-[0.55rem] sm:text-[0.6rem] uppercase tracking-wider font-bold">Film & Motion</span>
                            <span className={`font-mono text-[0.5rem] px-1.5 py-0.5 rounded-full border ${activeTab === 'media' ? 'border-black/30' : 'border-[var(--border)]'}`}>
                                {loading ? "—" : mediaProjects.length}
                            </span>
                        </button>

                        {/* Dev Tab */}
                        <button
                            role="tab"
                            aria-selected={activeTab === "dev"}
                            onClick={() => setActiveTab("dev")}
                            className={`relative z-10 flex flex-row items-center justify-center gap-1.5 px-2 py-2 rounded-full transition-colors duration-300 ${
                                activeTab === "dev" ? "text-black" : "text-[var(--muted)] hover:text-[var(--text)]"
                            }`}
                        >
                            <span className="font-mono text-[0.55rem] sm:text-[0.6rem] uppercase tracking-wider font-bold">Digital & Dev</span>
                            <span className={`font-mono text-[0.5rem] px-1.5 py-0.5 rounded-full border ${activeTab === 'dev' ? 'border-black/30' : 'border-[var(--border)]'}`}>
                                {loading ? "—" : devProjects.length}
                            </span>
                        </button>
                    </div>
                </div>

                {/* ── CONTENT ── */}
                <div key={activeTab} className="work-content">
                    {loading ? (
                        <SkeletonGrid />
                    ) : activeTab === "media" ? (
                        <MasonryGrid projects={mediaProjects} />
                    ) : (
                        <DevGrid projects={devProjects} />
                    )}
                </div>

                {/* Bottom CTA */}
                {!loading && projectCount > 0 && (
                    <div className="flex justify-center mt-16 work-header-reveal" style={{ animationDelay: "300ms" }}>
                        <a
                            href="#contact"
                            className="group inline-flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] px-8 py-4"
                            style={{
                                border: "1px solid var(--border)",
                                borderRadius: "var(--radius-pill)",
                                color: "var(--muted)",
                                transition: "all 0.35s ease",
                                textDecoration: "none",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.5)";
                                (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(249,115,22,0.12)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                                (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                                (e.currentTarget as HTMLElement).style.boxShadow = "";
                            }}
                        >
                            <span>Start a project</span>
                            <span style={{ color: "var(--accent)" }}>→</span>
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
