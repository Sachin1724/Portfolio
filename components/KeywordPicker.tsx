"use client";

import { useState } from "react";
import { DM_KEYWORDS, INSTAGRAM_DM_URL, INSTAGRAM_HANDLE } from "@/lib/constants";

export default function KeywordPicker() {
    const [picked, setPicked] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const pick = async (keyword: string) => {
        setPicked(keyword);
        try {
            await navigator.clipboard.writeText(keyword);
            setCopied(true);
        } catch {
            setCopied(false);
        }
    };

    return (
        <div className="dm frame">
            <h3 className="h-md">Pick your keyword</h3>
            <div className="dm__keys">
                {DM_KEYWORDS.map(({ keyword, desc }) => (
                    <button
                        key={keyword}
                        type="button"
                        className="key"
                        aria-pressed={picked === keyword}
                        onClick={() => pick(keyword)}
                    >
                        <span className="key__word">{keyword}</span>
                        <span className="key__desc">{desc}</span>
                    </button>
                ))}
            </div>
            <div className="dm__foot">
                <a className="btn btn--red" href={INSTAGRAM_DM_URL} target="_blank" rel="noopener noreferrer">
                    DM @{INSTAGRAM_HANDLE} ↗
                </a>
                <p className="dm__status" role="status">
                    {picked
                        ? copied
                            ? `${picked} copied. Paste it in the DM.`
                            : `Send "${picked}" in the DM.`
                        : "Tap a keyword to copy it, then send it on Instagram."}
                </p>
            </div>
        </div>
    );
}
