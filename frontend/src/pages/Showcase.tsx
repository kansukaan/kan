import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { MagneticButton } from '../components/ui/magnetic-button';
import { SpotlightCard } from '../components/ui/spotlight-card';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Layout, Sparkles, Palette, MousePointer2, Loader2, Check, Search, Mail, Lock, Eye, EyeOff, X, Bell, AlertCircle, Info, CheckCircle2, Globe, Cpu, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BentoGrid, BentoGridItem } from '../components/ui/bento-grid';
import { Accordion } from '../components/ui/accordion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { InfiniteMovingCards } from '../components/ui/infinite-moving-cards';
import { TextGenerateEffect } from '../components/ui/text-generate-effect';

import { TiltCard } from '../components/ui/tilt-card';

// --- Toast Notification System ---

// --- Toast Notification System ---
const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error' | 'info', onClose: () => void }) => {
    const icons = {
        success: <CheckCircle2 className="text-green-400" />,
        error: <AlertCircle className="text-red-400" />,
        info: <Info className="text-blue-400" />
    };

    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-[#121212]/90 backdrop-blur-xl border border-white/10 shadow-2xl w-full sm:w-auto sm:min-w-[320px] max-w-[calc(100vw-2rem)]"
        >
            <div className="flex-shrink-0">{icons[type]}</div>
            <span className="text-sm font-medium text-white line-clamp-2">{message}</span>
            <button onClick={onClose} className="ml-auto flex-shrink-0 p-1 text-white/50 hover:text-white transition-colors">
                <X size={16} />
            </button>
        </motion.div>
    );
};

