import { motion } from 'framer-motion';
// import { cn } from '../../lib/utils'; 
// actually I defined cn in Button.tsx, I should move it to dedicated file.
// For now I will duplicate or create utils.ts. 
// Let's create utils.ts first.

// Wait, I can't create multiple files in one turn effectively if one depends on other and I want to use it immediately.
// I'll inline cn for now or create utils.ts in this turn.

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const Section = ({
    children,
    className,
    id
}: {
    children: React.ReactNode;
    className?: string;
    id?: string;
}) => {
    return (
        <section id={id} className={cn("py-12 md:py-32 px-6", className)}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="container mx-auto"
            >
                {children}
            </motion.div>
        </section>
    );
};
