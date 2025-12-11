"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { SOCIAL_LINKS } from "@/lib/constants";
import RotatingCircuit from "./RotatingCircuit";
import { RainbowButton } from "./ui/rainbow-button";

const roles = ["Designer", "Video Editor", "Developer"];

export default function Hero() {
    const [currentRole, setCurrentRole] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            {/* Gradient Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl"
                    style={{
                        background: "radial-gradient(circle, #F25912 0%, #5C3E94 100%)",
                    }}
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl"
                    style={{
                        background: "radial-gradient(circle, #5C3E94 0%, #412B6B 100%)",
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Pill Tag */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="inline-flex items-center px-4 py-2 rounded-full glass border border-white/20"
                        >
                            <span className="text-sm font-medium">Designer • Video Editor • Developer</span>
                        </motion.div>

                        {/* Main Heading */}
                        <div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold mb-4">
                                Hi, I&apos;m{" "}
                                <span className="gradient-text">Sachidananda Mallick</span>
                            </h1>

                            {/* Role Rotation */}
                            <div className="text-2xl md:text-3xl font-sans font-semibold text-white/80 h-12 flex items-center">
                                I&apos;m a{" "}
                                <motion.span
                                    key={currentRole}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="ml-2 text-primary"
                                >
                                    {roles[currentRole]}
                                </motion.span>
                            </div>
                        </div>

                        {/* Introduction */}
                        <p className="text-lg text-white/70 leading-relaxed max-w-xl">
                            CSE student at BPUT with 5+ years of experience in design, video editing, and development.
                            I’ve worked with GDG Ranchi as the Official Media Partner for DEVFEST 2025
                            and collaborated with creators like The Viral Vri and Dear Sir Bari Sir.
                            I specialize in blending visuals, storytelling, and code to create impactful digital experiences.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="#experience"
                                className="px-8 py-3 bg-[#cc1a3e] hover:bg-[#b01735] text-white font-semibold rounded-lg transition-all duration-200 glow-pink glow-pink-hover"
                            >
                                View My Work
                            </motion.a>

                            <RainbowButton href="https://drive.google.com/drive/folders/1oEM7cri8c8hufh48lbCbP3smL8wNqJp2?usp=drive_link">
                                ALL WORKS
                            </RainbowButton>

                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="/Resume_New.pdf"
                                download="Sachidananda_Mallick_Resume.pdf"
                                className="px-8 py-3 glass border border-white/20 hover:border-white/40 text-white font-semibold rounded-lg transition-all duration-200"
                            >
                                Download Resume
                            </motion.a>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-4 pt-4">
                            {SOCIAL_LINKS.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className="w-12 h-12 rounded-full glass border border-white/20 hover:border-primary flex items-center justify-center transition-all duration-200"
                                >
                                    {getSocialIcon(social.icon)}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative"
                    >
                        {/* Gradient Blob Behind Image */}
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, 0],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute inset-0 rounded-full blur-3xl opacity-50"
                            style={{
                                background: "linear-gradient(135deg, #FF204E, #A0153E, #5D0E41)",
                            }}
                        />

                        {/* Image Container with Rotating Circuit */}
                        <div className="relative z-10 flex items-center justify-center">
                            {/* Rotating Circuit Animation */}
                            <RotatingCircuit
                                logos={[
                                    "/assets/images/adobe-photoshop.png",
                                    "/assets/images/adobe-Illustrator.png",
                                    "/assets/images/adobe-premiere-pro.png",
                                    "/assets/images/adobe-after-effects.png",
                                    "/assets/images/Davinci-Resolve.png",
                                    "/assets/images/blender.png",
                                    "/assets/images/OBS.png",
                                ]}
                            />

                            {/* Intro Image */}
                            <img
                                src="/assets/images/intro.png"
                                alt="Sachidananda Mallick"
                                className="w-full max-w-2xl h-auto object-contain drop-shadow-2xl relative z-10"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function getSocialIcon(icon: string) {
    const iconProps = { size: 20 };
    const icons: Record<string, JSX.Element> = {
        github: <FaGithub {...iconProps} />,
        linkedin: <FaLinkedin {...iconProps} />,
        instagram: <FaInstagram {...iconProps} />,
        youtube: <FaYoutube {...iconProps} />,
    };
    return icons[icon] || <FaGithub {...iconProps} />;
}
