"use client";

import { useEffect, useState } from 'react';
import { FolderKanban, Video, Code } from 'lucide-react';
import { getAllProjects } from '@/lib/firestore-projects';
import { Project } from '@/types';
import Link from 'next/link';

export default function AdminDashboard() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const data = await getAllProjects();
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const mediaCount = projects.filter(p => p.category === 'media').length;
    const devCount = projects.filter(p => p.category === 'development').length;

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">
                    <span className="gradient-text">Dashboard</span>
                </h1>
                <p className="text-white/60">Manage your portfolio content</p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="glass rounded-xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#cc1a3e]/20 rounded-lg">
                            <FolderKanban className="w-6 h-6 text-[#cc1a3e]" />
                        </div>
                        <div>
                            <p className="text-white/60 text-sm">Total Projects</p>
                            <p className="text-3xl font-bold text-white">{loading ? '...' : projects.length}</p>
                        </div>
                    </div>
                </div>

                <div className="glass rounded-xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-500/20 rounded-lg">
                            <Video className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                            <p className="text-white/60 text-sm">Media Projects</p>
                            <p className="text-3xl font-bold text-white">{loading ? '...' : mediaCount}</p>
                        </div>
                    </div>
                </div>

                <div className="glass rounded-xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-lg">
                            <Code className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-white/60 text-sm">Dev Projects</p>
                            <p className="text-3xl font-bold text-white">{loading ? '...' : devCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="glass rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <Link
                        href="/admin/projects/new"
                        className="p-4 bg-[#cc1a3e] hover:bg-[#a61530] rounded-lg transition-colors group"
                    >
                        <h3 className="font-semibold mb-1">Add New Project</h3>
                        <p className="text-sm text-white/80">Upload and create a new portfolio project</p>
                    </Link>

                    <Link
                        href="/admin/projects"
                        className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors group"
                    >
                        <h3 className="font-semibold mb-1">Manage Projects</h3>
                        <p className="text-sm text-white/60">Edit or delete existing projects</p>
                    </Link>
                </div>
            </div>

            {/* Recent Projects */}
            {!loading && projects.length > 0 && (
                <div className="mt-8 glass rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-4">Recent Projects</h2>
                    <div className="space-y-3">
                        {projects.slice(0, 5).map((project) => (
                            <div key={project.id} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                                {project.image && (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                )}
                                <div className="flex-1">
                                    <h3 className="font-semibold">{project.title}</h3>
                                    <p className="text-sm text-white/60">{project.category}</p>
                                </div>
                                <Link
                                    href={`/admin/projects/edit/${project.id}`}
                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors"
                                >
                                    Edit
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
