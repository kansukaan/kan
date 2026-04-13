import { Cpu, Instagram, Facebook } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-[#050010] text-white pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-4 gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-3 font-heading font-bold text-2xl tracking-tighter mb-6 group cursor-default">
                            <div className="p-2.5 bg-gradient-to-br from-[#1a1a1a] to-black rounded-xl shadow-[0_0_15px_rgba(124,58,237,0.1)] border border-white/5 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-transparent opacity-50" />
                                <Cpu className="w-6 h-6 text-white relative z-10" />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-sm font-medium text-brand-light/40 tracking-[0.2em] uppercase text-[10px] ml-0.5">
                                    Digital Agency
                                </span>
                                <span className="text-xl font-bold text-white">
                                    Kanteknoloji<span className="text-brand-primary">.</span>
                                </span>
                            </div>
                        </div>
                        <p className="text-brand-light/60 mb-8 leading-relaxed">
                            Geleceği tanımlayan dijital ürünler inşa ediyoruz. İddialı markalar için premium yazılım geliştirme.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/kanteknoloji/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-primary transition-colors text-white/60 hover:text-white hover:scale-110 duration-300">
                                <Instagram size={18} />
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=61581343303123" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-primary transition-colors text-white/60 hover:text-white hover:scale-110 duration-300">
                                <Facebook size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h4 className="font-bold mb-6 text-lg text-white">Hizmetler</h4>
                        <ul className="space-y-4 text-brand-light/60">
                            <li><a href="/hizmet/web-tasarim" className="hover:text-brand-primary transition-colors hover:pl-2 duration-300 block">Web Geliştirme</a></li>
                            <li><a href="/hizmet/mobil-uygulama" className="hover:text-brand-primary transition-colors hover:pl-2 duration-300 block">Mobil Uygulama</a></li>
                            <li><a href="/hizmet/web-tasarim" className="hover:text-brand-primary transition-colors hover:pl-2 duration-300 block">UI/UX Tasarım</a></li>
                            <li><a href="/hizmet/e-ticaret" className="hover:text-brand-primary transition-colors hover:pl-2 duration-300 block">E-Ticaret</a></li>
                            <li><a href="/hizmet/dijital-pazarlama" className="hover:text-brand-primary transition-colors hover:pl-2 duration-300 block">SEO & Pazarlama</a></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h4 className="font-bold mb-6 text-lg text-white">Kurumsal</h4>
                        <ul className="space-y-4 text-brand-light/60">
                            <li><a href="/#about" className="hover:text-brand-primary transition-colors hover:pl-2 duration-300 block">Hakkımızda</a></li>
                            <li><a href="/#projects" className="hover:text-brand-primary transition-colors hover:pl-2 duration-300 block">Projelerimiz</a></li>
                            <li><a href="/#contact" className="hover:text-brand-primary transition-colors hover:pl-2 duration-300 block">İletişim</a></li>
                            <li><a href="/#blog" className="hover:text-brand-primary transition-colors hover:pl-2 duration-300 block">Blog</a></li>
                        </ul>
                    </div>

                    {/* Contact Info Column (Replaces Newsletter) */}
                    <div>
                        <h4 className="font-bold mb-6 text-lg text-white">İletişim</h4>
                        <div className="space-y-6 text-brand-light/70">
                            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group cursor-pointer">
                                <div className="p-2 bg-white/5 rounded-lg text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                                    <div className="w-5 h-5 flex items-center justify-center">📍</div>
                                </div>
                                <p className="leading-relaxed group-hover:text-white transition-colors">
                                    Maslak Mah. Büyükdere Cad.<br />
                                    No: 123, Sarıyer<br />
                                    İstanbul, Türkiye
                                </p>
                            </a>
                            <a href="tel:+905427854585" className="flex items-center gap-4 group cursor-pointer">
                                <div className="p-2 bg-white/5 rounded-lg text-brand-secondary group-hover:bg-brand-secondary group-hover:text-brand-dark transition-colors">
                                    <div className="w-5 h-5 flex items-center justify-center">📞</div>
                                </div>
                                <p className="group-hover:text-white transition-colors">+90 542 785 45 85</p>
                            </a>
                            <a href="mailto:info@kanteknoloji.com" className="flex items-center gap-4 group cursor-pointer">
                                <div className="p-2 bg-white/5 rounded-lg text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-dark transition-colors">
                                    <div className="w-5 h-5 flex items-center justify-center">✉️</div>
                                </div>
                                <p className="group-hover:text-white transition-colors">info@kanteknoloji.com</p>
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            {/* Big Text Watermark */}
            <div className="border-t border-white/10 pt-10 text-center pb-20 relative z-10">
                <h1 className="text-[13vw] leading-none font-bold text-white/5 select-none pointer-events-none font-heading whitespace-nowrap tracking-tighter">
                    KANTEKNOLOJI
                </h1>
                <p className="text-brand-light/40 text-sm mt-8">
                    © {new Date().getFullYear()} Kanteknoloji - Geleceği Kodluyoruz.
                </p>
            </div>
        </footer>
    );
};
