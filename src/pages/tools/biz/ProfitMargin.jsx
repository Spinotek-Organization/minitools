import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { TrendingUp, RefreshCw } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function ProfitMargin() {
    const [cost, setCost] = useState('');
    const [revenue, setRevenue] = useState('');
    const [margin, setMargin] = useState(null);
    const [markup, setMarkup] = useState(null);
    const [grossProfit, setGrossProfit] = useState(null);

    const calculate = () => {
        const c = parseFloat(cost);
        const r = parseFloat(revenue);

        if (isNaN(c) || isNaN(r) || r === 0) {
            setMargin(null);
            setMarkup(null);
            setGrossProfit(null);
            return;
        }

        const profit = r - c;
        const mar = (profit / r) * 100;
        const mark = (profit / c) * 100;

        setGrossProfit(profit);
        setMargin(mar);
        setMarkup(isFinite(mark) ? mark : 0);
    };

    const clear = () => {
        setCost('');
        setRevenue('');
        setMargin(null);
        setMarkup(null);
        setGrossProfit(null);
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Profit Margin Calculator | MiniTools by Spinotek</title>
                <meta name="description" content="Calculate your margins and markup accurately." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Profit Margin Calculator</h1>
                        <p className="text-slate-500 text-sm">Calculate your margins and markup accurately.</p>
                    </div>
                </div>
                <button
                    onClick={clear}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-colors"
                >
                    <RefreshCw size={18} />
                    Reset
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Inputs */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm h-fit">
                    <h2 className="text-lg font-bold text-slate-900 mb-6">Input Values</h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Cost of Goods Sold ($)</label>
                            <input
                                type="number"
                                value={cost}
                                onChange={(e) => setCost(e.target.value)}
                                onKeyUp={calculate}
                                placeholder="e.g. 50"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Selling Price / Revenue ($)</label>
                            <input
                                type="number"
                                value={revenue}
                                onChange={(e) => setRevenue(e.target.value)}
                                onKeyUp={calculate}
                                placeholder="e.g. 100"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <button
                            onClick={calculate}
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-teal-200"
                        >
                            Calculate
                        </button>
                    </div>
                </div>

                {/* Results */}
                <div className="space-y-4">
                    <div className="bg-teal-50 rounded-3xl border border-teal-100 p-8 text-center">
                        <div className="text-sm font-bold text-teal-800 uppercase mb-2">Gross Profit</div>
                        <div className={`text-4xl font-black ${grossProfit >= 0 ? 'text-teal-900' : 'text-red-500'}`}>
                            {grossProfit !== null ? formatCurrency(grossProfit) : '$0.00'}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                         <div className="bg-white rounded-3xl border border-slate-100 p-6 text-center shadow-sm">
                            <div className="text-sm font-bold text-slate-400 uppercase mb-2">Gross Margin</div>
                            <div className={`text-2xl font-black ${margin >= 0 ? 'text-slate-900' : 'text-red-500'}`}>
                                {margin !== null ? margin.toFixed(2) + '%' : '0%'}
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl border border-slate-100 p-6 text-center shadow-sm">
                            <div className="text-sm font-bold text-slate-400 uppercase mb-2">Markup</div>
                             <div className={`text-2xl font-black ${markup >= 0 ? 'text-slate-900' : 'text-red-500'}`}>
                                {markup !== null ? markup.toFixed(2) + '%' : '0%'}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-2">Understanding the Results</h3>
                        <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                            <li><strong>Gross Profit:</strong> The absolute amount of money you make (Revenue - Cost).</li>
                            <li><strong>Gross Margin:</strong> The percentage of revenue that is profit. A higher margin is better.</li>
                            <li><strong>Markup:</strong> The percentage you add to the cost to get the selling price.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="profit-calc" categoryId="biz" />
        </ToolPageLayout>
    );
}
