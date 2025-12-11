"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { EDUCATION } from "@/lib/constants";
import ProfileCard from "@/components/ui/ProfileCard";

export default function Education() {
    const { ref, inView } = useScrollReveal();

    return (
        <section id="education" className="relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    {/* Section Title */}
                    <h2 className="text-4xl md:text-5xl font-sans font-bold text-center mb-12">
                        <span className="gradient-text">Education</span>
                    </h2>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Side - Education Timeline */}
                        <div className="lg:col-span-2 space-y-6">
                            {EDUCATION.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="glass-strong rounded-2xl p-8 border-l-4 border-primary relative overflow-hidden"
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-3 top-10 w-6 h-6 rounded-full bg-primary border-4 border-background" />

                                    <div className="space-y-3">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                            <h3 className="text-2xl font-sans font-bold">{edu.degree}</h3>
                                            <span className="px-4 py-1 glass rounded-full text-sm font-medium border border-white/20 w-fit">
                                                {edu.duration}
                                            </span>
                                        </div>

                                        <p className="text-lg text-primary font-semibold">{edu.institute}</p>

                                        <p className="text-white/70 leading-relaxed">{edu.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Right Side - Profile Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex items-start justify-center"
                        >
                            <ProfileCard
                                name="Sachidananda Mallick"
                                username="@sachinmallick"
                                role="Developer & Creator"
                                profileImage="/assets/images/profile.jpg"
                                timeAgo="Active Now"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
