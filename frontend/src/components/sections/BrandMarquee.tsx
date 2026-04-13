import { Section } from '../ui/Section';

const brands = [
    { name: "Vercel", logo: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" },
    { name: "Güzel Hosting", logo: "https://unavatar.io/twitter/guzelhosting" },
    { name: "DigitalOcean", logo: "https://upload.wikimedia.org/wikipedia/commons/f/ff/DigitalOcean_logo.svg" },
    { name: "Hetzner", logo: "https://cdn.worldvectorlogo.com/logos/hetzner-1.svg" },
    { name: "Google Cloud", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" },
    { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
    { name: "Stripe", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
    { name: "OpenAI", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
    { name: "Slack", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" },
    { name: "GitHub", logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" },
    { name: "Figma", logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
];

export const BrandMarquee = () => {
    return (
        <Section id="brands" className="py-8 md:py-16 bg-brand-dark border-t border-white/5 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-brand-primary/5 blur-[100px] rounded-full opacity-50" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
            </div>

            <div className="container mx-auto px-6 mb-8 text-center relative z-10">
                <h3 className="text-lg font-medium text-brand-light/60 uppercase tracking-widest">
                    Teknoloji Partnerlerimiz
                </h3>
            </div>

            <div className="relative flex overflow-x-hidden group">
                {/* Fade Edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-brand-dark to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-brand-dark to-transparent z-20 pointer-events-none" />

                <div className="flex gap-16 md:gap-32 animate-marquee whitespace-nowrap py-4 group-hover:[animation-play-state:paused]">
                    {[...brands, ...brands].map((brand, index) => (
                        <div key={index} className="flex items-center justify-center min-w-[120px] md:min-w-[180px]">
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="h-8 md:h-12 w-auto object-contain grayscale opacity-50 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex gap-16 md:gap-32 animate-marquee whitespace-nowrap absolute top-0 py-4 group-hover:[animation-play-state:paused]" aria-hidden="true">
                    {[...brands, ...brands].map((brand, index) => (
                        <div key={index} className="flex items-center justify-center min-w-[120px] md:min-w-[180px]">
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="h-8 md:h-12 w-auto object-contain grayscale opacity-50 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};
