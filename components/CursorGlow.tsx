"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
    const dotRef = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: -200, y: -200 });

    useEffect(() => {
        // mouse move — dot follows immediately via transform
        const onMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
            }
        };

        // hover state on interactive elements
        const onEnter = () => {
            dotRef.current?.classList.add("hovering");
        };
        const onLeave = () => {
            dotRef.current?.classList.remove("hovering");
        };

        const attachHover = () => {
            document.querySelectorAll("a, button, [data-cursor]").forEach(el => {
                el.addEventListener("mouseenter", onEnter);
                el.addEventListener("mouseleave", onLeave);
            });
        };

        window.addEventListener("mousemove", onMove);
        attachHover();

        // re-attach on DOM changes
        const observer = new MutationObserver(attachHover);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", onMove);
            observer.disconnect();
        };
    }, []);

    return <div ref={dotRef} className="cursor-dot" />;
}
