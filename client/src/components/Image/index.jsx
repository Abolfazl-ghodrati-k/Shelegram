import React, { useEffect, useState } from "react";
import "./style.css";

const CustomImage = ({ source, size }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const image = new Image();
        image.src = source;
        image.onload = () => setIsLoading(false);
        image.onerror = () => {
            setIsLoading(false);
            setIsError(true);
        };
    }, [source]);

    return (
        <div className="thumbnail-container">
            {isLoading && (
                <div
                    className="loading-circle"
                    style={{ width: size || 30, height: size || 30 }}
                ></div>
            )}
            {!isError && !isLoading && (
                <img
                    src={source}
                    className={`thumbnail-image ${isLoading ? "hidden" : ""}`}
                    alt="profile"
                    width={size || 30}
                    height={size || 30}
                />
            )}
            {isError && (
                <div
                    className="thumbnail-error"
                    style={{
                        width: size || 30,
                        height: size || 30,
                    }}
                >
                    P
                </div>
            )}
        </div>
    );
};

export default CustomImage;
