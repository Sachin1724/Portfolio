"use client";

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatFileSize } from '@/lib/upload-service';

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    onRemove: () => void;
}

export default function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];

        if (!file) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            toast.error('Only JPG, PNG, and WebP images are allowed');
            return;
        }

        // Validate file size (5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            toast.error('File size must be less than 5MB');
            return;
        }

        setUploading(true);
        setProgress(0);

        try {
            const formData = new FormData();
            formData.append('file', file);

            // Simulate progress
            const progressInterval = setInterval(() => {
                setProgress(prev => Math.min(prev + 10, 90));
            }, 100);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            clearInterval(progressInterval);
            setProgress(100);

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();

            if (data.success) {
                onChange(data.data.url);
                toast.success('Image uploaded successfully!');
            } else {
                throw new Error(data.error || 'Upload failed');
            }
        } catch (error: any) {
            toast.error(error.message || 'Failed to upload image');
        } finally {
            setUploading(false);
            setProgress(0);
        }
    }, [onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        },
        maxFiles: 1,
        disabled: uploading
    });

    if (value) {
        return (
            <div className="relative group">
                <img
                    src={value}
                    alt="Uploaded"
                    className="w-full h-64 object-cover rounded-xl"
                />
                <button
                    type="button"
                    onClick={onRemove}
                    className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
        );
    }

    return (
        <div
            {...getRootProps()}
            className={`
        relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
        ${isDragActive ? 'border-[#cc1a3e] bg-[#cc1a3e]/10' : 'border-white/20 hover:border-white/40'}
        ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
        >
            <input {...getInputProps()} />

            <div className="space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                    {uploading ? (
                        <div className="w-8 h-8 border-3 border-[#cc1a3e] border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Upload className="w-8 h-8 text-white/60" />
                    )}
                </div>

                <div>
                    <p className="text-lg font-medium mb-1">
                        {uploading ? 'Uploading...' : isDragActive ? 'Drop image here' : 'Upload project image'}
                    </p>
                    <p className="text-sm text-white/60">
                        Click to browse or drag and drop<br />
                        JPG, PNG or WebP (Max 5MB)
                    </p>
                </div>

                {uploading && (
                    <div className="max-w-xs mx-auto">
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#cc1a3e] transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="text-xs text-white/60 mt-2">{progress}%</p>
                    </div>
                )}
            </div>
        </div>
    );
}
