import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Layers, Rocket, Construction, CheckCircle2, ArrowRight, Zap, Star } from 'lucide-react';
import Card from '../components/shared/Card';
import { TOOLS } from '../data/toolsList';
import { CATEGORIES } from '../data/categories';
import { useTranslation } from 'react-i18next';

export default function Roadmap() {
    const { t } = useTranslation();
    const plannedTools = TOOLS.filter(t => !t.isReady).slice(0, 8);
    const launchedTools = TOOLS.filter(t => t.isReady);

    return (
        <div className="min-h-screen pb-20">
            <Helmet>
                <title>{t('roadmap.meta_title')}</title>
                <meta name="description" content={t('roadmap.meta_desc')} />
            </Helmet>

            {/* Header */}
            <div className="relative py-20 mb-12 overflow-hidden border-b border-slate-100 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                        <Rocket size={12} /> {t('roadmap.badge')}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
                        {t('roadmap.heading_main')} <br />
                        <span className="text-blue-600">{t('roadmap.heading_highlight')}</span>
                    </h1>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                        {t('roadmap.description')}
                    </p>
                </div>

                {/* Decorative BG */}
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none select-none overflow-hidden">
                    <div className="absolute top-10 left-10"><Layers size={300} /></div>
                    <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
                        <Rocket size={400} />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Column 1: Recently Launched */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-100">
                                <CheckCircle2 size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-slate-900 leading-none">{t('roadmap.released')}</h2>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{t('roadmap.released_sub')}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {launchedTools.map(tool => (
                                <Card key={tool.id} className="border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all">
                                    <h3 className="font-black text-slate-900 mb-1 text-sm">{t(`tools.${tool.id}.title`, tool.title)}</h3>
                                    <p className="text-[11px] text-slate-500 font-medium line-clamp-1 mb-2">{t(`tools.${tool.id}.desc`, tool.desc)}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                                            {t(`categories.${tool.cat}`, CATEGORIES.find(c => c.id === tool.cat)?.name)}
                                        </span>
                                        <div className="text-[9px] font-black text-green-600 uppercase flex items-center gap-1">
                                            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" /> {t('roadmap.ready')}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: In Production */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
                                <Construction size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-slate-900 leading-none">{t('roadmap.in_dev')}</h2>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{t('roadmap.in_dev_sub')}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {plannedTools.slice(0, 4).map(tool => (
                                <Card key={tool.id} className="border-slate-100 bg-slate-50/30">
                                    <h3 className="font-black text-slate-700 mb-1 text-sm">{t(`tools.${tool.id}.title`, tool.title)}</h3>
                                    <p className="text-[11px] text-slate-400 font-medium line-clamp-1 mb-3">{t(`tools.${tool.id}.desc`, tool.desc)}</p>
                                    <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden mb-2">
                                        <div className="bg-blue-600 h-full w-[65%] animate-[shimmer_2s_infinite]" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">
                                            {t('roadmap.coding')}
                                        </span>
                                        <span className="text-[9px] font-bold text-slate-400">65%</span>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Column 3: Up Next/Planned */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-slate-200">
                                <Star size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-slate-900 leading-none">{t('roadmap.up_next')}</h2>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{t('roadmap.up_next_sub')}</p>
                            </div>
                        </div>

                        <div className="space-y-4 opacity-70">
                            {plannedTools.slice(4, 8).map(tool => (
                                <div key={tool.id} className="p-4 rounded-2xl border border-dashed border-slate-200">
                                    <h3 className="font-bold text-slate-400 mb-1 text-sm italic">{t(`tools.${tool.id}.title`, tool.title)}</h3>
                                    <p className="text-[11px] text-slate-300 font-medium line-clamp-1">{t(`tools.${tool.id}.desc`, tool.desc)}</p>
                                </div>
                            ))}

                            <div className="pt-6 border-t border-slate-100">
                                <p className="text-xs font-bold text-slate-900 mb-4">{t('roadmap.idea_text')}</p>
                                <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                    {t('roadmap.submit_btn')} <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
