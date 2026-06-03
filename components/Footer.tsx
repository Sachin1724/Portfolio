"use client";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer
            className="relative z-[1] overflow-hidden"
            style={{
                background: "var(--surface)",
                borderTop: "1px solid var(--border)",
            }}
        >
            {/* Top ambient glow */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
                style={{ background: "radial-gradient(ellipse at top, rgba(249,115,22,0.05), transparent 70%)" }}
            />

            <div
                style={{
                    padding: "80px var(--container-px) 40px",
                    maxWidth: "var(--container-max)",
                    margin: "0 auto",
                }}
            >
                {/* CTA Banner — glass card */}
                <div
                    className="relative overflow-hidden text-center py-16 px-8 mb-16"
                    style={{
                        background: "linear-gradient(180deg, rgba(249,115,22,0.06), rgba(249,115,22,0.02))",
                        border: "1px solid rgba(249,115,22,0.2)",
                        borderRadius: "var(--radius-card)",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    {/* Decorative glow */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.08), transparent 60%)", filter: "blur(60px)" }}
                    />

                    <h3 className="relative font-syne text-[clamp(1.8rem,4vw,3rem)] font-extrabold tracking-tight mb-4">
                        Ready to Build Something
                        <br />
                        <span className="gradient-text-accent">Incredible?</span>
                    </h3>
                    <p className="relative text-[var(--muted)] text-sm mb-8 max-w-md mx-auto leading-relaxed">
                        Whether it&apos;s a brand identity, a cinematic reel, or a full website — let&apos;s make it happen.
                    </p>
                    <div className="relative flex flex-wrap justify-center gap-4">
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 font-mono text-[0.65rem] font-bold tracking-[0.12em] uppercase px-8 py-3.5 transition-all duration-300"
                            style={{ background: "var(--accent)", color: "#000", borderRadius: "999px" }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "var(--accent2)";
                                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(249,115,22,0.35)";
                                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "var(--accent)";
                                (e.currentTarget as HTMLElement).style.boxShadow = "";
                                (e.currentTarget as HTMLElement).style.transform = "";
                            }}
                        >
                            → Let&apos;s Talk
                        </a>
                        <a
                            href="#work"
                            className="glass-btn"
                        >
                            ✦ See My Work
                        </a>
                    </div>
                </div>

                {/* Footer grid — 3 columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="font-bebas text-2xl tracking-[0.14em] uppercase text-[var(--text)] mb-3">
                            <span className="text-[var(--accent)]">{"//"}</span> Sachin Dada
                        </div>
                        <p className="font-mono text-[0.68rem] text-[var(--muted)] leading-relaxed max-w-xs">
                            Brand &amp; UI/UX Designer, Developer &amp; Odia Content Creator.
                            Building things that matter.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <div className="font-mono text-[0.62rem] text-[var(--accent)] tracking-[0.18em] uppercase mb-4">
                            Quick Links
                        </div>
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                            {[
                                { label: "Home", href: "#home" },
                                { label: "About", href: "#about" },
                                { label: "Work", href: "#work" },
                                { label: "Skills", href: "#skills" },
                                { label: "Packages", href: "#packages" },
                                { label: "Contact", href: "#contact" },
                            ].map(({ label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    className="font-mono text-[0.68rem] text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-200"
                                >
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Socials */}
                    <div>
                        <div className="font-mono text-[0.62rem] text-[var(--accent)] tracking-[0.18em] uppercase mb-4">
                            Connect
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: "GitHub", href: "https://github.com/Sachin1724" },
                                { label: "LinkedIn", href: "https://www.linkedin.com/in/sachidananda-mallick/" },
                                { label: "Instagram", href: "https://www.instagram.com/iamsachindada" },
                                { label: "YouTube", href: "https://www.youtube.com/@sachindadaorginals" },
                            ].map(({ label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-[0.6rem] tracking-[0.1em] uppercase transition-all duration-300"
                                    style={{
                                        padding: "6px 14px",
                                        border: "1px solid var(--glass-border)",
                                        color: "var(--muted)",
                                        background: "var(--glass-bg-active)",
                                        borderRadius: "999px",
                                        backdropFilter: "blur(8px)",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.3)";
                                        (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
                                        (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                                    }}
                                >
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
                    style={{ borderTop: "1px solid var(--border)" }}
                >
                    <div className="font-mono text-[0.6rem] text-[var(--muted)] tracking-[0.08em]">
                        © {year} Sachin Dada. All rights reserved.
                    </div>
                    <div className="font-mono text-[0.55rem] text-[var(--glass-text-muted)] tracking-[0.2em] uppercase">
                        Designed & Built by Sachin
                    </div>
                </div>
            </div>
        </footer>
    );
}
