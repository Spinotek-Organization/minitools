import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import * as Icons from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { TOOLS } from '../../data/toolsList';
import Card from '../../components/shared/Card';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import RequestToolCTA from '../../components/shared/RequestToolCTA';

export default function ExploreToolsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTools = TOOLS.filter(tool =>
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group filtered tools by category
    const groupedTools = CATEGORIES.map(cat => ({
        ...cat,
        tools: filteredTools.filter(t => t.cat === cat.id)
    })).filter(cat => cat.tools.length > 0);

    return (
        <div className="min-h-screen bg-slate-50">
            <Helmet>
                <title>Explore All Tools | MiniTools by Spinotek</title>
                <meta name="description" content="Browse our complete collection of 120+ professional tools for developers, marketers, and builders." />
            </Helmet>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <Breadcrumbs />

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
                            Explore <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 pr-2">Tools</span>
                        </h1>
                        <p className="text-slate-500 text-lg font-medium max-w-2xl">
                            Our complete library of specialized utilities, organized for your professional workflow.
                        </p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <Icons.Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search among all tools..."
                            className="w-full pl-11 pr-4 py-4 bg-white border border-slate-100 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-20">
                    {groupedTools.length > 0 ? (
                        groupedTools.map((cat) => {
                            const CatIcon = Icons[cat.icon];
                            return (
                                <section key={cat.id} id={cat.id} className="scroll-mt-24">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className={`w-10 h-10 ${cat.bgColor} ${cat.color} rounded-xl flex items-center justify-center shadow-sm`}>
                                            <CatIcon size={20} />
                                        </div>
                                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                                            {cat.name}
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
                                            return (
                                                <Link key={tool.id} to={tool.path}>
                                                    <Card hover className="h-full border-slate-100/60" noPadding>
                                                        <div className="p-6">
                                                            <div className="flex items-start justify-between mb-5">
                                                                <div className={`w-10 h-10 rounded-xl ${tool.bgColor || 'bg-slate-50'} flex items-center justify-center ${tool.color || 'text-slate-400'} group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                                                                    <ToolIcon size={20} />
                                                                </div>
                                                                {!tool.isReady && (
                                                                    <span className="px-2 py-0.5 bg-slate-100 text-slate-400 rounded-full text-[9px] font-black uppercase tracking-wider border border-slate-200/50">
                                                                        In Dev
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <h3 className="text-base font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight">
                                                                {tool.title}
                                                            </h3>
                                                            <p className="text-slate-500 text-[11px] font-medium leading-relaxed line-clamp-2">
                                                                {tool.desc}
                                                            </p>
                                                        </div>
                                                    </Card>
                                                </Link>
                                            );
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
                            <h3 className="text-2xl font-black text-slate-900">No tools matched your search</h3>
                            <p className="text-slate-500 mt-2 font-medium">Try different keywords or browse our categories below.</p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="mt-8 text-blue-600 font-black text-sm uppercase tracking-widest hover:underline"
                            >
                                Clear search filter
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
