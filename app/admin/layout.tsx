"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";

const ADMIN_PASSWORD = "sachin2026";

export default function AdminLayout({ children }: { children: ReactNode }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setAuthenticated(true);
            setError("");
        } else {
            setError("Incorrect password");
        }
    };

    if (!authenticated) {
        return (
            <div
                className="min-h-screen flex items-center justify-center px-6"
                style={{ background: "var(--bg)", color: "var(--text)" }}
            >
                <div className="w-full max-w-sm">
                    <h1
                        className="text-3xl font-extrabold mb-2 tracking-tight"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                        <span style={{ color: "var(--accent)" }}>{"//"}</span> Admin
                    </h1>
                    <p
                        className="text-sm mb-8"
                        style={{
                            color: "var(--muted)",
                            fontFamily: "'Space Mono', monospace",
                        }}
                    >
                        Enter password to access the dashboard.
                    </p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full px-4 py-3 text-sm outline-none transition-all duration-300"
                            style={{
                                background: "var(--surface)",
                                border: "1px solid var(--border)",
                                color: "var(--text)",
                                fontFamily: "'Syne', sans-serif",
                            }}
                            onFocus={(e) =>
                                (e.target.style.borderColor = "var(--accent)")
                            }
                            onBlur={(e) =>
                                (e.target.style.borderColor = "var(--border)")
                            }
                        />
                        {error && (
                            <p
                                className="text-xs"
                                style={{
                                    color: "#ef4444",
                                    fontFamily: "'Space Mono', monospace",
                                }}
                            >
                                {error}
                            </p>
                        )}
                        <button
                            type="submit"
                            className="btn-clip w-full py-3 text-sm font-bold uppercase tracking-wider cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                            style={{
                                background: "var(--accent)",
                                color: "#000",
                                fontFamily: "'Space Mono', monospace",
                                border: "none",
                            }}
                        >
                            Enter
                        </button>
                    </form>

                    <Link
                        href="/"
                        className="block mt-6 text-center text-xs hover:underline"
                        style={{
                            color: "var(--muted)",
                            fontFamily: "'Space Mono', monospace",
                        }}
                    >
                        ← Back to site
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
            {/* Sidebar */}
            <aside
                className="fixed left-0 top-0 h-full w-64 p-6 z-50 hidden md:flex flex-col"
                style={{
                    background: "var(--surface)",
                    borderRight: "1px solid var(--border)",
                }}
            >
                <div className="mb-8">
                    <h2
                        className="text-2xl font-extrabold"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                        <span style={{ color: "var(--accent)" }}>Admin</span> Panel
                    </h2>
                    <p
                        className="text-xs mt-1"
                        style={{
                            color: "var(--muted)",
                            fontFamily: "'Space Mono', monospace",
                        }}
                    >
                        Portfolio Management
                    </p>
                </div>

                <nav className="flex-1 space-y-2">
                    <Link
                        href="/admin"
                        className="block px-4 py-3 rounded-lg text-sm transition-colors"
                        style={{ color: "var(--text)" }}
                    >
                        📊 Dashboard
                    </Link>
                </nav>

                <div className="space-y-2">
                    <button
                        onClick={() => setAuthenticated(false)}
                        className="w-full text-left px-4 py-3 rounded-lg text-sm transition-colors"
                        style={{ color: "var(--muted)" }}
                    >
                        🚪 Sign Out
                    </button>
                    <Link
                        href="/"
                        className="block px-4 py-3 rounded-lg text-sm"
                        style={{ color: "var(--muted)" }}
                    >
                        ← Back to site
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="md:ml-64 p-6 md:p-8">{children}</main>
        </div>
    );
}
