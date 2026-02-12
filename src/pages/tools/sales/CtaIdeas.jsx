import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Zap, Copy, Check, Filter } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function CtaIdeas() {
    const { t } = useTranslation();

    const CTAS = [
        // E-commerce
        { id: 1, category: 'E-commerce', text: t('tools.cta-ideas.ctas.ecommerce.shop_save') },
        { id: 2, category: 'E-commerce', text: t('tools.cta-ideas.ctas.ecommerce.add_cart') },
        { id: 3, category: 'E-commerce', text: t('tools.cta-ideas.ctas.ecommerce.free_gift') },
        { id: 4, category: 'E-commerce', text: t('tools.cta-ideas.ctas.ecommerce.gone_soon') },
        { id: 5, category: 'E-commerce', text: t('tools.cta-ideas.ctas.ecommerce.free_shipping') },
    
        // SaaS / Product
        { id: 11, category: 'SaaS', text: t('tools.cta-ideas.ctas.saas.free_trial') },
        { id: 12, category: 'SaaS', text: t('tools.cta-ideas.ctas.saas.how_it_works') },
        { id: 13, category: 'SaaS', text: t('tools.cta-ideas.ctas.saas.get_started') },
        { id: 14, category: 'SaaS', text: t('tools.cta-ideas.ctas.saas.book_demo') },
        { id: 15, category: 'SaaS', text: t('tools.cta-ideas.ctas.saas.no_credit_card') },
    
        // Newsletter / Lead Gen
        { id: 21, category: 'Newsletter', text: t('tools.cta-ideas.ctas.newsletter.join_marketers') },
        { id: 22, category: 'Newsletter', text: t('tools.cta-ideas.ctas.newsletter.send_guide') },
        { id: 23, category: 'Newsletter', text: t('tools.cta-ideas.ctas.newsletter.subscribe_tips') },
        { id: 24, category: 'Newsletter', text: t('tools.cta-ideas.ctas.newsletter.unlock_content') },
        { id: 25, category: 'Newsletter', text: t('tools.cta-ideas.ctas.newsletter.download_pdf') },
    
        // Webinar / Events
        { id: 31, category: 'Events', text: t('tools.cta-ideas.ctas.events.save_seat') },
        { id: 32, category: 'Events', text: t('tools.cta-ideas.ctas.events.register_free') },
        { id: 33, category: 'Events', text: t('tools.cta-ideas.ctas.events.reserve_spot') },
        { id: 34, category: 'Events', text: t('tools.cta-ideas.ctas.events.add_calendar') },
        
        // Social / Generic
        { id: 41, category: 'Social', text: t('tools.cta-ideas.ctas.social.follow_more') },
        { id: 42, category: 'Social', text: t('tools.cta-ideas.ctas.social.tell_thoughts') },
        { id: 43, category: 'Social', text: t('tools.cta-ideas.ctas.social.share_friend') },
        { id: 44, category: 'Social', text: t('tools.cta-ideas.ctas.social.learn_more') },
        { id: 45, category: 'Social', text: t('tools.cta-ideas.ctas.social.link_bio') },
    ];
    
    const CATEGORIES = ['All', ...new Set(CTAS.map(c => c.category))];

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [copiedId, setCopiedId] = useState(null);

    const filteredCtas = selectedCategory === 'All' 
        ? CTAS 
        : CTAS.filter(c => c.category === selectedCategory);

    const handleCopy = (id, text) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <ToolPageLayout toolId="cta-ideas">
            <Helmet>
                <title>{t('tools.cta-ideas.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.cta-ideas.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Zap size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.cta-ideas.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.cta-ideas.desc')}</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 w-fit">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                            selectedCategory === cat
                                ? 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-500'
                                : 'text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                        {cat === 'All' ? t('tools.cold-email.page.categories.all') : cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {filteredCtas.map(cta => (
                    <button
                        key={cta.id}
                        onClick={() => handleCopy(cta.id, cta.text)}
                        className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-yellow-200 hover:-translate-y-1 transition-all text-left flex flex-col justify-between min-h-[140px]"
                    >
                        <div>
                            <span className="inline-block px-2 py-1 bg-slate-50 text-slate-400 text-xs font-bold rounded-md mb-3 uppercase tracking-wider">
                                {cta.category}
                            </span>
                            <div className="text-lg font-bold text-slate-900 group-hover:text-yellow-700 transition-colors">
                                "{cta.text}"
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-400 mt-4">
                            {copiedId === cta.id ? (
                                <>
                                    <Check size={16} className="text-green-500" />
                                    <span className="text-green-500">{t('tools.cta-ideas.page.copied')}</span>
                                </>
                            ) : (
                                <>
                                    <Copy size={16} className="group-hover:text-yellow-600 transition-colors" />
                                    <span className="group-hover:text-yellow-600 transition-colors">{t('tools.cta-ideas.page.click_copy')}</span>
                                </>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            <RelatedTools currentToolId="cta-ideas" categoryId="sales" />
        </ToolPageLayout>
    );
}
