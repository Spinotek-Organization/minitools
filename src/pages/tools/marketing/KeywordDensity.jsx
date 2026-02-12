import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Activity, Clock, Mic, AlignLeft } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

import { useTranslation } from 'react-i18next';

export default function ArticleTextAnalyzer() {
    const { t } = useTranslation();
    const [text, setText] = useState('');
    const [stats, setStats] = useState({
        words: 0,
        chars: 0,
        readingTime: 0,
        speakingTime: 0
    });
    const [density, setDensity] = useState({
        one: [],
        two: [],
        three: []
    });

    useEffect(() => {
        if (!text.trim()) {
            setStats({ words: 0, chars: 0, readingTime: 0, speakingTime: 0 });
            setDensity({ one: [], two: [], three: [] });
            return;
        }

        const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w);
        const wordCount = words.length;
        const charCount = text.length;

        // Reading Time (200 wpm)
        const readingTime = Math.ceil(wordCount / 200);
        // Speaking Time (130 wpm)
        const speakingTime = Math.ceil(wordCount / 130);

        setStats({
            words: wordCount,
            chars: charCount,
            readingTime,
            speakingTime
        });

        // Keyword Density
        const calculateDensity = (n) => {
            const counts = {};
            for (let i = 0; i <= words.length - n; i++) {
                const phrase = words.slice(i, i + n).join(' ');
                counts[phrase] = (counts[phrase] || 0) + 1;
            }
            return Object.entries(counts)
                .sort((a, b) => b[1] - a[1]) // Sort by frequency desc
                .slice(0, 5) // Top 5
                .map(([phrase, count]) => ({
                    phrase,
                    count,
                    percentage: ((count / (wordCount - n + 1)) * 100).toFixed(1)
                }));
        };

        setDensity({
            one: calculateDensity(1),
            two: calculateDensity(2),
            three: calculateDensity(3)
        });

    }, [text]);

    return (
        <ToolPageLayout toolId="text-analyzer">
            <Helmet>
                <title>{t('tools.text-analyzer.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.text-analyzer.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Activity size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.text-analyzer.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.text-analyzer.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Input */}
                <div className="lg:col-span-2 flex flex-col h-full">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex-1 flex flex-col">
                        <label className="block text-sm font-bold text-slate-700 mb-2 flex justify-between">
                            <span>{t('tools.text-analyzer.input.label')}</span>
                            <span className="text-slate-400 font-normal">{t('tools.text-analyzer.input.stats', { count: stats.chars })}</span>
                        </label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={t('tools.text-analyzer.input.placeholder')}
                            className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 text-base resize-none min-h-[400px]"
                        />
                    </div>
                </div>

                {/* Stats Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Key Metrics */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm grid grid-cols-2 gap-4">
                        <div className="bg-emerald-50 p-4 rounded-xl text-center">
                            <AlignLeft size={20} className="text-emerald-600 mx-auto mb-2" />
                            <div className="text-2xl font-black text-slate-900">{stats.words}</div>
                            <div className="text-xs font-bold text-slate-500 uppercase">{t('tools.text-analyzer.stats.words')}</div>
                        </div>
                         <div className="bg-slate-50 p-4 rounded-xl text-center">
                            <div className="text-2xl font-black text-slate-900">{stats.chars}</div>
                            <div className="text-xs font-bold text-slate-500 uppercase">{t('tools.text-analyzer.stats.chars')}</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-xl text-center">
                            <Clock size={20} className="text-blue-600 mx-auto mb-2" />
                            <div className="text-2xl font-black text-slate-900">{stats.readingTime}m</div>
                            <div className="text-xs font-bold text-slate-500 uppercase">{t('tools.text-analyzer.stats.readTime')}</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-xl text-center">
                            <Mic size={20} className="text-purple-600 mx-auto mb-2" />
                            <div className="text-2xl font-black text-slate-900">{stats.speakingTime}m</div>
                            <div className="text-xs font-bold text-slate-500 uppercase">{t('tools.text-analyzer.stats.speakTime')}</div>
                        </div>
                    </div>

                    {/* Checkers */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4">{t('tools.text-analyzer.density.title')}</h3>
                        
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">{t('tools.text-analyzer.density.one')}</h4>
                                {density.one.length > 0 ? (
                                    <div className="space-y-2">
                                        {density.one.map((item, i) => (
                                            <div key={i} className="flex justify-between text-sm">
                                                <span className="text-slate-700 font-medium">{item.phrase}</span>
                                                <span className="text-slate-400">{item.count} ({item.percentage}%)</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : <div className="text-xs text-slate-300 italic">{t('tools.text-analyzer.density.empty')}</div>}
                            </div>

                            <div>
                                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">{t('tools.text-analyzer.density.two')}</h4>
                                {density.two.length > 0 ? (
                                    <div className="space-y-2">
                                        {density.two.map((item, i) => (
                                            <div key={i} className="flex justify-between text-sm">
                                                <span className="text-slate-700 font-medium">{item.phrase}</span>
                                                <span className="text-slate-400">{item.count} ({item.percentage}%)</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : <div className="text-xs text-slate-300 italic">{t('tools.text-analyzer.density.empty')}</div>}
                            </div>
                            
                            <div>
                                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">{t('tools.text-analyzer.density.three')}</h4>
                                {density.three.length > 0 ? (
                                    <div className="space-y-2">
                                        {density.three.map((item, i) => (
                                            <div key={i} className="flex justify-between text-sm">
                                                <span className="text-slate-700 font-medium">{item.phrase}</span>
                                                <span className="text-slate-400">{item.count} ({item.percentage}%)</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : <div className="text-xs text-slate-300 italic">{t('tools.text-analyzer.density.empty')}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="text-analyzer" categoryId="marketing" />
        </ToolPageLayout>
    );
}
