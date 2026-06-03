"use client";

import { motion } from "framer-motion";

export default function Preloader() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ background: "var(--bg)" }}
        >
            {/* Subtle glow */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl"
                    style={{
                        background: "radial-gradient(circle, rgba(249,115,22,0.3) 0%, rgba(249,115,22,0.05) 100%)",
                    }}
                />
            </div>

            <div className="relative z-10 text-center">
                {/* SM Monogram */}
                <svg
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* S */}
                    <motion.path
                        d="M 30 35 Q 30 25 40 25 L 50 25 Q 60 25 60 35 Q 60 45 50 45 L 40 45 Q 30 45 30 55 Q 30 65 40 65 L 50 65 Q 60 65 60 75"
                        stroke="url(#grad1)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        filter="url(#glow)"
                    />
                    {/* M */}
                    <motion.path
                        d="M 65 75 L 65 25 L 80 45 L 95 25 L 95 75"
                        stroke="url(#grad2)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
                        filter="url(#glow)"
                    />
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#fb923c" />
                        </linearGradient>
                        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#fb923c" />
                            <stop offset="100%" stopColor="#f97316" />
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

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="mt-6 text-sm tracking-[0.2em] uppercase"
                    style={{ fontFamily: "'Space Mono', monospace", color: "var(--muted)" }}
                >
                    LOADING
                </motion.p>
            </div>
        </motion.div>
    );
}
