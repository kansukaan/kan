import { Globe, Smartphone, Layers, Zap, Cpu, Code } from 'lucide-react';

export const services = [
    {
        id: 'web-design',
        slug: 'web-tasarim',
        title: 'Web Tasarım',
        description: 'Estetik ve fonksiyonelliğin mükemmel uyumu.',
        longDescription: 'Markanızın dijital dünyadaki yüzünü, modern tasarım trendleri ve kullanıcı deneyimi (UX) odaklı yaklaşımlarla şekillendiriyoruz. Her pikselde detay, her etkileşimde akıcılık sunan web tasarımlarıyla, ziyaretçilerinizi müşteriye dönüştüren dijital deneyimler yaratıyoruz.',
        image: '/images/service-web-design.webp',
        icon: Globe,
        features: [
            'Responsive (Mobil Uyumlu) Tasarım',
            'Kullanıcı Deneyimi (UX) Optimizasyonu',
            'Modern UI Trendleri ve Animasyonlar',
            'Hızlı Yükleme Süreleri',
            'SEO Uyumlu Altyapı'
        ],
        process: [
            { title: 'Analiz', desc: 'İhtiyaçlarınızı ve hedef kitlenizi belirliyoruz.' },
            { title: 'Tasarım', desc: 'Wireframe ve mockup çalışmalarıyla görsel dili oluşturuyoruz.' },
            { title: 'Geliştirme', desc: 'Tasarımı kodla buluşturup interaktif hale getiriyoruz.' },
            { title: 'Test & Yayın', desc: 'Tüm cihazlarda test edip canlıya alıyoruz.' }
        ]
    },
    {
        id: 'web-dev',
        slug: 'web-yazilim',
        title: 'Web Yazılım',
        description: 'Güçlü, güvenli ve ölçeklenebilir altyapılar.',
        longDescription: 'İş süreçlerinizi dijitalleştiren, güvenli ve yüksek performanslı web tabanlı yazılımler geliştiriyoruz. Özel yönetim panelleri, CRM sistemleri ve API entegrasyonları ile işletmenizin verimliliğini artıran teknolojik çözümler sunuyoruz.',
        image: '/images/hero-poster.webp',
        icon: Code,
        features: [
            'Özel Yönetim Panelleri (Admin Dashboard)',
            'API Geliştirme ve Entegrasyon',
            'Veritabanı Mimarisi ve Optimizasyon',
            'Yüksek Güvenlik Standartları',
            'Ölçeklenebilir Bulut Mimarisi'
        ],
        process: [
            { title: 'Planlama', desc: 'Teknik gereksinimleri ve mimariyi kurguluyoruz.' },
            { title: 'Kodlama', desc: 'Backend ve Frontend geliştirmelerini yapıyoruz.' },
            { title: 'Entegrasyon', desc: '3. parti servisleri ve API\'ları bağlıyoruz.' },
            { title: 'Bakım', desc: 'Sürekli güncellemelerle sistemin sağlığını koruyoruz.' }
        ]
    },
    {
        id: 'mobile',
        slug: 'mobil-uygulama',
        title: 'Mobil Uygulama',
        description: 'iOS ve Android için kusursuz deneyimler.',
        longDescription: 'Kullanıcıların her an yanlarında taşıyacakları, hızlı ve akıcı mobil uygulamalar geliştiriyoruz. React Native teknolojisi ile hem iOS hem de Android platformlarında native performans sunan, modern arayüze sahip uygulamalar tasarlıyoruz.',
        image: '/images/service-mobile-app.webp',
        icon: Smartphone,
        features: [
            'Cross-Platform (iOS & Android) Geliştirme',
            'Native Performans ve Akıcılık',
            'App Store ve Google Play Optimizasyonu (ASO)',
            'Push Bildirim Entegrasyonları',
            'Çevrimdışı Çalışma Yeteneği'
        ],
        process: [
            { title: 'Prototip', desc: 'Uygulama akışını ve ekranlarını tasarlıyoruz.' },
            { title: 'Geliştirme', desc: 'React Native ile kodlamayı gerçekleştiriyoruz.' },
            { title: 'Test', desc: 'Farklı cihazlarda performans testleri yapıyoruz.' },
            { title: 'Market', desc: 'Uygulama mağazalarına yükleme süreçlerini yönetiyoruz.' }
        ]
    },
    {
        id: 'ecommerce',
        slug: 'e-ticaret',
        title: 'E-Ticaret',
        description: 'Global satış için tasarlanmış modern mağazalar.',
        longDescription: 'Satışlarınızı artırmaya odaklı, güvenli ödeme altyapılarına sahip ve kullanıcı dostu e-ticaret siteleri kuruyoruz. Ürün yönetimi, sipariş takibi ve kargo entegrasyonları ile tam kapsamlı bir dijital mağaza deneyimi sunuyoruz.',
        image: '/images/service-ecommerce.webp',
        icon: Layers,
        features: [
            'Özel E-Ticaret Tasarımı',
            'Güvenli Ödeme Sistemleri (Iyzico, Stripe vb.)',
            'Gelişmiş Ürün ve Stok Yönetimi',
            'Kargo ve Fatura Entegrasyonları',
            'Satış Analitiği ve Raporlama'
        ],
        process: [
            { title: 'Altyapı', desc: 'İhtiyaca uygun e-ticaret paketini seçiyoruz.' },
            { title: 'Özelleştirme', desc: 'Tasarımı markanıza göre uyarlıyoruz.' },
            { title: 'Ürün Girişi', desc: 'Kategori ve ürün yapılandırmasını yapıyoruz.' },
            { title: 'Lansman', desc: 'Ödeme testleri sonrası satışa açıyoruz.' }
        ]
    },
    {
        id: 'seo',
        slug: 'dijital-pazarlama',
        title: 'Dijital Pazarlama',
        description: 'Markanızı hedef kitlenizle buluşturan stratejiler.',
        longDescription: 'Markanızın dijital dünyada daha görünür olması için veri odaklı pazarlama stratejileri geliştiriyoruz. SEO, Google Ads ve Sosyal Medya yönetimi ile hedef kitlenize en doğru kanallardan ulaşıyor, dönüşüm oranlarınızı artırıyoruz.',
        image: '/images/service-marketing.webp',
        icon: Zap,
        features: [
            'Arama Motoru Optimizasyonu (SEO)',
            'Google Ads (AdWords) Yönetimi',
            'Sosyal Medya İçerik Stratejisi',
            'Dönüşüm Optimizasyonu (CRO)',
            'Detaylı Performans Raporları'
        ],
        process: [
            { title: 'Analiz', desc: 'Mevcut durum ve rakip analizi yapıyoruz.' },
            { title: 'Strateji', desc: 'Hedef kitleye uygun yol haritası belirliyoruz.' },
            { title: 'Uygulama', desc: 'Reklam ve içerik kampanyalarını başlatıyoruz.' },
            { title: 'Optimizasyon', desc: 'Verilere göre sürekli iyileştirme yapıyoruz.' }
        ]
    },
    {
        id: 'brand',
        slug: 'kurumsal-kimlik',
        title: 'Kurumsal Kimlik',
        description: 'Akılda kalıcı ve güçlü bir marka duruşu.',
        longDescription: 'Markanızın hikayesini görsel bir dile dönüştürüyoruz. Logo tasarımından kurumsal evraklara, renk paletinden tipografiye kadar tüm marka elementlerini tutarlı ve etkileyici bir şekilde tasarlayarak kurumsal imajınızı güçlendiriyoruz.',
        image: '/images/service-branding.webp',
        icon: Cpu,
        features: [
            'Logo ve Amblem Tasarımı',
            'Kurumsal Renk ve Tipografi Kılavuzu',
            'Kartvizit, Antetli Kağıt vb. Baskı Tasarımları',
            'Sosyal Medya Kitleri',
            'Marka İletişim Dili Oluşturma'
        ],
        process: [
            { title: 'Keşif', desc: 'Marka değerlerinizi ve vizyonunuzu anlıyoruz.' },
            { title: 'Eskiz', desc: 'Farklı konseptler üzerinde çalışmalar yapıyoruz.' },
            { title: 'Tasarım', desc: 'Seçilen konsepti detaylandırıp final haline getiriyoruz.' },
            { title: 'Teslim', desc: 'Tüm formatlarda dosyaları ve kullanım kılavuzunu iletiyoruz.' }
        ]
    }
];
