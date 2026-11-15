import Image from "next/image";
import { TOOLKIT, TOOL_LOGOS } from "@/lib/constants";

export default function Toolkit() {
    return (
        <section id="toolkit" className="band band--paan">
            <div className="wrap">
                <div className="band__head">
                    <h2 className="h-lg">Creative toolkit</h2>
                    <p className="lede">Every tool I actually use in production. No fluff, no filler.</p>
                </div>

                <ul className="logos" aria-label="Software">
                    {TOOL_LOGOS.map((logo) => (
                        <li key={logo.name} className="logo-tile" title={logo.name}>
                            <Image src={logo.src} alt={logo.name} width={96} height={96} />
                        </li>
                    ))}
                </ul>

                <div className="kits">
                    {TOOLKIT.map((group) => (
                        <article key={group.label} className="kit frame">
                            <h3 className="kit__head">{group.label}</h3>
                            <ul className="kit__tools">
                                {group.tools.map((tool) => (
                                    <li key={tool} className="chip">
                                        {tool}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
