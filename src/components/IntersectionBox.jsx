import React, { useEffect, useRef, useState } from 'react';

const IntersectionBox = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const boxRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.5 
            }
        );

        if (boxRef.current) {
            observer.observe(boxRef.current);
        }

        return () => {
            if (boxRef.current) {
                observer.unobserve(boxRef.current);
            }
        };
    }, []);

    return (
        <div ref={boxRef} className={isVisible ? 'show' : 'hide'}>
            {children}
        </div>
    );
};

export default IntersectionBox;
