import Image from "next/image";
import { HERO_STATS, RESUME_URL, BRAND } from "@/lib/constants";

export default function Hero() {
    return (
        <section className="wrap hero">
            <div className="hero-top">
                <span className="pill mono">
                    <span className="dot" /> AVAILABLE FOR WORK
                </span>
                <span className="mono">INDEPENDENT CREATOR · ODISHA, INDIA ↘</span>
            </div>

            <div className="hero-grid">
                <div>
                    <h1>
                        HELLO,<span className="line2">I&apos;M</span>
                        <span className="line3">{BRAND}.</span>
                    </h1>
                    <p className="hero-desc">
                        I build <strong>brands people remember</strong> and content that converts. Video, web,
                        branding and content systems for Odia creators, startups and brands that want to stand out.
                    </p>
                    <div className="hero-actions">
                        <a className="btn primary" href="#work">
                            EXPLORE MY WORK <span>↘</span>
                        </a>
                        <a className="btn" href="#onboarding">
                            START A PROJECT ↗
                        </a>
                        <a className="btn" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                            RÉSUMÉ ↗
                        </a>
                    </div>
                    <ul className="hero-stats">
                        {HERO_STATS.map((stat) => (
                            <li key={stat.label}>
                                <b>{stat.value}</b>
                                <span className="mono">{stat.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="hero-art">
                    <div className="sunburst" />
                    <div className="portrait">
                        <Image
                            src="/assets/images/profile-pic.png"
                            alt="Sachin Dada"
                            width={1254}
                            height={802}
                            priority
                            sizes="(max-width: 800px) 420px, 600px"
                        />
                        <div className="portrait-label">
                            <span>MADE IN ODISHA</span>
                            <span>✳ 2026</span>
                        </div>
                    </div>
                    <div className="sticker sticker-star" aria-hidden="true">
                        ✳
                    </div>
                    <div className="sticker sticker-dev">CODE × CREATE</div>
                    <div className="sticker sticker-od">ODIA ROOTS ↗</div>
                </div>
            </div>
        </section>
    );
}
