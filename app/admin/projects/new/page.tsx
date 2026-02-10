"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ImageUpload from '@/components/admin/ImageUpload';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function NewProject() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'media' as 'media' | 'development',
        image: '',
        link: '',
        githubUrl: '',
        tags: '',
        techStack: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.image) {
            toast.error('Please fill in all required fields');
            return;
        }

        setLoading(true);

        try {
            const projectData: any = {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                image: formData.image,
            };

            if (formData.category === 'media') {
                projectData.link = formData.link;
                projectData.tags = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
            } else {
                projectData.githubUrl = formData.githubUrl;
                projectData.techStack = formData.techStack.split(',').map(t => t.trim()).filter(Boolean);
                if (formData.link) projectData.liveUrl = formData.link;
            }

            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projectData),
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Project created successfully!');
                router.push('/admin/projects');
            } else {
                throw new Error(data.error || 'Failed to create project');
            }
        } catch (error: any) {
            toast.error(error.message || 'Failed to create project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-6">
                <Link
                    href="/admin/projects"
                    className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Projects
                </Link>
                <h1 className="text-4xl font-bold mb-2">
                    Add New <span className="gradient-text">Project</span>
                </h1>
                <p className="text-white/60">Upload and create a new portfolio project</p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-3xl">
                <div className="space-y-6">
                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Project Image <span className="text-red-500">*</span>
                        </label>
                        <ImageUpload
                            value={formData.image}
                            onChange={(url) => setFormData({ ...formData, image: url })}
                            onRemove={() => setFormData({ ...formData, image: '' })}
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="category"
                                    value="media"
                                    checked={formData.category === 'media'}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value as 'media' })}
                                    className="w-4 h-4 text-[#cc1a3e]"
                                />
                                <span>Media Project</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="category"
                                    value="development"
                                    checked={formData.category === 'development'}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value as 'development' })}
                                    className="w-4 h-4 text-[#cc1a3e]"
                                />
                                <span>Development Project</span>
                            </label>
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#cc1a3e]"
                            placeholder="Project title"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#cc1a3e] min-h-[120px]"
                            placeholder="Brief description of the project"
                            required
                        />
                    </div>

                    {/* Conditional Fields for Media */}
                    {formData.category === 'media' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Link (YouTube, Instagram, etc.)
                                </label>
                                <input
                                    type="url"
                                    value={formData.link}
                                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#cc1a3e]"
                                    placeholder="https://youtube.com/..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Tags (comma-separated)
                                </label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#cc1a3e]"
                                    placeholder="Short-form, Commercial, Event"
                                />
                            </div>
                        </>
                    )}

                    {/* Conditional Fields for Development */}
                    {formData.category === 'development' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    GitHub URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.githubUrl}
                                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#cc1a3e]"
                                    placeholder="https://github.com/..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Live URL (optional)
                                </label>
                                <input
                                    type="url"
                                    value={formData.link}
                                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#cc1a3e]"
                                    placeholder="https://example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Tech Stack (comma-separated)
                                </label>
                                <input
                                    type="text"
                                    value={formData.techStack}
                                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#cc1a3e]"
                                    placeholder="React, Next.js, TypeScript, MongoDB"
                                />
                            </div>
                        </>
                    )}

                    {/* Submit Button */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 bg-[#cc1a3e] hover:bg-[#a61530] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 glow-pink"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Create Project
                                </>
                            )}
                        </button>
                        <Link
                            href="/admin/projects"
                            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
                        >
                            Cancel
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