// --- Animated Tabs ---
const Tabs = () => {
    const [activeTab, setActiveTab] = useState('design');
    const tabs = [
        { id: 'design', label: 'Tasarım' },
        { id: 'code', label: 'Yazılım' },
        { id: 'marketing', label: 'Pazarlama' }
    ];

    return (
        <div className="flex space-x-1 bg-white/5 p-1 rounded-xl overflow-x-auto no-scrollbar scrollbar-hide">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${activeTab === tab.id ? '' : 'text-white/60 hover:text-white'} relative rounded-lg px-4 py-2 text-sm font-medium outline-2 outline-sky-400 transition focus-visible:outline flex-shrink-0 whitespace-nowrap`}
                >
                    {activeTab === tab.id && (
                        <motion.div
                            layoutId="active-pill"
                            className="absolute inset-0 bg-white/10 rounded-lg"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10 mix-blend-exclusion">{tab.label}</span>
                </button>
            ))}
        </div>
    );
};

// --- Progress Bar ---
const ProgressBar = ({ progress }: { progress: number }) => (
    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
        <motion.div
            className="h-full bg-brand-primary"
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
        />
    </div>
);

// --- Skeleton Loader ---
const Skeleton = ({ className }: { className?: string }) => (
    <div className={`bg-white/5 animate-pulse rounded-lg ${className}`} />
);

export const Showcase = () => {
    const [loadingStates, setLoadingStates] = useState<{ [key: number]: boolean }>({});
    const [successStates, setSuccessStates] = useState<{ [key: number]: boolean }>({});
    const [showPassword, setShowPassword] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toasts, setToasts] = useState<{ id: number, message: string, type: 'success' | 'error' | 'info' }[]>([]);

    // Tabs State
    const [underlineTab, setUnderlineTab] = useState('Genel');
    const [segmentedTab, setSegmentedTab] = useState('Haftalık');

    // Progress State
    const [progress, setProgress] = useState(13);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => (prev >= 100 ? 0 : prev + 1));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const addToast = (type: 'success' | 'error' | 'info') => {
        const id = Date.now();
        const messages = {
            success: "İşlem başarıyla tamamlandı!",
            error: "Bir hata oluştu, lütfen tekrar deneyin.",
            info: "Yeni bir güncelleme mevcut."
        };
        setToasts([...toasts, { id, message: messages[type], type }]);
    };

    const removeToast = (id: number) => {
        setToasts(toasts.filter(t => t.id !== id));
    };

    const handleLoad = (id: number) => {
        setLoadingStates(prev => ({ ...prev, [id]: true }));
        setTimeout(() => {
            setLoadingStates(prev => ({ ...prev, [id]: false }));
            setSuccessStates(prev => ({ ...prev, [id]: true }));
            setTimeout(() => setSuccessStates(prev => ({ ...prev, [id]: false })), 2000);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#020005] overflow-x-hidden">
            <Navbar />
            {/* Toast Container - Mobile adjusted */}
            <div className="fixed bottom-4 sm:bottom-8 left-4 right-4 sm:left-auto sm:right-8 z-50 flex flex-col items-center sm:items-end gap-3 pointer-events-none">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <div key={toast.id} className="pointer-events-auto">
                            <Toast message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
                        </div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl p-5 md:p-8 shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent" />
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">
                                <X size={24} />
                            </button>
                            <div className="mb-6">
                                <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center text-brand-primary mb-4">
                                    <Sparkles />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Premium Modal</h3>
                                <p className="text-brand-light/60">
                                    Glassmorphism efektleri ve yumuşak animasyonlarla zenginleştirilmiş diyalog penceresi.
                                </p>
                            </div>
                            <div className="flex justify-end gap-3">
                                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Vazgeç</Button>
                                <Button onClick={() => setIsModalOpen(false)}>Onayla</Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Section id="showcase-hero" className="pt-32 pb-16 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-primary/10 to-transparent pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col items-center text-center mb-24">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 mb-6 backdrop-blur-md">
                            <Code2 className="w-4 h-4 text-brand-secondary" />
                            <span className="text-xs font-bold text-white/80 uppercase tracking-widest">Tasarım Sistemi v2.2</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                            Bileşen <br /> Vitrini
                        </h1>
                        <p className="text-brand-light/60 text-xl max-w-2xl">
                            Platform genelinde kullanılan geliştirilmiş UI bileşenleri: Modallar, bildirimler, gelişmiş kartlar ve animasyonlar.
                        </p>
                    </div>

                    <div className="grid gap-24">
                        {/* 1. Modal & Toasts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-8 bg-white/[0.02] border border-white/5 p-4 md:p-8 rounded-3xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <Bell className="w-6 h-6 text-brand-primary" />
                                    <h2 className="text-2xl font-bold text-white">Bildirimler (Toasts)</h2>
                                </div>
                                <div className="flex gap-4 flex-wrap">
                                    <Button onClick={() => addToast('success')} className="bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20">Success</Button>
                                    <Button onClick={() => addToast('error')} className="bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20">Error</Button>
                                    <Button onClick={() => addToast('info')} className="bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20">Info</Button>
                                </div>
                            </div>

                            <div className="space-y-8 bg-white/[0.02] border border-white/5 p-4 md:p-8 rounded-3xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <Layout className="w-6 h-6 text-brand-secondary" />
                                    <h2 className="text-2xl font-bold text-white">Modal Dialog</h2>
                                </div>
                                <p className="text-brand-light/60 mb-4">Arka plan bulanıklığı ve scale animasyonu ile açılan modern modal.</p>
                                <Button onClick={() => setIsModalOpen(true)}>Modalı Aç</Button>
                            </div>
                        </div>

                        {/* 2. Tabs & Progress */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-8 bg-white/[0.02] border border-white/5 p-4 md:p-8 rounded-3xl">
                                <div className="flex items-center gap-3 mb-8">
                                    <MousePointer2 className="w-6 h-6 text-brand-accent" />
                                    <h2 className="text-2xl font-bold text-white">Animasyonlu Sekmeler</h2>
                                </div>

                                {/* 1. Pill Tabs (Existing) */}
                                <div className="space-y-4">
                                    <span className="text-xs text-white/40 font-mono">Pill Style</span>
                                    <Tabs />
                                </div>

                                {/* 2. Underline Tabs */}
                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <span className="text-xs text-white/40 font-mono">Underline Style</span>
                                    <div className="flex space-x-6 border-b border-white/10 relative overflow-x-auto no-scrollbar scrollbar-hide">
                                        {['Genel', 'Detaylar', 'Ayarlar'].map((tab) => (
                                            <div key={tab}
                                                onClick={() => setUnderlineTab(tab)}
                                                className="pb-4 relative cursor-pointer group flex-shrink-0 whitespace-nowrap"
                                            >
                                                <span className={`text-sm font-medium transition-colors ${underlineTab === tab ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                                                    {tab}
                                                </span>
                                                {underlineTab === tab && (
                                                    <motion.div
                                                        layoutId="underline"
                                                        className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary shadow-[0_0_10px_rgba(112,0,255,0.5)]"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 3. Segmented Control */}
                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <span className="text-xs text-white/40 font-mono">Segmented Control</span>
                                    <div className="bg-black/40 p-1 rounded-lg inline-flex relative w-full overflow-x-auto no-scrollbar scrollbar-hide">
                                        <div className="absolute inset-0 p-1">
                                            <motion.div
                                                layoutId="segmented-bg"
                                                className="bg-white/10 shadow-lg rounded-md h-full absolute"
                                                initial={false}
                                                animate={{
                                                    width: '33.33%',
                                                    x: segmentedTab === 'Günlük' ? '0%' : segmentedTab === 'Haftalık' ? '100%' : '200%'
                                                }}
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        </div>
                                        {['Günlük', 'Haftalık', 'Aylık'].map((tab) => (
                                            <div
                                                key={tab}
                                                onClick={() => setSegmentedTab(tab)}
                                                className={`px-4 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-all relative z-10 w-full text-center ${segmentedTab === tab ? 'text-white' : 'text-white/40 hover:text-white/80'}`}
                                            >
                                                {tab}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8 bg-white/[0.02] border border-white/5 p-4 md:p-8 rounded-3xl">
                                <div className="flex items-center gap-3 mb-8">
                                    <Loader2 className="w-6 h-6 text-brand-primary" />
                                    <h2 className="text-2xl font-bold text-white">İlerleme Durumları</h2>
                                </div>

                                <div className="space-y-8">
                                    {/* 1. Linear Progress */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs text-white/60">
                                            <span>Sistem Yükleniyor...</span>
                                            <span>{Math.round(progress)}%</span>
                                        </div>
                                        <ProgressBar progress={progress} />
                                    </div>

                                    {/* 2. Gradient Progress */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs text-white/60">
                                            <span>Veri İşleniyor...</span>
                                            <span className="text-brand-secondary">{Math.round(progress * 0.8)}%</span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-brand-secondary to-brand-primary"
                                                animate={{ width: `${progress * 0.8}%` }}
                                                transition={{ ease: "linear" }}
                                            />
                                        </div>
                                    </div>

                                    {/* 3. Steps Progress */}
                                    <div className="space-y-4 pt-2">
                                        <div className="flex justify-between text-xs text-white/60 mb-2">
                                            <span>Kurulum Adımları</span>
                                        </div>
                                        <div className="flex items-center justify-between relative px-2">
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-white/10 -z-0" />
                                            <motion.div
                                                className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-brand-primary -z-0"
                                                animate={{ width: `${Math.min((progress / 100) * 100, 100)}%` }}
                                            />
                                            {[1, 2, 3, 4].map((step) => {
                                                const stepProgress = step * 25;
                                                const isCompleted = progress >= stepProgress;
                                                const isActive = progress >= (step - 1) * 25 && progress < stepProgress;

                                                return (
                                                    <div key={step} className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border-2 transition-all duration-300 relative z-10 
                                                        ${isCompleted || isActive ? 'bg-brand-dark border-brand-primary text-brand-primary shadow-[0_0_15px_-5px_rgba(112,0,255,0.5)] scale-110' : 'bg-brand-dark border-white/10 text-white/20'}`}>
                                                        {isCompleted ? <Check size={14} /> : step}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* 4. Circular Progress (Mimic) */}
                                    <div className="flex items-center gap-6 pt-2">
                                        <div className="relative w-16 h-16 flex items-center justify-center">
                                            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                                <path className="text-white/10" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                                <motion.path
                                                    className="text-brand-accent drop-shadow-[0_0_10px_rgba(255,0,85,0.5)]"
                                                    strokeDasharray={`${progress}, 100`}
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="3"
                                                />
                                            </svg>
                                            <span className="absolute text-xs font-bold text-white">{Math.round(progress)}%</span>
                                        </div>
                                        <div className="text-xs text-white/40">
                                            <p className="text-white font-bold mb-1">Dönüşüm Oranı</p>
                                            <p>Saatlik analiz</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>



                        {/* 5. Etkileşimli Butonlar (Expanded) */}
                        <div className="border-t border-white/10 pt-24">
                            <div className="flex items-center gap-3 mb-12 justify-center">
                                <MousePointer2 className="w-6 h-6 text-brand-accent" />
                                <h2 className="text-2xl font-bold text-white">İnteraktif Butonlar</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 p-4 md:p-8 bg-white/[0.02] rounded-3xl border border-white/5">
                                {/* Column 1: Magnetic Buttons */}
                                <div className="flex flex-col gap-8 items-center border-b md:border-b-0 md:border-r border-white/5 pb-8 md:pb-0 md:pr-8">
                                    <span className="text-xs text-white/40 font-mono self-start w-full text-center mb-[-1rem]">Magnetic (Physics)</span>

                                    {/* Magnetic 1 */}
                                    <MagneticButton>
                                        <div className="flex items-center gap-2 px-6 py-3 bg-brand-secondary/10 text-brand-secondary rounded-full border border-brand-secondary/20 font-bold hover:bg-brand-secondary hover:text-brand-dark transition-all shadow-[0_0_20px_-5px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_0px_rgba(0,240,255,0.6)]">
                                            <span>Mıknatıs</span>
                                            <Sparkles size={16} />
                                        </div>
                                    </MagneticButton>

                                    {/* Magnetic 2 */}
                                    <MagneticButton>
                                        <div className="flex items-center gap-2 px-6 py-3 bg-brand-primary/10 text-brand-primary rounded-xl border border-brand-primary/20 font-bold hover:bg-brand-primary hover:text-white transition-all shadow-[0_0_20px_-5px_rgba(112,0,255,0.3)] hover:shadow-[0_0_30px_0px_rgba(112,0,255,0.6)]">
                                            <span>Keşfet</span>
                                            <ArrowRight size={16} />
                                        </div>
                                    </MagneticButton>

                                    {/* Magnetic 3 */}
                                    <MagneticButton>
                                        <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                                            <MousePointer2 size={20} />
                                        </div>
                                    </MagneticButton>
                                </div>

                                {/* Column 2: Loading States */}
                                <div className="flex flex-col gap-8 items-center border-b md:border-b-0 md:border-r border-white/5 pb-8 md:pb-0 md:pr-8">
                                    <span className="text-xs text-white/40 font-mono self-start w-full text-center mb-[-1rem]">State Handling</span>

                                    {/* Loading 1 */}
                                    <button
                                        onClick={() => handleLoad(1)}
                                        disabled={loadingStates[1] || successStates[1]}
                                        className={`relative px-6 py-3 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 w-full sm:w-40 flex items-center justify-center ${successStates[1] ? 'bg-green-500 hover:bg-green-600' : 'bg-brand-primary hover:bg-brand-primary/80'}`}
                                    >
                                        <div className="relative z-10 flex items-center gap-2">
                                            {loadingStates[1] ? <Loader2 className="animate-spin w-5 h-5" /> : successStates[1] ? <><Check className="w-5 h-5" /><span>Başarılı</span></> : <span>Yükle</span>}
                                        </div>
                                    </button>

                                    {/* Loading 2 */}
                                    <button
                                        onClick={() => handleLoad(2)}
                                        disabled={loadingStates[2] || successStates[2]}
                                        className={`relative px-6 py-3 rounded-full font-bold text-white overflow-hidden transition-all duration-300 w-full sm:w-40 flex items-center justify-center border ${successStates[2] ? 'bg-brand-secondary text-brand-dark border-brand-secondary' : 'border-white/20 hover:bg-white/10'}`}
                                    >
                                        <div className="relative z-10 flex items-center gap-2">
                                            {loadingStates[2] ? <Loader2 className="animate-spin w-5 h-5" /> : successStates[2] ? <><Check className="w-5 h-5" /><span>Gönderildi</span></> : <span>Gönder</span>}
                                        </div>
                                    </button>

                                    {/* Loading 3 */}
                                    <button
                                        onClick={() => handleLoad(3)}
                                        disabled={loadingStates[3] || successStates[3]}
                                        className={`group relative px-6 py-3 rounded-xl font-bold overflow-hidden transition-all duration-300 w-full sm:w-40 flex items-center justify-center ${successStates[3] ? 'bg-brand-accent text-white' : 'bg-white text-black'}`}
                                    >
                                        <div className="relative z-10 flex items-center gap-2">
                                            {loadingStates[3] ? <Loader2 className="animate-spin w-5 h-5" /> : successStates[3] ? <><Check className="w-5 h-5" /><span>Kaydedildi</span></> : <span>Kaydet</span>}
                                        </div>
                                    </button>
                                </div>

                                {/* Column 3: Gradient Borders */}
                                <div className="flex flex-col gap-8 items-center">
                                    <span className="text-xs text-white/40 font-mono self-start w-full text-center mb-[-1rem]">Gradient / Glow</span>

                                    {/* Gradient 1 */}
                                    <div className="p-[1px] rounded-xl bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent group overflow-hidden relative cursor-pointer">
                                        <div className="absolute inset-0 bg-white/20 blur-md group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
                                        <div className="relative bg-[#020005] px-6 py-3 rounded-[11px] group-hover:bg-white/5 transition-colors">
                                            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Neon Gradient</span>
                                        </div>
                                    </div>

                                    {/* Gradient 2 */}
                                    <div className="p-[1px] rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 group overflow-hidden relative cursor-pointer">
                                        <div className="absolute inset-0 bg-orange-500/20 blur-md group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
                                        <div className="relative bg-[#020005] px-8 py-3 rounded-full group-hover:bg-white/5 transition-colors flex items-center gap-2">
                                            <span className="font-bold text-orange-500">Sunset</span>
                                            <ArrowRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>

                                    {/* Gradient 3 */}
                                    <div className="relative group cursor-pointer">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                                        <div className="relative px-7 py-4 bg-black ring-1 ring-gray-900/5 rounded-lg leading-none flex items-center space-x-6">
                                            <span className="space-y-2 text-gray-100 font-bold">Glow Effect</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 7. Kartlar & Efektler (Previous Content) */}
                        <div className="border-t border-white/10 pt-24">
                            <div className="flex items-center gap-3 mb-12 justify-center">
                                <Sparkles className="w-6 h-6 text-yellow-500" />
                                <h2 className="text-2xl font-bold text-white">Gelişmiş Kart Tasarımları</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
                                {/* 1. Spotlight Card */}
                                <SpotlightCard>
                                    <div className="p-6 md:p-8 h-72 flex flex-col justify-between">
                                        <div className="w-14 h-14 bg-brand-primary/20 rounded-2xl flex items-center justify-center text-brand-primary mb-4 ring-1 ring-brand-primary/40 shadow-[0_0_30px_-10px_rgba(112,0,255,0.5)]">
                                            <Code2 className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-3">Spotlight Efekti</h3>
                                            <p className="text-brand-light/60 text-sm leading-relaxed">
                                                Mouse hareketini takip eden dinamik ışık hüzmesi. Kullanıcı etkileşimini artırır ve derinlik hissi yaratır.
                                            </p>
                                        </div>
                                    </div>
                                </SpotlightCard>

                                {/* 2. 3D Tilt Card */}
                                <TiltCard className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl backdrop-blur-sm">
                                    <div className="w-14 h-14 bg-brand-secondary/20 rounded-2xl flex items-center justify-center text-brand-secondary mb-auto ring-1 ring-brand-secondary/40 shadow-[0_0_30px_-10px_rgba(0,240,255,0.5)]">
                                        <Layout className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-3">3D Tilt (Eğim)</h3>
                                        <p className="text-brand-light/60 text-sm leading-relaxed">
                                            Fizik tabanlı 3D döndürme efekti. Kart, mouse pozisyonuna göre gerçekçi bir şekilde eğilir.
                                        </p>
                                    </div>
                                </TiltCard>

                                {/* 3. Image Overlay Card */}
                                <div className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer shadow-2xl bg-black">
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-accent via-brand-primary to-brand-dark opacity-100 transition-opacity duration-700" />
                                    <img
                                        src="https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=800&auto=format&fit=crop"
                                        alt="Abstract"
                                        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />

                                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="w-10 h-1 bg-brand-accent mb-4 w-0 group-hover:w-10 transition-all duration-500" />
                                        <h3 className="text-2xl font-bold text-white mb-2">Görsel Kart</h3>
                                        <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            Yüksek çözünürlüklü görseller ve yumuşak geçiş efektleri.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 6. Form Elemanları (Previous Content) */}
                        <div className="border-t border-white/10 pt-24">
                            <div className="flex items-center gap-3 mb-12 justify-center">
                                <Layout className="w-6 h-6 text-brand-secondary" />
                                <h2 className="text-2xl font-bold text-white">Form Bileşenleri</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                                <div className="space-y-6">
                                    {/* Standard Input with Icon */}
                                    <div className="group relative">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-brand-primary transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="E-posta Adresi"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-primary focus:bg-white/10 focus:shadow-[0_0_30px_-10px_rgba(112,0,255,0.3)] transition-all"
                                        />
                                    </div>

                                    {/* Password Input with Toggle */}
                                    <div className="group relative">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-brand-secondary transition-colors">
                                            <Lock className="w-5 h-5" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Şifre"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-secondary focus:bg-white/10 focus:shadow-[0_0_30px_-10px_rgba(0,240,255,0.3)] transition-all"
                                        />
                                        <button
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-4 flex items-center text-white/40 hover:text-white cursor-pointer transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Search Input (Pill Shape) */}
                                    <div className="group relative">
                                        <input
                                            type="text"
                                            placeholder="Site içinde ara..."
                                            className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-accent focus:bg-white/10 transition-all pr-12"
                                        />
                                        <div className="absolute inset-y-0 right-2 w-10 flex items-center justify-center">
                                            <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
                                                <Search className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Textarea */}
                                    <div className="relative">
                                        <textarea
                                            rows={3}
                                            placeholder="Mesajınız..."
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none"
                                        />
                                        <div className="absolute bottom-3 right-3 text-[10px] text-white/20 font-mono">0/500</div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* 8. Modern Layouts (Bento & Accordion) */}
                        <div className="border-t border-white/10 pt-24">
                            <div className="flex items-center gap-3 mb-12 justify-center">
                                <Layout className="w-6 h-6 text-brand-secondary" />
                                <h2 className="text-2xl font-bold text-white">Modern Yerleşimler</h2>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-12">
                                {/* Bento Grid */}
                                <div className="space-y-8">
                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-brand-primary" />
                                        Bento Grid
                                    </h3>
                                    <BentoGrid className="lg:auto-rows-[15rem]">
                                        <BentoGridItem
                                            title="Veri Analitiği"
                                            description="Gerçek zamanlı verilerle güçlendirilmiş içgörüler."
                                            header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />}
                                            className="md:col-span-2"
                                            icon={<Sparkles className="h-4 w-4 text-neutral-500" />}
                                        />
                                        <BentoGridItem
                                            title="Global Erişim"
                                            description="Sınırları aşan dijital çözümler."
                                            header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-brand-primary/20 to-neutral-900" />}
                                            className="md:col-span-1"
                                            icon={<Globe className="h-4 w-4 text-neutral-500" />}
                                        />
                                        <BentoGridItem
                                            title="Yapay Zeka"
                                            description="Geleceğin teknolojisi bugün elinizde."
                                            header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-brand-secondary/20 to-neutral-900" />}
                                            className="md:col-span-1"
                                            icon={<Cpu className="h-4 w-4 text-neutral-500" />}
                                        />
                                        <BentoGridItem
                                            title="Güvenlik"
                                            description="Kurumsal seviyede koruma."
                                            header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />}
                                            className="md:col-span-2"
                                            icon={<Lock className="h-4 w-4 text-neutral-500" />}
                                        />
                                    </BentoGrid>
                                </div>

                                {/* Accordion */}
                                <div className="space-y-8">
                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-brand-accent" />
                                        Premium Akordeon
                                    </h3>
                                    <Accordion items={[
                                        {
                                            title: "Süreç nasıl işliyor?",
                                            content: "Proje başlangıcında detaylı bir analiz ve strateji oturumu ile hedeflerinizi belirliyoruz. Ardından tasarım, geliştirme ve test aşamalarıyla ilerliyoruz."
                                        },
                                        {
                                            title: "Hangi teknolojileri kullanıyorsunuz?",
                                            content: "Modern ve ölçeklenebilir teknolojileri tercih ediyoruz: React, Next.js, Node.js, TypeScript ve çeşitli bulut çözümleri."
                                        },
                                        {
                                            title: "Destek hizmetiniz var mı?",
                                            content: "Evet, proje tesliminden sonra da bakım ve güncelleme hizmetleriyle yanınızdayız. 7/24 teknik destek sağlıyoruz."
                                        }
                                    ]} />
                                </div>
                            </div>
                        </div>

                        {/* 9. Metin Efektleri */}
                        <div className="border-t border-white/10 pt-24">
                            <div className="flex items-center gap-3 mb-12 justify-center">
                                <Sparkles className="w-6 h-6 text-brand-primary" />
                                <h2 className="text-2xl font-bold text-white">Metin Efektleri</h2>
                            </div>
                            <div className="bg-white/[0.02] border border-white/5 p-4 md:p-12 rounded-3xl text-center">
                                <h3 className="text-white/50 mb-4 text-sm font-mono uppercase">Text Generate Effect</h3>
                                <TextGenerateEffect words="Geleceği kodlayanlar için tasarlanmış, sınırları zorlayan dijital deneyimler." />
                            </div>
                        </div>

                        {/* 10. Sonsuz Kartlar (Infinite Marquee) */}
                        <div className="border-t border-white/10 pt-24">
                            <div className="flex items-center gap-3 mb-12 justify-center">
                                <Layout className="w-6 h-6 text-brand-secondary" />
                                <h2 className="text-2xl font-bold text-white">Sonsuz Akış (Marquee)</h2>
                            </div>
                            <InfiniteMovingCards
                                items={[
                                    { name: "Ahmet Yılmaz", title: "CTO", quote: "Teknolojiyi sanatla buluşturan nadir ekiplerden." },
                                    { name: "Ayşe Kaya", title: "Product Manager", quote: "Kullanıcı deneyimi konusunda standartları yeniden belirlediler." },
                                    { name: "Mehmet Demir", title: "Founder", quote: "Hız, estetik ve güvenilirlik. Aradığımız her şey burada." },
                                    { name: "Zeynep Çelik", title: "Marketing Lead", quote: "Markamızın dijital yüzü artık dünya standartlarında." },
                                ]}
                                speed="slow"
                            />
                        </div>

                        {/* 11. Fiyatlandırma Kartları */}
                        <div className="border-t border-white/10 pt-24">
                            <div className="flex items-center gap-3 mb-12 justify-center">
                                <Sparkles className="w-6 h-6 text-brand-accent" />
                                <h2 className="text-2xl font-bold text-white">Fiyatlandırma</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {/* Starter */}
                                <TiltCard className="h-auto bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden shadow-xl">
                                    <div className="p-6 md:p-8">
                                        <h3 className="text-xl font-bold text-white mb-2">Başlangıç</h3>
                                        <div className="text-3xl font-bold text-brand-primary mb-6">₺25.000</div>
                                        <ul className="space-y-3 mb-8">
                                            {["Responsive Tasarım", "5 Sayfa", "Temel SEO", "İletişim Formu"].map(item => (
                                                <li key={item} className="flex items-center gap-2 text-white/70 text-sm">
                                                    <Check className="w-4 h-4 text-brand-primary" /> {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <Button className="w-full" variant="outline">Seç</Button>
                                    </div>
                                </TiltCard>
                                {/* Pro */}
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent rounded-[2rem] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                                    <div className="relative bg-neutral-900 ring-1 ring-white/10 rounded-3xl p-6 md:p-8 h-full flex flex-col">
                                        <div className="absolute top-0 right-0 bg-brand-accent text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">POPÜLER</div>
                                        <h3 className="text-xl font-bold text-white mb-2">Profesyonel</h3>
                                        <div className="text-3xl font-bold text-brand-secondary mb-6">₺45.000</div>
                                        <ul className="space-y-3 mb-8 flex-1">
                                            {["Her Şey Dahil", "10+ Sayfa", "Gelişmiş SEO", "CMS Entegrasyonu", "Blog Modülü"].map(item => (
                                                <li key={item} className="flex items-center gap-2 text-white/70 text-sm">
                                                    <Check className="w-4 h-4 text-brand-secondary" /> {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <Button className="w-full bg-brand-secondary text-brand-dark hover:bg-brand-secondary/80">Hemen Başla</Button>
                                    </div>
                                </div>
                                {/* Enterprise */}
                                <TiltCard className="h-auto bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden shadow-xl">
                                    <div className="p-6 md:p-8">
                                        <h3 className="text-xl font-bold text-white mb-2">Kurumsal</h3>
                                        <div className="text-3xl font-bold text-white mb-6">Özel Teklif</div>
                                        <ul className="space-y-3 mb-8">
                                            {["Özel Yazılım", "Sınırsız Sayfa", "Tam Kapsamlı SEO", "7/24 Destek", "SLA"].map(item => (
                                                <li key={item} className="flex items-center gap-2 text-white/70 text-sm">
                                                    <Check className="w-4 h-4 text-white" /> {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <Button className="w-full" variant="ghost">İletişime Geç</Button>
                                    </div>
                                </TiltCard>
                            </div>
                        </div>

                        {/* 4. Renkler & Tipografi (Moved to Bottom) */}
                        <div className="border-t border-white/10 pt-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div className="flex items-center gap-3 mb-8">
                                    <Palette className="w-6 h-6 text-brand-primary" />
                                    <h2 className="text-2xl font-bold text-white">Renk Paleti</h2>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {[
                                        { name: 'Primary (Mor)', color: 'bg-brand-primary', hex: '#7000FF' },
                                        { name: 'Secondary (Camgöbeği)', color: 'bg-brand-secondary', hex: '#00F0FF' },
                                        { name: 'Accent (Pembe)', color: 'bg-brand-accent', hex: '#FF0055' },
                                        { name: 'Dark (Siyah)', color: 'bg-brand-dark', hex: '#020005' },
                                        { name: 'Surface (Cam)', color: 'bg-white/5', hex: 'Glass' },
                                        { name: 'Success (Yeşil)', color: 'bg-green-500', hex: '#22c55e' },
                                    ].map((c) => (
                                        <div key={c.name} className="group p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer">
                                            <div className={`w-full h-12 rounded-lg mb-3 ${c.color} shadow-lg ring-2 ring-white/5 ring-offset-2 ring-offset-black group-hover:scale-105 transition-transform`} />
                                            <div className="text-xs font-bold text-white uppercase tracking-wider">{c.name}</div>
                                            <div className="text-[10px] text-white/40 font-mono mt-1">{c.hex}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-8">
                                <div className="flex items-center gap-3 mb-8">
                                    <Layout className="w-6 h-6 text-brand-secondary" />
                                    <h2 className="text-2xl font-bold text-white">Tipografi</h2>
                                </div>
                                <div className="space-y-8 border-l-2 border-white/5 pl-8">
                                    <div>
                                        <p className="text-xs text-brand-primary mb-2 font-mono uppercase tracking-widest">Display / Heading</p>
                                        <h1 className="text-5xl font-bold font-heading text-white">Geleceği Tasarla</h1>
                                    </div>
                                    <div>
                                        <p className="text-xs text-brand-secondary mb-2 font-mono uppercase tracking-widest">H2 / Bölüm Başlığı</p>
                                        <h2 className="text-3xl font-bold font-heading text-white">Dijital Dönüşüm Başlıyor</h2>
                                    </div>
                                    <div>
                                        <p className="text-xs text-brand-accent mb-2 font-mono uppercase tracking-widest">Body / Paragraf</p>
                                        <p className="text-lg text-brand-light/70 leading-relaxed max-w-md">
                                            Premium dijital deneyimler, nefes alan tipografi gerektirir. Okunabilirliği yüksek, modern sans-serif fontlar kullanarak içerik hiyerarşisini güçlendiriyoruz.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Skeleton Loading (Moved to Bottom) */}
                        <div className="border-t border-white/10 pt-24">
                            <h2 className="text-2xl font-bold text-white mb-8 text-center">Yükleme Durumları (Skeleton)</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                {/* 1. Article/Card Skeleton */}
                                <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.02]">
                                    <div className="text-white/40 mb-4 text-xs font-mono">Article Card</div>
                                    <Skeleton className="h-40 w-full mb-6 rounded-xl" />
                                    <Skeleton className="h-6 w-3/4 mb-4 rounded-lg" />
                                    <Skeleton className="h-4 w-1/2 mb-2 rounded-lg" />
                                    <Skeleton className="h-4 w-full rounded-lg" />
                                </div>

                                {/* 2. Profile/User Skeleton */}
                                <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.02]">
                                    <div className="text-white/40 mb-4 text-xs font-mono">User Profile</div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <Skeleton className="w-16 h-16 rounded-full" />
                                        <div className="space-y-2 flex-1">
                                            <Skeleton className="h-5 w-3/4 rounded-lg" />
                                            <Skeleton className="h-4 w-1/2 rounded-lg" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Skeleton className="h-4 w-full rounded-lg" />
                                        <Skeleton className="h-4 w-full rounded-lg" />
                                        <Skeleton className="h-4 w-5/6 rounded-lg" />
                                    </div>
                                </div>

                                {/* 3. Activity/List Skeleton */}
                                <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.02]">
                                    <div className="text-white/40 mb-4 text-xs font-mono">Activity List</div>
                                    <div className="space-y-4">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="flex items-center gap-3">
                                                <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
                                                <div className="space-y-2 flex-1">
                                                    <Skeleton className="h-3 w-full rounded-md" />
                                                    <Skeleton className="h-3 w-2/3 rounded-md" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Section>
            <Footer />
        </div>
    );
};
