import { useEffect } from "react";

export function ScrollLock({ open, selector = ".w-full.flex-1" }: {
    open: boolean,
    selector?: string
}) {
    useEffect(() => {
        const el = document.querySelector<HTMLElement>(selector);
        if (!el) return;

        if (open) {
            el.style.overflow = "hidden";
            el.style.height = "100vh";
        } else {
            el.style.overflow = "";
            el.style.height = "";
        }

        return () => {
            el.style.overflow = "";
            el.style.height = "";
        };
    }, [open, selector]);

    return null;
}
