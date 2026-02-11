import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout, Globe } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

import { useTranslation } from 'react-i18next';

export default function AdCounter() {
    const { t } = useTranslation();
    const [platform, setPlatform] = useState('google');
    const [data, setData] = useState({
        headline1: 'Best Coffee in Town',
        headline2: 'Freshly Roasted Daily',
        headline3: 'Order Online Now',
        desc1: 'Experience the rich aroma of our premium beans. Free shipping on orders over $50.',
        desc2: 'Join our coffee club for exclusive discounts and early access to new blends.'
    });

    const LIMITS = {
        google: {
            h1: 30, h2: 30, h3: 30,
            d1: 90, d2: 90
        }
    };

    const handleChange = (field, value) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const isOver = (text, limit) => text.length > limit;

    return (
        <ToolPageLayout toolId="ad-counter">
            <Helmet>
                <title>{t('tools.ad-counter.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.ad-counter.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Layout size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.ad-counter.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.ad-counter.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Inputs */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Headlines (30 chars)</h2>
                        <div className="space-y-4">
                            {['headline1', 'headline2', 'headline3'].map((h, i) => (
                                <div key={h}>
                                    <div className="flex justify-between mb-1">
                                        <label className="text-sm font-bold text-slate-700">Headline {i + 1}</label>
                                        <span className={`text-xs font-bold ${isOver(data[h], LIMITS.google.h1) ? 'text-red-500' : 'text-slate-400'}`}>
                                            {data[h].length} / {LIMITS.google.h1}
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        value={data[h]}
                                        onChange={(e) => handleChange(h, e.target.value)}
                                        className={`w-full bg-slate-50 border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${isOver(data[h], LIMITS.google.h1) ? 'border-red-500 bg-red-50' : 'border-slate-200'}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Descriptions (90 chars)</h2>
                        <div className="space-y-4">
                            {['desc1', 'desc2'].map((d, i) => (
                                <div key={d}>
                                    <div className="flex justify-between mb-1">
                                        <label className="text-sm font-bold text-slate-700">Description {i + 1}</label>
                                        <span className={`text-xs font-bold ${isOver(data[d], LIMITS.google.d1) ? 'text-red-500' : 'text-slate-400'}`}>
                                            {data[d].length} / {LIMITS.google.d1}
                                        </span>
                                    </div>
                                    <textarea
                                        rows={2}
                                        value={data[d]}
                                        onChange={(e) => handleChange(d, e.target.value)}
                                        className={`w-full bg-slate-50 border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 resize-none ${isOver(data[d], LIMITS.google.d1) ? 'border-red-500 bg-red-50' : 'border-slate-200'}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl flex flex-col justify-start">
                    <h3 className="text-sm font-bold text-slate-500 uppercase mb-4 tracking-wider">Ad Preview</h3>
                    
                    <div className="bg-white p-6 shadow-sm rounded-lg max-w-sm">
                        <div className="flex items-center gap-1 mb-1">
                            <span className="font-bold text-slate-900 text-sm">Ad</span>
                            <span className="text-slate-400 text-xs mx-1">·</span>
                            <span className="text-slate-500 text-xs">example.com/coffee</span>
                        </div>
                        
                        <div className="text-[#1a0dab] text-xl leading-tight mb-1 hover:underline cursor-pointer">
                            {data.headline1} | {data.headline2} | {data.headline3}
                        </div>
                        
                        <div className="text-[#4d5156] text-sm leading-normal">
                            {data.desc1} {data.desc2}
                        </div>

                         {/* Extensions Mockup */}
                        <div className="mt-2 flex gap-2 text-xs text-[#1a0dab]">
                            <span className="hover:underline cursor-pointer">Site Link 1</span>
                            <span className="hover:underline cursor-pointer">Site Link 2</span>
                        </div>
                    </div>

                    <div className="mt-8 bg-blue-50 border border-blue-100 p-4 rounded-xl text-blue-800 text-sm">
                        <strong className="block mb-1">Tip:</strong>
                        Ensure your keywords are in Headline 1 for better Quality Score. Use Title Case for headlines.
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="ad-counter" categoryId="marketing" />
        </ToolPageLayout>
    );
}
