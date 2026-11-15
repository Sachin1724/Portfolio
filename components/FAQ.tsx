import SectionHead from "@/components/SectionHead";
import { FAQS } from "@/lib/constants";

export default function FAQ() {
    return (
        <section id="faq" className="wrap">
            <SectionHead
                label="10 / ASKED A LOT"
                title={
                    <>
                        BEFORE
                        <br />
                        WE START.
                    </>
                }
                note="Everything you need to know before we start working together."
            />
            <div className="faq">
                {FAQS.map((item, i) => (
                    <details key={item.q} open={i === 0}>
                        <summary>
                            <span className="mono">{String(i + 1).padStart(2, "0")} ✳</span>
                            {item.q}
                        </summary>
                        <p>{item.a}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}
