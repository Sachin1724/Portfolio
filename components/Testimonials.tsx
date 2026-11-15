import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
    return (
        <section id="testimonials" className="band band--neel">
            <div className="wrap">
                <div className="band__head">
                    <h2 className="h-lg">
                        Word on the <span className="hl hl--haldi">street</span>
                    </h2>
                </div>
                <div className="said">
                    {TESTIMONIALS.map((t) => (
                        <blockquote key={t.name} className="quote frame">
                            <p>{t.text}</p>
                            <footer>
                                <cite>{t.name}</cite>
                                <span className="kicker">{t.role}</span>
                            </footer>
                        </blockquote>
                    ))}
                </div>
            </div>
        </section>
    );
}
