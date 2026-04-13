import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { useSound } from '../../context/SoundContext';
import { useModal } from '../../context/ModalContext';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
    const { playHover, playClick } = useSound();
    const { openModal } = useModal();
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const textX = useTransform(scrollYProgress, [0, 0.4], [0, -100]);

    // Phone transforms
    const phoneRotate = useTransform(scrollYProgress, [0, 0.8], [0, -90]);
    const phoneScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.4]);
    // Move phone to center: assuming it starts at right, moving negative x brings it left.
    // Roughly -100% of its own width or using viewport units. 
    // Since it's in a grid, precise centering is tricky without fixed calculation, 
    // but moving it left significantly will achieve the effect.
    const phoneX = useTransform(scrollYProgress, [0, 0.8], ["0%", "-50%"]);

    const videos = [
        "/images/grok-video-2e2ceef6-fd2b-4045-ba20-10e64ba65ba9.mp4",
        "/images/grok-video-6f502d2c-69a4-4915-84ac-c1ba5ea1558e.mp4",
        "/images/grok-video-fe9af6ab-2043-4af1-a1da-d5cbd7c577e6.mp4"
    ];

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const handleVideoEnd = () => {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    };

    // Video rotation to counter the phone rotation (so it effectively stays upright but fills the landscape screen)
    // When phone rotates -90deg (to landscape), video rotates 90deg (relative to phone) to be upright.
    // We also scale it up because a 90deg rotated portrait video inside a portrait container needs to be larger to cover.
    const videoRotate = useTransform(scrollYProgress, [0, 0.8], [0, 90]);
    const videoScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.35]);

    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    useEffect(() => {
        const currentVideo = videoRefs.current[currentVideoIndex];
        if (currentVideo) {
            currentVideo.currentTime = 0;
            currentVideo.play().catch(e => console.log('Play error:', e));
        }
    }, [currentVideoIndex]);

    return (
        <Section id="home" className="relative p-0 bg-brand-dark">
            <div ref={targetRef} className={isMobile ? "h-auto" : "h-[250vh]"}>
                <div className={isMobile ? "relative pt-20 pb-12 flex flex-col items-center overflow-hidden" : "sticky top-0 h-screen flex items-center justify-center overflow-hidden"}>

                    {/* Background Elements */}
                    <div className="absolute inset-0 z-0 bg-brand-dark">
                        {/* Premium Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark via-brand-dark/95 to-brand-primary/20 opacity-60" />
                        {/* Grid Pattern Overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
                    </div>

                    <div className="container mx-auto px-6 relative z-10 w-full h-full flex flex-col justify-center">
                        <div className="grid lg:grid-cols-2 gap-4 lg:gap-16 items-center w-full">

                            {/* Left Column: Text Content */}
                            <motion.div
                                style={isMobile ? { opacity: 1, x: 0 } : { opacity: textOpacity, x: textX }}
                                initial={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, x: -30 }}
                                animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className={isMobile ? "text-center relative z-20 order-1 mt-8" : "text-left -mt-24 order-1"}
                            >
                                <h2 className="text-brand-primary font-medium tracking-wide mb-4 lg:mb-6 uppercase flex items-center justify-center lg:justify-start gap-3 drop-shadow-md text-sm lg:text-base">
                                    <span className="w-8 h-[2px] bg-brand-primary shadow-[0_0_10px_rgba(108,53,178,0.5)]"></span>
                                    Hızlı, Güvenli ve Risksiz
                                </h2>
                                <h1 className="text-3xl md:text-7xl lg:text-8xl font-bold mb-6 lg:mb-8 leading-tight font-heading text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                    Web Siteniz <br />
                                    <span className="inline-flex items-center mt-2">
                                        <motion.span
                                            initial={{ width: 0 }}
                                            animate={{ width: "auto" }}
                                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                            className="inline-flex overflow-hidden whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary pb-2"
                                        >
                                            1 Saatte Hazır
                                        </motion.span>
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: [0, 1, 0] }}
                                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                            className="inline-block w-[3px] h-[0.8em] bg-brand-primary ml-1"
                                        />
                                    </span>
                                </h1>
                                <p className="text-gray-100 text-base lg:text-xl max-w-xl mx-auto lg:mx-0 mb-8 lg:mb-10 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                    Formu doldurun, hayalinizdeki siteyi hemen hazırlayalım.
                                    <span className="text-white font-bold block mt-2 drop-shadow-md">
                                        Sadece beğenirseniz ödeme yapın.
                                    </span>
                                    Risk yok, bekleme yok, sadece sonuç var.
                                </p>

                                <div className="flex flex-wrap gap-4 justify-center lg:justify-start p-2">
                                    <div onMouseEnter={playHover} onClick={playClick}>
                                        <Button
                                            size="lg"
                                            className="group px-8 btn-primary relative overflow-visible"
                                            onClick={openModal}
                                        >
                                            <span className="absolute inset-0 rounded-full bg-brand-primary/50 animate-ping opacity-75"></span>
                                            <span className="relative flex items-center">
                                                Hemen Başla
                                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </Button>
                                    </div>
                                    <div onMouseEnter={playHover} onClick={playClick}>
                                        <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 text-white">
                                            Projeleri İncele
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right Column: Phone Mockup */}
                            <motion.div
                                style={isMobile ? {} : { rotate: phoneRotate, scale: phoneScale, x: phoneX }}
                                className={isMobile ? "relative block origin-center transform-gpu mt-8 order-2 scale-90" : "relative block origin-center transform-gpu mt-0 lg:mt-0 order-2"}
                            >
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    {/* Floating Animation Wrapper */}
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                        className="relative mx-auto w-[160px] h-[320px] md:w-[300px] md:h-[600px] bg-black rounded-[1.5rem] md:rounded-[3rem] border-[4px] md:border-8 border-[#1f1f1f] shadow-2xl shadow-brand-primary/20 z-10 overflow-hidden"
                                        style={{ boxShadow: '0 0 60px -15px rgba(108, 53, 178, 0.4)' }}
                                    >
                                        {/* Notch */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 md:w-32 h-3 md:h-6 bg-[#1f1f1f] rounded-b-xl z-20"></div>

                                        {/* Screen Video Loop */}
                                        <div className="absolute inset-0 bg-black">
                                            {videos.map((src, index) => (
                                                <motion.video
                                                    key={index}
                                                    src={src}
                                                    style={isMobile ? {} : { rotate: videoRotate, scale: videoScale }}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: currentVideoIndex === index ? 1 : 0 }}
                                                    transition={{ duration: 1 }}
                                                    muted
                                                    playsInline
                                                    onEnded={() => {
                                                        if (currentVideoIndex === index) {
                                                            handleVideoEnd();
                                                        }
                                                    }}
                                                    ref={(el) => { videoRefs.current[index] = el; }}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                            ))}
                                        </div>

                                        {/* Screen Overlay (Reflection) */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-10" />
                                    </motion.div>

                                    {/* Decorative Glow Behind Phone */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[350px] md:w-[350px] md:h-[650px] bg-brand-primary/20 blur-[50px] md:blur-[100px] -z-10 rounded-full" />
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.a
                style={{ opacity: textOpacity }}
                href="#services"
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
                <span className="text-xs uppercase tracking-widest text-white/30">Keşfet</span>
                <motion.div
                    className="w-[1px] h-12 bg-gradient-to-b from-brand-secondary to-transparent"
                    animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.a>
        </Section >
    );
};
