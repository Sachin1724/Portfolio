import Image from "next/image";
import SectionHead from "@/components/SectionHead";
import { CURRENTLY_BUILDING, INSTAGRAM_HANDLE, ABOUT_SKILLS } from "@/lib/constants";

export default function About() {
    return (
        <section id="about" className="wrap">
            <SectionHead
                label="02 / THE HUMAN BEHIND THE PIXELS"
                title={
                    <>
                        BUILDER. CREATOR.
                        <br />
                        ODIA.
                    </>
                }
                note="Part developer. Part editor. Fully from Odisha."
            />

            <div className="about-grid">
                <div className="about-card">
                    <div className="mono">@{INSTAGRAM_HANDLE}</div>
                    <Image
                        src="/assets/images/profile.jpg"
                        alt="Sachin in an orange hoodie with an event lanyard"
                        width={720}
                        height={720}
                        sizes="(max-width: 800px) 80vw, 420px"
                        className="about-card__photo"
                    />
                    <Image
                        src="/assets/images/intro.png"
                        alt="Cartoon of Sachin holding a phone and a laptop"
                        width={1536}
                        height={1024}
                        sizes="260px"
                        className="about-card__toon"
                    />
                </div>

                <div>
                    <p className="about-copy">
                        I&apos;m a <strong>B.Tech student from Odisha</strong> who builds things on the internet:
                        websites, reels, motion graphics, and content that actually makes sense to Odia-speaking
                        people.
                    </p>
                    <p className="about-copy">
                        My audience is mostly <strong>Odia developers and students</strong> learning to code. I
                        take freelance projects, from startup landing pages to full video editing retainers.{" "}
                        <strong>No unnecessary calls. Just clean work delivered on time.</strong>
                    </p>
                    <div className="chips">
                        {ABOUT_SKILLS.map((skill) => (
                            <span key={skill} className="chip">
                                {skill}
                            </span>
                        ))}
                    </div>

                    <div className="now">
                        <p className="eyebrow mono">CURRENTLY BUILDING</p>
                        <ul className="rows">
                            {CURRENTLY_BUILDING.map((item) => (
                                <li key={item.title}>
                                    <span>{item.title}</span>
                                    <span className="chip">{item.tag}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
