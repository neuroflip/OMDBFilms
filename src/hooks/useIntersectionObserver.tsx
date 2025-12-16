import * as React from "react";

const useIntersectionObserver = (callback: () => void) => {
    React.useEffect(() => {
        const intersectionElement = document.getElementById("listIntersectionElement");
        const handleIntersection: IntersectionObserverCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback();
                    if (intersectionElement) {
                        observer.unobserve(intersectionElement);
                    }
                }
            });
        }
        const observer = new IntersectionObserver(handleIntersection);

        if (intersectionElement) {
            observer.observe(intersectionElement);   
        }

        return (() => {
            if (intersectionElement) {
                observer.unobserve(intersectionElement);
            }
        })
    }, [callback])
}

export default useIntersectionObserver;