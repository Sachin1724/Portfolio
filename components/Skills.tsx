"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
    SiAdobephotoshop,
    SiAdobeillustrator,
    SiAdobepremierepro,
    SiAdobeaftereffects,
    SiFigma,
    SiBlender,
    SiDavinciresolve,
    SiAudacity,
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiJavascript,
    SiTailwindcss,
    SiNodedotjs,
    SiMongodb,
    SiGit,
    SiHtml5,
    SiCss3,
} from "react-icons/si";

interface Skill {
    name: string;
    icon: JSX.Element;
    color: string;
}

const DESIGN_SKILLS: Skill[] = [
    { name: "Photoshop", icon: <SiAdobephotoshop />, color: "#31A8FF" },
    { name: "Illustrator", icon: <SiAdobeillustrator />, color: "#FF9A00" },
    { name: "Premiere Pro", icon: <SiAdobepremierepro />, color: "#9999FF" },
    { name: "After Effects", icon: <SiAdobeaftereffects />, color: "#9999FF" },
    { name: "Figma", icon: <SiFigma />, color: "#F24E1E" },
    { name: "Blender", icon: <SiBlender />, color: "#F5792A" },
    { name: "DaVinci Resolve", icon: <SiDavinciresolve />, color: "#FF6B6B" },
    { name: "Audacity", icon: <SiAudacity />, color: "#0000CC" },
];

const DEV_SKILLS: Skill[] = [
    { name: "React", icon: <SiReact />, color: "#61DAFB" },
    { name: "Next.js", icon: <SiNextdotjs />, color: "#FFFFFF" },
    { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
    { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
    { name: "HTML5", icon: <SiHtml5 />, color: "#E34F26" },
    { name: "CSS3", icon: <SiCss3 />, color: "#1572B6" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4" },
    { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
    { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
    { name: "Git", icon: <SiGit />, color: "#F05032" },
];

export default function Skills() {
    const { ref, inView } = useScrollReveal();
    const [activeTab, setActiveTab] = useState<"design" | "dev">("design");

    const currentSkills = activeTab === "design" ? DESIGN_SKILLS : DEV_SKILLS;

    return (
        <section id="skills" className="relative">
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
                            My <span className="gradient-text">Skills</span>
                        </h2>
                        <p className="text-lg text-white/60">Tools and technologies I work with</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-center gap-4 mb-12">
                        <button
                            onClick={() => setActiveTab("design")}
                            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === "design"
                                ? "bg-[#cc1a3e] text-white glow-pink"
                                : "glass border border-white/20 text-white/70 hover:text-white hover:border-white/40"
                                }`}
                        >
                            Design Skills
                        </button>
                        <button
                            onClick={() => setActiveTab("dev")}
                            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === "dev"
                                ? "bg-[#cc1a3e] text-white glow-pink"
                                : "glass border border-white/20 text-white/70 hover:text-white hover:border-white/40"
                                }`}
                        >
                            Development Skills
                        </button>
                    </div>

                    {/* Skills Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
                        >
                            {currentSkills.map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 group relative overflow-hidden"
                                >
                                    {/* Glow effect on hover */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
                                        style={{ background: skill.color }}
                                    />

                                    {/* Content */}
                                    <div className="relative z-10 flex flex-col items-center gap-3">
                                        {/* Icon */}
                                        <div
                                            className="text-5xl transition-all duration-300 group-hover:scale-110"
                                            style={{ color: skill.color }}
                                        >
                                            {skill.icon}
                                        </div>

                                        {/* Name */}
                                        <h3 className="text-sm font-semibold text-center text-white/90 group-hover:text-white transition-colors">
                                            {skill.name}
                                        </h3>
                                    </div>

                                    {/* Badge shine effect */}
                                    <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700" />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
