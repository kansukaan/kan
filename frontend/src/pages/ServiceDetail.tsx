import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { services } from '../data/services';
import { Section } from '../components/ui/Section';
import { useEffect } from 'react';

export const ServiceDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const service = services.find(s => s.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!service) {
        return (
            <div className="h-screen flex items-center justify-center bg-brand-dark text-white">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4">Hizmet Bulunamadı</h2>
                    <Button onClick={() => navigate('/')}>Ana Sayfaya Dön</Button>
                </div>
            </div>
        );
    }

    const Icon = service.icon;

    return (
        <div className="bg-brand-dark min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[70vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/50 via-brand-dark/80 to-brand-dark" />
                </div>

                <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate('/')}
                        className="absolute top-32 left-6 md:left-0 flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Geri Dön</span>
                    </motion.button>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-primary/20 border border-brand-primary/30 text-brand-primary backdrop-blur-md mb-8">
                            <Icon className="w-5 h-5" />
                            <span className="font-semibold tracking-wider uppercase text-sm">Uzmanlık Alanımız</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-heading leading-tight">
                            {service.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-brand-light/80 leading-relaxed max-w-2xl">
                            {service.description}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <Section className="py-20 relative">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Description & Features */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold text-white mb-8">Hizmet Detayları</h2>
                            <p className="text-lg text-brand-light/70 mb-12 leading-relaxed">
                                {service.longDescription}
                            </p>

                            <h3 className="text-xl font-bold text-white mb-6">Neler Sunuyoruz?</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {service.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-brand-primary/30 transition-colors">
                                        <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-1" />
                                        <span className="text-brand-light/90">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Process Gradient Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative p-8 rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-transparent border border-white/10"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />

                            <h3 className="text-2xl font-bold text-white mb-8 relative z-10">Çalışma Sürecimiz</h3>
                            <div className="space-y-8 relative z-10">
                                {service.process.map((step, idx) => (
                                    <div key={idx} className="flex gap-4 group">
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 rounded-full bg-brand-primary/20 border border-brand-primary/50 text-brand-primary flex items-center justify-center font-bold">
                                                {idx + 1}
                                            </div>
                                            {idx !== service.process.length - 1 && (
                                                <div className="w-px h-full bg-white/10 my-2 group-hover:bg-brand-primary/50 transition-colors" />
                                            )}
                                        </div>
                                        <div className="pb-8">
                                            <h4 className="text-lg font-bold text-white mb-1 group-hover:text-brand-primary transition-colors">{step.title}</h4>
                                            <p className="text-sm text-brand-light/60">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/10">
                                <Button className="w-full gap-2 group justify-center text-lg py-6" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                                    <span>Hemen Başlayalım</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Section>
        </div>
    );
};
