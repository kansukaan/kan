import { useState } from 'react';
import { Section } from '../ui/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: "Web sitesi geliştirme süreci ne kadar sürüyor?",
        answer: "Projenin kapsamına göre değişmekle birlikte, standart bir kurumsal web sitesi için 1 saatte demo teslimi yapıyoruz. Kapsamlı projeler için ilk toplantımızda detaylı bir zaman çizelgesi sunuyoruz."
    },
    {
        question: "Mevcut sitemi modernize edebilir misiniz?",
        answer: "Kesinlikle. Eski altyapınızı koruyarak sadece ön yüzü (frontend) yenileyebilir veya performansı artırmak için sistemi tamamen modern teknolojilerle (React, Next.js) yeniden inşa edebiliriz."
    },
    {
        question: "SEO uyumluluğu konusunda destek veriyor musunuz?",
        answer: "Evet, geliştirdiğimiz tüm projeler teknik SEO standartlarına (hız, mobil uyumluluk, yapısal veri) %100 uygun olarak teslim edilir. Ayrıca içerik stratejisi konusunda da danışmanlık sağlıyoruz."
    },
    {
        question: "Proje tesliminden sonra teknik destek sağlıyor musunuz?",
        answer: "Evet, proje yayına alındıktan sonra 1 yıl boyunca ücretsiz teknik bakım desteği sunuyoruz. Ayrıca isteğe bağlı olarak 7/24 destek paketlerimizden de yararlanabilirsiniz."
    },
    {
        question: "Hangi teknolojileri kullanıyorsunuz?",
        answer: "Frontend tarafında React, Next.js, Tailwind CSS ve Framer Motion; Backend tarafında ise Node.js, Python (Django/FastAPI) ve modern bulut çözümleriyle (AWS, Vercel) çalışıyoruz."
    }
];

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <Section id="faq" className="relative overflow-hidden py-24 md:py-32 bg-[#020005]">
            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 blur-[120px] pointer-events-none rounded-full" />

            <div className="container mx-auto px-6 relative z-10 max-w-4xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 mb-6 mx-auto">
                        <HelpCircle className="w-3 h-3 text-brand-secondary" />
                        <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">S.S.S</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 leading-tight">
                        Merak <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Edilenler</span>
                    </h2>
                    <p className="text-brand-light/60 text-lg max-w-xl mx-auto">
                        Süreçlerimiz, teknolojilerimiz ve hizmetlerimiz hakkında sıkça sorulan soruların cevapları.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`border transition-all duration-300 rounded-2xl overflow-hidden ${openIndex === index ? 'bg-white/[0.05] border-brand-primary/30 shadow-[0_0_30px_-10px_rgba(var(--brand-primary-rgb),0.3)]' : 'bg-white/[0.02] border-white/5 hover:border-white/10'}`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left cursor-pointer group"
                            >
                                <span className={`text-lg font-medium transition-colors ${openIndex === index ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                                    {faq.question}
                                </span>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${openIndex === index ? 'bg-brand-primary text-white border-brand-primary rotate-180' : 'bg-white/5 text-white/50 border-white/10 group-hover:bg-white/10 group-hover:text-white'}`}>
                                    {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                                </div>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "circOut" }}
                                    >
                                        <div className="p-6 pt-0 text-brand-light/60 leading-relaxed text-base border-t border-white/5 mt-2">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
};
