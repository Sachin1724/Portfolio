"use client";

import Link from 'next/link';
import { Smile } from 'lucide-react';

export default function AdminAccessButton() {
    return (
        <Link
            href="/admin/login"
            className="fixed bottom-6 left-6 z-50 group"
            aria-label="Admin Login"
        >
            <div className="relative">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-[#cc1a3e] rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />

                {/* Button */}
                <div className="relative glass rounded-full p-3 border border-white/10 hover:border-[#cc1a3e] transition-all duration-300 hover:scale-110">
                    <Smile className="w-5 h-5 text-white/40 group-hover:text-[#cc1a3e] transition-colors duration-300" />
                </div>
            </div>
        </Link>
    );
}
