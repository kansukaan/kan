import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { blogPosts } from '../data/blog';
import { Button } from '../components/ui/Button';

export const BlogDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const post = blogPosts.find(p => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return (
            <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center text-white">
                <h1 className="text-4xl font-bold mb-4">Yazı Bulunamadı</h1>
                <Button onClick={() => navigate('/')}>Ana Sayfaya Dön</Button>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-brand-dark text-white pt-32 pb-20 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 blur-[150px] pointer-events-none rounded-full" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-secondary/5 blur-[150px] pointer-events-none rounded-full" />

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <Button
                    variant="ghost"
                    onClick={() => navigate('/')}
                    className="mb-8 hover:bg-white/5 text-white/60 hover:text-white"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Geri Dön
                </Button>

                <div className="mb-4 flex items-center gap-3">
                    <span className="px-3 py-1 bg-brand-primary/20 text-brand-primary rounded-full text-xs font-bold uppercase tracking-wider border border-brand-primary/20">
                        {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-brand-light/60 text-sm">
                        <Calendar className="w-3.5 h-3.5" /> {post.date}
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-8 leading-tight">
                    {post.title}
                </h1>

                <div className="flex items-center justify-between py-6 border-y border-white/10 mb-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                            <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <div className="font-bold text-sm">{post.author.name}</div>
                            <div className="text-brand-light/50 text-xs">{post.author.role}</div>
                        </div>
                        <div className="w-1 h-1 bg-white/20 rounded-full mx-2" />
                        <div className="flex items-center gap-1.5 text-brand-light/50 text-sm">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                        </div>
                    </div>

                    <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-primary transition-colors text-white/60 hover:text-white">
                        <Share2 className="w-4 h-4" />
                    </button>
                </div>

                <div className="aspect-video w-full rounded-3xl overflow-hidden mb-12 relative group shadow-2xl shadow-brand-primary/10">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60" />
                </div>

                <div
                    className="prose prose-lg prose-invert max-w-none prose-headings:font-heading prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </div>
        </article>
    );
};
