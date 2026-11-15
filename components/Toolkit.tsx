import Image from "next/image";
import SectionHead from "@/components/SectionHead";
import { TOOLKIT, TOOL_LOGOS } from "@/lib/constants";

const VERBS = ["CUT", "BUILD", "SHIP", "SHOOT"];

export default function Toolkit() {
    return (
        <section id="toolkit" className="wrap">
            <SectionHead
                label="03 / MY CREATIVE TOOLBOX"
                title={
                    <>
                        DIFFERENT
                        <br />
                        TOOLS. ONE BRAIN.
                    </>
                }
                note="Every tool I actually use in production. No fluff, no filler."
            />

            <ul className="logos" aria-label="Software">
                {TOOL_LOGOS.map((logo) => (
                    <li key={logo.name} className="logo-tile" title={logo.name}>
                        <Image src={logo.src} alt={logo.name} width={96} height={96} />
                    </li>
                ))}
            </ul>

            <div className="skills-grid">
                {TOOLKIT.map((group, i) => (
                    <article key={group.label} className="skill">
                        <div className="skill-num">
                            {String(i + 1).padStart(2, "0")} / {VERBS[i] ?? "MAKE"}
                        </div>
                        <h3>{group.label}</h3>
                        <ul>
                            {group.tools.map((tool) => (
                                <li key={tool}>{tool}</li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </section>
    );
}
