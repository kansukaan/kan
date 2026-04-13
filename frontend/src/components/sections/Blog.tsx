import { Section } from '../ui/Section';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { blogPosts } from '../../data/blog';
import { useNavigate } from 'react-router-dom';

export const Blog = () => {
    const navigate = useNavigate();

    return (
        <Section id="blog" className="relative overflow-hidden py-24 md:py-32 bg-[#0a0a0a]">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 blur-[120px] pointer-events-none rounded-full" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-secondary/5 blur-[100px] pointer-events-none rounded-full" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                            <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Blog & İçgörüler</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 leading-tight">
                            Teknoloji <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Günlüğü</span>
                        </h2>
                        <p className="text-brand-light/60 text-lg">
                            Dijital dünyanın geleceğini şekillendiren trendler, teknolojik yenilikler ve tasarım felsefemiz üzerine düşünceler.
                        </p>
                    </div>
                    <a href="#" className="flex items-center gap-2 text-white font-medium border-b border-brand-primary/50 pb-1 hover:text-brand-primary hover:border-brand-primary transition-all group">
                        Tüm Yazıları Gör <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.div
                            key={index}
                            onClick={() => navigate(`/blog/${post.slug}`)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer bg-white/[0.02] border border-white/5 rounded-3xl p-4 hover:border-brand-primary/30 hover:bg-white/[0.04] transition-all duration-300"
                        >
                            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-white/5 mb-6 relative">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/0 transition-colors duration-500" />
                                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white border border-white/10 flex items-center gap-2">
                                    <Tag className="w-3 h-3 text-brand-secondary" />
                                    {post.category}
                                </div>
                            </div>

                            <div className="px-2 pb-2">
                                <div className="flex items-center gap-4 text-xs text-brand-light/50 mb-4 font-mono">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{post.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-brand-primary transition-colors leading-snug">
                                    {post.title}
                                </h3>
                                <p className="text-brand-light/60 text-sm line-clamp-2 mb-6">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center text-sm font-medium text-white group-hover:text-brand-primary transition-colors">
                                    Devamını Oku <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
};
