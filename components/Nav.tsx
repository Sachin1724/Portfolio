"use client";

import { useState } from "react";
import { NAV_LINKS, BRAND } from "@/lib/constants";

export default function Nav() {
    const [open, setOpen] = useState(false);

    return (
        <header className="nav">
            <div className="wrap nav__bar">
                <a className="brand" href="#top" aria-label={`${BRAND} home`}>
                    {BRAND}
                    <span>®</span>
                </a>
                <button
                    type="button"
                    className="nav__toggle mono"
                    aria-expanded={open}
                    aria-controls="site-menu"
                    onClick={() => setOpen((v) => !v)}
                >
                    {open ? "Close" : "Menu"}
                </button>
                <nav id="site-menu" className="navlinks" data-open={open} aria-label="Main navigation">
                    {NAV_LINKS.filter((l) => l.href !== "#contact").map((link) => (
                        <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                            {link.name}
                        </a>
                    ))}
                    <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>
                        LET&apos;S TALK ↗
                    </a>
                </nav>
            </div>
        </header>
    );
}
