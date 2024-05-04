import { useState, useEffect } from "react";

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                // Adjust the threshold as needed for mobile size
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        window.addEventListener("resize", handleResize); // Listen to resize events

        // Check on initial render as well
        handleResize();

        return () => window.removeEventListener("resize", handleResize); // Clean up event listener
    }, []);

    return isMobile;
};

export default useIsMobile;
