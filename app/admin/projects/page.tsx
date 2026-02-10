"use client";

import { useEffect, useState } from 'react';
import { getAllProjects } from '@/lib/firestore-projects';
import { Project } from '@/types';
import { Plus, Trash2, Edit } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'media' | 'development'>('all');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const data = await getAllProjects();
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
            toast.error('Failed to fetch projects');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, imageUrl?: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Project deleted successfully');
                setProjects(projects.filter(p => p.id !== id));
            } else {
                throw new Error(data.error || 'Failed to delete');
            }
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete project');
        }
    };

    const filteredProjects = projects.filter(p =>
        filter === 'all' || p.category === filter
    );

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold mb-2">
                        <span className="gradient-text">Projects</span>
                    </h1>
                    <p className="text-white/60">Manage all your portfolio projects</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="px-6 py-3 bg-[#cc1a3e] hover:bg-[#a61530] text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 glow-pink"
                >
                    <Plus className="w-5 h-5" />
                    Add New Project
                </Link>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${filter === 'all'
                            ? 'bg-[#cc1a3e] text-white'
                            : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                        }`}
                >
                    All ({projects.length})
                </button>
                <button
                    onClick={() => setFilter('media')}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${filter === 'media'
                            ? 'bg-[#cc1a3e] text-white'
                            : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                        }`}
                >
                    Media ({projects.filter(p => p.category === 'media').length})
                </button>
                <button
                    onClick={() => setFilter('development')}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${filter === 'development'
                            ? 'bg-[#cc1a3e] text-white'
                            : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                        }`}
                >
                    Development ({projects.filter(p => p.category === 'development').length})
                </button>
            </div>

            {/* Projects Grid */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="w-16 h-16 border-4 border-[#cc1a3e] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white/60">Loading projects...</p>
                </div>
            ) : filteredProjects.length === 0 ? (
                <div className="text-center py-12 glass rounded-xl">
                    <p className="text-white/60 mb-4">No projects found</p>
                    <Link
                        href="/admin/projects/new"
                        className="text-[#cc1a3e] hover:underline"
                    >
                        Create your first project
                    </Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="glass rounded-xl overflow-hidden group">
                            {project.image && (
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                            )}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                                        <p className="text-sm text-white/60 capitalize">{project.category}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.category === 'media'
                                            ? 'bg-purple-500/20 text-purple-400'
                                            : 'bg-blue-500/20 text-blue-400'
                                        }`}>
                                        {project.category}
                                    </span>
                                </div>

                                <p className="text-white/70 text-sm mb-4 line-clamp-2">
                                    {project.description}
                                </p>

                                <div className="flex gap-2">
                                    <Link
                                        href={`/admin/projects/edit/${project.id}`}
                                        className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(project.id, project.image)}
                                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/20 text-red-400 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
