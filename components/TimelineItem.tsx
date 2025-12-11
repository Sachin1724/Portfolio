"use client";

import { motion } from "framer-motion";
import { ExperienceItem } from "@/types";

interface TimelineItemProps {
    experience: ExperienceItem;
    index: number;
    inView: boolean;
}

export default function TimelineItem({ experience, index, inView }: TimelineItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative md:pl-20"
        >
            {/* Timeline Dot */}
            <div className="absolute left-0 md:left-6 top-6 w-5 h-5 rounded-full bg-primary border-4 border-background z-10" />

            {/* Content Card */}
            <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                className="glass-strong rounded-2xl p-6 md:p-8 border-l-4 border-primary"
            >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                    <h3 className="text-2xl font-sans font-bold">{experience.role}</h3>
                    <span className="px-4 py-1 glass rounded-full text-sm font-medium border border-white/20 w-fit">
                        {experience.duration}
                    </span>
                </div>

                <p className="text-lg text-primary font-semibold mb-4">{experience.organization}</p>

                <ul className="space-y-2">
                    {experience.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-white/70">
                            <span className="text-primary mt-1">▹</span>
                            <span>{responsibility}</span>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </motion.div>
    );
}
