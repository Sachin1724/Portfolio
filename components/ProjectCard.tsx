"use client";

import { motion } from "framer-motion";
import { Project } from "@/types";
import { FaFilm, FaCode, FaVideo } from "react-icons/fa";

interface ProjectCardProps {
    project: Project;
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    const isMedia = project.category === "media";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -5 }}
            className="glass-strong rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 group"
        >
            {/* Project Image */}
            <div className="relative h-64 bg-gradient-to-br from-secondary-2 to-secondary-1 overflow-hidden">
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <FaVideo className="text-6xl text-white/30" />
                    </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                {/* Title and Tags */}
                <div>
                    <h3 className="text-xl font-sans font-bold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>

                    {/* Tags for Media / Tech Stack for Dev */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {isMedia && project.tags?.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary border border-primary/30"
                            >
                                {tag}
                            </span>
                        ))}
                        {!isMedia && project.tech_stack?.map((tech) => (
                            <span
                                key={tech}
                                className="px-3 py-1 text-xs font-medium rounded-full glass border border-white/20"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed">
                    {project.description}
                </p>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                    {isMedia ? (
                        <a
                            href={project.link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-4 py-2 bg-primary/20 hover:bg-primary text-white rounded-lg font-medium transition-all duration-200 border border-primary/30 hover:border-primary text-center"
                        >
                            View Project
                        </a>
                    ) : (
                        <>
                            {project.github_url && (
                                <button className="flex-1 px-4 py-2 glass hover:bg-white/10 rounded-lg font-medium transition-all duration-200 border border-white/20">
                                    GitHub
                                </button>
                            )}
                            {project.live_url && (
                                <button className="flex-1 px-4 py-2 bg-primary/20 hover:bg-primary text-white rounded-lg font-medium transition-all duration-200 border border-primary/30 hover:border-primary">
                                    Live Demo
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
