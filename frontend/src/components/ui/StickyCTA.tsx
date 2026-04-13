import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useModal } from '../../context/ModalContext';
import { ArrowRight, Sparkles } from 'lucide-react';


export const StickyCTA = () => {
    const { openModal } = useModal();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past the Hero section (approx 500px)
            setIsVisible(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 200, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%] max-w-sm"
                >
                    {/* Glowing effect background */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-secondary to-brand-primary rounded-full blur opacity-40 animate-pulse" />

                    <button
                        onClick={openModal}
                        className="relative w-full bg-[#0a0a0a] border border-white/10 text-white py-4 px-6 rounded-full flex items-center justify-between shadow-2xl group active:scale-95 transition-transform"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                                <Sparkles size={16} className="animate-pulse" />
                            </div>
                            <div className="text-left">
                                <span className="block text-xs text-white/50 uppercase tracking-wider font-bold">Hemen Başlayın</span>
                                <span className="block text-sm font-bold text-white">Ücretsiz Demo Talebi 🚀</span>
                            </div>
                        </div>

                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors">
                            <ArrowRight size={18} />
                        </div>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
