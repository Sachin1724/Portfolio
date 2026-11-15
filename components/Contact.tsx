import { SOCIAL_LINKS, CONTACT_EMAIL } from "@/lib/constants";
import MailForm from "@/components/MailForm";

const HANDLES: Record<string, string> = {
    Instagram: "@iamsachindada",
    YouTube: "@sachindadaorginals",
    GitHub: "@Sachin1724",
    LinkedIn: "sachidananda-mallick",
};
const ORDER = ["Instagram", "YouTube", "GitHub", "LinkedIn"];

export default function Contact() {
    const links = [...SOCIAL_LINKS].sort((a, b) => ORDER.indexOf(a.name) - ORDER.indexOf(b.name));

    return (
        <section id="contact" className="band band--kajal">
            <div className="wrap">
                <h2 className="h-xl contact__title">
                    Let&apos;s work <span className="hl hl--red">together.</span>
                </h2>

                <div className="contact__grid">
                    <div>
                        <ul className="reach">
                            {links.map((link) => (
                                <li key={link.name}>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                        <span className="reach__name">{link.name}</span>
                                        <span className="reach__handle">{HANDLES[link.name]} ↗</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <p className="contact__mail">
                            Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                        </p>
                    </div>
                    <MailForm />
                </div>
            </div>
        </section>
    );
}
