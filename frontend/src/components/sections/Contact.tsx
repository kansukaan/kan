import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { MagneticButton } from '../ui/magnetic-button';
import { Mail, MapPin, Phone, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../../context/SoundContext';

export const Contact = () => {
    const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');
    const { playClick, playHover } = useSound();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        playClick();
        setFormState('loading');

        // Simulate network request
        setTimeout(() => {
            setFormState('success');
        }, 2000);
    };

    return (
        <Section id="contact" className="relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">Geleceği Birlikte İnşa Edelim</h2>
                        <p className="text-brand-light/70 mb-8 text-lg">
                            Dijital varlığınızı dönüştürmeye hazır mısınız? 4. Çeyrek için yeni proje başvurularını kabul ediyoruz.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group cursor-pointer" onMouseEnter={playHover}>
                                <MagneticButton>
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                                        <Mail className="text-white" />
                                    </div>
                                </MagneticButton>
                                <div>
                                    <p className="text-sm text-brand-light/50">E-posta</p>
                                    <p className="text-white font-medium">hello@kanteknoloji.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group cursor-pointer" onMouseEnter={playHover}>
                                <MagneticButton>
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                                        <Phone className="text-white" />
                                    </div>
                                </MagneticButton>
                                <div>
                                    <p className="text-sm text-brand-light/50">Telefon</p>
                                    <p className="text-white font-medium">+90 542 785 45 85</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group cursor-pointer" onMouseEnter={playHover}>
                                <MagneticButton>
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                                        <MapPin className="text-white" />
                                    </div>
                                </MagneticButton>
                                <div>
                                    <p className="text-sm text-brand-light/50">Ofis</p>
                                    <p className="text-white font-medium">İstanbul, Türkiye</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm relative overflow-hidden">
                        <AnimatePresence mode='wait'>
                            {formState === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center h-[400px] text-center"
                                >
                                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Mesaj Gönderildi!</h3>
                                    <p className="text-brand-light/60">24 saat içinde size dönüş yapacağız.</p>
                                    <button
                                        onClick={() => setFormState('idle')}
                                        className="mt-8 text-brand-primary hover:text-white transition-colors text-sm"
                                    >
                                        Yeni mesaj gönder
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-6"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-brand-light/70">İsim Soyisim</label>
                                            <input required type="text" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-primary transition-colors" placeholder="Ahmet Yılmaz" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-brand-light/70">E-posta</label>
                                            <input required type="email" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-primary transition-colors" placeholder="ahmet@ornek.com" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-brand-light/70">Konu</label>
                                        <select className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-primary transition-colors text-white/70">
                                            <option>Genel Bilgi</option>
                                            <option>Proje Teklifi</option>
                                            <option>Kariyer</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-brand-light/70">Mesajınız</label>
                                        <textarea required rows={4} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-primary transition-colors" placeholder="Projenizden bahsedin..." />
                                    </div>

                                    <Button className="w-full py-4 text-lg group" disabled={formState === 'loading'}>
                                        {formState === 'loading' ? (
                                            <Loader2 className="animate-spin w-5 h-5 mx-auto" />
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                Gönder <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        )}
                                    </Button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </Section>
    );
};
