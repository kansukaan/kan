import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
}

export const SEO = ({
    title = "Kanteknoloji | Dijital Mükemmellik",
    description = "Kanteknoloji, modern web teknolojileri ve estetik tasarımı birleştirerek markanızı geleceğe taşıyan premium bir yazılım ajansıdır.",
    keywords = "yazılım, web tasarım, mobil uygulama, kurumsal kimlik, dijital ajans, istanbul",
    image = "/og-image.jpg",
    url = "https://kanteknoloji.com"
}: SEOProps) => {
    const siteTitle = title === "Kanteknoloji | Dijital Mükemmellik" ? title : `${title} | Kanteknoloji`;

    return (
        <Helmet>
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={url} />
        </Helmet>
    );
};
