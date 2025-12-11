"use client";

import { motion } from "framer-motion";

interface RotatingCircuitProps {
    logos: string[];
}

export default function RotatingCircuit({ logos }: RotatingCircuitProps) {
    const radius = 320; // Distance from center
    const angleStep = (2 * Math.PI) / logos.length;

    return (
        <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none">
            {/* Dotted Circuit Circle */}
            <svg className="absolute w-full h-full" style={{ maxWidth: '750px', maxHeight: '750px' }}>
                <motion.circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    fill="none"
                    stroke="url(#circuitGradient)"
                    strokeWidth="2"
                    strokeDasharray="8 12"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 60,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{ transformOrigin: "center" }}
                />

                {/* Gradient for circuit */}
                <defs>
                    <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FF204E" stopOpacity="0.6" />
                        <stop offset="50%" stopColor="#A0153E" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#5D0E41" stopOpacity="0.6" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Rotating Container for Logos */}
            <motion.div
                className="absolute"
                style={{ width: radius * 2, height: radius * 2 }}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {logos.map((logo, index) => {
                    const angle = angleStep * index;
                    const x = Math.cos(angle - Math.PI / 2) * radius;
                    const y = Math.sin(angle - Math.PI / 2) * radius;

                    return (
                        <div
                            key={index}
                            className="absolute"
                            style={{
                                left: '50%',
                                top: '50%',
                                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                            }}
                        >
                            <div className="w-24 h-24 -ml-12 -mt-12 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer">
                                <img
                                    src={logo}
                                    alt="Software logo"
                                    className={`object-contain ${logo.includes('blender') || logo.includes('OBS')
                                        ? 'w-3/5 h-3/5'
                                        : 'w-full h-full'
                                        }`}
                                    style={{
                                        filter: 'drop-shadow(0 8px 16px rgba(255, 32, 78, 0.4))',
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
}
