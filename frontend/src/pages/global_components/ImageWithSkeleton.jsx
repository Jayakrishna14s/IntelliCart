import React, { useState } from "react";

export const ImageWithSkeleton = ({ src, alt = "", className = "" }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-[#1e293b] animate-pulse" />
      )}

      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500
          ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
};
