import Image from "next/image";
import SectionHead from "@/components/SectionHead";
import { EQUIPMENT } from "@/lib/constants";

export default function Gear() {
    return (
        <section id="gadgets" className="gear-band">
            <div className="wrap">
                <SectionHead
                    label="04 / THE KIT BAG"
                    title={
                        <>
                            SHOT ON
                            <br />
                            THIS STUFF.
                        </>
                    }
                    note="What I shoot, record and edit on."
                />

                <div className="gear">
                    {EQUIPMENT.map((item) => (
                        <article key={item.model} className="gear__item">
                            {item.image && (
                                <Image
                                    src={item.image}
                                    alt={item.model}
                                    width={640}
                                    height={480}
                                    sizes="(max-width: 560px) 92vw, (max-width: 900px) 46vw, 380px"
                                    className="gear__img"
                                />
                            )}
                            <div className="gear__body">
                                <p className="mono gear__type">{item.type}</p>
                                <h3>{item.model}</h3>
                                <p className="gear__use">{item.usage}</p>
                                {item.specs && item.specs.length > 0 && (
                                    <details className="gear__specs">
                                        <summary className="mono">Specs</summary>
                                        <ul>
                                            {item.specs.map((spec) => (
                                                <li key={spec}>{spec}</li>
                                            ))}
                                        </ul>
                                    </details>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
