import SectionHead from "@/components/SectionHead";
import { CONTENT_CARDS, IG_STATS, IG_PERIOD, IG_FOLLOWERS, INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/constants";

const TAGS = ["DEV", "BTS", "LAB"];

export default function Teaching() {
    return (
        <section id="content" className="wrap">
            <SectionHead
                label="07 / CONTENT THAT HAS ROOTS"
                title={
                    <>
                        TEACHING CODE
                        <br />
                        IN ODIA.
                    </>
                }
                note="Most coding content in India is in Hindi or English. I create dev content in Odia so that students from Odisha don't have to feel left behind."
            />

            <div className="teach">
                <div className="teach__card">
                    <div className="mono">INSTAGRAM · {IG_PERIOD}</div>
                    <div className="big-num">{IG_STATS[0].value}</div>
                    <div className="scribble">
                        reel views in 30 days.
                        <br />
                        {IG_FOLLOWERS} followers and counting.
                    </div>
                    <a className="btn dark" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                        FOLLOW @{INSTAGRAM_HANDLE.toUpperCase()} ↗
                    </a>
                    <div className="asterisk" aria-hidden="true">
                        ✳
                    </div>
                </div>

                <div>
                    <dl className="stats">
                        {[{ value: IG_FOLLOWERS, label: "Followers" }, ...IG_STATS.slice(1)].map((stat) => (
                            <div key={stat.label} className="stat">
                                <dd>{stat.value}</dd>
                                <dt className="mono">{stat.label}</dt>
                            </div>
                        ))}
                    </dl>
                    <ul className="rows teach__rows">
                        {CONTENT_CARDS.map((card, i) => (
                            <li key={card.title}>
                                <span className="mono">{TAGS[i] ?? "MORE"}</span>
                                <span>
                                    <b>{card.title}</b>
                                    <small>{card.subtitle}</small>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
