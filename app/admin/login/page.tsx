"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import toast from 'react-hot-toast';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            await signIn(email, password);
            toast.success('Welcome back!');
            router.push('/admin');
        } catch (error: any) {
            toast.error(error.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2">
                        Admin <span className="gradient-text">Login</span>
                    </h1>
                    <p className="text-white/60">Sign in to manage your portfolio</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#cc1a3e] transition-colors"
                                placeholder="admin@example.com"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#cc1a3e] transition-colors"
                                placeholder="••••••••"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-[#cc1a3e] hover:bg-[#a61530] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 glow-pink"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            <>
                                <LogIn className="w-5 h-5" />
                                Sign In
                            </>
                        )}
                    </button>
                </form>

                {/* Back to Home */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => router.push('/')}
                        className="text-white/60 hover:text-white transition-colors"
                    >
                        ← Back to Portfolio
                    </button>
                </div>
            </div>
        </div>
    );
}
