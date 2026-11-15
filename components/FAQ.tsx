import { FAQS } from "@/lib/constants";

export default function FAQ() {
    return (
        <section id="faq" className="band band--chuna dots">
            <div className="wrap faq__grid">
                <div>
                    <h2 className="h-lg">
                        Asked <span className="hl hl--rani">a lot</span>
                    </h2>
                    <p className="lede" style={{ marginTop: "1.75rem" }}>
                        Everything you need to know before we start working together.
                    </p>
                </div>
                <div className="faq__list">
                    {FAQS.map((item, i) => (
                        <details key={item.q} className="faq__item frame" open={i === 0}>
                            <summary>{item.q}</summary>
                            <p>{item.a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
