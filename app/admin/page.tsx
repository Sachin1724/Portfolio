"use client";

import { useState, useEffect } from "react";
import { Project } from "@/types";
import { PACKAGES, SKILL_CATEGORIES, EXPERIENCE, EDUCATION, EQUIPMENT } from "@/lib/constants";
import { Save, Plus, Trash2 } from "lucide-react";

export default function AdminDashboard() {
    const [mediaProjects, setMediaProjects] = useState<Project[]>([]);
    const [devProjects, setDevProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetch("/api/projects")
            .then((res) => res.json())
            .then((data) => {
                setMediaProjects(data.MEDIA_PROJECTS || []);
                setDevProjects(data.DEV_PROJECTS || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setMessage("");
        try {
            const res = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ MEDIA_PROJECTS: mediaProjects, DEV_PROJECTS: devProjects }),
            });
            if (res.ok) {
                setMessage("Projects saved successfully! Refresh frontend to see changes.");
                setIsError(false);
            } else {
                const errData = await res.json().catch(() => ({}));
                setMessage(`Failed to save: ${errData.error || errData.message || res.statusText}`);
                setIsError(true);
            }
        } catch (err: any) {
            setMessage(`Error saving: ${err.message}`);
            setIsError(true);
        }
        setSaving(false);
        setTimeout(() => setMessage(""), 4000);
    };

    const updateProject = (category: "media" | "dev", index: number, field: keyof Project, value: any) => {
        if (category === "media") {
            const newArr = [...mediaProjects];
            newArr[index] = { ...newArr[index], [field]: value };
            setMediaProjects(newArr);
        } else {
            const newArr = [...devProjects];
            newArr[index] = { ...newArr[index], [field]: value };
            setDevProjects(newArr);
        }
    };

    const addProject = (category: "media" | "dev") => {
        const newProj: Project = { id: Date.now().toString(), title: "New Project", category, image: "", description: "" };
        if (category === "media") setMediaProjects([newProj, ...mediaProjects]);
        else setDevProjects([newProj, ...devProjects]);
    };

    const removeProject = (category: "media" | "dev", index: number) => {
        if (category === "media") {
            setMediaProjects(mediaProjects.filter((_, i) => i !== index));
        } else {
            setDevProjects(devProjects.filter((_, i) => i !== index));
        }
    };

    if (loading) return <div className="p-8 font-mono">Loading CMS...</div>;

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-4xl font-extrabold mb-2 tracking-tight font-syne text-[var(--accent)]">
                        Local CMS
                    </h1>
                    <p className="text-sm font-mono text-[var(--muted)]">
                        Manage your portfolio projects. Changes are saved to Upstash Redis (production) or local JSON (dev).
                    </p>
                </div>
                
                <div className="flex items-center gap-4">
                    {message && (
                        <span className={`text-sm font-mono ${isError ? "text-red-400" : "text-[var(--odia)]"}`}>{message}</span>
                    )}
                    <button 
                        onClick={handleSave} 
                        disabled={saving}
                        className="flex items-center gap-2 bg-[var(--accent)] text-black font-bold font-syne px-6 py-2 rounded-full hover:scale-105 transition-transform disabled:opacity-50"
                    >
                        <Save size={18} />
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Media Projects */}
                <ProjectList 
                    title="Media Projects" 
                    projects={mediaProjects} 
                    category="media"
                    onUpdate={updateProject}
                    onAdd={() => addProject("media")}
                    onRemove={(i) => removeProject("media", i)}
                />

                {/* Dev Projects */}
                <ProjectList 
                    title="Dev Projects" 
                    projects={devProjects} 
                    category="dev"
                    onUpdate={updateProject}
                    onAdd={() => addProject("dev")}
                    onRemove={(i) => removeProject("dev", i)}
                />
            </div>
            
            {/* Other Sections (Read-only) */}
            <div className="mt-12 pt-8 border-t border-[var(--border)]">
                <h3 className="font-syne text-xl font-bold mb-4">Other Static Content</h3>
                <p className="text-sm font-mono text-[var(--muted)] mb-4">Packages, Skills, Experience, and Equipment are still managed in <code className="text-[var(--accent)]">lib/constants.ts</code>.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-lg font-mono text-sm">📦 {PACKAGES.length} Packages loaded</div>
                    <div className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-lg font-mono text-sm">💼 {EXPERIENCE.length} Roles loaded</div>
                    <div className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-lg font-mono text-sm">🎓 {EDUCATION.length} Degrees loaded</div>
                </div>
            </div>
        </div>
    );
}

