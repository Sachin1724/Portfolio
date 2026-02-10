import { supabase } from './firebase';
import { Project } from '@/types';

const PROJECTS_TABLE = 'projects';

/**
 * Get all projects from Supabase
 */
export async function getAllProjects(): Promise<Project[]> {
    try {
        const { data, error } = await supabase
            .from(PROJECTS_TABLE)
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw new Error('Failed to fetch projects');
    }
}

/**
 * Get projects by category (media or development)
 */
export async function getProjectsByCategory(category: 'media' | 'development'): Promise<Project[]> {
    try {
        const { data, error } = await supabase
            .from(PROJECTS_TABLE)
            .select('*')
            .eq('category', category)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error(`Error fetching ${category} projects:`, error);
        throw new Error(`Failed to fetch ${category} projects`);
    }
}

/**
 * Get a single project by ID
 */
export async function getProjectById(id: string): Promise<Project | null> {
    try {
        const { data, error } = await supabase
            .from(PROJECTS_TABLE)
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return null; // Not found
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error fetching project:', error);
        throw new Error('Failed to fetch project');
    }
}

/**
 * Create a new project
 */
export async function createProject(projectData: Omit<Project, 'id'>): Promise<string> {
    try {
        const { data, error } = await supabase
            .from(PROJECTS_TABLE)
            .insert([projectData])
            .select()
            .single();

        if (error) throw error;
        return data.id;
    } catch (error) {
        console.error('Error creating project:', error);
        throw new Error('Failed to create project');
    }
}

/**
 * Update an existing project
 */
export async function updateProject(id: string, projectData: Partial<Project>): Promise<void> {
    try {
        const { error } = await supabase
            .from(PROJECTS_TABLE)
            .update(projectData)
            .eq('id', id);

        if (error) throw error;
    } catch (error) {
        console.error('Error updating project:', error);
        throw new Error('Failed to update project');
    }
}

/**
 * Delete a project
 */
export async function deleteProject(id: string): Promise<void> {
    try {
        const { error } = await supabase
            .from(PROJECTS_TABLE)
            .delete()
            .eq('id', id);

        if (error) throw error;
    } catch (error) {
        console.error('Error deleting project:', error);
        throw new Error('Failed to delete project');
    }
}
