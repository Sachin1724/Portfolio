import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

export const useScrollReveal = (threshold = 0.1) => {
    const { ref, inView } = useInView({
        threshold,
        triggerOnce: true,
    });

    return { ref, inView };
};