function ProjectList({ 
    title, 
    projects, 
    category, 
    onUpdate, 
    onAdd, 
    onRemove 
}: { 
    title: string; 
    projects: Project[]; 
    category: "media" | "dev";
    onUpdate: (cat: "media" | "dev", idx: number, field: keyof Project, val: any) => void;
    onAdd: () => void;
    onRemove: (idx: number) => void;
}) {
    return (
        <div className="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)]">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-syne">{title}</h2>
                <button 
                    onClick={onAdd}
                    className="flex items-center gap-1 font-mono text-xs bg-[rgba(255,255,255,0.05)] border border-[var(--border)] px-3 py-1.5 rounded hover:bg-[rgba(255,255,255,0.1)] transition-colors"
                >
                    <Plus size={14} /> Add New
                </button>
            </div>

            <div className="space-y-6">
                {projects.map((p, i) => (
                    <div key={p.id} className="p-4 bg-[rgba(0,0,0,0.2)] border border-[var(--border)] rounded-lg relative group">
                        <button 
                            onClick={() => onRemove(i)}
                            className="absolute top-4 right-4 text-[var(--muted)] hover:text-red-400 transition-colors"
                            title="Remove project"
                        >
                            <Trash2 size={16} />
                        </button>
                        
                        <div className="grid grid-cols-1 gap-4 mt-2">
                            <div>
                                <label className="block text-xs font-mono text-[var(--muted)] mb-1">Title</label>
                                <input 
                                    type="text" 
                                    value={p.title} 
                                    onChange={(e) => onUpdate(category, i, "title", e.target.value)}
                                    className="w-full bg-[rgba(255,255,255,0.03)] border border-[var(--border)] rounded p-2 text-sm focus:border-[var(--accent)] outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-[var(--muted)] mb-1">Description</label>
                                <textarea 
                                    value={p.description} 
                                    onChange={(e) => onUpdate(category, i, "description", e.target.value)}
                                    rows={2}
                                    className="w-full bg-[rgba(255,255,255,0.03)] border border-[var(--border)] rounded p-2 text-sm focus:border-[var(--accent)] outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono text-[var(--muted)] mb-1">Image URL (Thumbnail)</label>
                                    <input 
                                        type="text" 
                                        value={p.image || ""} 
                                        onChange={(e) => onUpdate(category, i, "image", e.target.value)}
                                        className="w-full bg-[rgba(255,255,255,0.03)] border border-[var(--border)] rounded p-2 text-sm focus:border-[var(--accent)] outline-none"
                                        placeholder="/assets/images/thumb.jpg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-[var(--muted)] mb-1">Video URL (Autoplays)</label>
                                    <input 
                                        type="text" 
                                        value={p.video_url || ""} 
                                        onChange={(e) => onUpdate(category, i, "video_url", e.target.value)}
                                        className="w-full bg-[rgba(255,255,255,0.03)] border border-[var(--border)] rounded p-2 text-sm focus:border-[var(--accent)] outline-none"
                                        placeholder="/assets/videos/preview.mp4"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-[var(--muted)] mb-1">{category === "media" ? "Video Link" : "GitHub / Live URL"}</label>
                                    <input 
                                        type="text" 
                                        value={category === "media" ? p.link || "" : p.github_url || p.link || ""} 
                                        onChange={(e) => onUpdate(category, i, category === "media" ? "link" : "github_url", e.target.value)}
                                        className="w-full bg-[rgba(255,255,255,0.03)] border border-[var(--border)] rounded p-2 text-sm focus:border-[var(--accent)] outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
                {projects.length === 0 && (
                    <div className="text-center p-8 font-mono text-sm text-[var(--muted)] border border-dashed border-[var(--border)] rounded-lg">
                        No projects found. Add one!
                    </div>
                )}
            </div>
        </div>
    );
}
