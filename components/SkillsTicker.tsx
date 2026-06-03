"use client";

import { TICKER_SKILLS } from "@/lib/constants";

export default function SkillsTicker() {
    // Duplicate the track for seamless infinite scroll
    const items = [...TICKER_SKILLS, ...TICKER_SKILLS];

    return (
        <div className="relative z-[1] border-t border-b border-[var(--border)] py-3 overflow-hidden bg-[var(--surface)]">
            <div className="flex gap-12 animate-ticker w-max">
                {items.map((skill, i) => (
                    <span
                        key={`${skill}-${i}`}
                        className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-[var(--muted)] whitespace-nowrap flex items-center gap-4"
                    >
                        {skill}
                        <span className="text-[var(--accent)]">◆</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
