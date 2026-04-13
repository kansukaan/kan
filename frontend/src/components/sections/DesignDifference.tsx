import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Section } from '../ui/Section';
import { Check, X, MousePointer2, AlertTriangle, Lock, User, Eye, Fingerprint, RefreshCcw, ShieldAlert, ScanFace, ArrowRight, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const OrdinaryCard = () => {
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [captcha, setCaptcha] = useState(false);

    // Simulate frustratingly slow and jittery loading
    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingProgress(prev => {
                if (prev >= 85) return prev;
                return Math.random() > 0.6 ? prev : prev + Math.random() * 5;
            });
        }, 700);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full bg-[#f4f4f4] border-2 border-[#d1d5db] rounded-lg flex flex-col relative overflow-hidden font-sans group select-none shadow-inner transition-colors hover:bg-[#eaeaea]">
            {/* Retro / Basic Browser Header */}
            <div className="bg-[#e5e7eb] px-3 py-1.5 flex items-center gap-2 border-b border-[#d1d5db]">
                <div className="flex gap-1.5 opacity-50 grayscale group-hover:grayscale-0 transition-all">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 border border-red-600/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 border border-yellow-600/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 border border-green-600/30" />
                </div>
                <div className="flex-1 bg-white border border-[#d1d5db] h-5 rounded-sm text-[9px] text-slate-500 flex items-center px-2 font-mono shadow-inner overflow-hidden whitespace-nowrap">
                    <span className="text-red-500/70 mr-1 flex items-center gap-0.5"><Lock size={8} /> Not Secure |</span> login.php?session_id=89234...
                </div>
                <div className="w-2.5 h-2.5 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
            </div>

            {/* Simulated Loading Bar */}
            <div className="h-0.5 bg-slate-200 w-full border-b border-slate-300">
                <div
                    className="h-full bg-blue-600 transition-all duration-500 ease-out relative overflow-hidden"
                    style={{ width: `${loadingProgress}%` }}
                />
            </div>

            <div className="p-6 flex flex-col items-center justify-center h-full relative">
                {/* Annoying Popup Overlay */}
                <div className="absolute inset-0 bg-black/20 z-20 flex items-center justify-center backdrop-grayscale-[50%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-1000 pointer-events-none">
                    <div className="bg-[#fff9e6] border-2 border-[#e6b800] p-4 rounded shadow-2xl text-center max-w-[200px] transform scale-95 group-hover:scale-100 transition-transform duration-200 relative">
                        <div className="absolute -top-3 -right-3 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] shadow-sm cursor-pointer border border-white">X</div>
                        <AlertTriangle className="w-8 h-8 text-[#e6b800] mx-auto mb-2 animate-[shake_0.5s_infinite]" />
                        <div className="text-slate-800 font-bold text-[10px] mb-0.5">Güvenlik Uyarısı</div>
                        <div className="text-slate-600 text-[9px] leading-tight mb-2">Çerezler devre dışı. Lütfen tarayıcı ayarlarınızı kontrol edin.</div>
                        <div className="bg-gradient-to-b from-slate-100 to-slate-200 border border-slate-300 text-slate-600 text-[9px] px-3 py-1 rounded shadow-sm hover:bg-slate-50 cursor-pointer inline-block font-medium">Tamam</div>
                    </div>
                </div>

                {/* Login Form - Intentionally Ugly */}
                <div className="bg-white border border-[#d1d5db] p-4 rounded shadow-sm w-full max-w-[240px] relative z-10">
                    <h3 className="text-lg font-bold text-slate-700 font-arial text-center mb-3 border-b border-slate-200 pb-2">Üye Girişi</h3>

                    <div className="space-y-2.5">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-600 block">Kullanıcı Adı:</label>
                            <div className="flex items-center border border-[#d1d5db] bg-[#f9fafb] px-2 py-1 rounded-sm shadow-inner group-hover:border-red-300 transition-colors">
                                <User className="w-3 h-3 text-slate-400 mr-2" />
                                <div className="text-[10px] text-slate-800 w-full animate-pulse">admin_user</div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-600 block">Şifre:</label>
                            <div className="flex items-center border border-[#d1d5db] bg-[#f9fafb] px-2 py-1 rounded-sm shadow-inner group-hover:border-red-300 transition-colors">
                                <Lock className="w-3 h-3 text-slate-400 mr-2" />
                                <div className="text-[10px] text-slate-800 w-full animate-pulse">********</div>
                            </div>
                        </div>

                        {/* Fake CAPTCHA */}
                        <div className="border border-[#d1d5db] bg-[#f9fafb] p-2 rounded-sm flex items-center gap-2 mt-1">
                            <div
                                className={`w-4 h-4 border border-[#c1c5cd] bg-white rounded-sm flex items-center justify-center cursor-pointer ${captcha ? "border-green-500" : ""}`}
                                onClick={() => setCaptcha(!captcha)}
                            >
                                {captcha && <Check className="w-3 h-3 text-green-600" />}
                            </div>
                            <span className="text-[9px] text-slate-600 select-none">Ben robot değilim</span>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Recaptcha_Logo.svg/1200px-Recaptcha_Logo.svg.png" className="h-3 ml-auto opacity-50 grayscale" alt="" />
                        </div>

                        <button className="w-full bg-gradient-to-b from-blue-500 to-blue-600 border border-blue-700 text-white font-bold py-1.5 px-3 rounded-sm text-[10px] text-center shadow-sm mt-1 hover:bg-blue-600 active:bg-blue-700 active:shadow-inner transition-colors cursor-wait opacity-80">
                            Giriş Yap
                        </button>
                    </div>
                </div>

                <div className="mt-4 text-[9px] text-slate-400 text-center font-arial opacity-60">
                    &copy; 2012 - 2018 Tüm Hakları Saklıdır.
                </div>
            </div>
            {/* Mouse Cursor Simulation - Jerky Movement */}
            <div className="absolute bottom-10 right-10 pointer-events-none z-30 transition-transform duration-[4000ms] steps(5, end) group-hover:translate-x-[-80px] group-hover:translate-y-[-80px]">
                <MousePointer2 className="w-5 h-5 text-black drop-shadow-xl fill-white stroke-white stroke-1" />
            </div>
        </div>
    );
};

