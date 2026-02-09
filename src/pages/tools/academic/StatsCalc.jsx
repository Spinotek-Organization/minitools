import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { BarChart2, Calculator, List, Activity, ArrowRight, Grid } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function StatsCalc() {
    const [input, setInput] = useState('');
    const [stats, setStats] = useState(null);

    useEffect(() => {
        // Parse numbers
        const numbers = input.split(/[\s,]+/)
            .map(n => parseFloat(n))
            .filter(n => !isNaN(n))
            .sort((a, b) => a - b);

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
        const modes = Object.keys(frequency)
            .filter(k => frequency[k] === maxFreq)
            .map(Number)
            .sort((a, b) => a - b);
        
        const mode = modes.length === count ? 'None' : modes.join(', ');

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

    }, [input]);

    const StatCard = ({ label, value, icon: Icon, color = "bg-slate-50 text-slate-800" }) => (
        <div className={`p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between ${color}`}>
            <div>
                <div className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">{label}</div>
                <div className="text-2xl font-black">{value}</div>
            </div>
            {Icon && <Icon size={24} className="opacity-20" />}
        </div>
    );

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Mean/Median/Mode Calc | MiniTools by Spinotek</title>
                <meta name="description" content="Find the average, middle, and most common values in a set." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <BarChart2 size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Mean/Median/Mode Calc</h1>
                        <p className="text-slate-500 text-sm">Calculate comprehensive statistics for any dataset.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Input Area */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm h-full">
                        <label className="block text-slate-700 font-bold mb-4">Input Dataset</label>
                         <div className="relative h-[calc(100%-3rem)]">
                            <textarea
                                value={input}
                                onChange={(e) => {
                                    // Allow numbers, commas, spaces, dashes (negative), dots (decimal), and newlines
                                    const val = e.target.value.replace(/[^0-9.,\-\s\n]/g, '');
                                    setInput(val);
                                }}
                                className="w-full h-64 lg:h-full p-4 border-2 border-slate-200 rounded-xl focus:border-indigo-500 outline-none font-mono text-sm resize-none transition-colors"
                                placeholder="Enter numbers separated by commas or spaces...&#10;Example:&#10;12, 15, 18, 22&#10;10 5 8 9"
                            ></textarea>
                            <div className="absolute bottom-4 right-4 text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">
                                {stats ? stats.count : 0} items
                            </div>
                         </div>
                    </div>
                </div>

                {/* Results Grid */}
                <div className="lg:col-span-2">
                    {stats ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                                <StatCard label="Mean (Average)" value={Number.isInteger(stats.mean) ? stats.mean : stats.mean.toFixed(4)} icon={Calculator} color="bg-indigo-600 text-white" />
                            </div>
                            <StatCard label="Median (Middle)" value={stats.median} icon={List} />
                            <StatCard label="Mode (Most Common)" value={stats.mode} icon={Activity} />
                            <StatCard label="Sum" value={stats.sum} />
                            <StatCard label="Range" value={stats.range} />
                             <StatCard label="Minimum" value={stats.min} />
                            <StatCard label="Maximum" value={stats.max} />
                            <StatCard label="Standard Deviation" value={stats.stdDev.toFixed(4)} icon={Grid} />
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center h-full flex flex-col items-center justify-center text-slate-400">
                             <Calculator size={48} className="mb-4 opacity-20" />
                            <p className="font-medium">Enter numbers to see statistics.</p>
                        </div>
                    )}
                </div>

            </div>

            <RelatedTools currentToolId="stats-calc" categoryId="academic" />
        </ToolPageLayout>
    );
}
