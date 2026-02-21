import { useEffect, useState } from "react";

const Unauthorized = () => {
    const [seconds, setSeconds] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((s) => s - 1);
        }, 1000);

        if (seconds === 0) {
            window.location.href = "/";
        }

        return () => clearInterval(timer);
    }, [seconds]);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
            }}
            className="text-white font-bold text-xxl"
        >
            <h2>Unauthorized Access</h2>
            <p>Redirecting to landing page in {seconds}s…</p>
        </div>
    );
};


export default Unauthorized;