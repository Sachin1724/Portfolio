import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const dataFilePath = path.join(process.cwd(), 'data', 'projects.json');
        const data = fs.readFileSync(dataFilePath, 'utf-8');
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // Define path to data/projects.json
        const dataFilePath = path.join(process.cwd(), 'data', 'projects.json');
        
        // Write the updated data back to the file
        fs.writeFileSync(dataFilePath, JSON.stringify(body, null, 2), 'utf-8');
        
        return NextResponse.json({ success: true, message: 'Projects updated successfully' });
    } catch (error: any) {
        console.error('Error saving projects:', error);
        return NextResponse.json({ success: false, message: 'Failed to update projects', error: error.message }, { status: 500 });
    }
}
