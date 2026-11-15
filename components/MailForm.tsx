"use client";

import { FormEvent } from "react";
import { CONTACT_EMAIL } from "@/lib/constants";

export default function MailForm() {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const subject = String(data.get("subject") ?? "");
        const message = String(data.get("message") ?? "");
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    };

    return (
        <div className="mailer">
            <p className="eyebrow mono">DIRECT MAIL</p>
            <p>Prefer email? This opens your mail app with the message ready to send.</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="mail-subject" className="mono">
                    Subject
                    <input id="mail-subject" name="subject" type="text" required placeholder="Reel retainer for my brand" />
                </label>
                <label htmlFor="mail-message" className="mono">
                    Message
                    <textarea
                        id="mail-message"
                        name="message"
                        rows={5}
                        required
                        placeholder="What you need, your budget, and your timeline."
                    />
                </label>
                <button type="submit" className="btn dark">
                    OPEN IN MAIL APP ↗
                </button>
            </form>
        </div>
    );
}
