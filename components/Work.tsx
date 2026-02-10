"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { MEDIA_PROJECTS, DEV_PROJECTS } from "@/lib/constants";
import ProjectCard from "./ProjectCard";
import useSWR from "swr";
import { Project } from "@/types";

type TabType = "media" | "development";

const fetcher = (url: string) => fetch(url).then(r => r.json()).then(data => data.data || []);

export default function Work() {
    const { ref, inView } = useScrollReveal();
    const [activeTab, setActiveTab] = useState<TabType>("media");

    // Fetch projects from API with SWR for caching and revalidation
    const { data: fetchedProjects, error, isLoading } = useSWR<Project[]>('/api/projects', fetcher, {
        fallbackData: [],
        revalidateOnFocus: false,
    });

    // Use fetched projects if available, otherwise fallback to constants
    const allProjects = fetchedProjects && fetchedProjects.length > 0 ? fetchedProjects : [...MEDIA_PROJECTS, ...DEV_PROJECTS];
    const projects = activeTab === "media"
        ? allProjects.filter(p => p.category === "media")
        : allProjects.filter(p => p.category === "development");

    return (
        <section id="work" className="relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    {/* Section Title */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-sans font-bold mb-4">
                            My <span className="gradient-text">Work</span>
                        </h2>
                        <p className="text-lg text-white/60">Everything I create — from videos to web apps</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-center mb-12">
                        <div className="glass-strong rounded-full p-1.5 inline-flex gap-2">
                            <button
                                onClick={() => setActiveTab("media")}
                                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === "media"
                                    ? "bg-[#cc1a3e] text-white glow-pink"
                                    : "glass border border-white/20 text-white/70 hover:text-white hover:border-white/40"
                                    }`}
                            >
                                Media Projects
                            </button>
                            <button
                                onClick={() => setActiveTab("development")}
                                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === "development"
                                    ? "bg-[#cc1a3e] text-white glow-pink"
                                    : "glass border border-white/20 text-white/70 hover:text-white hover:border-white/40"
                                    }`}
                            >
                                Development Projects
                            </button>
                        </div>
                    </div>

                    {/* Loading State */}
                    {isLoading && (
                        <div className="text-center py-12">
                            <div className="w-12 h-12 border-4 border-[#cc1a3e] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-white/60">Loading projects...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !isLoading && (
                        <div className="text-center py-12 glass rounded-xl p-6">
                            <p className="text-red-400 mb-2">Failed to load projects</p>
                            <p className="text-white/60 text-sm">Showing cached projects</p>
                        </div>
                    )}

                    {/* Projects Grid */}
                    {!isLoading && (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="grid md:grid-cols-2 gap-6"
                            >
                                {projects.length === 0 ? (
                                    <div className="col-span-2 text-center py-12 glass rounded-xl">
                                        <p className="text-white/60">No projects in this category yet</p>
                                    </div>
                                ) : (
                                    projects.map((project, index) => (
                                        <ProjectCard key={project.id} project={project} index={index} />
                                    ))
                                )}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
