"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { EQUIPMENT } from "@/lib/constants";
import { useState } from "react";

export default function Equipment() {
    const { ref, inView } = useScrollReveal();
    const [expandedCard, setExpandedCard] = useState<number | null>(null);

    // Map equipment types to image paths or URLs
    const getEquipmentImage = (type: string) => {
        const imageMap: { [key: string]: string } = {
            "Primary Camera": "/assets/images/canon-camera.jpg",
            "Laptop": "/assets/images/asus-laptop.jpg",
            "Smartphone": "/assets/images/samsung-phone.jpg",
            "Microphone": "/assets/images/microphone.jpg",
            "IEM": "/assets/images/iem.jpg",
            "Gimbal": "/assets/images/gimbal.jpg",
        };

        return imageMap[type] || "https://via.placeholder.com/200x200?text=" + encodeURIComponent(type);
    };

    const handleCardClick = (index: number) => {
        setExpandedCard(expandedCard === index ? null : index);
    };

    return (
        <section id="equipment" className="relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    {/* Section Title */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-sans font-bold mb-4">
                            Equipment I <span className="gradient-text">Use</span>
                        </h2>
                        <p className="text-lg text-white/60">Tools and gear for content creation & development</p>
                    </div>

                    {/* Equipment Grid - Desktop */}
                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {EQUIPMENT.map((item, index) => (
                            <motion.div
                                key={item.type}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-primary/50 hover:bg-white/10 hover:backdrop-blur-2xl transition-all duration-300 group overflow-hidden hover:shadow-2xl hover:shadow-primary/20 relative"
                            >
                                {/* Product Image */}
                                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-secondary-2/20 to-secondary-1/20">
                                    <img
                                        src={getEquipmentImage(item.type)}
                                        alt={item.model}
                                        className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                                        style={{ filter: 'drop-shadow(0 -8px 16px rgba(0, 0, 0, 0.4)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))' }}
                                    />
                                </div>

                                {/* Type */}
                                <h3 className="text-xl font-sans font-bold mb-2 group-hover:text-primary transition-colors">
                                    {item.type}
                                </h3>

                                {/* Model */}
                                <p className="text-primary font-semibold mb-3">{item.model}</p>

                                {/* Usage */}
                                <p className="text-sm text-white/60 leading-relaxed">{item.usage}</p>

                                {/* Specs Overlay - Shows on Hover */}
                                {item.specs && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        className="absolute inset-0 bg-background/95 backdrop-blur-xl rounded-2xl p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center"
                                    >
                                        <h4 className="text-lg font-bold text-primary mb-3 border-b border-primary/30 pb-2">
                                            Technical Specs
                                        </h4>
                                        <div className="space-y-1.5 overflow-y-auto max-h-64 scrollbar-hide">
                                            {item.specs.map((spec, idx) => (
                                                <p key={idx} className="text-xs text-white/80 leading-relaxed">
                                                    • {spec}
                                                </p>
                                            ))}
                                        </div>
                                        <p className="text-xs text-white/40 mt-3 text-center italic">
                                            Hover to view details
                                        </p>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Equipment Stack - Mobile */}
                    <div className="md:hidden relative">
                        <AnimatePresence>
                            {expandedCard !== null && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setExpandedCard(null)}
                                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                                />
                            )}
                        </AnimatePresence>

                        <div className="space-y-3">
                            {EQUIPMENT.map((item, index) => (
                                <motion.div
                                    key={item.type}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    onClick={() => handleCardClick(index)}
                                    className={`relative ${expandedCard === index ? 'z-50' : 'z-10'}`}
                                >
                                    {expandedCard === index ? (
                                        // Expanded Card
                                        <motion.div
                                            layoutId={`card-${index}`}
                                            className="fixed inset-4 top-20 bottom-20 glass-strong rounded-2xl p-6 border border-primary/50 overflow-y-auto"
                                        >
                                            {/* Product Image */}
                                            <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-secondary-2/20 to-secondary-1/20">
                                                <img
                                                    src={getEquipmentImage(item.type)}
                                                    alt={item.model}
                                                    className="w-full h-full object-contain p-4"
                                                    style={{ filter: 'drop-shadow(0 -8px 16px rgba(0, 0, 0, 0.4)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))' }}
                                                />
                                            </div>

                                            {/* Type */}
                                            <h3 className="text-2xl font-sans font-bold mb-3 text-primary">
                                                {item.type}
                                            </h3>

                                            {/* Model */}
                                            <p className="text-xl text-primary font-semibold mb-4">{item.model}</p>

                                            {/* Usage */}
                                            <p className="text-base text-white/80 leading-relaxed">{item.usage}</p>

                                            {/* Specs */}
                                            {item.specs && (
                                                <div className="mt-6">
                                                    <h4 className="text-lg font-bold text-primary mb-3 border-b border-primary/30 pb-2">
                                                        Technical Specs
                                                    </h4>
                                                    <div className="space-y-2">
                                                        {item.specs.map((spec, idx) => (
                                                            <p key={idx} className="text-sm text-white/70 leading-relaxed">
                                                                • {spec}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Close hint */}
                                            <p className="text-sm text-white/40 mt-6 text-center">Tap outside to close</p>
                                        </motion.div>
                                    ) : (
                                        // Collapsed Card
                                        <motion.div
                                            layoutId={`card-${index}`}
                                            className="glass-strong rounded-xl p-4 border border-white/10 flex items-center gap-4"
                                        >
                                            {/* Small Image */}
                                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-secondary-2/20 to-secondary-1/20 flex-shrink-0">
                                                <img
                                                    src={getEquipmentImage(item.type)}
                                                    alt={item.model}
                                                    className="w-full h-full object-contain p-2"
                                                    style={{ filter: 'drop-shadow(0 -4px 8px rgba(0, 0, 0, 0.3)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))' }}
                                                />
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-sans font-bold text-white truncate">
                                                    {item.type}
                                                </h3>
                                                <p className="text-xs text-primary font-semibold truncate">{item.model}</p>
                                            </div>

                                            {/* Expand Icon */}
                                            <div className="text-white/40 flex-shrink-0">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
