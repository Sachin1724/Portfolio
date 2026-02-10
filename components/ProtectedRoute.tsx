"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/admin/login');
            } else {
                setIsChecking(false);
            }
        }
    }, [user, loading, router]);

    if (loading || isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#cc1a3e] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white/60">Loading...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
