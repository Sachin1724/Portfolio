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
        <div className="mailer frame">
            <h3 className="h-md">Direct mail</h3>
            <p style={{ marginTop: "0.5rem" }}>Prefer email? This opens your mail app with the message ready to send.</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="mail-subject">
                    Subject
                    <input id="mail-subject" name="subject" type="text" required placeholder="Reel retainer for my brand" />
                </label>
                <label htmlFor="mail-message">
                    Message
                    <textarea
                        id="mail-message"
                        name="message"
                        rows={5}
                        required
                        placeholder="What you need, your budget, and your timeline."
                    />
                </label>
                <button type="submit" className="btn btn--red">
                    Open in mail app →
                </button>
            </form>
        </div>
    );
}