const PremiumCard = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
    const [step, setStep] = useState<'idle' | 'scanning' | 'typing' | 'authenticating' | 'success'>('idle');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    // Advanced Animation Sequence
    useEffect(() => {
        let mounted = true;
        const TARGET_EMAIL = "kansu@kanteknoloji.com";
        const TARGET_PASS = "••••••••••••";

        const runSequence = async () => {
            if (!mounted) return;

            // 1. Initial State
            setStep('idle');
            setEmail('');
            setPassword('');
            await new Promise(r => setTimeout(r, 1000));

            // 2. Scan Face
            if (!mounted) return;
            setStep('scanning');
            await new Promise(r => setTimeout(r, 1500));

            // 3. Type Email
            if (!mounted) return;
            setStep('typing');
            for (let i = 0; i <= TARGET_EMAIL.length; i++) {
                if (!mounted) return;
                setEmail(TARGET_EMAIL.slice(0, i));
                await new Promise(r => setTimeout(r, 50)); // Typing speed
            }
            await new Promise(r => setTimeout(r, 300));

            // 4. Type Password
            if (!mounted) return;
            for (let i = 0; i <= TARGET_PASS.length; i++) {
                if (!mounted) return;
                setPassword(TARGET_PASS.slice(0, i));
                await new Promise(r => setTimeout(r, 50));
            }
            await new Promise(r => setTimeout(r, 500));

            // 5. Authenticate
            if (!mounted) return;
            setStep('authenticating');
            await new Promise(r => setTimeout(r, 1500));

            // 6. Success
            if (!mounted) return;
            setStep('success');
            await new Promise(r => setTimeout(r, 4000)); // Stay on success longer

            // 7. Restart
            if (mounted) runSequence();
        };

        runSequence();
        return () => { mounted = false; };
    }, []);

    return (
        <div
            className="w-full h-full relative group perspective-1000"
            onMouseMove={handleMouseMove}
        >
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-cyan-600/30 rounded-2xl blur-3xl group-hover:blur-3xl transition-all duration-1000 opacity-60 group-hover:opacity-80" />

            <motion.div
                whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-full h-full bg-[#030014]/80 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl ring-1 ring-white/5"
                style={{
                    background: useMotionTemplate`
                    radial-gradient(
                      800px circle at ${springX}px ${springY}px,
                      rgba(139, 92, 246, 0.1),
                      rgba(6, 182, 212, 0.05) 40%,
                      transparent 80%
                    )
                  `,
                }}
            >
                {/* Cyber Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

                {/* Interactive Particles */}
                <motion.div
                    animate={{ y: [-20, 20, -20], scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen"
                />
                <motion.div
                    animate={{ x: [-20, 20, -20], scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] mix-blend-screen"
                />

                {/* Login Form - Modern Glassmorphism */}
                <div className="relative z-10 w-full max-w-[280px] backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl p-6 shadow-2xl group-hover:border-white/20 transition-all duration-500 overflow-hidden min-h-[400px] flex flex-col justify-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl opacity-50 pointer-events-none" />

                    {/* Success Overlay */}
                    <AnimatePresence mode="wait">
                        {step === 'success' ? (
                            <motion.div
                                key="success-content"
                                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 bg-[#030014]/90 backdrop-blur-xl z-50 flex flex-col items-center justify-center text-center p-6"
                            >
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                                    className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.6)] relative"
                                >
                                    <motion.div
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 rounded-full border border-green-400"
                                    />
                                    <Check className="w-10 h-10 text-white" />
                                </motion.div>
                                <motion.h4
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-white font-heading font-bold text-2xl mb-2"
                                >
                                    Hoş Geldiniz
                                </motion.h4>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-emerald-400/80 text-sm font-medium"
                                >
                                    Giriş başarılı. Yönlendiriliyorsunuz...
                                </motion.p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="login-form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full"
                            >
                                <div className="text-center mb-8 relative">
                                    <div className="flex justify-center mb-4 text-brand-primary relative h-12">
                                        <AnimatePresence mode="wait">
                                            {step === 'scanning' ? (
                                                <motion.div
                                                    key="scanning-icon"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    className="relative"
                                                >
                                                    <div className="absolute left-1/2 -translate-x-1/2 top-0 w-16 h-[2px] bg-cyan-400 blur-[2px] shadow-[0_0_15px_rgba(34,211,238,1)] z-20 animate-[scan_1.5s_ease-in-out_infinite_alternate]" />
                                                    <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                                                        <ScanFace className="w-6 h-6 text-cyan-400" />
                                                    </div>
                                                </motion.div>
                                            ) : step === 'authenticating' ? (
                                                <motion.div
                                                    key="auth-icon"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                >
                                                    <div className="p-3 rounded-xl bg-brand-primary/10 border border-brand-primary/30 shadow-[0_0_20px_rgba(124,58,237,0.2)]">
                                                        <RefreshCcw className="w-6 h-6 text-brand-primary animate-spin" />
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="idle-icon"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                >
                                                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 shadow-lg">
                                                        <Fingerprint className="w-6 h-6 text-white/50" />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <motion.div layout>
                                        <h3 className="text-xl font-heading font-bold text-white tracking-tight">
                                            {step === 'scanning' ? "Biyometrik Tarama" : step === 'authenticating' ? "Doğrulanıyor..." : "Hoş Geldiniz"}
                                        </h3>
                                        <p className="text-xs text-white/40 mt-1">
                                            {step === 'scanning' ? "Yüz kimliği kontrol ediliyor..." : "Hesabınıza güvenli giriş yapın"}
                                        </p>
                                    </motion.div>
                                </div>

                                <div className="space-y-4">
                                    <div className="group/input relative">
                                        <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${email ? 'text-brand-primary' : 'text-white/30'}`}>
                                            <User className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="text"
                                            value={email}
                                            placeholder="E-posta Adresi"
                                            className={`w-full bg-white/5 border text-white/90 text-xs rounded-xl py-3 pl-10 pr-3 outline-none transition-all placeholder:text-white/20 ${email ? 'border-brand-primary/50 bg-brand-primary/5' : 'border-white/10'}`}
                                            readOnly
                                        />
                                        {email && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            >
                                                <Check className="w-3 h-3 text-green-400" />
                                            </motion.div>
                                        )}
                                    </div>

                                    <div className="group/input relative">
                                        <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${password ? 'text-brand-primary' : 'text-white/30'}`}>
                                            <Lock className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="text"
                                            value={password}
                                            placeholder="Şifre"
                                            className={`w-full bg-white/5 border text-white/90 text-xs rounded-xl py-3 pl-10 pr-10 outline-none transition-all placeholder:text-white/20 ${password ? 'border-brand-primary/50 bg-brand-primary/5 tracking-widest' : 'border-white/10'}`}
                                            readOnly
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                                            <Eye className="w-4 h-4 text-white/40" />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-[10px] text-white/40 pt-1">
                                        <div className="flex items-center gap-2 cursor-pointer group/check">
                                            <div className={`w-3.5 h-3.5 rounded bg-white/5 border flex items-center justify-center transition-colors ${email ? 'border-brand-primary bg-brand-primary' : 'border-white/20 group-hover/check:border-white/40'}`}>
                                                {email && <Check className="w-2.5 h-2.5 text-white" />}
                                            </div>
                                            <span className="group-hover/check:text-white/60 transition-colors">Beni Hatırla</span>
                                        </div>
                                        <span className="hover:text-brand-primary transition-colors cursor-pointer">Şifremi Unuttum?</span>
                                    </div>

                                    <button
                                        className={`w-full bg-gradient-to-r from-brand-primary to-cyan-500 text-white font-bold py-3 rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all flex items-center justify-center gap-2 relative overflow-hidden text-xs mt-2 ${step === 'authenticating' ? 'opacity-80 cursor-wait' : 'hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:scale-[1.02]'}`}
                                    >
                                        <span className="relative z-10">{step === 'authenticating' ? 'Giriş Yapılıyor...' : 'Giriş Yap'}</span>
                                        {step === 'authenticating' ? (
                                            <Loader2 className="w-3.5 h-3.5 animate-spin relative z-10" />
                                        ) : (
                                            <ArrowRight className="w-3.5 h-3.5 relative z-10" />
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="mt-6 flex justify-center gap-4 border-t border-white/5 pt-4">
                        {/* Google */}
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.08)" }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-colors group/social"
                        >
                            <svg className="w-5 h-5 opacity-70 group-hover/social:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4" />
                                <path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3275 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z" fill="#34A853" />
                                <path d="M5.50253 14.3003C5.00236 12.8199 5.00236 11.1799 5.50253 9.69967V6.60879H1.51649C-0.18551 10.0056 -0.18551 13.9945 1.51649 17.3912L5.50253 14.3003Z" fill="#FBBC05" />
                                <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.60879L5.50264 9.69967C6.45064 6.86106 9.10947 4.74966 12.2401 4.74966Z" fill="#EA4335" />
                            </svg>
                        </motion.button>

                        {/* Apple */}
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.08)" }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-colors group/social"
                        >
                            <svg className="w-5 h-5 text-white/70 group-hover/social:text-white transition-colors fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.68-.83 1.14-1.99.94-3.14-1.03.04-2.28.69-3.02 1.55-.66.75-1.24 1.95-1.04 3.08 1.15.09 2.32-.64 3.12-1.49" />
                            </svg>
                        </motion.button>

                        {/* Twitter / X */}
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.08)" }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-colors group/social"
                        >
                            <svg className="w-4 h-4 text-white/70 group-hover/social:text-white transition-colors fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export const DesignDifference = () => {
    return (
        <Section className="relative bg-[#020005] py-24 md:py-32 overflow-hidden border-t border-white/5" id="about">
            {/* Section Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-primary/5 blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-12 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6 backdrop-blur-md shadow-lg"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse shadow-[0_0_10px_rgba(124,58,237,0.5)]"></span>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase">Kullanıcı Deneyimi Analizi</span>
                    </motion.div>

                    <motion.h3
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold text-white font-heading leading-tight tracking-tight drop-shadow-2xl"
                    >
                        İlk İzlenim <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-gradient bg-[length:200%_auto] filter drop-shadow-[0_0_25px_rgba(124,58,237,0.3)]">Her Şeydir</span>
                    </motion.h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch max-w-5xl mx-auto">
                    {/* Ordinary Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="relative h-[480px] lg:h-[500px] flex flex-col"
                    >
                        <div className="bg-[#1a0f0f] border border-red-500/20 rounded-xl px-4 flex items-center gap-4 relative overflow-hidden group/alert shadow-[0_0_20px_rgba(220,38,38,0.05)] h-24 mb-6">
                            <div className="absolute inset-0 bg-red-500/5 animate-pulse" />
                            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20 shrink-0 relative z-10">
                                <ShieldAlert className="w-6 h-6 text-red-400" />
                            </div>
                            <div className="relative z-10 flex-1">
                                <h4 className="text-red-400 font-bold uppercase tracking-wider text-xs mb-1">Eski Standartlar</h4>
                                <p className="text-white/40 text-[10px] leading-tight">Karmaşık arayüz ve güvensiz hissettiren tasarım.</p>
                            </div>
                        </div>

                        <div className="flex-1 relative perspective-1000">
                            <OrdinaryCard />
                            {/* Cross Indicator */}
                            <div className="absolute -right-5 lg:-right-8 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#1a0f0f] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.4)] border-4 border-[#ff3333] relative overflow-hidden">
                                    <div className="absolute inset-0 bg-red-500/20 animate-ping opacity-50" />
                                    <X className="w-6 h-6 md:w-8 md:h-8 text-red-500 relative z-10" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Premium Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="relative h-[480px] lg:h-[500px] flex flex-col lg:-mt-6"
                    >


                        <div className="flex-1 relative">
                            <PremiumCard />
                            {/* Check Indicator */}
                            <div className="absolute -left-5 lg:-left-8 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#020005] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.5)] border-4 border-emerald-500 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-emerald-500/20 animate-ping opacity-50" />
                                    <Check className="w-6 h-6 md:w-8 md:h-8 text-emerald-500 relative z-10" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Comparison Metrics - Ultra Minimal */}
                <div className="max-w-4xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Giriş Hızı", bad: "2.5s", good: "Anlık", color: "from-blue-400 to-indigo-400" },
                        { label: "Güvenlik", bad: "Zayıf", good: "Biometrik", color: "from-green-400 to-emerald-400" },
                        { label: "Mobil Uyumu", bad: "Kısmi", good: "%100", color: "from-purple-400 to-fuchsia-400" },
                        { label: "Dönüşüm", bad: "%2", good: "%35", color: "from-cyan-400 to-blue-400" }
                    ].map((metric, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + (i * 0.1) }}
                            viewport={{ once: true }}
                            className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center backdrop-blur-md group/metric hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="text-white/30 text-[9px] uppercase tracking-[0.2em] mb-2 font-bold group-hover/metric:text-white/50 transition-colors">{metric.label}</div>
                            <div className="flex items-center justify-center gap-3 text-xs font-mono">
                                <span className="text-white/20 line-through text-[10px] decoration-red-500/50 decoration-2 font-medium">{metric.bad}</span>
                                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${metric.color} font-bold text-xl tracking-tighter filter drop-shadow-sm`}>{metric.good}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Divider */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />

        </Section>
    );
};
