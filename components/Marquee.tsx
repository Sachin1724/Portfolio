import { Fragment } from "react";
import { TICKER_SKILLS } from "@/lib/constants";

function Track({ hidden }: { hidden?: boolean }) {
    return (
        <span aria-hidden={hidden}>
            {TICKER_SKILLS.map((skill) => (
                <Fragment key={skill}>
                    {skill.toUpperCase()} <b>✳</b>
                </Fragment>
            ))}
        </span>
    );
}

export default function Marquee() {
    return (
        <div className="ticker">
            <div className="ticker-track">
                <Track />
                <Track hidden />
            </div>
        </div>
    );
}
