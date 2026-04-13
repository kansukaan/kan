import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Section } from '../ui/Section';
import { Shield, Palette, Sparkles, Fingerprint, Scan, Component, Layers } from 'lucide-react';

const features = [
    {
        id: 'security',
        theme: 'blue',
        title: "Güven'i kodlamak daha değerlidir",
        statistic: "%80",
        statDescription: "Web projelerinin %80'inin penetrasyon testlerinden geçemediğini biliyoruz.",
        subTitle: "Siber tehditlere karşı kalkan.",
        description: "Güvenlik bir özellik değil, standarttır. Projelerinizi en güncel siber tehditlere karşı korumalı mimarilerle geliştiriyoruz. Verileriniz, bizim için altından daha değerli.",
        // Deep Navy -> Electric Blue Gradient
        bgGradient: "bg-gradient-to-br from-[#0f172a] via-[#172554] to-[#1d4ed8]",
        border: "border-blue-500/30",
        shadow: "shadow-blue-900/40",
        accent: "text-blue-400",
        visual: (
            <div className="relative w-full h-full flex items-center justify-center perspective-1000">
                {/* Abstract Shield Composition */}
                <div className="relative w-72 h-72 md:w-96 md:h-96">
                    {/* Rotating Rings */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border border-blue-400/20 border-dashed"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-8 rounded-full border border-blue-500/20 border-dotted"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full"
                    />

                    {/* Core Shield */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="relative w-40 h-48 bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-xl rounded-[2rem] flex items-center justify-center border border-blue-400/40 shadow-[0_0_50px_rgba(59,130,246,0.3)] overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent" />
                            <Shield className="w-20 h-20 text-blue-100 relative z-10 drop-shadow-[0_0_15px_rgba(147,197,253,0.5)]" />

                            {/* Scanning effect */}
                            <motion.div
                                animate={{ top: ["0%", "100%", "0%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-[2px] bg-blue-400/80 shadow-[0_0_15px_rgba(96,165,250,1)] z-20"
                            />
                        </motion.div>
                    </div>

                    {/* Floating Tech Badges */}
                    <motion.div
                        animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-4 -right-4 bg-[#0f172a]/90 backdrop-blur-md px-4 py-2 rounded-lg border border-blue-500/30 flex items-center gap-3 shadow-xl hover:border-blue-400/50 transition-colors"
                    >
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                        <span className="text-xs font-mono text-blue-200 tracking-wider">SECURE_V.2.0</span>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-8 -left-8 bg-[#0f172a]/90 backdrop-blur-md px-4 py-2 rounded-lg border border-blue-500/30 flex items-center gap-3 shadow-xl"
                    >
                        <Fingerprint className="w-4 h-4 text-blue-300" />
                        <span className="text-xs font-mono text-blue-200 tracking-wider">BIOMETRIC</span>
                    </motion.div>

                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-1/2 -right-12"
                    >
                        <Scan className="w-8 h-8 text-blue-500/40" />
                    </motion.div>
                </div>
            </div>
        )
    },
    {
        id: 'design',
        theme: 'purple',
        title: "İlk izlenim son şansınız olabilir.",
        statistic: null,
        statDescription: "Her piksel bir hikaye anlatır.",
        subTitle: null,
        description: "Estetik, fonksiyonun en zarif halidir. Markanızın dijital yüzünü, akılda kalıcı, modern ve kullanıcı odaklı tasarım ilkeleriyle şekillendiriyoruz. Sadece görünüm değil, hissettirdiği duygu da bizim işimiz.",
        // Deep Purple -> Hot Pink Gradient
        bgGradient: "bg-gradient-to-br from-[#2e1065] via-[#4c1d95] to-[#db2777]",
        border: "border-purple-500/30",
        shadow: "shadow-purple-900/40",
        accent: "text-purple-300",
        visual: (
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Abstract Design Composition */}
                <div className="relative w-72 h-72 md:w-96 md:h-96">
                    {/* Floating Color Orbs */}
                    <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 6, repeat: Infinity }}
                        className="absolute top-0 right-0 w-40 h-40 bg-pink-500/30 blur-[60px] rounded-full mix-blend-screen"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
                        className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/30 blur-[60px] rounded-full mix-blend-screen"
                    />

                    {/* Central Glass Element */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            whileHover={{ rotate: 0, scale: 1.05 }}
                            className="w-48 h-48 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] flex items-center justify-center border border-white/20 shadow-2xl rotate-6 transition-all duration-500 group cursor-pointer"
                        >
                            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-purple-500/10 to-transparent pointer-events-none" />
                            <Palette className="w-20 h-20 text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform duration-300" />

                            {/* Color Dots */}
                            <div className="absolute top-6 right-6 flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#fae8ff] shadow-[0_0_10px_#fae8ff]" />
                                <div className="w-3 h-3 rounded-full bg-[#f0abfc]" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Floating UI Elements */}
                    <motion.div
                        animate={{ x: [0, 15, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-8 -left-4 bg-white/10 backdrop-blur-lg p-4 rounded-2xl border border-white/20 w-32 shadow-lg"
                    >
                        <div className="flex gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-red-400" />
                            <div className="w-2 h-2 rounded-full bg-yellow-400" />
                            <div className="w-2 h-2 rounded-full bg-green-400" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-2 w-20 bg-white/40 rounded-full" />
                            <div className="h-2 w-16 bg-white/20 rounded-full" />
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ x: [0, -15, 0], rotate: [0, -5, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute -bottom-6 -right-8 bg-white/10 backdrop-blur-lg p-3 rounded-2xl border border-white/20 flex flex-col items-center gap-2 shadow-lg w-20"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                            <Component className="w-5 h-5 text-white" />
                        </div>
                        <div className="h-1.5 w-10 bg-white/30 rounded-full" />
                    </motion.div>

                    <div className="absolute top-1/2 -left-12 transform -translate-y-1/2">
                        <Layers className="w-8 h-8 text-white/20" />
                    </div>
                </div>
            </div>
        )
    }
];

const Card = ({ item, index, progress, range, targetScale }: any) => {
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-0">
            <motion.div
                style={{ scale, top: `calc(10vh + ${index * 30}px)` }}
                className={`relative w-full max-w-6xl h-[65vh] md:h-[70vh] rounded-[2.5rem] overflow-hidden ${item.bgGradient} border ${item.border} shadow-2xl ${item.shadow} origin-top`}
            >
                {/* Inner Glow / Noise */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                <div className="relative z-10 p-6 md:p-12 h-full flex flex-col md:flex-row gap-8 lg:gap-12 items-center justify-between">

                    {/* Left Content */}
                    <div className="flex-1 text-left w-full h-full flex flex-col justify-center">
                        {item.statistic ? (
                            <div className="mb-4">
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-5xl md:text-7xl font-bold text-white tracking-tighter drop-shadow-lg">{item.statistic}</span>
                                </div>
                                <p className="text-white/70 text-sm md:text-base max-w-sm border-l-2 border-white/20 pl-4 leading-relaxed">
                                    {item.statDescription}
                                </p>
                            </div>
                        ) : (
                            <div className="mb-4 flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">
                                    <Sparkles className="w-5 h-5 text-purple-200" />
                                </div>
                                <span className="text-base font-medium text-white/80 tracking-wide uppercase font-heading">{item.statDescription}</span>
                            </div>
                        )}

                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold font-heading text-white leading-[1.1] mb-4 drop-shadow-md">
                            {item.title}
                        </h3>

                        <div className="space-y-3 max-w-lg">
                            {item.subTitle && <h4 className={`text-lg md:text-xl font-bold ${item.accent}`}>{item.subTitle}</h4>}
                            <p className="text-white/60 text-sm md:text-base leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>

                    {/* Right Visuals */}
                    <div className="flex-1 w-full h-full flex items-center justify-center md:justify-end md:pr-4">
                        {item.visual}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export const FeaturesStack = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    return (
        <Section className="relative bg-brand-dark pb-32" id="features">
            {/* Header */}
            <div className="container mx-auto px-6 mb-24 md:mb-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-3xl"
                >
                    <h2 className="text-brand-primary font-medium tracking-wide mb-4 uppercase flex items-center gap-3">
                        <span className="w-8 h-[2px] bg-brand-primary"></span>
                        Fark Yaratan Özellikler
                    </h2>
                    <h3 className="text-4xl md:text-7xl font-bold text-white font-heading leading-tight">
                        Sıradanın Ötesinde <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Deneyimler</span>
                    </h3>
                </motion.div>
            </div>

            <div ref={containerRef} className="relative h-[250vh]">
                {features.map((feature, i) => {
                    const targetScale = 1 - ((features.length - 1 - i) * 0.05);
                    return (
                        <Card
                            key={feature.id}
                            item={feature}
                            index={i}
                            progress={scrollYProgress}
                            range={[i * 0.25, 1]}
                            targetScale={targetScale}
                        />
                    );
                })}
            </div>
        </Section>
    );
};
