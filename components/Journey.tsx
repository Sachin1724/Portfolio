import { EXPERIENCE, EDUCATION } from "@/lib/constants";

export default function Journey() {
    return (
        <section id="experience" className="band band--chuna">
            <div className="wrap journey">
                <div className="journey__col">
                    <h2>
                        On the <span className="hl hl--haldi">job</span>
                    </h2>
                    {EXPERIENCE.map((job) => (
                        <article key={job.role + job.organization} className="stint">
                            <p className="stint__when">{job.duration}</p>
                            <div>
                                <h3 className="stint__role">{job.role}</h3>
                                <p className="stint__org">{job.organization}</p>
                                <ul className="stint__list">
                                    {job.responsibilities.map((line) => (
                                        <li key={line}>{line}</li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="journey__col">
                    <h2>
                        In the <span className="hl hl--rani hl--tilt">classroom</span>
                    </h2>
                    {EDUCATION.map((school) => (
                        <article key={school.degree} className="stint">
                            <p className="stint__when">{school.duration}</p>
                            <div>
                                <h3 className="stint__role">{school.degree}</h3>
                                <p className="stint__org">{school.institute}</p>
                                <p className="stint__list">{school.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
