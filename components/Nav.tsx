"use client";

import { useState } from "react";
import { NAV_LINKS, INSTAGRAM_DM_URL } from "@/lib/constants";

export default function Nav() {
    const [open, setOpen] = useState(false);

    return (
        <header className="nav">
            <div className="wrap nav__bar">
                <a href="#home" className="nav__logo or" lang="or" aria-label="Sachin Dada, back to top">
                    ସଚିନ ଦାଦା
                </a>
                <button
                    type="button"
                    className="nav__toggle"
                    aria-expanded={open}
                    aria-controls="site-menu"
                    onClick={() => setOpen((v) => !v)}
                >
                    {open ? "Close" : "Menu"}
                </button>
                <nav id="site-menu" className="nav__links" data-open={open} aria-label="Sections">
                    {NAV_LINKS.map((link) => (
                        <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                            {link.name}
                        </a>
                    ))}
                    <a className="nav__cta" href={INSTAGRAM_DM_URL} target="_blank" rel="noopener noreferrer">
                        DM me ↗
                    </a>
                </nav>
            </div>
        </header>
    );
}
