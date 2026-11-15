import { PACKAGES, PACKAGES_EMAIL } from "@/lib/constants";

function mailtoFor(packageName: string, emailSubject: string): string {
    const body = `Hi Sachidananda,

I came across your services and I am interested in learning more about the ${packageName}.

My Details:
Name:
Company/Brand:
Industry:
Project Requirement:

I would like to discuss:
- Project goals
- Timeline
- Deliverables
- Pricing and collaboration opportunities

Looking forward to hearing from you.

Best Regards,
[Client Name]`;

    return `mailto:${PACKAGES_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(body)}`;
}

export default function Packages() {
    return (
        <section id="packages" className="band band--rani">
            <div className="wrap">
                <div className="band__head">
                    <h2 className="h-lg">
                        Pick a package. <span className="hl hl--haldi hl--tilt">Let&apos;s connect.</span>
                    </h2>
                    <p className="lede">
                        Choose a service that fits your vision. Hit Connect and an email opens with the brief
                        already started.
                    </p>
                </div>

                <div className="rates">
                    {PACKAGES.map((pkg) => (
                        <article key={pkg.id} className={`rate frame ${pkg.featured ? "rate--star" : ""}`}>
                            <p className="kicker rate__badge">{pkg.badge.replace("⭐ ", "★ ")}</p>
                            <h3 className="rate__name">{pkg.name}</h3>
                            <p>
                                <span className="rate__price">{pkg.price}</span>{" "}
                                <span className="rate__per">{pkg.pricePer}</span>
                            </p>
                            {pkg.priceNote && <p className="rate__note">{pkg.priceNote}</p>}
                            <p className="rate__desc">{pkg.description}</p>
                            <ul className="rate__list">
                                {pkg.features.map((feature) => (
                                    <li key={feature}>{feature}</li>
                                ))}
                            </ul>
                            <a
                                className={`btn ${pkg.featured ? "btn--ink" : "btn--red"}`}
                                href={pkg.ctaLink || mailtoFor(pkg.name, pkg.emailSubject)}
                                aria-label={`Connect about ${pkg.name}`}
                            >
                                {pkg.ctaText} →
                            </a>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
