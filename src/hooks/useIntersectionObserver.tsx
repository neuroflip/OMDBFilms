import * as React from "react";

const useIntersectionObserver = (callback: () => void, needsToCallback: boolean) => {
    const intersectionElementRef = React.useRef<HTMLDivElement | null>(null);
    const handleIntersection: IntersectionObserverCallback = React.useCallback((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (intersectionElementRef.current) {
                    observer.unobserve(intersectionElementRef.current);
                    if (needsToCallback) {
                        callback();
                    }
                }
            }
        });
    }, [callback, needsToCallback]);
    const observer = new IntersectionObserver(handleIntersection);

    React.useEffect(() => {
        if (intersectionElementRef.current) {
            observer.observe(intersectionElementRef.current);
        }

        return (() => {
            if (intersectionElementRef.current) {
                observer.unobserve(intersectionElementRef.current);
            }
        });
    }, [handleIntersection]);

    return intersectionElementRef
}

export default useIntersectionObserver;