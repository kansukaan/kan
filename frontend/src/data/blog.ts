export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string; // HTML or Markdown content
    category: string;
    date: string;
    readTime: string;
    image: string;
    author: {
        name: string;
        role: string;
        avatar: string;
    };
}

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        slug: 'modern-web-tasariminda-yapay-zeka-devrimi',
        title: "Modern Web Tasarımında Yapay Zeka Devrimi",
        excerpt: "Yapay zeka algoritmalarının tasarım süreçlerine entegrasyonu, kişiselleştirilmiş kullanıcı deneyimlerini nasıl yeniden şekillendiriyor?",
        category: "Teknoloji",
        date: "Kasım 12, 2025",
        readTime: "5 dk okuma",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        author: {
            name: "Can Yılmaz",
            role: "Senior UI/UX Designer",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
        },
        content: `
            <p class="lead text-xl mb-6 text-brand-light/80">Yapay zeka, sadece kod yazmayı değil, tasarım süreçlerini de kökten değiştiriyor. Generative AI araçları, tasarımcıların yaratıcılığını artırırken, rutin işleri otomatize ederek zaman kazandırıyor.</p>
            
            <h3 class="text-2xl font-bold text-white mb-4">Otomatik Layout ve Kompozisyon</h3>
            <p class="mb-6">Geleneksel tasarım süreçlerinde layout oluşturmak saatler alabilirken, yapay zeka destekli araçlar saniyeler içinde binlerce varyasyon sunabiliyor. Bu, A/B testleri için muazzam bir kaynak sağlıyor. Kullanıcı davranışlarına göre anlık olarak değişen arayüzler (Adaptive UI), artık bilim kurgu değil.</p>

            <h3 class="text-2xl font-bold text-white mb-4">Kişiselleştirilmiş Deneyimler</h3>
            <p class="mb-6">Netflix veya Spotify'ın öneri algoritmalarına aşinayız. Ancak bu teknoloji artık web sitelerinin arayüzüne de yansıyor. Kullanıcının siteye hangi cihazdan girdiği, hangi saatte girdiği ve geçmişteki etkileşimleri, sitenin renk paletinden buton yerleşimine kadar her şeyi dinamik olarak değiştirebilir.</p>

            <blockquote class="border-l-4 border-brand-primary pl-4 italic text-white/70 mb-6 py-2 bg-white/5 rounded-r-lg">
                "Tasarım artık statik bir çıktı değil, kullanıcıyla yaşayan ve evrilen organik bir süreçtir."
            </blockquote>

            <h3 class="text-2xl font-bold text-white mb-4">Gelecekte Ne Bekliyoruz?</h3>
            <p>2026 yılına doğru ilerlerken, "No-UI" konseptinin daha fazla hayatımıza gireceğini öngörüyoruz. Sesli komutlar, jestler ve biyometrik verilerle yönetilen arayüzler, geleneksel buton ve menülerin yerini alacak.</p>
        `
    },
    {
        id: '2',
        slug: 'e-ticarette-donusum-odakli-ux-stratejileri',
        title: "E-Ticarette Dönüşüm Odaklı UX Stratejileri",
        excerpt: "Kullanıcı davranışlarını saniyelik analiz ederek satın alma yolculuğunu optimize eden nöro-pazarlama teknikleri.",
        category: "Strateji",
        date: "Ekim 28, 2025",
        readTime: "7 dk okuma",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        author: {
            name: "Zeynep Demir",
            role: "E-Commerce Strategist",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
        },
        content: `
            <p class="lead text-xl mb-6 text-brand-light/80">Bir e-ticaret sitesinin başarısı, sadece ürün kalitesiyle değil, o ürüne giden yolun ne kadar pürüzsüz olduğuyla ölçülür. Dönüşüm oranlarını (Conversion Rate) artırmak, psikoloji ve teknolojinin kesişim noktasıdır.</p>

            <h3 class="text-2xl font-bold text-white mb-4">Hız Her Şeydir</h3>
            <p class="mb-6">Araştırmalar, sayfa yüklenme süresindeki 1 saniyelik gecikmenin, dönüşüm oranlarında %7'lik bir düşüşe neden olduğunu gösteriyor. Next.js gibi modern framework'ler ve Vercel gibi edge network'ler kullanarak, milisaniyeler içinde yüklenen sayfalar oluşturmak artık bir lüks değil, zorunluluk.</p>

            <h3 class="text-2xl font-bold text-white mb-4">Sürtünmesiz Ödeme (Frictionless Checkout)</h3>
            <p class="mb-6">Sepeti terk etme oranlarını düşürmenin en etkili yolu, ödeme adımını basitleştirmektir. Guest checkout seçenekleri, Apple Pay / Google Pay entegrasyonları ve adres doğrulama sistemleri, kullanıcının "satın al" butonuna basma olasılığını artırır.</p>

            <ul class="list-disc pl-6 mb-6 space-y-2 text-brand-light/70">
                <li>Form alanlarını minimize edin.</li>
                <li>İlerleme çubuğu (progress bar) kullanın.</li>
                <li>Gizli maliyetleri (kargo, vergi) en başta gösterin.</li>
            </ul>

            <h3 class="text-2xl font-bold text-white mb-4">Güven İnşası</h3>
            <p>Kullanıcılar, güvenmedikleri bir siteye kredi kartı bilgilerini girmezler. Sosyal kanıt (yorumlar), güvenlik sertifikaları ve şeffaf iade politikaları, tasarımın ayrılmaz bir parçası olmalıdır.</p>
        `
    },
    {
        id: '3',
        slug: 'bulut-tabanli-sistemlerde-olceklenebilirlik',
        title: "Bulut Tabanlı Sistemlerde Ölçeklenebilirlik",
        excerpt: "Milyonlarca anlık isteği yönetebilen, kendi kendini iyileştiren (self-healing) bulut mimarileri.",
        category: "Mühendislik",
        date: "Ekim 15, 2025",
        readTime: "6 dk okuma",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        author: {
            name: "Emre Kaya",
            role: "Lead DevOps Engineer",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
        },
        content: `
            <p class="lead text-xl mb-6 text-brand-light/80">Geleneksel monolitik mimariler, günümüzün hızla büyüyen dijital taleplerini karşılamakta yetersiz kalıyor. Microservices ve Serverless mimariler, ölçeklenebilirliğin yeni standartlarını belirliyor.</p>

            <h3 class="text-2xl font-bold text-white mb-4">Neden Serverless?</h3>
            <p class="mb-6">Sunucu yönetimi, yamalar ve kapasite planlaması ile uğraşmak yerine, sadece koda odaklanmak... AWS Lambda veya Cloudflare Workers gibi teknolojiler, trafiğe göre otomatik olarak ölçeklenir. Yani sitenizde 1 kişi de olsa, 1 milyon kişi de olsa sistem çökmez, sadece kullandığınız kadar ödersiniz.</p>

            <h3 class="text-2xl font-bold text-white mb-4">Veritabanı Şarding ve Replikasyon</h3>
            <p class="mb-6">Global bir uygulama geliştiriyorsanız, verinin nerede durduğu önemlidir. Geo-replikasyon sayesinde, İstanbul'daki bir kullanıcıya İstanbul sunucusundan, New York'taki kullanıcıya New York sunucusundan veri sunarak gecikmeyi (latency) minimuma indiriyoruz.</p>

            <h3 class="text-2xl font-bold text-white mb-4">Self-Healing Sistemler</h3>
            <p>Kubernetes gibi orkestrasyon araçları, çöken bir servisi otomatik olarak yeniden başlatabilir veya trafik yoğunluğuna göre yeni "pod"lar açabilir. Bu sayede 7/24 kesintisiz hizmet (High Availability) mümkün hale gelir.</p>
        `
    }
];
