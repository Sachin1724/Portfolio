import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const PROJECTS_KEY = 'portfolio:projects';

// Initialize Redis only if env vars are present (safe for local dev without KV)
function getRedis(): Redis | null {
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
        return new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL,
            token: process.env.UPSTASH_REDIS_REST_TOKEN,
        });
    }
    return null;
}

// Fallback: read from local JSON file (used locally when Redis is not configured)
function readLocalJson() {
    try {
        const dataFilePath = path.join(process.cwd(), 'data', 'projects.json');
        const data = fs.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(data);
    } catch {
        return { MEDIA_PROJECTS: [], DEV_PROJECTS: [] };
    }
}

export async function GET() {
    try {
        const redis = getRedis();

        if (redis) {
            // Production: read from Upstash Redis
            const data = await redis.get<object>(PROJECTS_KEY);
            if (data) {
                return NextResponse.json(data);
            }
            // Redis is configured but key doesn't exist yet — seed from local JSON
            const localData = readLocalJson();
            await redis.set(PROJECTS_KEY, JSON.stringify(localData));
            return NextResponse.json(localData);
        }

        // Local dev without Redis: read from local JSON file
        return NextResponse.json(readLocalJson());
    } catch (error: any) {
        console.error('Error reading projects:', error);
        return NextResponse.json({ error: 'Failed to read projects', detail: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const redis = getRedis();

        if (redis) {
            // Production: save to Upstash Redis
            await redis.set(PROJECTS_KEY, JSON.stringify(body));
            return NextResponse.json({ success: true, message: 'Projects saved to Upstash Redis!' });
        }

        // Local dev fallback: write to local JSON file
        const dataFilePath = path.join(process.cwd(), 'data', 'projects.json');
        fs.writeFileSync(dataFilePath, JSON.stringify(body, null, 2), 'utf-8');
        return NextResponse.json({ success: true, message: 'Projects saved locally (dev mode).' });

    } catch (error: any) {
        console.error('Error saving projects:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to save projects',
            error: error.message
        }, { status: 500 });
    }
}

