import SectionHead from "@/components/SectionHead";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
    return (
        <section id="testimonials" className="said-band">
            <div className="wrap">
                <SectionHead
                    label="09 / WORD ON THE STREET"
                    title={
                        <>
                            NICE THINGS
                            <br />
                            PEOPLE SAID.
                        </>
                    }
                />
                <div className="said">
                    {TESTIMONIALS.map((t) => (
                        <blockquote key={t.name} className="quote">
                            <p>{t.text}</p>
                            <footer>
                                <cite>{t.name}</cite>
                                <span className="mono">{t.role}</span>
                            </footer>
                        </blockquote>
                    ))}
                </div>
            </div>
        </section>
    );
}
