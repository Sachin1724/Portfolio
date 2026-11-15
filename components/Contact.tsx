import { SOCIAL_LINKS, CONTACT_EMAIL, BRAND, INSTAGRAM_DM_URL, INSTAGRAM_HANDLE } from "@/lib/constants";
import MailForm from "@/components/MailForm";

export default function Contact() {
    return (
        <section id="contact" className="contact">
            <div className="wrap">
                <div className="contact-panel">
                    <div>
                        <p className="eyebrow mono">11 / YOUR TURN</p>
                        <h2>
                            LET&apos;S
                            <br />
                            <span>WORK</span>
                            <br />
                            TOGETHER.
                        </h2>
                        <a className="btn dark" href={INSTAGRAM_DM_URL} target="_blank" rel="noopener noreferrer">
                            DM @{INSTAGRAM_HANDLE.toUpperCase()} ↗
                        </a>
                        <div className="contact-side">
                            <span className="mono">OPEN FOR COLLABORATIONS</span>
                            <p>
                                Whether it&apos;s a brand identity, a cinematic reel, or a full website, let&apos;s make
                                it happen.
                            </p>
                            <div className="contact-links">
                                {SOCIAL_LINKS.map((link) => (
                                    <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer">
                                        {link.name.toUpperCase()} ↗
                                    </a>
                                ))}
                            </div>
                            <p className="mono contact-mail">
                                EMAIL · <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                            </p>
                        </div>
                    </div>
                    <MailForm />
                </div>

                <footer className="footer">
                    <span className="brand">
                        {BRAND}
                        <span>®</span>
                    </span>
                    <span>DESIGNED &amp; BUILT BY SACHIN. BUILDING THINGS THAT MATTER.</span>
                    <span className="mono">© {new Date().getFullYear()} SACHIN MALLICK / IAMSACHINDADA</span>
                </footer>
            </div>
        </section>
    );
}
