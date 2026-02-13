import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { BarChart2, Calculator, List, Activity, ArrowRight, Grid } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function StatsCalc() {
    const { t } = useTranslation();
    const [input, setInput] = useState('');
    const [stats, setStats] = useState(null);

    useEffect(() => {
        // Parse numbers
        const parts = input.split(/[\s,]+/);
        const numbers = parts
            .map(n => parseFloat(n))
            .filter(n => !isNaN(n))
            .sort((a, b) => a - b);
        
        // Only set stats if we have numbers
        if (numbers.length === 0) {
            setStats(null);
            return;
        }

        const count = numbers.length;
        const sum = numbers.reduce((a, b) => a + b, 0);
        const mean = sum / count;
        
        // Median
        const mid = Math.floor(count / 2);
        const median = count % 2 === 0 
            ? (numbers[mid - 1] + numbers[mid]) / 2 
            : numbers[mid];

        // Mode
        const frequency = {};
        let maxFreq = 0;
        numbers.forEach(n => {
            frequency[n] = (frequency[n] || 0) + 1;
            if (frequency[n] > maxFreq) maxFreq = frequency[n];
        });
        
        // If all numbers appear once, there is no mode (or all are modes, depending on definition, but usually "None" for unique set)
        // If maxFreq is 1, return None
        let mode = t('tools.stats-calc.results.none');
        
        if (maxFreq > 1) {
            const modes = Object.keys(frequency)
                .filter(k => frequency[k] === maxFreq)
                .map(Number)
                .sort((a, b) => a - b);
            
            mode = modes.length === count ? t('tools.stats-calc.results.none') : modes.join(', ');
        } else {
             mode = t('tools.stats-calc.results.none');
        }


        // Range
        const min = numbers[0];
        const max = numbers[count - 1];
        const range = max - min;

        // Standard Deviation (Population)
        const variance = numbers.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / count;
        const stdDev = Math.sqrt(variance);

        setStats({
            count,
            sum,
            mean,
            median,
            mode,
            min,
            max,
            range,
            stdDev
        });

    }, [input, t]);

    const StatCard = ({ label, value, icon: Icon, color = "bg-white text-slate-800" }) => (
        <div className={`p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between ${color === "bg-white text-slate-800" ? "bg-white text-slate-800" : color}`}>
            <div>
                <div className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">{label}</div>
                <div className="text-2xl font-black">{value}</div>
            </div>
            {Icon && <Icon size={24} className="opacity-20" />}
        </div>
    );
    
    // Helper to format numbers prettily
    const fmt = (n) => {
        if (typeof n !== 'number') return n;
        return Number.isInteger(n) ? n : parseFloat(n.toFixed(4));
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.stats-calc.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.stats-calc.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <BarChart2 size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.stats-calc.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.stats-calc.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Input Area */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm h-full">
                        <label className="block text-slate-700 font-bold mb-4">{t('tools.stats-calc.input.label')}</label>
                         <div className="relative h-[calc(100%-3rem)]">
                            <textarea
                                value={input}
                                onChange={(e) => {
                                    // Allow numbers, commas, spaces, dashes (negative), dots (decimal), and newlines
                                    const val = e.target.value; 
                                    // Simplified validation in onChange can be annoying, better to just let them type and parse in effect
                                    setInput(val);
                                }}
                                className="w-full h-64 lg:h-full p-4 border-2 border-slate-200 rounded-xl focus:border-indigo-500 outline-none font-mono text-sm resize-none transition-colors"
                                placeholder={t('tools.stats-calc.input.placeholder')}
                            ></textarea>
                            <div className="absolute bottom-4 right-4 text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">
                                {t('tools.stats-calc.input.items', { count: stats ? stats.count : 0 })}
                            </div>
                         </div>
                    </div>
                </div>

                {/* Results Grid */}
                <div className="lg:col-span-2">
                    {stats ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                                <StatCard label={t('tools.stats-calc.results.mean')} value={fmt(stats.mean)} icon={Calculator} color="bg-indigo-600 text-white" />
                            </div>
                            <StatCard label={t('tools.stats-calc.results.median')} value={fmt(stats.median)} icon={List} />
                            <StatCard label={t('tools.stats-calc.results.mode')} value={stats.mode} icon={Activity} />
                            <StatCard label={t('tools.stats-calc.results.sum')} value={fmt(stats.sum)} />
                            <StatCard label={t('tools.stats-calc.results.range')} value={fmt(stats.range)} />
                             <StatCard label={t('tools.stats-calc.results.min')} value={fmt(stats.min)} />
                            <StatCard label={t('tools.stats-calc.results.max')} value={fmt(stats.max)} />
                            <StatCard label={t('tools.stats-calc.results.stdDev')} value={fmt(stats.stdDev)} icon={Grid} />
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center h-full flex flex-col items-center justify-center text-slate-400">
                             <Calculator size={48} className="mb-4 opacity-20" />
                            <p className="font-medium">{t('tools.stats-calc.emptyState')}</p>
                        </div>
                    )}
                </div>

            </div>

            <RelatedTools currentToolId="stats-calc" categoryId="academic" />
        </ToolPageLayout>
    );
}
