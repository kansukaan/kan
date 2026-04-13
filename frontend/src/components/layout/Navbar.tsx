import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cpu } from 'lucide-react';
import { Button } from '../ui/Button';
import { MagneticButton } from '../ui/magnetic-button';
import { useSound } from '../../context/SoundContext';
import { useModal } from '../../context/ModalContext';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const { playHover, playClick } = useSound();
    const { openModal } = useModal();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Active Section Logic
            const sections = ['services', 'brands', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top >= -100 && rect.top <= 300;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [mobileMenuOpen]);

    const navLinks = [
        { name: 'Hizmetler', href: '/#services', id: 'services' },
        { name: 'Referanslar', href: '/#brands', id: 'brands' },
        { name: 'İletişim', href: '/#contact', id: 'contact' },
        { name: 'Atölye', href: '/showcase', id: 'showcase' },
    ];

    return (
        <>
            <nav
                className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'w-[90%] md:w-[80%] mx-auto rounded-full glass border-white/20 shadow-2xl shadow-brand-primary/10' : 'w-full bg-transparent py-6'
                    }`}
            >
                <div className={`container mx-auto px-6 flex items-center justify-between ${isScrolled ? 'py-3' : ''}`}>
                    <div
                        className="flex items-center gap-3 font-heading font-bold text-2xl tracking-tighter group cursor-pointer"
                        onMouseEnter={playHover}
                        onClick={() => {
                            playClick();
                            navigate('/');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-brand-primary/50 blur-xl rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-500" />
                            <div className="relative p-2.5 bg-gradient-to-br from-[#1a1a1a] to-black rounded-xl shadow-[0_0_15px_rgba(124,58,237,0.1)] group-hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] transition-all duration-500 border border-white/10 group-hover:border-brand-primary/50 group-hover:scale-105 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <Cpu className="w-6 h-6 text-white group-hover:text-brand-primary transition-colors duration-300 relative z-10" />
                            </div>
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-sm font-medium text-brand-light/60 tracking-[0.2em] uppercase text-[10px] ml-0.5 group-hover:text-brand-primary/80 transition-colors duration-300">
                                Digital Agency
                            </span>
                            <span className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-primary transition-all duration-300">
                                Kanteknoloji<span className="text-brand-primary">.</span>
                            </span>
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <MagneticButton key={link.name}>
                                <a
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        playClick();

                                        if (link.id === 'showcase') {
                                            navigate('/showcase');
                                            return;
                                        }

                                        if (location.pathname !== '/') {
                                            navigate('/');
                                            setTimeout(() => {
                                                const element = document.getElementById(link.id);
                                                if (element) {
                                                    const headerOffset = 100;
                                                    const elementPosition = element.getBoundingClientRect().top;
                                                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                                                    window.scrollTo({
                                                        top: offsetPosition,
                                                        behavior: 'smooth'
                                                    });
                                                }
                                            }, 100);
                                        } else {
                                            const element = document.getElementById(link.id);
                                            if (element) {
                                                const headerOffset = 100;
                                                const elementPosition = element.getBoundingClientRect().top;
                                                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                                                window.scrollTo({
                                                    top: offsetPosition,
                                                    behavior: 'smooth'
                                                });
                                            }
                                        }
                                    }}
                                    onMouseEnter={playHover}
                                    className={`transition-colors text-sm font-medium block px-4 py-2 relative ${activeSection === link.id ? 'text-brand-primary' : 'text-brand-light hover:text-brand-primary'}`}
                                >
                                    {link.name}
                                    {activeSection === link.id && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute -bottom-1 left-0 right-0 h-px bg-brand-primary"
                                        />
                                    )}
                                </a>
                            </MagneticButton>
                        ))}
                        <div onMouseEnter={playHover} onClick={playClick}>
                            <Button
                                size="sm"
                                onClick={openModal}
                            >
                                Ücretsiz Demo
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-white relative z-50 p-2"
                        onClick={() => { setMobileMenuOpen(!mobileMenuOpen); playClick(); }}
                    >
                        {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay - Move outside to prevent clipping */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-brand-dark/95 backdrop-blur-2xl flex flex-col items-center justify-center md:hidden"
                    >
                        <motion.div
                            className="flex flex-col gap-8 text-center"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                        >
                            {navLinks.filter(link => link.id !== 'showcase').map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setMobileMenuOpen(false);
                                        playClick();

                                        if (link.id === 'showcase') {
                                            navigate('/showcase');
                                            return;
                                        }

                                        if (location.pathname !== '/') {
                                            navigate('/');
                                            setTimeout(() => {
                                                const element = document.getElementById(link.id);
                                                if (element) {
                                                    const headerOffset = 100;
                                                    const elementPosition = element.getBoundingClientRect().top;
                                                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                                                    window.scrollTo({
                                                        top: offsetPosition,
                                                        behavior: 'smooth'
                                                    });
                                                }
                                            }, 100);
                                        } else {
                                            const element = document.getElementById(link.id);
                                            if (element) {
                                                const headerOffset = 100;
                                                const elementPosition = element.getBoundingClientRect().top;
                                                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                                                window.scrollTo({
                                                    top: offsetPosition,
                                                    behavior: 'smooth'
                                                });
                                            }
                                        }
                                    }}
                                    className="text-4xl font-heading font-bold text-white hover:text-brand-primary transition-colors"
                                    variants={{
                                        hidden: { y: 20, opacity: 0 },
                                        visible: { y: 0, opacity: 1 }
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <motion.div
                                variants={{
                                    hidden: { y: 20, opacity: 0 },
                                    visible: { y: 0, opacity: 1 }
                                }}
                            >
                                <Button className="text-xl px-8 py-4" onClick={() => {
                                    setMobileMenuOpen(false);
                                    playClick();
                                    openModal();
                                }}>
                                    Ücretsiz Demo
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
