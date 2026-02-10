import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { TrendingUp, Calculator, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function InvestmentRoi() {
    const [initialInvestment, setInitialInvestment] = useState(10000);
    const [revenue, setRevenue] = useState(15000);
    const [years, setYears] = useState(5);
    const [costs, setCosts] = useState(1000);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const calculateROI = () => {
        const totalCost = initialInvestment + costs;
        const netProfit = revenue - totalCost;
        const roi = (netProfit / totalCost) * 100;
        const annualizedRoi = (Math.pow((revenue / totalCost), (1 / years)) - 1) * 100;

        return {
            totalCost,
            netProfit,
            roi: isFinite(roi) ? roi : 0,
            annualizedRoi: isFinite(annualizedRoi) ? annualizedRoi : 0
        };
    };

    const generateChartData = () => {
        const data = [];
        const { annualizedRoi } = calculateROI();
        const baseRate = 0.05; // 5% baseline

        for (let i = 0; i <= years; i++) {
            data.push({
                year: `Year ${i}`,
                investment: initialInvestment * Math.pow(1 + (annualizedRoi / 100), i),
                baseline: initialInvestment * Math.pow(1 + baseRate, i)
            });
        }
        return data;
    };

    const result = calculateROI();
    const chartData = generateChartData();

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Investment ROI Calculator | MiniTools by Spinotek</title>
                <meta name="description" content="Calculate Return on Investment and potential profit growth." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Investment ROI Calculator</h1>
                        <p className="text-slate-500 text-sm">Calculate Return on Investment and potential profit growth.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Inputs */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Calculator size={20} className="text-yellow-600" />
                            Input Details
                        </h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Initial Investment ($)</label>
                                <input
                                    type="number"
                                    value={initialInvestment}
                                    onChange={(e) => setInitialInvestment(Number(e.target.value))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Total Revenue/Value ($)</label>
                                <input
                                    type="number"
                                    value={revenue}
                                    onChange={(e) => setRevenue(Number(e.target.value))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Additional Costs ($)</label>
                                <input
                                    type="number"
                                    value={costs}
                                    onChange={(e) => setCosts(Number(e.target.value))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Time Period (Years)</label>
                                <input
                                    type="number"
                                    value={years}
                                    onChange={(e) => setYears(Number(e.target.value))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results & Chart */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
                            <div className="text-sm text-slate-500 mb-1">Total ROI</div>
                            <div className={`text-2xl font-black ${result.roi >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                {result.roi.toFixed(2)}%
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
                            <div className="text-sm text-slate-500 mb-1">Annualized ROI</div>
                            <div className={`text-2xl font-black ${result.annualizedRoi >= 0 ? 'text-blue-600' : 'text-red-500'}`}>
                                {result.annualizedRoi.toFixed(2)}%
                            </div>
                        </div>
                         <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
                            <div className="text-sm text-slate-500 mb-1">Net Profit</div>
                            <div className={`text-2xl font-black ${result.netProfit >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                                {formatCurrency(result.netProfit)}
                            </div>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                         <h3 className="text-lg font-bold text-slate-900 mb-4">Growth Trajectory</h3>
                         <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis dataKey="year" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis 
                                        stroke="#64748b" 
                                        fontSize={12} 
                                        tickLine={false} 
                                        axisLine={false} 
                                        tickFormatter={(value) => `$${value/1000}k`}
                                    />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        formatter={(value) => [formatCurrency(value), 'Value']}
                                    />
                                    <Legend />
                                    <Line type="monotone" dataKey="investment" name="Your Investment" stroke="#ca8a04" strokeWidth={3} dot={{ r: 4, fill: '#ca8a04' }} activeDot={{ r: 6 }} />
                                    <Line type="monotone" dataKey="baseline" name="5% Benchmark" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                         </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="roi-calc" categoryId="biz" />
        </ToolPageLayout>
    );
}
