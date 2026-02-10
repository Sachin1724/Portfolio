"use client";

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, FolderKanban, LayoutDashboard } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, signOut } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success('Signed out successfully');
            router.push('/admin/login');
        } catch (error) {
            toast.error('Failed to sign out');
        }
    };

    // Don't protect the login page
    const isLoginPage = pathname === '/admin/login';

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-[#0a0a0a]">
                {/* Sidebar */}
                <aside className="fixed left-0 top-0 h-full w-64 glass border-r border-white/10 p-6 z-50">
                    <div className="flex flex-col h-full">
                        {/* Logo */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold">
                                <span className="gradient-text">Admin</span> Panel
                            </h2>
                            <p className="text-sm text-white/40 mt-1">{user?.email}</p>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 space-y-2">
                            <button
                                onClick={() => router.push('/admin')}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-white/80 hover:text-white"
                            >
                                <LayoutDashboard className="w-5 h-5" />
                                Dashboard
                            </button>
                            <button
                                onClick={() => router.push('/admin/projects')}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-white/80 hover:text-white"
                            >
                                <FolderKanban className="w-5 h-5" />
                                Projects
                            </button>
                        </nav>

                        {/* Sign Out */}
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-white/60 hover:text-white"
                        >
                            <LogOut className="w-5 h-5" />
                            Sign Out
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="ml-64 p-8">
                    {children}
                </main>
            </div>
        </ProtectedRoute>
    );
}
