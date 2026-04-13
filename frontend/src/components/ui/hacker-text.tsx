import { useState, useEffect, useRef } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*";

interface HackerTextProps {
    text: string;
    className?: string;
}

export const HackerText = ({ text, className }: HackerTextProps) => {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<number | null>(null);

    const startScramble = () => {
        let iteration = 0;

        clearInterval(intervalRef.current as number);

        intervalRef.current = window.setInterval(() => {
            setDisplayText((prev) =>
                prev
                    .split("")
                    .map((_, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(intervalRef.current as number);
            }

            iteration += 1 / 3;
        }, 30);
    };

    useEffect(() => {
        startScramble();
        return () => clearInterval(intervalRef.current as number);
    }, [text]);

    return (
        <span
            className={className}
            onMouseEnter={startScramble}
            data-value={text}
        >
            {displayText}
        </span>
    );
};
