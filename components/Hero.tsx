import Image from "next/image";
import { HERO_STATS, RESUME_URL } from "@/lib/constants";

function AvailableBadge() {
    return (
        <svg className="hero__badge" viewBox="0 0 200 200" role="img" aria-label="Available for work">
            <circle cx="100" cy="100" r="97" fill="var(--paan)" stroke="var(--kajal)" strokeWidth="6" />
            <defs>
                <path id="badge-ring" d="M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0" />
            </defs>
            <text
                fill="var(--chuna)"
                fontFamily="var(--mono)"
                fontSize="19.5"
                fontWeight="700"
                letterSpacing="3.2"
            >
                <textPath href="#badge-ring">AVAILABLE FOR WORK ✺ AVAILABLE FOR WORK ✺</textPath>
            </text>
            <circle cx="100" cy="100" r="30" fill="var(--haldi)" stroke="var(--kajal)" strokeWidth="5" />
            <circle cx="100" cy="100" r="11" fill="var(--sindoor)" />
        </svg>
    );
}

export default function Hero() {
    return (
        <section id="home" className="band--haldi">
            <div className="hero">
                <div className="hero__rays" aria-hidden="true" />
                <div className="wrap hero__grid">
                    <div>
                        <p className="hero__hello">
                            <span className="or" lang="or">
                                ନମସ୍କାର
                            </span>
                            I&apos;m Sachin Dada. I edit, code and shoot from Odisha.
                        </p>
                        <h1 className="h-xl hero__title">
                            Build brands people <span className="hl hl--red">remember</span>
                            <span className="hero__amp">&amp; content that converts.</span>
                        </h1>
                        <p className="lede hero__lede">
                            Video, web, branding and content systems, crafted for Odia creators, startups, and
                            brands that want to stand out.
                        </p>
                        <div className="hero__cta">
                            <a href="#work" className="btn btn--ink">
                                See the work ↓
                            </a>
                            <a href="#onboarding" className="btn btn--red">
                                Start a project
                            </a>
                            <a href={RESUME_URL} className="link-arrow" target="_blank" rel="noopener noreferrer">
                                Résumé (PDF) ↗
                            </a>
                        </div>
                        <ul className="stubs">
                            {HERO_STATS.map((stat) => (
                                <li key={stat.label} className="stub">
                                    <span className="stub__num">{stat.value}</span>
                                    <span className="stub__label">{stat.label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="hero__art">
                        <div className="sun">
                            <div className="sun__disc">
                                <Image
                                    src="/assets/images/profile-pic.png"
                                    alt="Sachin Dada"
                                    width={1254}
                                    height={802}
                                    priority
                                    sizes="(max-width: 900px) 520px, 700px"
                                    className="sun__photo"
                                />
                            </div>
                        </div>
                        <AvailableBadge />
                        <p className="hero__name or" lang="or">
                            ସଚିନ ଦାଦା
                        </p>
                    </div>
                </div>
            </div>

            <div className="slate">
                <div className="slate__stripes" aria-hidden="true" />
                <div className="wrap slate__row">
                    <span>
                        <span className="rec" aria-hidden="true">
                            ●
                        </span>{" "}
                        Rec
                    </span>
                    <span>
                        <b>Prod.</b> Sachin Dada
                    </span>
                    <span>
                        <b>Roll</b> Video / Web / Brand
                    </span>
                    <span>
                        <b>Loc.</b> Odisha, India
                    </span>
                    <span>
                        <b>Lang.</b> Odia · Hindi · English
                    </span>
                </div>
            </div>
        </section>
    );
}
