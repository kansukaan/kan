import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { Construction, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const NotFound = () => {
    return (
        <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
            <Helmet>
                <title>404 | Sayfa Bulunamadı</title>
                <meta name="robots" content="noindex" />
            </Helmet>

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
            >
                <div className="text-[12rem] font-bold font-heading leading-none text-white/5 select-none absolute left-1/2 -top-20 -translate-x-1/2 pointer-events-none">
                    404
                </div>

                <div className="mb-8 relative">
                    <div className="w-24 h-24 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Construction className="w-12 h-12 text-brand-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading text-white">
                        Sayfa Bulunamadı
                    </h1>
                    <p className="text-brand-light/60 max-w-md mx-auto text-lg leading-relaxed">
                        Aradığınız sayfa silinmiş, taşınmış veya hiç var olmamış olabilir.
                        Ana sayfaya dönerek yolculuğunuza devam edebilirsiniz.
                    </p>
                </div>

                <a href="/">
                    <Button size="lg" className="group">
                        <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Ana Sayfaya Dön
                    </Button>
                </a>
            </motion.div>
        </div>
    );
};
