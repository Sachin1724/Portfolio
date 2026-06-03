"use client";

import { useState } from "react";
import { CLIENTS } from "@/lib/constants";

export default function ClientScroller() {
    // Double the clients for seamless loop
    const allClients = [...CLIENTS, ...CLIENTS];

    return (
        <div className="relative z-[1] py-12 bg-[var(--bg)] overflow-hidden">
            {/* Title */}
            <div className="font-mono text-[0.7rem] text-[var(--muted)] tracking-[0.25em] uppercase text-center mb-8">
                Trusted by Brands & Creators
            </div>

            {/* Track Wrapper with edge fade */}
            <div
                className="relative overflow-hidden"
                style={{
                    maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
                    WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
                }}
            >
                <div className="flex gap-16 animate-client-scroll w-max items-center py-4 hover:[animation-play-state:paused]">
                    {allClients.map((client, i) => (
                        <ClientCard key={`${client.name}-${i}`} client={client} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function ClientCard({ client }: { client: (typeof CLIENTS)[0] }) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="flex items-center gap-4 min-w-max opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-300 group">
            {/* Logo */}
            <div className="w-12 h-12 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center overflow-hidden group-hover:border-[var(--accent)] group-hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] transition-all duration-300">
                {imgError ? (
                    <span className="text-xl text-[var(--muted)]">{client.fallbackEmoji}</span>
                ) : (
                    <img
                        src={client.logo}
                        alt={`${client.name} logo`}
                        className="w-full h-full object-contain p-1.5 grayscale brightness-150 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-300"
                        onError={() => setImgError(true)}
                    />
                )}
            </div>
            {/* Name */}
            <span className="font-mono text-xs font-bold text-[#a9a9b8] tracking-[0.1em] uppercase whitespace-nowrap group-hover:text-white transition-colors duration-300">
                {client.name}
            </span>
        </div>
    );
}
