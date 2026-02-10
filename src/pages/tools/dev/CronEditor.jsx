import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Clock, Copy, CheckCircle2 } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function CronEditor() {
    // Basic state for the 5 parts
    const [minute, setMinute] = useState('*');
    const [hour, setHour] = useState('*');
    const [dayMonth, setDayMonth] = useState('*');
    const [month, setMonth] = useState('*');
    const [dayWeek, setDayWeek] = useState('*');
    
    const [expression, setExpression] = useState('* * * * *');
    const [description, setDescription] = useState('Every minute');
    const [copied, setCopied] = useState(false);

    // Sync input components to expression
    useEffect(() => {
        const expr = `${minute} ${hour} ${dayMonth} ${month} ${dayWeek}`;
        setExpression(expr);
        generateDescription(expr);
    }, [minute, hour, dayMonth, month, dayWeek]);

    const generateDescription = (expr) => {
        // Very basic human readable generator
        // Real implementation would use 'cronstrue' library
        try {
            const parts = expr.split(' ');
            if (parts.length !== 5) return setDescription('Invalid Format');

            let desc = "At ";
            
            // Time
            if (parts[0] === '*' && parts[1] === '*') desc = "Every minute";
            else if (parts[0] !== '*' && parts[1] === '*') desc = `Minute ${parts[0]} past every hour`;
            else if (parts[0] === '0' && parts[1] !== '*') desc = `At ${parts[1]}:00`;
            else if (parts[0] !== '*' && parts[1] !== '*') desc = `At ${parts[1]}:${parts[0]}`;

            // Date
            if (parts[2] !== '*') desc += ` on day of month ${parts[2]}`;
            if (parts[3] !== '*') desc += ` in month ${parts[3]}`;
            if (parts[4] !== '*') desc += ` on day of week ${parts[4]}`;

            setDescription(desc);
        } catch(e) {
            setDescription('Invalid Cron Expression');
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
                <title>Crontab Guru | MiniTools by Spinotek</title>
                <meta name="description" content="Visualize and edit cron schedule expressions easily." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Clock size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Crontab Guru</h1>
                        <p className="text-slate-500 text-sm">Visualize and edit cron schedule expressions.</p>
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
                    {copied ? 'Copied' : 'Copy Expression'}
                </button>
            </div>

            {/* Editors */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                {/* Minute */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <label className="block text-center text-xs font-bold text-emerald-600 uppercase mb-2">Minute</label>
                    <input 
                        type="text" 
                        value={minute} 
                        onChange={(e) => setMinute(e.target.value)}
                        className="w-full text-center font-mono font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg py-2 focus:ring-2 focus:ring-emerald-500 outline-none" 
                    />
                    <div className="text-xs text-center text-slate-400 mt-2">0 - 59</div>
                </div>

                {/* Hour */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <label className="block text-center text-xs font-bold text-orange-600 uppercase mb-2">Hour</label>
                    <input 
                        type="text" 
                        value={hour} 
                        onChange={(e) => setHour(e.target.value)}
                        className="w-full text-center font-mono font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg py-2 focus:ring-2 focus:ring-orange-500 outline-none" 
                    />
                     <div className="text-xs text-center text-slate-400 mt-2">0 - 23</div>
                </div>

                {/* Day (Month) */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <label className="block text-center text-xs font-bold text-blue-600 uppercase mb-2">Day (Month)</label>
                    <input 
                        type="text" 
                        value={dayMonth} 
                        onChange={(e) => setDayMonth(e.target.value)}
                        className="w-full text-center font-mono font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg py-2 focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                     <div className="text-xs text-center text-slate-400 mt-2">1 - 31</div>
                </div>

                {/* Month */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <label className="block text-center text-xs font-bold text-pink-600 uppercase mb-2">Month</label>
                    <input 
                        type="text" 
                        value={month} 
                        onChange={(e) => setMonth(e.target.value)}
                        className="w-full text-center font-mono font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg py-2 focus:ring-2 focus:ring-pink-500 outline-none" 
                    />
                     <div className="text-xs text-center text-slate-400 mt-2">1 - 12</div>
                </div>

                {/* Day (Week) */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <label className="block text-center text-xs font-bold text-purple-600 uppercase mb-2">Day (Week)</label>
                    <input 
                        type="text" 
                        value={dayWeek} 
                        onChange={(e) => setDayWeek(e.target.value)}
                        className="w-full text-center font-mono font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg py-2 focus:ring-2 focus:ring-purple-500 outline-none" 
                    />
                     <div className="text-xs text-center text-slate-400 mt-2">0 - 6 (Sun-Sat)</div>
                </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-2">Common Examples</h3>
                <div className="grid md:grid-cols-3 gap-2 text-sm">
                    <button onClick={() => {setMinute('*'); setHour('*'); setDayMonth('*'); setMonth('*'); setDayWeek('*')}} className="text-left px-4 py-2 bg-white rounded-lg hover:bg-slate-100 border border-slate-100">Every minute (* * * * *)</button>
                    <button onClick={() => {setMinute('0'); setHour('*'); setDayMonth('*'); setMonth('*'); setDayWeek('*')}} className="text-left px-4 py-2 bg-white rounded-lg hover:bg-slate-100 border border-slate-100">Every hour (0 * * * *)</button>
                    <button onClick={() => {setMinute('0'); setHour('0'); setDayMonth('*'); setMonth('*'); setDayWeek('*')}} className="text-left px-4 py-2 bg-white rounded-lg hover:bg-slate-100 border border-slate-100">Midnight (0 0 * * *)</button>
                    <button onClick={() => {setMinute('0'); setHour('12'); setDayMonth('*'); setMonth('*'); setDayWeek('*')}} className="text-left px-4 py-2 bg-white rounded-lg hover:bg-slate-100 border border-slate-100">Noon (0 12 * * *)</button>
                    <button onClick={() => {setMinute('0'); setHour('0'); setDayMonth('*'); setMonth('*'); setDayWeek('1')}} className="text-left px-4 py-2 bg-white rounded-lg hover:bg-slate-100 border border-slate-100">Every Monday (0 0 * * 1)</button>
                    <button onClick={() => {setMinute('0'); setHour('0'); setDayMonth('1'); setMonth('*'); setDayWeek('*')}} className="text-left px-4 py-2 bg-white rounded-lg hover:bg-slate-100 border border-slate-100">First of month (0 0 1 * *)</button>
                </div>
            </div>

            <RelatedTools currentToolId="cron-guru" categoryId="dev" />
        </ToolPageLayout>
    );
}
