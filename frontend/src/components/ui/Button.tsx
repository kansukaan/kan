import { motion, type HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export const Button = ({
    className,
    variant = 'primary',
    size = 'md',
    children,
    ...props
}: ButtonProps) => {
    const variants = {
        primary: 'bg-brand-primary text-white hover:bg-brand-secondary shadow-lg shadow-brand-primary/25',
        secondary: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/10',
        outline: 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10',
        ghost: 'text-brand-light hover:text-white hover:bg-white/5',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                'rounded-full font-medium transition-colors relative overflow-hidden inline-flex items-center justify-center',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
};
