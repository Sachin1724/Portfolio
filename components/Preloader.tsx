"use client";

import { motion } from "framer-motion";

export default function Preloader() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
            style={{
                background: "linear-gradient(135deg, #211832 0%, #2a1f3d 50%, #211832 100%)",
            }}
        >
            {/* Animated gradient blob */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl"
                    style={{
                        background: "radial-gradient(circle, #F25912 0%, #5C3E94 50%, #412B6B 100%)",
                    }}
                />
            </div>

            {/* SM Logo Animation */}
            <div className="relative z-10">
                <svg
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* S Letter */}
                    <motion.path
                        d="M 30 35 Q 30 25 40 25 L 50 25 Q 60 25 60 35 Q 60 45 50 45 L 40 45 Q 30 45 30 55 Q 30 65 40 65 L 50 65 Q 60 65 60 75"
                        stroke="url(#gradient1)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        filter="url(#glow)"
                    />

                    {/* M Letter */}
                    <motion.path
                        d="M 65 75 L 65 25 L 80 45 L 95 25 L 95 75"
                        stroke="url(#gradient2)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
                        filter="url(#glow)"
                    />

                    {/* Gradient Definitions */}
                    <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F25912" />
                            <stop offset="100%" stopColor="#5C3E94" />
                        </linearGradient>
                        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#5C3E94" />
                            <stop offset="100%" stopColor="#412B6B" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                </svg>

                {/* Loading text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-center mt-6 text-sm tracking-widest text-white/60"
                >
                    LOADING
                </motion.p>
            </div>
        </motion.div>
    );
}
