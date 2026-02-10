import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/upload-service';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { success: false, error: 'No file provided' },
                { status: 400 }
            );
        }

        // Upload to Firebase Storage
        const imageUrl = await uploadImage(file);

        return NextResponse.json({
            success: true,
            data: { url: imageUrl },
        });
    } catch (error: any) {
        console.error('Error uploading file:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to upload file' },
            { status: 500 }
        );
    }
}
