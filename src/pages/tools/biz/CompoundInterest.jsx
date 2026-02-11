import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { BarChart3, Calculator, RefreshCw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function CompoundInterest() {
    const { t } = useTranslation();
    const [principal, setPrincipal] = useState(10000);
    const [monthlyContribution, setMonthlyContribution] = useState(500);
    const [interestRate, setInterestRate] = useState(7);
    const [years, setYears] = useState(10);
    const [compoundingFrequency, setCompoundingFrequency] = useState(12);

    const [results, setResults] = useState([]);

    const calculate = () => {
        let currentBalance = principal;
        const data = [];

        for (let i = 0; i <= years; i++) {
            data.push({
                year: `Year ${i}`,
                balance: Math.round(currentBalance),
                interest: Math.round(currentBalance - (principal + (monthlyContribution * 12 * i))),
                totalContribution: principal + (monthlyContribution * 12 * i)
            });

            // Calculate next year's balance
            const r = interestRate / 100;
            const n = compoundingFrequency;
            const p = currentBalance;
            // Compound interest formula for monthly contribution is complex, let's simplify:
            // Future Value of a Series: PMT * (((1 + r/n)^(n*t) - 1) / (r/n))
            // But doing it iteratively is easier for the chart data
            
            for (let m = 0; m < 12; m++) {
                currentBalance += monthlyContribution;
                currentBalance += currentBalance * (r / 12);
            }
        }
        setResults(data);
    };

    useEffect(() => {
        calculate();
    }, [principal, monthlyContribution, interestRate, years, compoundingFrequency]);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <ToolPageLayout toolId="compound-interest">
            <Helmet>
                <title>{t('tools.compound-interest.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.compound-interest.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <BarChart3 size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.compound-interest.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.compound-interest.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Inputs */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Calculator size={20} className="text-blue-600" />
                            Investment Plan
                        </h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Initial Deposit ($)</label>
                                <input
                                    type="number"
                                    value={principal}
                                    onChange={(e) => setPrincipal(parseFloat(e.target.value))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Contribution ($)</label>
                                <input
                                    type="number"
                                    value={monthlyContribution}
                                    onChange={(e) => setMonthlyContribution(parseFloat(e.target.value))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Annual Interest Rate (%)</label>
                                <input
                                    type="number"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Investment Period (Years)</label>
                                <input
                                    type="number"
                                    value={years}
                                    onChange={(e) => setYears(parseFloat(e.target.value))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input 
                                    type="range" 
                                    min="1" 
                                    max="50" 
                                    value={years} 
                                    onChange={(e) => setYears(parseFloat(e.target.value))}
                                    className="w-full mt-2 accent-blue-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results & Chart */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-blue-600 text-white p-6 rounded-3xl shadow-lg shadow-blue-200">
                            <div className="text-blue-200 text-sm font-medium uppercase mb-1">Future Value</div>
                            <div className="text-4xl font-black">
                                {results.length > 0 && formatCurrency(results[results.length - 1].balance)}
                            </div>
                        </div>
                         <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <div className="text-slate-500 text-sm font-medium uppercase mb-1">Total Interest Earned</div>
                            <div className="text-3xl font-black text-emerald-500">
                                {results.length > 0 && formatCurrency(results[results.length - 1].interest)}
                            </div>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={results} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="year" fontSize={12} stroke="#94a3b8" />
                                <YAxis fontSize={12} stroke="#94a3b8" tickFormatter={(val) => `$${val/1000}k`} />
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <Tooltip 
                                    formatter={(value) => formatCurrency(value)}
                                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
                                />
                                <Area type="monotone" dataKey="balance" stroke="#2563eb" fillOpacity={1} fill="url(#colorBalance)" name="Total Balance" />
                                <Area type="monotone" dataKey="interest" stroke="#10b981" fillOpacity={1} fill="url(#colorInterest)" name="Interest Portion" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-slate-50 text-slate-600 p-4 rounded-2xl text-sm border border-slate-200">
                        <strong>The Power of Time:</strong> Notice how the curve gets steeper over time? That's compound interest working. The money your money earns starts earning its own money!
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="compound-interest" categoryId="biz" />
        </ToolPageLayout>
    );
}
