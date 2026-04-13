import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { Section } from '../ui/Section';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSound } from '../../context/SoundContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { TiltCard } from '../ui/TiltCard';
import { services } from '../../data/services';
import { useNavigate } from 'react-router-dom';

export const Services = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const ghostRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const { playHover, playClick } = useSound();
    const [scrollConstraint, setScrollConstraint] = useState(0);
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useLayoutEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();

        const updateScrollConstraint = () => {
            if (ghostRef.current) {
                const contentWidth = ghostRef.current.scrollWidth;
                const viewportWidth = window.innerWidth;
                const constraint = -(contentWidth - viewportWidth + 100);
                setScrollConstraint(contentWidth > viewportWidth ? constraint : 0);
            }
        };

        updateScrollConstraint();
        window.addEventListener('resize', () => {
            checkMobile();
            updateScrollConstraint();
        });

        const timeout = setTimeout(updateScrollConstraint, 100);

        return () => {
            window.removeEventListener('resize', updateScrollConstraint);
            clearTimeout(timeout);
        };
    }, []);

    // Auto-scroll logic for mobile
    useEffect(() => {
        if (!isMobile || isPaused || !scrollRef.current) return;

        let animationFrameId: number;

        const scroll = () => {
            if (scrollRef.current) {
                // Adjust speed here (1 seems good for smooth flow)
                scrollRef.current.scrollLeft += 1;

                if (scrollRef.current.scrollLeft >= (scrollRef.current.scrollWidth / 2)) {
                    scrollRef.current.scrollLeft = 0;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isMobile, isPaused]);

    const handleInteractionStart = () => {
        if (resumeTimeout.current) {
            clearTimeout(resumeTimeout.current);
            resumeTimeout.current = null;
        }
        setIsPaused(true);
    };

    const handleInteractionEnd = () => {
        if (resumeTimeout.current) clearTimeout(resumeTimeout.current);

        // Wait for momentum scroll to likely finish before resuming auto-scroll
        resumeTimeout.current = setTimeout(() => {
            setIsPaused(false);
        }, 2000);
    };

    const scrollLeft = () => {
        if (scrollRef.current) {
            handleInteractionStart();
            scrollRef.current.scrollBy({ left: -window.innerWidth * 0.8, behavior: 'smooth' });
            handleInteractionEnd();
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            handleInteractionStart();
            scrollRef.current.scrollBy({ left: window.innerWidth * 0.8, behavior: 'smooth' });
            handleInteractionEnd();
        }
    };

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0px", `${scrollConstraint}px`]);
    const opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

    const handleServiceClick = (slug: string) => {
        playClick();
        navigate(`/hizmet/${slug}`);
    };

    return (
        <Section id="services" className="relative bg-brand-dark">
            <div ref={targetRef} className={isMobile ? "h-auto py-12" : "h-[250vh] relative"}>
                <div className={isMobile ? "relative flex flex-col gap-12" : "sticky top-0 flex h-screen items-center overflow-hidden"}>

                    {/* Gradient Background for Mobile */}
                    {isMobile && (
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(108,53,178,0.15)_0%,transparent_70%)] pointer-events-none" />
                    )}

                    {/* Title Section */}
                    <motion.div
                        style={isMobile ? {} : { opacity }}
                        className={isMobile ? "px-6 relative z-10 text-center" : "absolute top-12 left-4 md:left-10 z-10 pointer-events-none"}
                    >
                        <h2 className={isMobile ? "text-4xl font-bold font-heading text-white" : "text-5xl md:text-8xl font-bold font-heading text-white"}>
                            UZMANLIK
                        </h2>
                        <h2 className={isMobile ? "text-3xl font-bold font-heading text-brand-primary mt-1" : "text-3xl md:text-5xl font-bold font-heading text-brand-primary -mt-2 md:-mt-4 ml-2"}>
                            Alanlarımız
                        </h2>
                    </motion.div>

                    {/* Content Section */}
                    {isMobile ? (
                        /* Mobile: Auto-Scrolling Marquee */
                        <div className="relative w-full">
                            {/* Fade Edges */}
                            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-brand-dark to-transparent z-20 pointer-events-none" />
                            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-brand-dark to-transparent z-20 pointer-events-none" />

                            {/* Mobile Navigation Arrows */}
                            <div className="absolute top-1/2 -translate-y-1/2 left-2 z-30">
                                <button
                                    onClick={scrollLeft}
                                    className="p-3 rounded-full bg-brand-dark/80 border border-white/10 text-white hover:bg-brand-primary hover:border-brand-primary transition-colors backdrop-blur-sm shadow-lg"
                                    aria-label="Sola kaydır"
                                >
                                    <ArrowLeft size={24} />
                                </button>
                            </div>
                            <div className="absolute top-1/2 -translate-y-1/2 right-2 z-30">
                                <button
                                    onClick={scrollRight}
                                    className="p-3 rounded-full bg-brand-dark/80 border border-white/10 text-white hover:bg-brand-primary hover:border-brand-primary transition-colors backdrop-blur-sm shadow-lg"
                                    aria-label="Sağa kaydır"
                                >
                                    <ArrowRight size={24} />
                                </button>
                            </div>

                            <div
                                ref={scrollRef}
                                className="flex gap-6 px-4 overflow-x-auto scrollbar-hide"
                                onMouseEnter={handleInteractionStart}
                                onMouseLeave={handleInteractionEnd}
                                onTouchStart={handleInteractionStart}
                                onTouchEnd={handleInteractionEnd}
                                style={{
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none'
                                }}
                            >
                                {[...services, ...services, ...services, ...services].map((service, index) => (
                                    <TiltCard
                                        key={`${service.id}-${index}`}
                                        className="min-w-[280px] w-[280px] h-[400px] flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-neutral-900 border border-white/10"
                                        onClick={() => handleServiceClick(service.slug)}
                                    >
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            loading="lazy"
                                            className="absolute inset-0 w-full h-full object-cover opacity-60"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />

                                        <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end h-full">
                                            <div className="mb-auto p-2 bg-white/10 backdrop-blur-md w-fit rounded-lg border border-white/10">
                                                <service.icon className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2 font-heading">
                                                {service.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-brand-primary">
                                                İncele <ArrowRight className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </TiltCard>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* Desktop: Horizontal Scroll */
                        <>
                            <motion.div ref={ghostRef} style={{ x }} className="flex gap-4 md:gap-8 px-4 md:px-20 items-center h-full">
                                {services.map((service) => (
                                    <TiltCard
                                        key={service.id}
                                        className="w-[85vw] md:w-[400px] h-[60vh] md:h-[550px] flex-shrink-0 cursor-pointer overflow-hidden rounded-3xl bg-neutral-900 border border-white/10 hover:border-brand-primary/50 transition-colors duration-500"
                                        onMouseEnter={playHover}
                                        onClick={() => handleServiceClick(service.slug)}
                                    >
                                        {/* Background Image */}
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            loading="lazy"
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                                        />

                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />

                                        {/* Content */}
                                        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end h-full transform transition-transform duration-500">
                                            <div className="mb-auto p-3 bg-white/10 backdrop-blur-md w-fit rounded-xl border border-white/10 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                                <service.icon className="w-6 h-6 text-white" />
                                            </div>

                                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-heading group-hover:text-brand-primary transition-colors">
                                                {service.title}
                                            </h3>
                                            <p className="text-brand-light/80 text-base md:text-lg mb:-4 group-hover:mb-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 hidden md:block">
                                                {service.description}
                                            </p>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleServiceClick(service.slug);
                                                }}
                                                className="flex items-center gap-2 text-sm uppercase tracking-wider font-bold text-white group-hover:text-brand-primary transition-colors translate-y-2 group-hover:translate-y-0"
                                            >
                                                Detayları Gör <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </TiltCard>
                                ))}
                            </motion.div>

                            {/* Progress Bar */}
                            <div className="absolute bottom-10 left-10 right-10 h-1 bg-white/10 rounded-full overflow-hidden hidden md:block">
                                <motion.div
                                    style={{ scaleX: scrollYProgress }}
                                    className="h-full bg-brand-primary origin-left"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Section>
    );
};
