import { NextRequest, NextResponse } from 'next/server';
import {
    getAllProjects,
    getProjectsByCategory,
    createProject,
} from '@/lib/firestore-projects';
import { Project } from '@/types';

// GET - Fetch all projects or filter by category
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category') as 'media' | 'development' | null;

        let projects: Project[];

        if (category) {
            projects = await getProjectsByCategory(category);
        } else {
            projects = await getAllProjects();
        }

        return NextResponse.json({ success: true, data: projects });
    } catch (error: any) {
        console.error('Error fetching projects:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}

// POST - Create a new project
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        const { title, description, category, image } = body;

        if (!title || !description || !category || !image) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate category
        if (!['media', 'development'].includes(category)) {
            return NextResponse.json(
                { success: false, error: 'Invalid category' },
                { status: 400 }
            );
        }

        // Create project
        const projectId = await createProject(body);

        return NextResponse.json(
            { success: true, data: { id: projectId } },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating project:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create project' },
            { status: 500 }
        );
    }
}
