"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const ChevronLeft = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
);

const ChevronRight = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);

interface CarouselItem {
    id: number;
    image: string;
    title: string;
    description: string;
    link?: string; // Optional project link
}

interface Carousel3DProps {
    items: CarouselItem[];
}

export default function Carousel3D({ items }: Carousel3DProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    const getPosition = (index: number) => {
        const diff = index - currentIndex;
        const total = items.length;

        if (diff === 0) return { x: 0, z: 0, scale: 1, opacity: 1 };
        if (diff === 1 || diff === -(total - 1)) return { x: 300, z: -200, scale: 0.8, opacity: 0.6 };
        if (diff === -1 || diff === total - 1) return { x: -300, z: -200, scale: 0.8, opacity: 0.6 };
        return { x: 0, z: -400, scale: 0.6, opacity: 0 };
    };

    return (
        <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
            {/* Carousel Items */}
            <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1000px" }}>
                <AnimatePresence initial={false}>
                    {items.map((item, index) => {
                        const position = getPosition(index);

                        return (
                            <motion.div
                                key={item.id}
                                className="absolute w-[400px] h-[500px] rounded-2xl glass-strong border border-white/20 overflow-hidden cursor-pointer"
                                initial={position}
                                animate={position}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                }}
                                style={{
                                    transformStyle: "preserve-3d",
                                }}
                                onClick={() => {
                                    if (index === currentIndex && item.link) {
                                        // If card is centered and has a link, open it
                                        window.open(item.link, '_blank');
                                    } else {
                                        // Otherwise, bring card to center
                                        setCurrentIndex(index);
                                    }
                                }}
                            >
                                {/* Image */}
                                <div className="relative w-full h-3/5 bg-gradient-to-br from-secondary-2 to-secondary-1 flex items-center justify-center">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-contain p-4"
                                    />
                                    {/* Overlay on hover for centered card with link */}
                                    {index === currentIndex && item.link && (
                                        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <span className="text-white font-semibold text-lg">View Project →</span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-3">
                                    <h3 className="text-2xl font-sans font-bold gradient-text">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/70 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={handlePrev}
                className="absolute left-8 z-10 w-12 h-12 rounded-full glass border border-white/20 hover:border-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
                <ChevronLeft />
            </button>

            <button
                onClick={handleNext}
                className="absolute right-8 z-10 w-12 h-12 rounded-full glass border border-white/20 hover:border-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
                <ChevronRight />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                            ? "bg-primary w-8"
                            : "bg-white/30 hover:bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
