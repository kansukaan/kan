import { lazy, Suspense } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { SEO } from '../components/seo/SEO';
import { BrandMarquee } from '../components/sections/BrandMarquee';

// Static imports for navigation targets to ensure anchor links work
import { Services } from '../components/sections/Services';
import { DesignDifference } from '../components/sections/DesignDifference';
import { References } from '../components/sections/References';
import { ContactSplit } from '../components/sections/ContactSplit';
import { Blog } from '../components/sections/Blog';

// Lazy load non-critical sections
const FeaturesStack = lazy(() => import('../components/sections/FeaturesStack').then(module => ({ default: module.FeaturesStack })));
const Testimonials = lazy(() => import('../components/sections/Testimonials').then(module => ({ default: module.Testimonials })));
const FAQ = lazy(() => import('../components/sections/FAQ').then(module => ({ default: module.FAQ })));

export const Home = () => {
    return (
        <div className="bg-brand-dark min-h-screen text-white selection:bg-brand-primary/30 cursor-none">
            <SEO />
            <Navbar />
            <main>
                <Hero />
                <BrandMarquee />

                {/* Critical Sections (Static) */}
                <Services />
                <DesignDifference />
                <References />

                <Suspense fallback={<div className="h-20" />}>
                    <FeaturesStack />
                </Suspense>

                <ContactSplit />

                <Suspense fallback={<div className="h-20" />}>
                    <Testimonials />
                    <Blog />
                    <FAQ />
                </Suspense>
            </main>
            <Footer />
        </div >
    );
};
