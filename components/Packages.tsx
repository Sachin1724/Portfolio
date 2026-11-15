import SectionHead from "@/components/SectionHead";
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
        <section id="packages" className="wrap">
            <SectionHead
                label="05 / PACKAGES"
                title={
                    <>
                        PICK A PACKAGE.
                        <br />
                        LET&apos;S CONNECT.
                    </>
                }
                note="Choose a service that fits your vision. Hit Connect and an email opens with the brief already started."
            />

            <div className="rates">
                {PACKAGES.map((pkg) => (
                    <article key={pkg.id} className={`rate ${pkg.featured ? "rate--star" : ""}`}>
                        <p className="mono rate__badge">{pkg.badge.replace("⭐ ", "✳ ")}</p>
                        <h3>{pkg.name}</h3>
                        <p className="rate__price">
                            {pkg.price} <span className="mono">{pkg.pricePer}</span>
                        </p>
                        {pkg.priceNote && <p className="mono rate__note">{pkg.priceNote}</p>}
                        <p className="rate__desc">{pkg.description}</p>
                        <ul className="rate__list">
                            {pkg.features.map((feature) => (
                                <li key={feature}>{feature}</li>
                            ))}
                        </ul>
                        <a
                            className={`btn ${pkg.featured ? "dark" : "primary"}`}
                            href={pkg.ctaLink || mailtoFor(pkg.name, pkg.emailSubject)}
                            aria-label={`Connect about ${pkg.name}`}
                        >
                            {pkg.ctaText.toUpperCase()} ↗
                        </a>
                    </article>
                ))}
            </div>
        </section>
    );
}
