import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
    /** 
     * Distance before the element enters the viewport to trigger fetch (e.g. '200px' pre-fetches before user actually reaches it)
     */
    rootMargin?: string;
}

export const useInView = <T extends HTMLElement = HTMLDivElement>(options: UseInViewOptions = {}) => {
    const { rootMargin = "200px" } = options;
    const ref = useRef<T | null>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element || isInView) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect(); // Stop observing once triggered
                }
            },
            { rootMargin }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [isInView, rootMargin]);

    return { ref, isInView };
};
