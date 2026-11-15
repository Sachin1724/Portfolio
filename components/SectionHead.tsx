import { ReactNode } from "react";

export default function SectionHead({ label, title, note, children }: { label: string; title: ReactNode; note?: string; children?: ReactNode }) {
    return (
        <div className="section-head">
            <div>
                <p className="eyebrow mono">{label}</p>
                <h2>{title}</h2>
            </div>
            {note && <p className="section-note">{note}</p>}
            {children}
        </div>
    );
}
