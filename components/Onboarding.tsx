import SectionHead from "@/components/SectionHead";
import { PROCESS_STEPS } from "@/lib/constants";
import KeywordPicker from "@/components/KeywordPicker";

export default function Onboarding() {
    return (
        <section id="onboarding" className="process">
            <div className="wrap">
                <SectionHead
                    label="06 / HOW WE START"
                    title={
                        <>
                            FROM “HI”
                            <br />
                            TO “IT&apos;S DELIVERED.”
                        </>
                    }
                    note="No forms. No calls. Just a DM on Instagram with the package keyword."
                />

                <ol className="process-list">
                    {PROCESS_STEPS.map((step, i) => (
                        <li key={step.num} className="process-row">
                            <div className="num mono">{step.num} ✳</div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                            <div className="arrow" aria-hidden="true">
                                {i === PROCESS_STEPS.length - 1 ? "↗" : "↘"}
                            </div>
                        </li>
                    ))}
                </ol>

                <KeywordPicker />
            </div>
        </section>
    );
}
