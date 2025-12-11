"use client";

import { motion } from "framer-motion";

const skills = [
    "Video Editing",
    "Motion Graphics",
    "Web Development",
    "UI/UX Design",
    "Content Creation",
    "Cinematography",
    "Cinema Line Camera",
    "VFX & CGI"
];

export default function HandsOn() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-20"
        >
            <div className="glass-strong rounded-2xl p-6 border border-white/20 relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary-1/5 to-secondary-2/5 opacity-50" />

                {/* Content */}
                <div className="relative z-10">
                    <h3 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider">
                        Hands On
                    </h3>

                    <div className="flex items-start gap-2 font-mono">
                        <span className="text-white/60 text-lg mt-1">$</span>

                        <div className="flex-1">
                            <div className="flex flex-wrap gap-x-3 gap-y-2 items-center">
                                {skills.map((skill, index) => (
                                    <motion.span
                                        key={skill}
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: [0, 1, 0.7, 1, 0.8, 1],
                                        }}
                                        transition={{
                                            duration: 2,
                                            delay: index * 0.2,
                                            repeat: Infinity,
                                            repeatDelay: 3,
                                            ease: "easeInOut"
                                        }}
                                        className={`text-base md:text-lg font-semibold whitespace-nowrap ${skill === "VFX & CGI" ? "rainbow-text" : "text-white"
                                            }`}
                                    >
                                        {skill}
                                        {index < skills.length - 1 && (
                                            <span className="text-primary ml-1">•</span>
                                        )}
                                    </motion.span>
                                ))}

                                {/* Blinking dots */}
                                <motion.span
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="text-white/40 text-lg ml-1"
                                >
                                    ...
                                </motion.span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
