import { NextRequest, NextResponse } from 'next/server';
import {
    getProjectById,
    updateProject,
    deleteProject,
} from '@/lib/firestore-projects';
import { deleteImage } from '@/lib/upload-service';

// GET - Fetch a single project by ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const project = await getProjectById(id);

        if (!project) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: project });
    } catch (error: any) {
        console.error('Error fetching project:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to fetch project' },
            { status: 500 }
        );
    }
}

// PUT - Update a project
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        // Check if project exists
        const existingProject = await getProjectById(id);
        if (!existingProject) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            );
        }

        // If image is being replaced, delete the old one
        if (body.image && body.image !== existingProject.image && existingProject.image) {
            await deleteImage(existingProject.image);
        }

        // Update project
        await updateProject(id, body);

        return NextResponse.json({ success: true, message: 'Project updated successfully' });
    } catch (error: any) {
        console.error('Error updating project:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to update project' },
            { status: 500 }
        );
    }
}

// DELETE - Delete a project
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        // Get project to access image URL
        const project = await getProjectById(id);

        if (!project) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            );
        }

        // Delete associated image
        if (project.image) {
            await deleteImage(project.image);
        }

        // Delete project
        await deleteProject(id);

        return NextResponse.json({ success: true, message: 'Project deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting project:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to delete project' },
            { status: 500 }
        );
    }
}
