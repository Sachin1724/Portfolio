import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

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

// Extract Instagram reel/post shortcode
function getInstagramShortcode(url: string): string | null {
    const m = url.match(/instagram\.com\/(?:reel|p|tv)\/([A-Za-z0-9_-]+)/);
    return m ? m[1] : null;
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
            // Try maxresdefault first
            const thumbnail = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
            return NextResponse.json({ thumbnail, source: 'youtube' });
        }

        // ── Instagram: use oEmbed API (no auth needed, returns thumbnail_url)
        const igCode = getInstagramShortcode(url);
        if (igCode) {
            try {
                const oembedUrl = `https://www.instagram.com/oembed/?url=https://www.instagram.com/p/${igCode}/&maxwidth=640`;
                const res = await fetch(oembedUrl, {
                    headers: { 'User-Agent': 'Mozilla/5.0' },
                    signal: AbortSignal.timeout(6000),
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.thumbnail_url) {
                        // Proxy through our server to bypass CDN hotlink protection
                        const proxied = `/api/img-proxy?url=${encodeURIComponent(data.thumbnail_url)}`;
                        return NextResponse.json({ thumbnail: proxied, source: 'instagram-oembed' });
                    }
                }
            } catch {
                // fallthrough to generic OG scrape
            }
        }

        // ── Generic: fetch Open Graph meta tag
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)',
                'Accept': 'text/html',
            },
            signal: AbortSignal.timeout(6000),
        });

        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

        const html = await res.text();

        // Extract og:image from meta tags
        const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
                     || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);

        if (ogMatch && ogMatch[1]) {
            const proxied = `/api/img-proxy?url=${encodeURIComponent(ogMatch[1])}`;
            return NextResponse.json({ thumbnail: proxied, source: 'og' });
        }

        return NextResponse.json({ thumbnail: null, source: 'none' });
    } catch (err: any) {
        // Don't crash — just return null so the UI falls back gracefully
        return NextResponse.json({ thumbnail: null, error: err.message }, { status: 200 });
    }
}
