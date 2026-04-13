import { useRef } from 'react';
import { Section } from '../ui/Section';
import { motion, useInView } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
    {
        quote: "Dijital dönüşüm sürecimizde Kanteknoloji ekibi beklentimizin çok ötesine geçti. Modern tasarımları ve teknik yetkinlikleri sayesinde dönüşüm oranlarımız %45 arttı.",
        author: "Ahmet Yılmaz",
        role: "CEO, TechFlow",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        rating: 5
    },
    {
        quote: "Sadece bir web sitesi değil, yaşayan bir marka kimliği oluşturdular. E-ticaret altyapımız artık çok daha hızlı ve güvenilir. Kesinlikle tavsiye ediyorum.",
        author: "Zeynep Kaya",
        role: "Kurucu, LuxeGoods",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        rating: 5
    },
    {
        quote: "Profesyonel, yenilikçi ve çözüm odaklılar. Özellikle mobil uygulama geliştirme sürecindeki titizlikleri projemizin başarısında kilit rol oynadı.",
        author: "Mehmet Demir",
        role: "Pazarlama Direktörü, FutureScale",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        rating: 5
    },
    {
        quote: "Yazılım ekibinin problem çözme yeteneği inanılmaz. Karmaşık backend sorunlarımızı kısa sürede çözüp sistemi optimize ettiler.",
        author: "Caner Öztürk",
        role: "CTO, DataPrime",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        rating: 5
    }
];

export const Testimonials = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Triple the array to ensure smooth infinite loop
    const infiniteTestimonials = [...testimonials, ...testimonials, ...testimonials];

    return (
        <Section id="testimonials" className="relative overflow-hidden py-32 bg-[#020005]">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-brand-primary/5 blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-secondary/5 blur-[100px] pointer-events-none mix-blend-screen" />

            <div className="container mx-auto px-6 relative z-10 mb-16" ref={ref}>
                <div className="text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6 backdrop-blur-md"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></span>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase">Başarı Hikayeleri</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold font-heading mb-6 leading-tight"
                    >
                        Müşterilerimiz <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Ne Diyor?</span>
                    </motion.h2>
                </div>
            </div>

            {/* Infinite Marquee Container */}
            <div className="relative w-full overflow-hidden">
                {/* Gradient Masks for Smooth Fade */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#020005] to-transparent z-20 pointer-events-none" />
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#020005] to-transparent z-20 pointer-events-none" />

                <motion.div
                    className="flex gap-6 w-max"
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 40, // Adjust speed here (higher = slower)
                        ease: "linear",
                        repeat: Infinity
                    }}
                >
                    {/* Double the output to ensure seamless loop effect (using 2 sets of the tripled array logic if needed, but here simple duplication is handled by enough width) */}
                    {/* Actually, translating -50% means we need 2 identical halves. So let's use the tripled array as one half, then duplicate THAT? No. */}
                    {/* Correct logic: Render [A, B, C, A, B, C] and translate from 0 to -50%. That corresponds to moving exactly [A, B, C] length. */}

                    {[...infiniteTestimonials, ...infiniteTestimonials].map((t, i) => (
                        <div
                            key={i}
                            className="w-[350px] md:w-[450px] shrink-0 group bg-white/[0.02] border border-white/5 hover:border-brand-primary/30 rounded-3xl p-8 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="relative z-10">
                                <div className="mb-6 opacity-30 group-hover:opacity-100 transition-opacity text-brand-primary">
                                    <Quote size={32} />
                                </div>
                                <div className="flex gap-1 mb-4">
                                    {[...Array(t.rating)].map((_, starI) => (
                                        <Star key={starI} size={14} className="fill-yellow-500 text-yellow-500" />
                                    ))}
                                </div>
                                <p className="text-white/80 leading-relaxed italic mb-8 bg-transparent text-sm line-clamp-4">
                                    "{t.quote}"
                                </p>
                            </div>

                            <div className="flex items-center gap-4 relative z-10 pt-6 border-t border-white/5 group-hover:border-white/10 transition-colors">
                                <img src={t.image} alt={t.author} className="w-12 h-12 rounded-full border border-white/10 group-hover:border-brand-primary/50 transition-colors object-cover" />
                                <div>
                                    <h4 className="font-bold text-white text-sm group-hover:text-brand-primary transition-colors">{t.author}</h4>
                                    <p className="text-xs text-white/40">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </Section>
    );
};
