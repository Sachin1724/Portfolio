import Image from "next/image";
import { CURRENTLY_BUILDING, INSTAGRAM_HANDLE } from "@/lib/constants";

export default function About() {
    return (
        <section id="about" className="band band--chuna dots">
            <div className="wrap about__grid">
                <div>
                    <h2 className="h-xl about__title">
                        <span className="hl hl--haldi">Builder.</span>
                        <span className="hl hl--rani">Creator.</span>
                        <span className="hl hl--paan">Odia.</span>
                    </h2>

                    <div className="about__bio">
                        <p>
                            I&apos;m a <strong>B.Tech student from Odisha</strong> who builds things on the internet:
                            websites, reels, motion graphics, and content that actually makes sense to
                            Odia-speaking people.
                        </p>
                        <p>
                            My audience is mostly <mark>Odia developers and students</mark> learning to code. I make
                            content in Odia so that language is never a barrier.
                        </p>
                        <p>
                            I take <strong>freelance projects</strong>, from startup landing pages to full video
                            editing retainers. No unnecessary calls. Just clean work delivered on time.
                        </p>
                    </div>

                    <div className="now">
                        <h3 className="kicker">Currently building</h3>
                        <ul className="now__list">
                            {CURRENTLY_BUILDING.map((item) => (
                                <li key={item.title}>
                                    {item.title}
                                    <span className="chip">{item.tag}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="about__art">
                    <figure className="polaroid frame">
                        <span className="tape tape--rani" aria-hidden="true" />
                        <Image
                            src="/assets/images/profile.jpg"
                            alt="Sachin in an orange hoodie with an event lanyard"
                            width={720}
                            height={720}
                            sizes="(max-width: 900px) 80vw, 360px"
                        />
                        <figcaption>@{INSTAGRAM_HANDLE}</figcaption>
                    </figure>
                    <Image
                        src="/assets/images/intro.png"
                        alt="Cartoon of Sachin holding a phone and a laptop"
                        width={1536}
                        height={1024}
                        sizes="300px"
                        className="about__toon"
                    />
                </div>
            </div>
        </section>
    );
}
