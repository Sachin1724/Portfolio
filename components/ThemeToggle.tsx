"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState("dark");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme);
            document.documentElement.setAttribute("data-theme", storedTheme);
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    if (!mounted) {
        return <div className="w-10 h-10" />; // Placeholder to prevent layout shift
    }

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--glass-bg-hover)] hover:scale-110 transition-all duration-300"
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? (
                <Sun size={18} className="text-[var(--text)]" />
            ) : (
                <Moon size={18} className="text-[var(--text)]" />
            )}
        </button>
    );
}
