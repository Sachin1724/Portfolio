"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function About() {
    const { ref, inView } = useScrollReveal();

    return (
        <section id="about" className="relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    {/* Section Title */}
                    <h2 className="text-4xl md:text-5xl font-sans font-bold text-center mb-12">
                        About <span className="gradient-text">Me</span>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <p className="text-lg text-white/70 leading-relaxed">
                                I'm Sachidananda Mallick, but you can call me Sachin. I'm passionate about creating digital experiences
                                that sit at the intersection of design, storytelling, and technology.
                            </p>
                            <p className="text-lg text-white/70 leading-relaxed">
                                As a Computer Science student at BPUT, I've developed a unique skill set that spans both creative and
                                technical domains. Whether I'm editing a cinematic video, designing an interface, or building a web application,
                                I bring the same level of attention to detail and creativity.
                            </p>
                            <p className="text-lg text-white/70 leading-relaxed">
                                I've had the opportunity to participate in multiple hackathons, collaborate with Google Developer Groups (GDG),
                                and work on diverse projects that challenge me to grow as both a creator and a developer.
                            </p>
                        </div>

                        {/* Right Column - Current Status */}
                        <div className="space-y-6">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="glass-strong rounded-2xl p-8 border border-white/20 relative overflow-hidden"
                            >
                                {/* Gradient accent */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary-1 to-secondary-2" />

                                <h3 className="text-xl font-sans font-bold mb-4">Currently</h3>
                                <p className="text-white/80 leading-relaxed">
                                    B.Tech CSE student, building projects at the intersection of media and technology.
                                    Exploring new ways to blend visual storytelling with code.
                                </p>
                            </motion.div>

                            {/* Interests */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-sans font-bold">Interests</h3>
                                <div className="flex flex-wrap gap-3">
                                    {["Video Editing", "Web Development", "UI/UX Design", "Motion Graphics", "Problem Solving", "Content Creation"].map((interest) => (
                                        <motion.span
                                            key={interest}
                                            whileHover={{ scale: 1.05 }}
                                            className="px-4 py-2 glass rounded-full border border-white/20 text-sm font-medium"
                                        >
                                            {interest}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
