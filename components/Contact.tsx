"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SOCIAL_LINKS } from "@/lib/constants";
import { FaEnvelope, FaFileAlt, FaGithub, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { downloadResume } from "@/lib/downloadResume";

export default function Contact() {
    const { ref, inView } = useScrollReveal();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Create mailto link with form data
        const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
        const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        );
        const mailtoLink = `mailto:sachinmallickff.19@gmail.com?subject=${subject}&body=${body}`;

        // Open email client
        window.location.href = mailtoLink;

        // Show success message
        setIsSubmitted(true);
        // Reset form
        setFormData({ name: "", email: "", message: "" });
        // Hide success message after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section id="contact" className="relative pb-20">
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
                            Let&apos;s Work <span className="gradient-text">Together</span>
                        </h2>
                        <p className="text-lg text-white/60">
                            Available for freelance editing, development projects, and collaborations
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Left: Contact Buttons */}
                        <div className="space-y-6">
                            <motion.a
                                href="mailto:sachinmallickff.19@gmail.com"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="block w-full px-8 py-4 bg-[#cc1a3e] hover:bg-[#b01735] text-white font-semibold rounded-lg transition-all duration-200 glow-pink glow-pink-hover text-center"
                            >
                                <FaEnvelope className="inline mr-2" /> Email Me
                            </motion.a>

                            <motion.button
                                onClick={downloadResume}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="block w-full px-8 py-4 glass border border-white/20 hover:border-white/40 text-white font-semibold rounded-lg transition-all duration-200 text-center"
                            >
                                <FaFileAlt className="inline mr-2" /> Download Resume
                            </motion.button>

                            {/* Social Links */}
                            <div className="pt-6">
                                <h3 className="text-xl font-sans font-bold mb-4">Connect With Me</h3>
                                <div className="flex gap-4">
                                    {SOCIAL_LINKS.map((social) => (
                                        <motion.a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            className="w-14 h-14 rounded-full glass border border-white/20 hover:border-primary flex items-center justify-center transition-all duration-200"
                                            title={social.name}
                                        >
                                            {getSocialIcon(social.icon)}
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Contact Form */}
                        <div className="glass-strong rounded-2xl p-8 border border-white/10">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div suppressHydrationWarning>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        autoComplete="name"
                                        className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary focus:outline-none transition-colors bg-transparent text-white"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div suppressHydrationWarning>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        autoComplete="email"
                                        className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary focus:outline-none transition-colors bg-transparent text-white"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div suppressHydrationWarning>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary focus:outline-none transition-colors bg-transparent text-white resize-none"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full px-8 py-3 bg-[#cc1a3e] hover:bg-[#b01735] text-white font-semibold rounded-lg transition-all duration-200 glow-pink glow-pink-hover"
                                >
                                    Send Message
                                </motion.button>

                                {/* Success Message */}
                                {isSubmitted && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 glass border border-primary/50 rounded-lg text-center"
                                    >
                                        <p className="text-primary font-semibold">✓ Message sent successfully!</p>
                                    </motion.div>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Footer */}
                    <motion.footer
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-20 pt-8 border-t border-white/10 text-center"
                    >
                        <p className="text-white/50 text-sm" suppressHydrationWarning>
                            © {new Date().getFullYear()} Sachin Mallick. All rights reserved.
                        </p>
                    </motion.footer>
                </motion.div>
            </div>
        </section>
    );
}

function getSocialIcon(icon: string) {
    const iconProps = { size: 24 };
    const icons: Record<string, JSX.Element> = {
        github: <FaGithub {...iconProps} />,
        linkedin: <FaLinkedin {...iconProps} />,
        instagram: <FaInstagram {...iconProps} />,
        youtube: <FaYoutube {...iconProps} />,
    };
    return icons[icon] || <FaGithub {...iconProps} />;
}
