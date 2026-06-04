import { NextResponse } from 'next/server';

// Extract YouTube video ID from any YouTube URL format
function getYouTubeId(url: string): string | null {
    const patterns = [
        /youtu\.be\/([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    ];
    for (const p of patterns) {
        const m = url.match(p);
        if (m) return m[1];
    }
    return null;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
    }

    try {
        // ── YouTube: use their free thumbnail CDN (no API key needed)
        const ytId = getYouTubeId(url);
        if (ytId) {
            // Try maxresdefault first, fall back to hqdefault
            const thumbnail = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
            return NextResponse.json({ thumbnail, source: 'youtube' });
        }

        // ── Instagram & other URLs: fetch Open Graph meta tag
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)',
                'Accept': 'text/html',
            },
            signal: AbortSignal.timeout(5000),
        });

        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

        const html = await res.text();

        // Extract og:image from meta tags
        const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
                     || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);

        if (ogMatch && ogMatch[1]) {
            return NextResponse.json({ thumbnail: ogMatch[1], source: 'og' });
        }

        return NextResponse.json({ thumbnail: null, source: 'none' });
    } catch (err: any) {
        // Don't crash — just return null so the UI falls back gracefully
        return NextResponse.json({ thumbnail: null, error: err.message }, { status: 200 });
    }
}
