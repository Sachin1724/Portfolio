import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Only allow images
        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'Only image files allowed' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Save to /public/assets/images/uploads/
        const uploadsDir = path.join(process.cwd(), 'public', 'assets', 'images', 'uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Sanitize filename
        const ext = path.extname(file.name) || '.jpg';
        const basename = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
        const filename = `${Date.now()}_${basename}${ext}`;
        const filepath = path.join(uploadsDir, filename);

        fs.writeFileSync(filepath, buffer);

        const publicPath = `/assets/images/uploads/${filename}`;
        return NextResponse.json({ success: true, path: publicPath });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
