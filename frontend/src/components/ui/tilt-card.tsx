import type { MouseEvent } from 'react';
import type { HTMLMotionProps } from 'framer-motion';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
}

export const TiltCard = ({ children, className = "", ...props }: TiltCardProps) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);

        // Call external onMouseMove if provided
        props.onMouseMove?.(e);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            {...props}
            onMouseMove={handleMouseMove}
            onMouseLeave={(e) => {
                handleMouseLeave();
                props.onMouseLeave?.(e);
            }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d", ...props.style }}
            className={`relative group ${className}`}
        >
            <div style={{ transform: "translateZ(50px)" }} className="relative z-10 h-full w-full">
                {children}
            </div>
            {/* Optional glow effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
        </motion.div>
    );
};
