import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { LayoutGrid, Printer, Trash2 } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function TimeBoxing() {
    const { t } = useTranslation();
    const HOURS = [
        "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
        "16:00", "16:30", "17:00", "17:30", "18:00"
    ];

    const [schedule, setSchedule] = useState(() => {
        const saved = localStorage.getItem('minitools-timebox');
        return saved ? JSON.parse(saved) : {};
    });
    
    const [priorities, setPriorities] = useState(() => {
        const saved = localStorage.getItem('minitools-priorities');
        return saved ? JSON.parse(saved) : ['', '', ''];
    });

    const [brainDump, setBrainDump] = useState(() => {
        return localStorage.getItem('minitools-braindump') || '';
    });

    useEffect(() => {
        localStorage.setItem('minitools-timebox', JSON.stringify(schedule));
        localStorage.setItem('minitools-priorities', JSON.stringify(priorities));
        localStorage.setItem('minitools-braindump', brainDump);
    }, [schedule, priorities, brainDump]);

    const updateSchedule = (time, value) => {
        setSchedule(prev => ({ ...prev, [time]: value }));
    };

    const updatePriority = (index, value) => {
        const newPriorities = [...priorities];
        newPriorities[index] = value;
        setPriorities(newPriorities);
    };

    const clearAll = () => {
        if(confirm(t('tools.time-boxing.confirmClear'))) {
            setSchedule({});
            setPriorities(['', '', '']);
            setBrainDump('');
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.time-boxing.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.time-boxing.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 print:hidden">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <LayoutGrid size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.time-boxing.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.time-boxing.desc')}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={clearAll}
                        className="flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl font-medium transition-colors"
                    >
                        <Trash2 size={18} />
                        {t('tools.time-boxing.buttons.clear')}
                    </button>
                    <button 
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-rose-200"
                    >
                        <Printer size={18} />
                        {t('tools.time-boxing.buttons.print')}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl print:rounded-none border border-slate-200 print:border-none p-8 print:p-0 shadow-sm print:shadow-none max-w-4xl mx-auto" id="printable-area">
                
                {/* Header for Print */}
                <div className="hidden print:block text-center mb-8 border-b border-slate-900 pb-4">
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-widest">{t('tools.time-boxing.print.header')}</h1>
                    <p className="text-slate-500 mt-2">{t('tools.time-boxing.print.subheader')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2 print:gap-8">
                    
                    {/* Left Column: Top Priorities & Brain Dump */}
                    <div className="space-y-8">
                        {/* Top Priorities */}
                        <div className="bg-slate-50 print:bg-transparent rounded-2xl p-6 print:p-0 print:border print:border-slate-300">
                            <h2 className="text-lg font-black text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <span className="text-rose-500 print:text-slate-800">#</span> {t('tools.time-boxing.sections.priorities')}
                            </h2>
                            <div className="space-y-3">
                                {priorities.map((p, i) => (
                                    <div key={i} className="flex gap-3 items-center">
                                        <span className="font-bold text-slate-400 text-lg">{i + 1}</span>
                                        <input 
                                            type="text" 
                                            value={p} 
                                            onChange={(e) => updatePriority(i, e.target.value)}
                                            placeholder={`${t('tools.time-boxing.placeholders.priority')} ${i + 1}`}
                                            className="flex-1 bg-white print:bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Brain Dump */}
                        <div className="bg-slate-50 print:bg-transparent rounded-2xl p-6 print:p-0 print:border print:border-slate-300 flex-1 flex flex-col h-[500px] print:h-auto">
                            <h2 className="text-lg font-black text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <span className="text-rose-500 print:text-slate-800">@</span> {t('tools.time-boxing.sections.brainDump')}
                            </h2>
                            <textarea 
                                value={brainDump}
                                onChange={(e) => setBrainDump(e.target.value)}
                                placeholder={t('tools.time-boxing.placeholders.brainDump')}
                                className="flex-1 w-full bg-white print:bg-slate-50 border border-slate-200 rounded-lg p-4 text-slate-700 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 resize-none leading-relaxed"
                            ></textarea>
                        </div>
                    </div>

                    {/* Right Column: Schedule */}
                    <div className="bg-slate-50 print:bg-transparent rounded-2xl p-6 print:p-0 print:border print:border-slate-300">
                         <h2 className="text-lg font-black text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <span className="text-rose-500 print:text-slate-800">L</span> {t('tools.time-boxing.sections.schedule')}
                        </h2>
                        <div className="space-y-1">
                            {HOURS.map((time, i) => {
                                const isHour = time.endsWith(":00");
                                return (
                                    <div key={time} className="flex items-center gap-2 group">
                                        <div className={`w-12 text-right text-xs font-mono font-bold ${isHour ? 'text-slate-900' : 'text-slate-400'}`}>
                                            {time}
                                        </div>
                                        <input 
                                            type="text" 
                                            value={schedule[time] || ''} 
                                            onChange={(e) => updateSchedule(time, e.target.value)}
                                            className={`flex-1 bg-white print:bg-slate-50 border-b ${isHour ? 'border-slate-200' : 'border-slate-100'} px-2 py-1 text-sm text-slate-700 focus:outline-none focus:bg-rose-50 transition-colors`}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>

                <div className="mt-8 text-center text-slate-400 text-xs hidden print:block">
                    {t('tools.time-boxing.print.footer')}
                </div>
            </div>

            <style>
                {`
                    @media print {
                        body * {
                            visibility: hidden;
                        }
                        #printable-area, #printable-area * {
                            visibility: visible;
                        }
                        #printable-area {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            padding: 20px;
                        }
                        @page {
                            margin: 1cm;
                        }
                    }
                `}
            </style>

            <RelatedTools currentToolId="time-boxing" categoryId="productivity" />
        </ToolPageLayout>
    );
}
