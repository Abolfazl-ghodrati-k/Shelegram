import React, { useState } from "react";
import "./style.css";

const Thumbnail = ({ source }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    const handleImageError = () => {
        setIsLoading(false);
        setIsError(true);
    };

    return (
        <div className="thumbnail-container">
            {isLoading && <div className="loading-circle" />}
            {!isLoading && !isError && (
                <img
                    src={source}
                    className={`thumbnail-image ${isLoading ? "hidden" : ""}`}
                    alt="profile"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
            )}
            {isError && <div className="thumbnail-error">p</div>}
        </div>
    );
};

export default Thumbnail;
