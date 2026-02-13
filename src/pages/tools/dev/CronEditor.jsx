import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Clock, Copy, CheckCircle2 } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function CronEditor() {
    const { t } = useTranslation();
    // Basic state for the 5 parts
    const [minute, setMinute] = useState('*');
    const [hour, setHour] = useState('*');
    const [dayMonth, setDayMonth] = useState('*');
    const [month, setMonth] = useState('*');
    const [dayWeek, setDayWeek] = useState('*');
    
    const [expression, setExpression] = useState('* * * * *');
    const [description, setDescription] = useState(t('tools.cron-guru.generated.everyMinute'));
    const [copied, setCopied] = useState(false);

    // Sync input components to expression
    useEffect(() => {
        const expr = `${minute} ${hour} ${dayMonth} ${month} ${dayWeek}`;
        setExpression(expr);
        generateDescription(expr);
    }, [minute, hour, dayMonth, month, dayWeek, t]);

    const generateDescription = (expr) => {
        // Very basic human readable generator
        try {
            const parts = expr.split(' ');
            if (parts.length !== 5) return setDescription(t('tools.cron-guru.generated.invalid'));

            let desc = t('tools.cron-guru.generated.at') + " ";
            
            // Time
            if (parts[0] === '*' && parts[1] === '*') desc = t('tools.cron-guru.generated.everyMinute');
            else if (parts[0] !== '*' && parts[1] === '*') desc = t('tools.cron-guru.generated.minutePast', { minute: parts[0] });
            else if (parts[0] === '0' && parts[1] !== '*') desc = `${t('tools.cron-guru.generated.at')} ${parts[1]}:00`;
            else if (parts[0] !== '*' && parts[1] !== '*') desc = `${t('tools.cron-guru.generated.at')} ${parts[1]}:${parts[0]}`;

            // Date
            if (parts[2] !== '*') desc += ` ${t('tools.cron-guru.generated.onDayMonth', { day: parts[2] })}`;
            if (parts[3] !== '*') desc += ` ${t('tools.cron-guru.generated.inMonth', { month: parts[3] })}`;
            if (parts[4] !== '*') desc += ` ${t('tools.cron-guru.generated.onDayWeek', { day: parts[4] })}`;

            setDescription(desc);
        } catch(e) {
            setDescription(t('tools.cron-guru.generated.error'));
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(expression);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.cron-guru.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.cron-guru.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Clock size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.cron-guru.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.cron-guru.subtitle')}</p>
                    </div>
                </div>
            </div>

            {/* Main Result Display */}
            <div className="bg-slate-900 text-center py-12 rounded-3xl mb-8 shadow-xl shadow-slate-200 overflow-hidden px-4">
                <div className="font-mono text-4xl md:text-6xl font-black text-white mb-4 tracking-wider flex flex-wrap justify-center gap-x-4 gap-y-2 break-all">
                     <span className="text-emerald-400">{minute}</span>
                     <span className="text-orange-400">{hour}</span>
                     <span className="text-blue-400">{dayMonth}</span>
                     <span className="text-pink-400">{month}</span>
                     <span className="text-purple-400">{dayWeek}</span>
                </div>
                <div className="text-slate-400 font-medium text-lg mb-8 max-w-2xl mx-auto break-words">
                    "{description}"
                </div>
                <button 
                    onClick={copyToClipboard}
                    className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2 mx-auto backdrop-blur-sm"
                >
                    {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                    {copied ? t('tools.cron-guru.actions.copied') : t('tools.cron-guru.actions.copy')}
                </button>
            </div>

            {/* Editors */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                {/* Minute */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <label className="block text-center text-xs font-bold text-emerald-600 uppercase mb-2">{t('tools.cron-guru.labels.minute')}</label>
                    <input 
                        type="text" 
                        value={minute} 
                        onChange={(e) => setMinute(e.target.value)}
                        className="w-full text-center font-mono font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg py-2 focus:ring-2 focus:ring-emerald-500 outline-none" 
                    />
                    <div className="text-xs text-center text-slate-400 mt-2">{t('tools.cron-guru.ranges.minute')}</div>
                </div>

                {/* Hour */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <label className="block text-center text-xs font-bold text-orange-600 uppercase mb-2">{t('tools.cron-guru.labels.hour')}</label>
                    <input 
                        type="text" 
                        value={hour} 
                        onChange={(e) => setHour(e.target.value)}
                        className="w-full text-center font-mono font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg py-2 focus:ring-2 focus:ring-orange-500 outline-none" 
                    />
                     <div className="text-xs text-center text-slate-400 mt-2">{t('tools.cron-guru.ranges.hour')}</div>
                </div>

                {/* Day (Month) */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <label className="block text-center text-xs font-bold text-blue-600 uppercase mb-2">{t('tools.cron-guru.labels.dayMonth')}</label>
                    <input 
                        type="text" 
                        value={dayMonth} 
                        onChange={(e) => setDayMonth(e.target.value)}
                        className="w-full text-center font-mono font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg py-2 focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                     <div className="text-xs text-center text-slate-400 mt-2">{t('tools.cron-guru.ranges.dayMonth')}</div>
                </div>

                {/* Month */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <label className="block text-center text-xs font-bold text-pink-600 uppercase mb-2">{t('tools.cron-guru.labels.month')}</label>
                    <input 
                        type="text" 
                        value={month} 
                        onChange={(e) => setMonth(e.target.value)}
                        className="w-full text-center font-mono font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg py-2 focus:ring-2 focus:ring-pink-500 outline-none" 
                    />
                     <div className="text-xs text-center text-slate-400 mt-2">{t('tools.cron-guru.ranges.month')}</div>
                </div>

                {/* Day (Week) */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <label className="block text-center text-xs font-bold text-purple-600 uppercase mb-2">{t('tools.cron-guru.labels.dayWeek')}</label>
                    <input 
                        type="text" 
                        value={dayWeek} 
                        onChange={(e) => setDayWeek(e.target.value)}
                        className="w-full text-center font-mono font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg py-2 focus:ring-2 focus:ring-purple-500 outline-none" 
                    />
                     <div className="text-xs text-center text-slate-400 mt-2">{t('tools.cron-guru.ranges.dayWeek')}</div>
                </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-2">{t('tools.cron-guru.labels.common')}</h3>
                <div className="grid md:grid-cols-3 gap-2 text-sm">
                    <button onClick={() => {setMinute('*'); setHour('*'); setDayMonth('*'); setMonth('*'); setDayWeek('*')}} className="text-left px-4 py-2 bg-white rounded-lg hover:bg-slate-100 border border-slate-100">{t('tools.cron-guru.examples.everyMinute')} (* * * * *)</button>
                    <button onClick={() => {setMinute('0'); setHour('*'); setDayMonth('*'); setMonth('*'); setDayWeek('*')}} className="text-left px-4 py-2 bg-white rounded-lg hover:bg-slate-100 border border-slate-100">{t('tools.cron-guru.examples.everyHour')} (0 * * * *)</button>
                    <button onClick={() => {setMinute('0'); setHour('0'); setDayMonth('*'); setMonth('*'); setDayWeek('*')}} className="text-left px-4 py-2 bg-white rounded-lg hover:bg-slate-100 border border-slate-100">{t('tools.cron-guru.examples.midnight')} (0 0 * * *)</button>
                    <button onClick={() => {setMinute('0'); setHour('12'); setDayMonth('*'); setMonth('*'); setDayWeek('*')}} className="text-left px-4 py-2 bg-white rounded-lg hover:bg-slate-100 border border-slate-100">{t('tools.cron-guru.examples.noon')} (0 12 * * *)</button>
                    <button onClick={() => {setMinute('0'); setHour('0'); setDayMonth('*'); setMonth('*'); setDayWeek('1')}} className="text-left px-4 py-2 bg-white rounded-lg hover:bg-slate-100 border border-slate-100">{t('tools.cron-guru.examples.everyMonday')} (0 0 * * 1)</button>
                    <button onClick={() => {setMinute('0'); setHour('0'); setDayMonth('1'); setMonth('*'); setDayWeek('*')}} className="text-left px-4 py-2 bg-white rounded-lg hover:bg-slate-100 border border-slate-100">{t('tools.cron-guru.examples.firstOfMonth')} (0 0 1 * *)</button>
                </div>
            </div>

            <RelatedTools currentToolId="cron-guru" categoryId="dev" />
        </ToolPageLayout>
    );
}
