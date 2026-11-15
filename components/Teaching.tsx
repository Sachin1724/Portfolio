import { CONTENT_CARDS, IG_STATS, INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/constants";

const TAGS = ["DEV", "BTS", "LAB"];

export default function Teaching() {
    return (
        <section id="content" className="band band--sindoor teach">
            <p className="teach__ghost or" lang="or" aria-hidden="true">
                ଓଡ଼ିଆ
            </p>
            <div className="wrap teach__grid">
                <div>
                    <h2 className="h-lg">
                        Teaching code in <span className="hl hl--haldi hl--tilt">Odia.</span>
                    </h2>
                    <p className="lede" style={{ marginTop: "2rem" }}>
                        Most coding content in India is in Hindi or English. I create dev content in Odia so that
                        students from Odisha don&apos;t have to feel left behind.
                    </p>
                    <dl className="teach__stats">
                        {IG_STATS.map((stat) => (
                            <div key={stat.label}>
                                <dd>
                                    <b>{stat.value}</b>
                                </dd>
                                <dt className="kicker">{stat.label}</dt>
                            </div>
                        ))}
                    </dl>
                    <a className="btn btn--paper" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                        Follow @{INSTAGRAM_HANDLE} ↗
                    </a>
                </div>

                <ul className="teach__cards">
                    {CONTENT_CARDS.map((card, i) => (
                        <li key={card.title} className="teach__card frame">
                            <span className="teach__tag">{TAGS[i] ?? "MORE"}</span>
                            <h3>{card.title}</h3>
                            <p>{card.subtitle}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
