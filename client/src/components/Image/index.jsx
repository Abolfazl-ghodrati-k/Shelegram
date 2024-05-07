import React, { useState } from "react";
import "./style.css";

const Image = ({ source, size }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);


    const handleImageError = () => {
        setIsLoading(false);
        setIsError(true);
    };

    return (
        <div className="thumbnail-container">
            {!isError && (
                <img
                    src={source}
                    className={`thumbnail-image ${isLoading ? "hidden" : ""}`}
                    alt="profile"
                    width={size ?? 30}
                    height={size ?? 30}
                    onError={handleImageError}
                />
            )}
            {isError && (
                <div
                    className="thumbnail-error"
                    style={{
                        width: size ?? 30 + "px",
                        height: size ?? 30 + "px",
                    }}
                >
                    P
                </div>
            )}
        </div>
    );
};

export default Image;
