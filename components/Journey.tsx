import SectionHead from "@/components/SectionHead";
import { EXPERIENCE, EDUCATION } from "@/lib/constants";

export default function Journey() {
    return (
        <section id="experience" className="wrap">
            <SectionHead
                label="08 / THE ROAD SO FAR"
                title={
                    <>
                        ON THE JOB.
                        <br />
                        IN THE CLASSROOM.
                    </>
                }
            />
            <div className="journey">
                <div>
                    <p className="eyebrow mono">EXPERIENCE</p>
                    {EXPERIENCE.map((job) => (
                        <article key={job.role + job.organization} className="stint">
                            <p className="mono stint__when">{job.duration}</p>
                            <div>
                                <h3>{job.role}</h3>
                                <p className="mono stint__org">{job.organization}</p>
                                <ul>
                                    {job.responsibilities.map((line) => (
                                        <li key={line}>{line}</li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    ))}
                </div>
                <div>
                    <p className="eyebrow mono">EDUCATION</p>
                    {EDUCATION.map((school) => (
                        <article key={school.degree} className="stint">
                            <p className="mono stint__when">{school.duration}</p>
                            <div>
                                <h3>{school.degree}</h3>
                                <p className="mono stint__org">{school.institute}</p>
                                <p className="stint__note">{school.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
