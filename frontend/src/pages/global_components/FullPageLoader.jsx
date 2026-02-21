import React from "react";

const FullPageLoader = () => {
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "600",
                animation: "blink 1.5s infinite",
            }}
        >
            <span className="font-bold text-[70px]">
              <span style={{color: "#FFFFFF"}}>Intelli</span><span style={{color: "#FF6B35"}}>Cart</span>
            </span>

            <style>
            {`
          @keyframes blink {
            0% { opacity: 0.3; }
            50% { opacity: 1; }
            100% { opacity: 0.3; }
          }
        `}
            </style>
        </div>
    );
};


export default FullPageLoader;