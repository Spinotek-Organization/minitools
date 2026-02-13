import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, Briefcase, ArrowRight } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function DateDifference() {
    const { t } = useTranslation();
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0]); // +7 days
    const [includeEnd, setIncludeEnd] = useState(false);
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (!startDate || !endDate) return;

        const start = new Date(startDate);
        const end = new Date(endDate);
        
        // Ensure start is before end for calculation, but track direction
        let d1 = start <= end ? start : end;
        let d2 = start <= end ? end : start;

        // Add 1 day if include end date is checked and dates are valid
        if (includeEnd) {
            d2 = new Date(d2);
            d2.setDate(d2.getDate() + 1);
        }

        // Basic Time Diff
        const diffTime = Math.abs(d2 - d1);
        const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // Weeks
        const weeks = Math.floor(totalDays / 7);
        const remainingDays = totalDays % 7;

        // Working Days (Iterate)
        let workingDays = 0;
        let tempDate = new Date(d1);
        while (tempDate < d2) {
            const day = tempDate.getDay();
            if (day !== 0 && day !== 6) workingDays++; // Not Sun (0) or Sat (6)
            tempDate.setDate(tempDate.getDate() + 1);
        }

        // Years / Months / Days breakdown (Naive approach for display)
        // Reset tempDate
        tempDate = new Date(d1);
        let years = d2.getFullYear() - d1.getFullYear();
        let months = d2.getMonth() - d1.getMonth();
        let days = d2.getDate() - d1.getDate();

        if (days < 0) {
            months--;
            // Get days in previous month
            const prevMonth = new Date(d2.getFullYear(), d2.getMonth(), 0).getDate();
            days += prevMonth;
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        setResult({
            totalDays,
            weeks,
            remainingDays,
            workingDays,
            years,
            months,
            daysBreakdown: days,
            hours: totalDays * 24,
            workingHours: workingDays * 8, // Assuming 9-5
            isPast: start > end
        });

    }, [startDate, endDate, includeEnd]);

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.date-diff.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.date-diff.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.date-diff.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.date-diff.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Input Section */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">{t('tools.date-diff.form.startDate')}</label>
                                <input 
                                    type="date" 
                                    value={startDate} 
                                    onChange={(e) => setStartDate(e.target.value)} 
                                    className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:border-pink-500 outline-none font-medium text-slate-800" 
                                />
                            </div>

                            <div className="flex justify-center text-slate-300">
                                <ArrowRight className="rotate-90 md:rotate-0" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">{t('tools.date-diff.form.endDate')}</label>
                                <input 
                                    type="date" 
                                    value={endDate} 
                                    onChange={(e) => setEndDate(e.target.value)} 
                                    className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:border-pink-500 outline-none font-medium text-slate-800" 
                                />
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${includeEnd ? 'bg-pink-600 border-pink-600 text-white' : 'border-slate-300 group-hover:border-pink-400'}`}>
                                        {includeEnd && <ArrowRight size={14} className="rotate-45" />}
                                    </div>
                                    <span className="text-sm font-medium text-slate-600">{t('tools.date-diff.form.includeEnd')}</span>
                                    <input type="checkbox" className="hidden" checked={includeEnd} onChange={e => setIncludeEnd(e.target.checked)} />
                                </label>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-2">
                    {result && (
                        <div className="grid grid-cols-1  gap-4">
                            
                            {/* Primary Result */}
                            <div className="sm:col-span-2 bg-pink-600 text-white rounded-3xl p-8 shadow-lg relative overflow-hidden">
                                <div className="relative z-10">
                                    <div className="text-pink-200 text-sm font-bold uppercase tracking-wider mb-2">{t('tools.date-diff.results.totalDuration')}</div>
                                    <div className="text-5xl md:text-6xl font-black mb-4">
                                        {result.totalDays} <span className="text-2xl md:text-3xl font-bold opacity-60">{t('tools.date-diff.results.days')}</span>
                                    </div>
                                    <div className="bg-white/20 inline-block px-4 py-2 rounded-lg font-medium">
                                        {t('tools.date-diff.results.summary', { weeks: result.weeks, days: result.remainingDays })}
                                    </div>
                                </div>
                                <Calendar className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10 rotate-12" />
                            </div>

                            {/* Breakdown */}
                            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                                <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                                    <Clock size={18} className="text-pink-500" />
                                    {t('tools.date-diff.results.breakdown')}
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                                        <span className="text-slate-500">{t('tools.date-diff.results.years')}</span>
                                        <span className="font-bold text-lg">{result.years}</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                                        <span className="text-slate-500">{t('tools.date-diff.results.months')}</span>
                                        <span className="font-bold text-lg">{result.months}</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                                        <span className="text-slate-500 capitalize">{t('tools.date-diff.results.days')}</span>
                                        <span className="font-bold text-lg">{result.daysBreakdown}</span>
                                    </div>
                                    <div className="pt-2 text-xs text-slate-400 text-center">
                                        {t('tools.date-diff.results.fullBreakdown', { years: result.years, months: result.months, days: result.daysBreakdown })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            <RelatedTools currentToolId="date-diff" categoryId="academic" />
        </ToolPageLayout>
    );
}
