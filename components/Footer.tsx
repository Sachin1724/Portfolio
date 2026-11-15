import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
    return (
        <footer className="band--haldi footer">
            <div className="wrap">
                <p className="footer__word or" lang="or" aria-label="Sachin Dada">
                    ସଚିନ ଦାଦା
                </p>
                <div className="footer__row">
                    <nav className="footer__links" aria-label="Footer sections">
                        {NAV_LINKS.map((link) => (
                            <a key={link.href} href={link.href}>
                                {link.name}
                            </a>
                        ))}
                    </nav>
                    <div className="footer__links">
                        {SOCIAL_LINKS.map((link) => (
                            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer">
                                {link.name} ↗
                            </a>
                        ))}
                    </div>
                </div>
                <p className="footer__fine">
                    <span lang="or">ଧନ୍ୟବାଦ</span> · Designed &amp; built by Sachin · © {new Date().getFullYear()} Sachin
                    Mallick
                </p>
            </div>
        </footer>
    );
}
