import { Fragment } from "react";
import { TICKER_SKILLS } from "@/lib/constants";

function Track({ hidden }: { hidden?: boolean }) {
    return (
        <div className="marquee__track" aria-hidden={hidden}>
            <span className="marquee__item marquee__item--or" lang="or">
                ସଚିନ ଦାଦା
            </span>
            <span className="marquee__star">✺</span>
            {TICKER_SKILLS.map((skill) => (
                <Fragment key={skill}>
                    <span className="marquee__item">{skill}</span>
                    <span className="marquee__star">✺</span>
                </Fragment>
            ))}
        </div>
    );
}

export default function Marquee() {
    return (
        <div className="marquee">
            <Track />
            <Track hidden />
        </div>
    );
}
