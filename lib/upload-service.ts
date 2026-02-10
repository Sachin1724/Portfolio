import { supabase } from './firebase';

const BUCKET_NAME = 'project-images';

/**
 * Upload an image to Supabase Storage
 * @param file - The image file to upload
 * @param fileName - Optional custom file name
 * @returns The public download URL
 */
export async function uploadImage(file: File, fileName?: string): Promise<string> {
    try {
        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            throw new Error('Invalid file type. Only JPG, PNG, and WebP are allowed.');
        }

        // Validate file size (5MB max)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            throw new Error('File size exceeds 5MB limit.');
        }

        // Generate unique file name
        const timestamp = Date.now();
        const fileExt = file.name.split('.').pop();
        const uniqueFileName = fileName || `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(uniqueFileName, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) throw error;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(data.path);

        return publicUrl;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

/**
 * Delete an image from Supabase Storage
 * @param imageUrl - The full URL of the image to delete
 */
export async function deleteImage(imageUrl: string): Promise<void> {
    try {
        // Extract the file path from the URL
        const url = new URL(imageUrl);
        const pathParts = url.pathname.split('/');
        const fileName = pathParts[pathParts.length - 1];

        if (!fileName) {
            console.warn('Could not extract file name from URL');
            return;
        }

        const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .remove([fileName]);

        if (error) throw error;
    } catch (error) {
        console.error('Error deleting image:', error);
        // Don't throw - deletion errors shouldn't block other operations
    }
}

/**
 * Get the file extension from a file name
 */
export function getFileExtension(fileName: string): string {
    return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
