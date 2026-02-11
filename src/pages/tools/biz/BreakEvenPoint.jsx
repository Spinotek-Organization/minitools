import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Target, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function BreakEvenPoint() {
    const { t } = useTranslation();
    const [fixedCosts, setFixedCosts] = useState(5000);
    const [variableCostPerUnit, setVariableCostPerUnit] = useState(20);
    const [pricePerUnit, setPricePerUnit] = useState(50);
    const [breakevenUnits, setBreakevenUnits] = useState(0);
    const [breakevenRevenue, setBreakevenRevenue] = useState(0);

    const calculate = () => {
        const fc = parseFloat(fixedCosts);
        const vc = parseFloat(variableCostPerUnit);
        const p = parseFloat(pricePerUnit);

        if (p <= vc) {
            setBreakevenUnits(0);
            setBreakevenRevenue(0);
            return;
        }

        const units = fc / (p - vc);
        const revenue = units * p;

        setBreakevenUnits(units);
        setBreakevenRevenue(revenue);
    };

    const generateChartData = () => {
        const data = [];
        if (breakevenUnits === 0) return data;

        const maxUnits = Math.ceil(breakevenUnits * 2);
        const step = Math.ceil(maxUnits / 10);

        for (let i = 0; i <= maxUnits; i += step) {
            data.push({
                units: i,
                revenue: pricePerUnit * i,
                totalCost: fixedCosts + (variableCostPerUnit * i),
                fixedCost: fixedCosts
            });
        }
        return data;
    };

    const chartData = generateChartData();

    // Recalculate on any change
    React.useEffect(() => {
        calculate();
    }, [fixedCosts, variableCostPerUnit, pricePerUnit]);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <ToolPageLayout toolId="break-even-calc">
            <Helmet>
                <title>{t('tools.break-even-calc.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.break-even-calc.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Target size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.break-even-calc.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.break-even-calc.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Inputs */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm h-fit">
                    <h2 className="text-lg font-bold text-slate-900 mb-6">Cost Analysis</h2>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Total Fixed Costs ($)</label>
                            <input
                                type="number"
                                value={fixedCosts}
                                onChange={(e) => setFixedCosts(parseFloat(e.target.value))}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <p className="text-xs text-slate-400 mt-1">Rent, salaries, insurance (monthly/yearly)</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Variable Cost PER UNIT ($)</label>
                            <input
                                type="number"
                                value={variableCostPerUnit}
                                onChange={(e) => setVariableCostPerUnit(parseFloat(e.target.value))}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <p className="text-xs text-slate-400 mt-1">Materials, labor, shipping</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Selling Price PER UNIT ($)</label>
                            <input
                                type="number"
                                value={pricePerUnit}
                                onChange={(e) => setPricePerUnit(parseFloat(e.target.value))}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        
                        {pricePerUnit <= variableCostPerUnit && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-center gap-2">
                                ⚠️ Selling Price must be higher than Variable Cost!
                            </div>
                        )}
                    </div>
                </div>

                {/* Results & Chart */}
                <div className="space-y-6">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="bg-indigo-600 text-white p-6 rounded-3xl shadow-lg shadow-indigo-200 text-center">
                            <div className="text-indigo-200 text-sm font-medium uppercase mb-1">Break-Even Units</div>
                            <div className="text-4xl font-black">
                                {isFinite(breakevenUnits) ? Math.ceil(breakevenUnits) : 0}
                            </div>
                            <div className="text-xs text-indigo-200 mt-1">Units to sell</div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
                             <div className="text-slate-500 text-sm font-medium uppercase mb-1">Break-Even Revenue</div>
                            <div className="text-2xl font-black text-slate-900">
                                {isFinite(breakevenRevenue) ? formatCurrency(breakevenRevenue) : '$0'}
                            </div>
                             <div className="text-xs text-slate-400 mt-1">Sales needed</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="units" stroke="#94a3b8" fontSize={12} label={{ value: 'Units Sold', position: 'insideBottom', offset: -5 }} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(val) => `$${val/1000}k`} />
                                <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ borderRadius: '12px' }} />
                                <Legend />
                                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="Revenue" dot={false} />
                                <Line type="monotone" dataKey="totalCost" stroke="#ef4444" strokeWidth={3} name="Total Cost" dot={false} />
                                <Line type="monotone" dataKey="fixedCost" stroke="#94a3b8" strokeDasharray="5 5" name="Fixed Cost" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="break-even-calc" categoryId="biz" />
        </ToolPageLayout>
    );
}
