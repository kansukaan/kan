import { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { SoundProvider } from './context/SoundContext';
import { ModalProvider } from './context/ModalContext';
import { DemoModal } from './components/features/DemoModal';
import { CustomCursor } from './components/ui/cursor';
import { StickyCTA } from './components/ui/StickyCTA';
import { WhatsAppButton } from './components/ui/WhatsAppButton';

// Lazy load non-critical pages
const Showcase = lazy(() => import('./pages/Showcase').then(module => ({ default: module.Showcase })));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail').then(module => ({ default: module.ServiceDetail })));
const BlogDetail = lazy(() => import('./pages/BlogDetail').then(module => ({ default: module.BlogDetail })));
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));

// Loading Component
const PageLoader = () => (
  <div className="min-h-screen bg-brand-dark flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <Router>
        <SoundProvider>
          <ModalProvider>
            <div className="antialiased text-gray-900 bg-white dark:bg-gray-900 dark:text-white">
              <CustomCursor />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/showcase" element={<Showcase />} />
                  <Route path="/hizmet/:slug" element={<ServiceDetail />} />
                  <Route path="/blog/:slug" element={<BlogDetail />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <WhatsAppButton />
              <DemoModal />
              <StickyCTA />
            </div>
          </ModalProvider>
        </SoundProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
