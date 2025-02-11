import { useEffect, useState } from "react";

export const useCountdown = (seconds: number) => {
    const [countdown, setCountdown] = useState(seconds);
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (!active) return;
        if (countdown === 0) {
            setCountdown(seconds);
            setActive(false);
            return;
        }

        const intervalId = setInterval(() => {
            setCountdown((countdown) => countdown - 1);
        }, 1000);

        return () => clearInterval(intervalId);;
    }, [countdown, active]);

    const start = () => {
        setActive(true);
    }

    return {
        countdown,
        active,
        start,
    };
}