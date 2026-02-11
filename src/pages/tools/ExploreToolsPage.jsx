import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import * as Icons from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { TOOLS } from '../../data/toolsList';
import Card from '../../components/shared/Card';
import ToolCard from '../../components/shared/ToolCard';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import RequestToolCTA from '../../components/shared/RequestToolCTA';
import { useTranslation } from 'react-i18next';

export default function ExploreToolsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const { t } = useTranslation();

    const filteredTools = TOOLS.filter(tool =>
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group filtered tools by category
    const groupedTools = CATEGORIES.map(cat => ({
        ...cat,
        tools: filteredTools.filter(t => t.cat === cat.id)
    })).filter(cat => cat.tools.length > 0);

    const displayGroups = activeCategory === 'all'
        ? groupedTools
        : groupedTools.filter(g => g.id === activeCategory);

    return (
        <div className="min-h-screen bg-slate-50">
            <Helmet>
                <title>Explore All Tools | MiniTools by Spinotek</title>
                <meta name="description" content="Browse our complete collection of 120+ professional tools for developers, marketers, and builders." />
            </Helmet>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <Breadcrumbs />

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
                            {t('explore.title').split(' ')[0]} <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 pr-2">{t('explore.title').split(' ').slice(1).join(' ')}</span>
                        </h1>
                        <p className="text-slate-500 text-lg font-medium max-w-2xl">
                            {t('explore.subtitle')}
                        </p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <Icons.Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder={t('explore.search_placeholder')}
                            className="w-full pl-11 pr-4 py-4 bg-white border border-slate-100 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Sticky Category Navbar */}
                <div className="sticky top-16 z-40 bg-slate-50/90 backdrop-blur-sm py-4 -mx-4 px-4 sm:px-0 sm:mx-0 mb-8 border-b border-slate-200/50">
                    <div className="px-2 flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${activeCategory === 'all'
                                ? 'bg-slate-900 text-white shadow-lg shadow-slate-200 scale-105'
                                : 'bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-900 border border-slate-100'
                                }`}
                        >
                            {t('explore.all_categories')}
                        </button>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${activeCategory === cat.id
                                    ? `bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105`
                                    : 'bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-900 border border-slate-100'
                                    }`}
                            >
                                {activeCategory === cat.id && <Icons.Check size={14} />}
                                {t(`categories.${cat.id}`)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-20 min-h-[500px]">
                    {displayGroups.length > 0 ? (
                        displayGroups.map((cat) => {
                            const CatIcon = Icons[cat.icon];
                            return (
                                <section key={cat.id} id={cat.id} className="scroll-mt-32 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className={`w-10 h-10 ${cat.bgColor} ${cat.color} rounded-xl flex items-center justify-center shadow-sm`}>
                                            <CatIcon size={20} />
                                        </div>
                                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                                            {t(`categories.${cat.id}`)}
                                        </h2>
                                        <div className="hidden md:block h-px bg-slate-100 flex-grow ml-4" />
                                        <Link
                                            to={`/category/${cat.id}`}
                                            className="text-xs font-black text-blue-600 uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-1.5"
                                        >
                                            View Category <Icons.ArrowRight size={14} />
                                        </Link>
                                    </div>


                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {cat.tools.map((tool) => {
                                            const ToolIcon = Icons[tool.icon] || Icons.HelpCircle;
                                            return <ToolCard key={tool.id} tool={tool} />;
                                        })}
                                    </div>
                                </section>
                            );
                        })
                    ) : (
                        <div className="text-center py-32 bg-slate-50 rounded-[2.5rem] border border-slate-100 border-dashed">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-slate-200 mx-auto mb-6 shadow-sm">
                                <Icons.SearchX size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900">{t('explore.no_results_title')}</h3>
                            <p className="text-slate-500 mt-2 font-medium">{t('explore.no_results_desc')}</p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="mt-8 text-blue-600 font-black text-sm uppercase tracking-widest hover:underline"
                            >
                                {t('explore.clear_filter')}
                            </button>
                        </div>
                    )}
                </div>

                <div className="mt-32">
                    <RequestToolCTA />
                </div>
            </div>
        </div>
    );
}
