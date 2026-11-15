import Image from "next/image";
import { EQUIPMENT } from "@/lib/constants";

export default function Gear() {
    return (
        <section id="gadgets" className="band band--kajal">
            <div className="wrap">
                <div className="band__head">
                    <h2 className="h-lg" style={{ color: "var(--haldi)" }}>
                        The kit bag
                    </h2>
                    <p className="lede">What I shoot, record and edit on.</p>
                </div>

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
                                <p className="kicker gear__type">{item.type}</p>
                                <h3 className="gear__model">{item.model}</h3>
                                <p className="gear__use">{item.usage}</p>
                                {item.specs && item.specs.length > 0 && (
                                    <details className="gear__specs">
                                        <summary>Specs</summary>
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
