import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../ui/Section';
import { X, ExternalLink, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { TiltCard } from '../ui/TiltCard';

// Industry-specific placeholder images
const references = [
    {
        id: 1,
        name: "Mest Gayrimenkul",
        link: "https://mestgayrimenkul.com/",
        description: "Profesyonel gayrimenkul danışmanlığı ve portföy yönetimi platformu. Kullanıcı dostu arayüz ile ilan listeleme ve filtreleme özellikleri.",
        image: "/images/ref-mest.webp", // Real Estate
        category: "Kurumsal Web Sitesi"
    },
    {
        id: 2,
        name: "Taha Sigorta",
        link: "https://www.tahasigorta.com/",
        description: "Kapsamlı sigortacılık hizmetleri için dijital çözüm ortağı. Hızlı teklif alma ve poliçe sorgulama entegrasyonları.",
        image: "/images/ref-taha.webp", // Insurance/Business
        category: "Kurumsal Kimlik & Web"
    },
    {
        id: 3,
        name: "Batı Ankara 2023",
        link: "https://batiankara2023.com/",
        description: "Modern şehircilik vizyonuyla geliştirilen konut projesi tanıtım sitesi. 3D proje görselleri ve detaylı kat planı sunumları.",
        image: "/images/ref-bati.webp", // Construction/Apartments
        category: "Proje Lansman Sitesi"
    },
    {
        id: 4,
        name: "Ark Reklam",
        link: "https://arkreklam.com/",
        description: "Yaratıcı reklam ajansı için dinamik ve portfolyo odaklı web tasarımı. Video arka planlar ve interaktif galeri deneyimi.",
        image: "/images/service-branding.webp", // Agency/Creative - shared with service
        category: "Ajans Web Sitesi"
    },
    {
        id: 5,
        name: "Concept Decoor",
        link: "https://conceptdecoor.com/",
        description: "İç mimari ve dekorasyon projeleri için minimalist showcase sitesi. Yüksek çözünürlüklü proje galerileri.",
        image: "/images/ref-concept.webp", // Interior Design
        category: "E-Ticaret & Katalog"
    },
    {
        id: 6,
        name: "Eskişehir Hediyelik",
        link: "https://eskisehirhediyelik.com/",
        description: "Yöresel ve özel tasarım hediyelik eşyalar için e-ticaret altyapısı. Güvenli ödeme ve kolay sipariş yönetimi.",
        image: "/images/ref-hediyelik.webp", // Gift Shop
        category: "E-Ticaret Sistemi"
    },
    {
        id: 7,
        name: "Ava Nargile",
        link: "https://avanargile.com/",
        description: "Premium nargile ürünleri ve aksesuarları tanıtım platformu. Şık, karanlık mod tasarımı ve ürün odaklı görselleştirme.",
        image: "/images/ref-ava.webp", // Hookah/Lounge - Note: using a classy bar/lounge image fallback
        category: "Marka Tanıtım"
    },
    {
        id: 8,
        name: "Genel Servis",
        link: "https://www.genelservisarizakayit.com/",
        description: "Teknik servis ve arıza kayıt yönetim sistemi. Müşteri talep formu ve servis takip modülleri.",
        image: "/images/ref-genel.webp", // Technical Service
        category: "Web Uygulaması"
    },
    {
        id: 9,
        name: "Çarşamba Çiğköfte",
        link: "https://carsambacigkofte.com/",
        description: "Geleneksel lezzetler için iştah açıcı kurumsal web sitesi. Menü sunumu ve şube iletişim bilgileri.",
        image: "/images/ref-carsamba.webp", // Food
        category: "Restoran Web Sitesi"
    },
    {
        id: 10,
        name: "Vena Temizlik",
        link: "https://venatemizlik.com/",
        description: "Profesyonel temizlik hizmetleri tanıtım ve randevu sitesi. Hizmet detayları ve online teklif formu.",
        image: "/images/ref-vena.webp", // Cleaning
        category: "Hizmet Sektörü"
    }
];

export const References = () => {
    const [selectedRef, setSelectedRef] = useState<typeof references[0] | null>(null);
    const [visibleCount, setVisibleCount] = useState(4);

    return (
        <Section id="projects" className="py-32 bg-brand-dark relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                        <span className="text-sm font-medium text-brand-primary">Başarı Hikayeleri</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-6">
                        İmzamızı Attığımız <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary">
                            Dijital Eserler
                        </span>
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg">
                        Farklı sektörlerdeki markalar için geliştirdiğimiz özel çözümler ve başarıyla tamamlanan projelerimizden seçkiler.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {references.slice(0, visibleCount).map((ref) => (
                        <TiltCard
                            key={ref.id}
                            className="h-[350px] cursor-pointer group rounded-3xl overflow-hidden"
                            onClick={() => setSelectedRef(ref)}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={ref.image}
                                    alt={ref.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold text-brand-secondary mb-3 uppercase tracking-wider">
                                        {ref.category}
                                    </span>
                                    <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">
                                        {ref.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-white/60 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 delay-75">
                                        <span>Detayları İncele</span>
                                        <ChevronRight size={14} />
                                    </div>
                                </div>
                            </div>
                        </TiltCard>
                    ))}
                </div>

                {visibleCount < references.length && (
                    <div className="flex justify-center mt-12">
                        <Button
                            variant="outline"
                            onClick={() => setVisibleCount((prev) => Math.min(prev + 4, references.length))}
                            className="gap-2 group flex items-center justify-center"
                        >
                            <span>Devamını Gör</span>
                            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                        </Button>
                    </div>
                )}
            </div>

            {/* Modal Detail View */}
            <AnimatePresence>
                {selectedRef && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedRef(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        />
                        <motion.div
                            layoutId={`card-${selectedRef.id}`}
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl"
                        >
                            <div className="grid lg:grid-cols-2">
                                {/* Left: Image */}
                                <div className="relative h-64 lg:h-auto">
                                    <img
                                        src={selectedRef.image}
                                        alt={selectedRef.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a] hidden lg:block" />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a] lg:hidden" />
                                </div>

                                {/* Right: Content */}
                                <div className="p-8 lg:p-12 flex flex-col justify-center relative">
                                    <button
                                        onClick={() => setSelectedRef(null)}
                                        className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                                    >
                                        <X size={20} />
                                    </button>

                                    <span className="text-sm font-bold text-brand-secondary uppercase tracking-widest mb-4">
                                        {selectedRef.category}
                                    </span>
                                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                                        {selectedRef.name}
                                    </h3>
                                    <p className="text-brand-light/70 text-lg leading-relaxed mb-8">
                                        {selectedRef.description}
                                    </p>

                                    <div className="flex flex-wrap gap-4">
                                        <Button
                                            onClick={() => window.open(selectedRef.link, '_blank')}
                                            className="w-full lg:w-auto flex-1 gap-2 group flex items-center justify-center"
                                        >
                                            <span>Projeyi İncele</span>
                                            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => setSelectedRef(null)}
                                            className="w-full lg:w-auto border-white/10 hover:bg-white/5"
                                        >
                                            Kapat
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </Section>
    );
};
