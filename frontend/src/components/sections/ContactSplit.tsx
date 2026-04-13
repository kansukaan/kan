import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../ui/Section';
import { Phone, Mail, ArrowRight, Check, Loader2, Send, MessageSquare, Clock, Smartphone, User } from 'lucide-react';
import { useState } from 'react';

export const ContactSplit = () => {
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('sending');

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxXCUS1RtgRhA5GXjDfkme_02Ruey3Y3U3sblIRWBnrMnerEtyfJKMqzjoiSBbXdUI3vQ/exec';

        try {
            // 1. Send to Google Sheets (Better compatibility with URLSearchParams)
            const sheetParams = new URLSearchParams();
            Object.entries(data).forEach(([key, value]) => sheetParams.append(key, value as string));
            sheetParams.append('project_type', 'Geri Arama Talebi');
            sheetParams.append('project_details', 'İletişim sayfasından geri arama istendi.');

            const sheetsPromise = fetch(GOOGLE_SHEETS_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: sheetParams
            });

            // 2. Send Mail via FormSubmit.co
            const mailPromise = fetch('https://formsubmit.co/ajax/kansukaan123@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    ...data,
                    _subject: `Yeni Geri Arama Talebi: ${data.full_name || 'İsimsiz'}`,
                    _captcha: "false",
                    _template: "table"
                })
            });

            await Promise.allSettled([sheetsPromise, mailPromise]);
            
            setFormStatus('success');
            setTimeout(() => setFormStatus('idle'), 3000);
        } catch (error) {
            console.error('Submission error:', error);
            setFormStatus('idle');
        }
    };

    return (
        <Section id="contact" className="py-24 md:py-32 relative overflow-hidden bg-black">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-secondary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-primary/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 relative">

                    {/* Left Side: You Call Us (Active, Warm, Immediate) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="group relative bg-[#0a0a0a] border border-white/10 rounded-3xl lg:rounded-r-none lg:rounded-l-3xl p-8 md:p-12 overflow-hidden flex flex-col justify-between min-h-[500px]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        {/* Animated Phone Icon Background */}
                        <div className="absolute -right-12 -bottom-12 md:-right-16 md:-bottom-16 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none">
                            <Phone className="w-64 h-64 md:w-80 md:h-80 text-white" />
                        </div>

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-secondary/10 border border-brand-secondary/20 mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse" />
                                <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest">7/24 Aktif</span>
                            </div>

                            <h3 className="text-4xl md:text-5xl font-bold text-white font-heading leading-tight mb-4">
                                Vakit <br />
                                Kaybetmeyin.
                            </h3>
                            <p className="text-white/40 text-lg max-w-sm">
                                Projeniz için beklemeyin. Doğrudan arayın, hemen planlamaya başlayalım.
                            </p>
                        </div>

                        <div className="relative z-10 mt-12 space-y-4">
                            <a href="tel:+905427854585" className="group/btn block w-full">
                                <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-4 transition-all duration-300 group-hover/btn:bg-brand-secondary/10 group-hover/btn:border-brand-secondary/30 group-hover/btn:scale-[1.02]">
                                    <div className="w-12 h-12 rounded-full bg-brand-secondary/20 flex items-center justify-center text-brand-secondary shrink-0 group-hover/btn:scale-110 transition-transform">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-0.5">Şimdi Ara</div>
                                        <div className="text-xl md:text-2xl font-bold text-white font-mono tracking-tighter">+90 542 785 45 85</div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover/btn:bg-brand-secondary group-hover/btn:text-white group-hover/btn:border-transparent transition-all">
                                        <ArrowRight className="w-5 h-5 -rotate-45 group-hover/btn:rotate-0 transition-transform duration-300" />
                                    </div>
                                </div>
                            </a>

                            <div className="grid grid-cols-2 gap-4">
                                <a href="mailto:info@kanteknoloji.com" className="group/mail bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col justify-center gap-2 transition-all hover:bg-white/10 hover:border-white/20">
                                    <Mail className="w-5 h-5 text-white/60 group-hover/mail:text-brand-primary transition-colors" />
                                    <span className="text-sm text-white/80 font-medium">E-posta Gönder</span>
                                </a>
                                <a href="https://wa.me/905427854585" target="_blank" rel="noopener noreferrer" className="group/wa bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col justify-center gap-2 transition-all hover:bg-[#25D366]/10 hover:border-[#25D366]/30">
                                    <MessageSquare className="w-5 h-5 text-white/60 group-hover/wa:text-[#25D366] transition-colors" />
                                    <span className="text-sm text-white/80 font-medium">WhatsApp</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Middle Divider (Visual Only) */}
                    <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent z-20">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/40">
                            VS
                        </div>
                    </div>

                    {/* Right Side: We Call You (Passive, Cool, Scheduled) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="group relative bg-[#0a0a0a] border border-white/10 rounded-3xl lg:rounded-l-none lg:rounded-r-3xl p-8 md:p-12 overflow-hidden flex flex-col justify-center min-h-[500px]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-bl from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        {/* Animated Clock Icon Background */}
                        <div className="absolute -right-12 -top-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none">
                            <Clock className="w-64 h-64 text-white" />
                        </div>

                        <div className="relative z-10 mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                                <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Sizi Arayalım</span>
                            </div>

                            <h3 className="text-4xl md:text-5xl font-bold text-white font-heading leading-tight mb-4">
                                Müsait <br />
                                Değil misiniz?
                            </h3>
                            <p className="text-white/40 text-lg">
                                Numaranızı bırakın, en uygun olduğunuz vakitte uzmanlarımız sizi arasın.
                            </p>
                        </div>

                        <div className="relative z-10">
                            <AnimatePresence mode="wait">
                                {formStatus === 'success' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-4 h-[240px]"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                                            <Check className="w-8 h-8 text-green-500" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white">Talep Alındı!</h4>
                                            <p className="text-white/60 text-sm mt-1">En kısa sürede size dönüş yapacağız.</p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        layout
                                        onSubmit={handleSubmit}
                                        className="space-y-4"
                                    >
                                        <div className="group/input relative">
                                            <input
                                                type="text"
                                                name="full_name"
                                                required
                                                placeholder="İsim Soyisim"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-primary/50 focus:bg-white/10 transition-all peer"
                                            />
                                            <div className="absolute inset-y-0 right-4 flex items-center opacity-0 peer-focus:opacity-100 transition-opacity text-brand-primary pointer-events-none">
                                                <User className="w-4 h-4" />
                                            </div>
                                        </div>
 
                                        <div className="group/input relative">
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                placeholder="Telefon Numarası"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-primary/50 focus:bg-white/10 transition-all peer"
                                            />
                                            <div className="absolute inset-y-0 right-4 flex items-center opacity-0 peer-focus:opacity-100 transition-opacity text-brand-primary pointer-events-none">
                                                <Smartphone className="w-4 h-4" />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={formStatus === 'sending'}
                                            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-brand-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {formStatus === 'sending' ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    <span>Gönderiliyor...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Beni Arayın</span>
                                                    <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                </div>
            </div>
        </Section>
    );
};


