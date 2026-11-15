import { PROCESS_STEPS } from "@/lib/constants";
import KeywordPicker from "@/components/KeywordPicker";

export default function Onboarding() {
    return (
        <section id="onboarding" className="band band--haldi">
            <div className="wrap">
                <div className="band__head">
                    <p className="kicker">How we start</p>
                    <h2 className="h-lg">
                        No forms. No calls. <span className="hl hl--red">DM a keyword.</span>
                    </h2>
                </div>

                <div className="film">
                    <ol className="film__frames">
                        {PROCESS_STEPS.map((step) => (
                            <li key={step.num} className="film__frame">
                                <span className="film__num">{step.num}</span>
                                <h3 className="film__title">{step.title}</h3>
                                <p className="film__desc">{step.description}</p>
                            </li>
                        ))}
                    </ol>
                </div>

                <KeywordPicker />
            </div>
        </section>
    );
}
