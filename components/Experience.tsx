"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { EXPERIENCE } from "@/lib/constants";
import TimelineItem from "./TimelineItem";

export default function Experience() {
    const { ref, inView } = useScrollReveal();

    return (
        <section id="experience" className="relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    {/* Section Title */}
                    <h2 className="text-4xl md:text-5xl font-sans font-bold text-center mb-12">
                        Work <span className="gradient-text">Experience</span>
                    </h2>

                    {/* Timeline */}
                    <div className="max-w-4xl mx-auto space-y-8 relative">
                        {/* Vertical line */}
                        <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary-1 to-secondary-2 hidden md:block" />

                        {EXPERIENCE.map((exp, index) => (
                            <TimelineItem key={index} experience={exp} index={index} inView={inView} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
