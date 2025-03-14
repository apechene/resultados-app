
import React, { useState, useEffect } from 'react';

export const VideoC = () => {
    const [showVideo, setShowVideo] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowVideo(false);
        }, 35000); // 35 segundos

        return () => clearTimeout(timer);
    }, []);

    return (
        showVideo && (
            <div className="col-12 text-center mt-4">
                <video width="" height="240" autoPlay loop muted>
                    <source src="./intro.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        )
    );
};
