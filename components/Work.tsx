"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Project } from "@/types";
import { MEDIA_PROJECTS, DEV_PROJECTS } from "@/lib/constants";

type Tab = "media" | "dev";

const isLocal = (src: string) => src.startsWith("/assets/");

// Projects without an uploaded image fall back to the link's own thumbnail.
function useThumb(project: Project, link: string) {
    const own = project.image?.trim() || project.thumbnail?.trim() || null;
    const [thumb, setThumb] = useState<string | null>(own);

    useEffect(() => {
        if (own) {
            setThumb(own);
            return;
        }
        if (!link || link === "#") return;
        let cancelled = false;
        fetch(`/api/og?url=${encodeURIComponent(link)}`)
            .then((r) => r.json())
            .then((data) => {
                if (!cancelled) setThumb(data.thumbnail ?? null);
            })
            .catch(() => {});
        return () => {
            cancelled = true;
        };
    }, [own, link]);

    return thumb;
}

function Shot({ src, alt, sizes }: { src: string | null; alt: string; sizes: string }) {
    if (!src) return null;
    if (isLocal(src)) return <Image src={src} alt={alt} fill sizes={sizes} />;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} loading="lazy" />;
}

function ReelCard({ project, index }: { project: Project; index: number }) {
    const link = project.live_url ?? project.link ?? project.video_url ?? "#";
    const thumb = useThumb(project, link);

    return (
        <a className="project reel" href={link} target="_blank" rel="noopener noreferrer">
            <div className="project-meta">
                <span>
                    {String(index + 1).padStart(2, "0")} / {project.tags?.[0] ?? "VIDEO"}
                </span>
                <span>WATCH ▶</span>
            </div>
            <div className="reel__shot" style={{ aspectRatio: project.aspect_ratio ?? "16/9" }}>
                <Shot src={thumb} alt="" sizes="(max-width: 700px) 92vw, 400px" />
            </div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-desc">{project.description}</p>
            <span className="project-arrow" aria-hidden="true">
                ↗
            </span>
        </a>
    );
}

function BuildCard({ project, index }: { project: Project; index: number }) {
    const link = project.live_url ?? project.github_url ?? project.link ?? "#";
    const thumb = useThumb(project, link);

    return (
        <article className="project build">
            <div className="build__shot">
                <Shot src={thumb} alt={`${project.title} screenshot`} sizes="(max-width: 800px) 92vw, 640px" />
            </div>
            <div className="build__body">
                <div className="project-meta">
                    <span>{String(index + 1).padStart(2, "0")} / CODE</span>
                    <span>{project.tech_stack?.[0] ?? "WEB"}</span>
                </div>
                <h3 className="build__title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                {project.tech_stack && project.tech_stack.length > 0 && (
                    <div className="chips">
                        {project.tech_stack.map((tech) => (
                            <span key={tech} className="chip">
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
                <div className="hero-actions">
                    {project.github_url && (
                        <a className="btn dark" href={project.github_url} target="_blank" rel="noopener noreferrer">
                            GITHUB ↗
                        </a>
                    )}
                    {project.live_url && (
                        <a className="btn" href={project.live_url} target="_blank" rel="noopener noreferrer">
                            LIVE SITE ↗
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}

export default function Work() {
    const [tab, setTab] = useState<Tab>("media");
    const [media, setMedia] = useState<Project[]>(MEDIA_PROJECTS);
    const [dev, setDev] = useState<Project[]>(DEV_PROJECTS);

    // The admin dashboard can change projects without a redeploy, so refresh from the API.
    useEffect(() => {
        fetch("/api/projects", { cache: "no-store" })
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => {
                if (!data) return;
                if (Array.isArray(data.MEDIA_PROJECTS)) setMedia(data.MEDIA_PROJECTS);
                if (Array.isArray(data.DEV_PROJECTS)) setDev(data.DEV_PROJECTS);
            })
            .catch(() => {});
    }, []);

    const tabs: { id: Tab; label: string; count: number }[] = [
        { id: "media", label: "Reels & films", count: media.length },
        { id: "dev", label: "Code", count: dev.length },
    ];
    const list = tab === "media" ? media : dev;

    return (
        <section id="work" className="projects">
            <div className="wrap">
                <div className="section-head">
                    <div>
                        <p className="eyebrow mono">01 / SELECTED WORK</p>
                        <h2>
                            MADE WITH
                            <br />
                            INTENT. ✳
                        </h2>
                    </div>
                    <div className="tabs" role="tablist" aria-label="Project type">
                        {tabs.map((t) => (
                            <button
                                key={t.id}
                                type="button"
                                role="tab"
                                id={`tab-${t.id}`}
                                aria-selected={tab === t.id}
                                aria-controls="work-panel"
                                className="tab"
                                onClick={() => setTab(t.id)}
                            >
                                {t.label} ({t.count})
                            </button>
                        ))}
                    </div>
                </div>

                <div id="work-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
                    {list.length === 0 ? (
                        <p className="work__empty">Nothing here yet. New projects are on the way.</p>
                    ) : tab === "media" ? (
                        <div className="reel-wall">
                            {media.map((project, i) => (
                                <ReelCard key={project.id} project={project} index={i} />
                            ))}
                        </div>
                    ) : (
                        <div className="builds">
                            {dev.map((project, i) => (
                                <BuildCard key={project.id} project={project} index={i} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
