"use client";

import { motion } from "framer-motion";
import { SkillCategory } from "@/types";

interface SkillCategoryCardProps {
    category: SkillCategory;
    index: number;
    inView: boolean;
}

export default function SkillCategoryCard({ category, index, inView }: SkillCategoryCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-secondary-1/50 transition-all duration-300 relative overflow-hidden group"
        >
            {/* Gradient accent on hover */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary-1 to-secondary-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Category Title */}
            <h3 className="text-xl font-sans font-bold mb-4 group-hover:text-primary transition-colors">
                {category.title}
            </h3>

            {/* Skills */}
            <div className="space-y-2">
                {category.skills.map((skill) => (
                    <motion.div
                        key={skill.name}
                        whileHover={{ x: 5 }}
                        className="px-3 py-2 glass rounded-lg text-sm font-medium border border-white/10 hover:border-primary/30 transition-all duration-200"
                    >
                        {skill.name}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
