import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Bell, Calendar as CalendarIcon, Download, RefreshCw } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function FollowupReminder() {
    const { t } = useTranslation();

    const STRATEGIES = [
        {
            id: 'standard',
            name: t('tools.followup-calc.strategies.standard.name'),
            description: t('tools.followup-calc.strategies.standard.desc'),
            offsets: [2, 5, 10, 20] // Days from start
        },
        {
            id: 'aggressive',
            name: t('tools.followup-calc.strategies.aggressive.name'),
            description: t('tools.followup-calc.strategies.aggressive.desc'),
            offsets: [1, 3, 6, 12]
        },
        {
            id: 'long-term',
            name: t('tools.followup-calc.strategies.long_term.name'),
            description: t('tools.followup-calc.strategies.long_term.desc'),
            offsets: [7, 14, 30, 60]
        },
        {
            id: 'fibonacci',
            name: t('tools.followup-calc.strategies.fibonacci.name'),
            description: t('tools.followup-calc.strategies.fibonacci.desc'),
            offsets: [1, 2, 3, 5, 8, 13, 21]
        }
    ];

    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [strategy, setStrategy] = useState('standard');
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        calculateReminders();
    }, [startDate, strategy]);

    const calculateReminders = () => {
        if (!startDate) return;

        const selectedStrategy = STRATEGIES.find(s => s.id === strategy);
        const start = new Date(startDate);
        
        const calculated = selectedStrategy.offsets.map((offset, index) => {
            const date = new Date(start);
            date.setDate(date.getDate() + offset);
            
            // Skip weekends if needed? For now, keep simple. 
            // Better to show exact date.
            
            return {
                id: index,
                number: index + 1,
                date: date,
                dateString: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
                offset: offset
            };
        });

        setReminders(calculated);
    };

    const generateICS = (reminder) => {
        const title = `Follow-up #${reminder.number} (Procotol: ${STRATEGIES.find(s => s.id === strategy).name})`;
        const description = `This is your scheduled follow-up reminder.\n\nStrategy: ${STRATEGIES.find(s => s.id === strategy).name}\nOriginal Sent Date: ${startDate}`;
        
        // Format date to YYYYMMDD
        const dateStr = reminder.date.toISOString().replace(/-|:|\.\d\d\d/g, "").substring(0, 8);
        
        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Spinotek//MiniTools//EN
BEGIN:VEVENT
UID:${Date.now()}-${reminder.id}@minitools
DTSTAMP:${new Date().toISOString().replace(/-|:|\.\d\d\d/g, "")}
DTSTART;VALUE=DATE:${dateStr}
SUMMARY:${title}
DESCRIPTION:${description}
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', `followup_${reminder.number}.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <ToolPageLayout toolId="followup-calc">
            <Helmet>
                <title>{t('tools.followup-calc.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.followup-calc.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Bell size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.followup-calc.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.followup-calc.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Inputs */}
                <div className="lg:col-span-1 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm h-fit">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <CalendarIcon size={20} className="text-rose-600" />
                        Settings
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Start Date (Sent Proposal)</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-rose-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Strategy</label>
                            <div className="space-y-2">
                                {STRATEGIES.map(s => (
                                    <label 
                                        key={s.id}
                                        className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                                            strategy === s.id
                                                ? 'bg-rose-50 border-rose-200 ring-1 ring-rose-500'
                                                : 'bg-white border-slate-200 hover:bg-slate-50'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="strategy"
                                            value={s.id}
                                            checked={strategy === s.id}
                                            onChange={() => setStrategy(s.id)}
                                            className="mt-1 w-4 h-4 text-rose-600 focus:ring-rose-500 border-gray-300"
                                        />
                                        <div>
                                            <span className="block text-sm font-bold text-slate-900">{s.name}</span>
                                            <span className="block text-xs text-slate-500">{s.description}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-6">Generated Schedule</h2>
                    
                    <div className="space-y-4">
                        {reminders.map((reminder) => (
                            <div key={reminder.id} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-rose-200 transition-all">
                                <div className="flex items-center gap-4 mb-4 sm:mb-0 w-full sm:w-auto">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-rose-600 border border-rose-100 shadow-sm flex-shrink-0">
                                        #{reminder.number}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 text-lg">{reminder.dateString}</div>
                                        <div className="text-xs text-slate-500 font-medium bg-slate-200 inline-block px-2 py-0.5 rounded-md">
                                            +{reminder.offset} days after start
                                        </div>
                                    </div>
                                </div>
                                
                                <button
                                    onClick={() => generateICS(reminder)}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition-all shadow-sm"
                                >
                                    <Download size={16} />
                                    Add to Calendar
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-4 bg-blue-50 text-blue-800 rounded-xl text-sm flex gap-3">
                        <RefreshCw size={20} className="flex-shrink-0 mt-0.5" />
                        <p>
                            <strong>Tip:</strong> Most sales follow-ups require 5-8 touches. Don't give up too early! Download the calendar events to stay on track.
                        </p>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="followup-calc" categoryId="sales" />
        </ToolPageLayout>
    );
}
