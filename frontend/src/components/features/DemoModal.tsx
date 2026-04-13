import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Upload, CheckCircle, AlertCircle, Loader2, ArrowRight, ArrowLeft, Briefcase, FileText, Send, Sparkles } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import { Modal } from '../ui/Modal';
import { useSound } from '../../context/SoundContext';

// Simple Confetti Component (CSS + DOM)
const Confetti = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className={`absolute w-2 h-2 rounded-full ${['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'][i % 5]}`}
                    initial={{
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 0
                    }}
                    animate={{
                        x: (Math.random() - 0.5) * 400,
                        y: (Math.random() - 0.5) * 400,
                        opacity: 0,
                        scale: Math.random() + 0.5,
                        rotate: Math.random() * 360
                    }}
                    transition={{
                        duration: 1.5,
                        ease: "easeOut",
                        delay: 0.2
                    }}
                />
            ))}
        </div>
    );
};

export const DemoModal = () => {
    const { isOpen, openModal, closeModal } = useModal();
    const { playClick, playHover } = useSound();
    const [step, setStep] = useState(1);

    // Auto-open logic for ads
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('action') === 'demo') {
            openModal();
        }
    }, [openModal]);
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        phone: '',
        company_name: '',
        project_type: '',
        project_details: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelection = (name: string, value: string) => {
        playClick();
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            playClick(); // Sound feedback
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            playClick(); // Sound feedback
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        playClick();
        setLoading(true);
        setStatus('idle');
        setErrorMessage('');

        try {
            const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxXCUS1RtgRhA5GXjDfkme_02Ruey3Y3U3sblIRWBnrMnerEtyfJKMqzjoiSBbXdUI3vQ/exec';

            // 1. Send to Google Sheets (Better compatibility with URLSearchParams)
            const sheetParams = new URLSearchParams();
            Object.entries(formData).forEach(([key, value]) => sheetParams.append(key, value as string));

            const sheetsPromise = fetch(GOOGLE_SHEETS_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: sheetParams
            });

            // 2. Send to FormSubmit
            const submitData = new FormData();
            submitData.append('phone', formData.phone);
            submitData.append('company_name', formData.company_name);
            submitData.append('project_type', formData.project_type);
            submitData.append('project_details', formData.project_details);
            submitData.append('message', `Proje Detayları: ${formData.project_details}`);

            // Standard FormSubmit.co configuration
            submitData.append('_subject', `Proje Başvurusu: ${formData.company_name} - ${formData.project_type}`);
            submitData.append('_template', 'table');
            submitData.append('_captcha', 'false');

            if (file) {
                submitData.append('attachment', file);
            }

            const mailPromise = fetch('https://formsubmit.co/ajax/kansukaan123@gmail.com', {
                method: 'POST',
                body: submitData
            });

            await Promise.allSettled([sheetsPromise, mailPromise]);

            setStatus('success');
            // Reset form after success
            setTimeout(() => {
                closeModal();
                setStep(1);
                setFormData({
                    phone: '',
                    company_name: '',
                    project_type: '',
                    project_details: ''
                });
                setFile(null);
                setStatus('idle');
            }, 5000);

        } catch (error: any) {
            console.error(error);
            setStatus('error');
            setErrorMessage('Gönderim sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => {
        playClick();
        // Validation
        if (step === 1) {
            if (!formData.phone) {
                setErrorMessage('Lütfen bir telefon numarası girin.');
                setStatus('error');
                return;
            }
        }
        if (step === 2) {
            if (!formData.project_type) {
                setErrorMessage('Lütfen bir proje türü seçin.');
                setStatus('error');
                return;
            }
        }
        setStatus('idle');
        setStep(prev => prev + 1);
    };

    const prevStep = () => {
        playClick();
        setStep(prev => prev - 1);
    };

    const steps = [
        { id: 1, title: 'İletişim', icon: <Briefcase size={14} /> },
        { id: 2, title: 'Detaylar', icon: <FileText size={14} /> },
        { id: 3, title: 'Dosya', icon: <Upload size={14} /> }
    ];

    const projectTypes = [
        "Web Sitesi", "Mobil Uygulama", "E-Ticaret", "Kurumsal Kimlik", "Özel Yazılım", "Diğer"
    ];

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <div className="relative p-8 md:p-12 overflow-hidden min-h-[500px] flex flex-col">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none animate-pulse" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

                {/* Header */}
                <div className="mb-8 text-center relative z-10">
                    <h2 className="text-3xl font-bold text-white mb-2 font-heading">
                        {step === 2 ? (
                            <>Proje Detayları</>
                        ) : step === 3 ? (
                            <>Son Bir Adım Kaldı</>
                        ) : (
                            <>Projenizi <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary">Başlatın</span></>
                        )}
                    </h2>
                    <p className="text-white/60 text-sm max-w-sm mx-auto">
                        {step === 1 ? "Hayalinizdeki dijital çözümü birlikte tasarlayalım." :
                            step === 2 ? "Bize projenizden biraz daha bahsedin." :
                                "Varsa dosyanızı yükleyin ve kontrol edip gönderin."}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center justify-between mb-10 relative max-w-sm mx-auto z-10 w-full">
                    {/* Track Line */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/5 rounded-full -z-10">
                        <motion.div
                            className="h-full bg-gradient-to-r from-brand-secondary to-brand-primary rounded-full relative overflow-hidden"
                            initial={{ width: '0%' }}
                            animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >

                        </motion.div>
                    </div>

                    {steps.map((s) => (
                        <div key={s.id} className="flex flex-col items-center gap-2 relative group cursor-default">
                            <motion.div
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${step >= s.id
                                    ? 'bg-brand-dark border-brand-primary text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                                    : 'bg-brand-dark border-white/10 text-white/30'
                                    }`}
                                animate={{ scale: step === s.id ? 1.1 : 1 }}
                            >
                                <AnimatePresence mode="wait">
                                    {step > s.id ? (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                        >
                                            <CheckCircle size={16} className="text-brand-primary" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                        >
                                            {s.icon}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider absolute -bottom-6 whitespace-nowrap transition-colors duration-300 ${step >= s.id ? 'text-white' : 'text-white/30'
                                }`}>{s.title}</span>
                        </div>
                    ))}
                </div>

                {/* Status Messages */}
                <AnimatePresence mode="wait">
                    {status === 'error' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm mb-6 flex items-center gap-2 relative z-20"
                        >
                            <AlertCircle size={16} className="shrink-0" />
                            {errorMessage}
                        </motion.div>
                    )}

                    {status === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-8 text-center flex-1"
                        >
                            <div className="relative">
                                {/* Success Circle */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
                                    className="w-24 h-24 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 mb-6 relative z-10"
                                >
                                    <CheckCircle size={48} className="text-white" />
                                </motion.div>
                                <Confetti />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Harika! Talebiniz Alındı.</h3>
                            <p className="text-white/60 max-w-xs mx-auto">
                                Projeniz için çok heyecanlıyız. En kısa sürede sizinle iletişime geçeceğiz.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Form Steps */}
                {status !== 'success' && (
                    <form onSubmit={(e) => e.preventDefault()} className="relative z-10 flex-1 flex flex-col">
                        <div className="flex-1">
                            <AnimatePresence mode="wait" custom={1}>
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-5"
                                    >
                                        <div className="space-y-2 group">
                                            <label className="text-xs font-bold text-white/60 uppercase tracking-wider ml-1 group-focus-within:text-brand-primary transition-colors">Telefon</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-primary/50 focus:bg-white/10 transition-all focus:ring-1 focus:ring-brand-primary/50"
                                                placeholder="0555 555 55 55"
                                                autoFocus
                                            />
                                        </div>
                                        <div className="space-y-2 group">
                                            <label className="text-xs font-bold text-white/60 uppercase tracking-wider ml-1 group-focus-within:text-brand-primary transition-colors">Şirket Adı</label>
                                            <input
                                                type="text"
                                                name="company_name"
                                                value={formData.company_name}
                                                onChange={handleInputChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-primary/50 focus:bg-white/10 transition-all focus:ring-1 focus:ring-brand-primary/50"
                                                placeholder="Şirketiniz (Opsiyonel)"
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        {/* Project Type Selection */}
                                        <div className="space-y-3">
                                            <label className="text-xs font-bold text-white/60 uppercase tracking-wider ml-1 flex items-center gap-2">
                                                <Briefcase size={12} /> Proje Türü
                                            </label>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                {projectTypes.map(type => (
                                                    <motion.button
                                                        key={type}
                                                        type="button"
                                                        onClick={() => handleSelection('project_type', type)}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onMouseEnter={playHover}
                                                        className={`px-3 py-3 rounded-xl text-sm font-medium transition-all text-left border relative overflow-hidden ${formData.project_type === type
                                                            ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/20'
                                                            : 'bg-white/5 text-white/70 border-white/5 hover:bg-white/10 hover:border-white/20'
                                                            }`}
                                                    >
                                                        {type}
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-white/60 uppercase tracking-wider ml-1">Projenizi Anlatın</label>
                                            <textarea
                                                name="project_details"
                                                value={formData.project_details}
                                                onChange={handleInputChange}
                                                rows={4}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-primary/50 transition-colors resize-none"
                                                placeholder="Projenizden bahsedin, hedef kitleniz, özel istekleriniz vb."
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-white/60 uppercase tracking-wider ml-1">Dosya Ekle (Opsiyonel)</label>
                                            <div
                                                className={`relative border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer group ${dragActive ? 'border-brand-primary bg-brand-primary/10 scale-[1.02]' : 'border-white/10 hover:border-brand-primary/50 hover:bg-white/5'
                                                    }`}
                                                onDragEnter={handleDrag}
                                                onDragLeave={handleDrag}
                                                onDragOver={handleDrag}
                                                onDrop={handleDrop}
                                                onClick={() => document.getElementById('modal-file-upload')?.click()}
                                                onMouseEnter={playHover}
                                            >
                                                <input
                                                    id="modal-file-upload"
                                                    type="file"
                                                    className="hidden"
                                                    onChange={handleFileChange}
                                                    accept="image/*,.pdf,.doc,.docx"
                                                />

                                                {file ? (
                                                    <div className="flex flex-col items-center gap-2">
                                                        <div className="w-12 h-12 rounded-full bg-brand-secondary/20 flex items-center justify-center text-brand-secondary mb-2">
                                                            <FileText size={24} />
                                                        </div>
                                                        <p className="font-bold text-white">{file.name}</p>
                                                        <p className="text-xs text-white/60">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setFile(null);
                                                            }}
                                                            className="mt-2 text-xs text-red-400 hover:text-red-300 hover:underline"
                                                        >
                                                            Dosyayı Kaldır
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                                                            <Upload className={`w-7 h-7 ${dragActive ? 'text-brand-primary' : 'text-white/40'}`} />
                                                        </div>
                                                        <p className="text-white font-medium">Dosyayı buraya sürükleyin</p>
                                                        <div className="mt-3 px-3 py-1 bg-white/5 rounded-full text-[10px] text-white/40 border border-white/5">
                                                            PNG, JPG, PDF (Max 10MB)
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Ticket Style Summary */}
                                        <div className="bg-[#111] p-0 rounded-xl overflow-hidden border border-white/10 relative group">
                                            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-brand-secondary to-brand-primary" />
                                            <div className="p-5 relative">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                                        <Sparkles size={14} className="text-brand-secondary" />
                                                        Proje Özeti
                                                    </h4>
                                                    <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-white/60">TASLAK</span>
                                                </div>

                                                <div className="space-y-3 text-sm">

                                                    <div className="flex justify-between items-end">
                                                        <span className="text-white/40 text-xs uppercase tracking-wider">Proje</span>
                                                        <span className="text-brand-secondary font-bold">{formData.project_type || 'Belirtilmedi'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Perforated Edge Effect */}
                                            <div className="h-6 bg-[#111] relative">
                                                <div className="absolute -top-3 left-0 w-full h-6 flex justify-between px-2">
                                                    {[...Array(15)].map((_, i) => (
                                                        <div key={i} className="w-3 h-3 rounded-full bg-[#0a0a0a]" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex gap-4 mt-8 pt-6 border-t border-white/10">
                            {step > 1 && (
                                <Button variant="outline" onClick={prevStep} onMouseEnter={playHover} className="flex-1 border-white/10 hover:bg-white/5 text-white">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Geri
                                </Button>
                            )}

                            {step < 3 ? (
                                <Button onClick={nextStep} onMouseEnter={playHover} className="flex-1 ml-auto bg-white text-black hover:bg-brand-primary hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)]">
                                    Devam Et
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            ) : (
                                <Button onClick={handleSubmit} onMouseEnter={playHover} disabled={loading} className="flex-1 btn-primary shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]">
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Gönderiliyor
                                        </>
                                    ) : (
                                        <>
                                            Başvuru Gönder
                                            <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </form>
                )}
            </div>
        </Modal>
    );
};
