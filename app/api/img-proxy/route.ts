import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
        return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
    }

    try {
        const res = await fetch(imageUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)',
                'Referer': 'https://www.instagram.com/',
                'Accept': 'image/*,*/*',
            },
            signal: AbortSignal.timeout(8000),
        });

        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch image' }, { status: 502 });
        }

        const contentType = res.headers.get('content-type') || 'image/jpeg';
        const buffer = await res.arrayBuffer();

        return new Response(buffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=3600',
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
