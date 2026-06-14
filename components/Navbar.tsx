"use client";

import { useState, useEffect, useMemo } from "react";
import { NAV_LINKS } from "@/lib/constants";
import ThemeToggle from "./ThemeToggle";

import { User, Briefcase, Code, Smartphone, Award, Mail, Package, LayoutTemplate } from "lucide-react";
import { ExpandableTabs, TabItem } from "./ui/expandable-tabs";

const TABS: TabItem[] = [
    { title: "About", icon: User, href: "#about" },
    { title: "Work", icon: Briefcase, href: "#work" },
    { title: "Skills", icon: Code, href: "#skills" },
    { title: "Gadgets", icon: Smartphone, href: "#gadgets" },
    { title: "Packages", icon: Package, href: "#packages" },
    { title: "Content", icon: LayoutTemplate, href: "#content" },
    { title: "Experience", icon: Award, href: "#experience" },
    { title: "Contact", icon: Mail, href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled]       = useState(false);
    const [mobileOpen, setMobileOpen]   = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    // Scroll + active section detection
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);

        const sectionIds = ["home", "about", "work", "skills", "gadgets", "packages", "content", "experience", "contact", "faq"];
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActiveSection(e.target.id);
                });
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
        );
        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => {
            window.removeEventListener("scroll", onScroll);
            observer.disconnect();
        };
    }, []);

    const isActive = (href: string) => {
        const id = href.replace("#", "");
        return activeSection === id;
    };

    const activeTabIndex = useMemo(() => {
        const index = TABS.findIndex((t) => t.href === `#${activeSection}`);
        return index !== -1 ? index : null;
    }, [activeSection]);

    const mailtoSubject = "Inquiry from Portfolio";
    const mailtoLink = `mailto:sachinmallickff.19@gmail.com?subject=${encodeURIComponent(mailtoSubject)}`;

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-[110] flex justify-between items-center px-5 md:px-14 transition-all duration-500 bg-transparent ${
                    scrolled && !mobileOpen
                        ? "py-3 backdrop-blur-2xl border-b shadow-lg border-[var(--glass-border)]"
                        : "py-5 border-b border-transparent"
                }`}
            >
                {/* Subtle orange tint */}
                <div className="absolute inset-0 bg-gradient-to-r from-[rgba(249,115,22,0.02)] to-transparent pointer-events-none" />

                {/* Logo */}
                <a
                    href="#"
                    className="relative z-10 font-bebas text-xl md:text-2xl tracking-[0.10em] md:tracking-[0.14em] uppercase leading-none text-[var(--text)] hover:text-[var(--accent)] transition-colors duration-300 group"
                >
                    <span className="text-[var(--accent)] group-hover:text-[var(--accent2)]">{"//"}</span>{" "}
                    @iamsachindada
                </a>

                {/* Desktop Centered Tabs */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                    <ExpandableTabs 
                        tabs={TABS} 
                        selectedIndex={activeTabIndex}
                        activeColor="text-[var(--accent)]" 
                        className="backdrop-blur-md"
                    />
                </div>

                {/* Right side actions */}
                <div className="hidden md:flex items-center gap-6 relative z-10">
                    <a
                        href={mailtoLink}
                        className="relative overflow-hidden font-mono text-[0.65rem] font-bold uppercase tracking-[0.1em] px-5 py-2.5 text-[var(--accent)] transition-all duration-300 group"
                        style={{
                            border: "1px solid rgba(249,115,22,0.4)",
                            borderRadius: "999px",
                            boxShadow: "0 0 0 0 rgba(249,115,22,0)",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(249,115,22,0.2)";
                            (e.currentTarget as HTMLElement).style.background = "rgba(249,115,22,0.1)";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 rgba(249,115,22,0)";
                            (e.currentTarget as HTMLElement).style.background = "transparent";
                        }}
                    >
                        Hire Me
                    </a>
                    <ThemeToggle />
                </div>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden flex flex-col gap-1.5 z-[110] relative p-2"
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-[var(--text)] transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
                    <span className={`block w-6 h-0.5 bg-[var(--text)] transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
                    <span className={`block w-6 h-0.5 bg-[var(--text)] transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-[105] flex flex-col items-center justify-center gap-6 overflow-y-auto py-10 transition-all duration-500 md:hidden ${
                    mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                style={{
                    background: "var(--surface)",
                    backdropFilter: "blur(24px)",
                }}
            >
                {/* Ambient blob */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.08), transparent 70%)" }} />

                {NAV_LINKS.map((link, i) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`font-bebas text-4xl uppercase tracking-widest transition-colors duration-200 ${
                            isActive(link.href) ? "text-[var(--accent)]" : "text-[var(--text)] hover:text-[var(--accent)]"
                        }`}
                        style={{ animationDelay: `${i * 60}ms` }}
                    >
                        {link.name}
                    </a>
                ))}

                {/* Social links */}
                <div className="flex gap-4 mt-2">
                    {[
                        { label: "Github", href: "https://github.com/Sachin1724" },
                        { label: "LinkedIn", href: "https://www.linkedin.com/in/sachidananda-mallick/" },
                        { label: "Instagram", href: "https://www.instagram.com/iamsachindada" },
                        { label: "YouTube", href: "https://www.youtube.com/@sachindadaorginals" },
                    ].map(({ label, href }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMobileOpen(false)}
                            className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-200"
                            style={{
                                padding: "6px 12px",
                                border: "1px solid var(--glass-border)",
                                borderRadius: "999px",
                            }}
                        >
                            {label}
                        </a>
                    ))}
                </div>

                <a
                    href={mailtoLink}
                    onClick={() => setMobileOpen(false)}
                    className="font-mono text-sm uppercase tracking-widest px-10 py-4 bg-[var(--accent)] text-[var(--bg)] font-bold mt-2 hover:bg-[var(--accent2)] transition-colors"
                    style={{ borderRadius: "999px" }}
                >
                    Hire Me
                </a>
            </div>
        </>
    );
}
