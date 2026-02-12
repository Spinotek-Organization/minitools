import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Scale, CheckCircle } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function UnitPriceComparison() {
    const { t } = useTranslation();
    const [priceA, setPriceA] = useState('');
    const [qtyA, setQtyA] = useState('');
    const [priceB, setPriceB] = useState('');
    const [qtyB, setQtyB] = useState('');

    const calculate = () => {
        const pA = parseFloat(priceA);
        const qA = parseFloat(qtyA);
        const pB = parseFloat(priceB);
        const qB = parseFloat(qtyB);

        if (!pA || !qA || !pB || !qB) return null;

        const unitPriceA = pA / qA;
        const unitPriceB = pB / qB;
        
        let winner = null;
        let savings = 0;

        if (unitPriceA < unitPriceB) {
            winner = 'A';
            savings = ((unitPriceB - unitPriceA) / unitPriceB) * 100;
        } else if (unitPriceB < unitPriceA) {
            winner = 'B';
            savings = ((unitPriceA - unitPriceB) / unitPriceA) * 100;
        } else {
            winner = 'Tie';
        }

        return { unitPriceA, unitPriceB, winner, savings };
    };

    const result = calculate();

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 3 }).format(val);
    };

    return (
        <ToolPageLayout toolId="unit-price-comp">
            <Helmet>
                <title>{t('tools.unit-price-comp.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.unit-price-comp.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Scale size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.unit-price-comp.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.unit-price-comp.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 relative">
                {/* Result Overlay for Desktop */}
                {result && result.winner !== 'Tie' && (
                    <div className={`hidden md:block absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white shadow-xl px-6 py-3 rounded-full font-bold border-2 ${result.winner === 'A' ? 'border-l-8 border-l-cyan-500' : 'border-r-8 border-r-cyan-500'} text-slate-800 whitespace-nowrap`}>
                        {t('tools.unit-price-comp.result.cheaper', { 
                            savings: result.savings.toFixed(1), 
                            winner: result.winner === 'A' ? t('tools.unit-price-comp.left') : t('tools.unit-price-comp.right') 
                        })}
                    </div>
                )}

                {/* Item A */}
                <div className={`p-8 rounded-3xl border-2 transition-all ${result?.winner === 'A' ? 'bg-cyan-50 border-cyan-500 shadow-lg shadow-cyan-100' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-black text-slate-900">{t('tools.unit-price-comp.itemA')}</h2>
                        {result?.winner === 'A' && <CheckCircle className="text-cyan-600" size={28} />}
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('tools.unit-price-comp.price')} ($)</label>
                            <input
                                type="number"
                                value={priceA}
                                onChange={(e) => setPriceA(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('tools.unit-price-comp.qty')}</label>
                            <input
                                type="number"
                                value={qtyA}
                                onChange={(e) => setQtyA(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                    </div>

                    {result && (
                        <div className="mt-6 pt-6 border-t border-slate-200/50 text-center">
                            <div className="text-sm text-slate-500 mb-1 uppercase tracking-wide">{t('tools.unit-price-comp.unitPrice')}</div>
                            <div className={`text-2xl font-black ${result.winner === 'A' ? 'text-cyan-700' : 'text-slate-400'}`}>
                                {formatCurrency(result.unitPriceA)}
                            </div>
                        </div>
                    )}
                </div>

                {/* Item B */}
                <div className={`p-8 rounded-3xl border-2 transition-all ${result?.winner === 'B' ? 'bg-cyan-50 border-cyan-500 shadow-lg shadow-cyan-100' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-black text-slate-900">{t('tools.unit-price-comp.itemB')}</h2>
                        {result?.winner === 'B' && <CheckCircle className="text-cyan-600" size={28} />}
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('tools.unit-price-comp.price')} ($)</label>
                            <input
                                type="number"
                                value={priceB}
                                onChange={(e) => setPriceB(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('tools.unit-price-comp.qty')}</label>
                            <input
                                type="number"
                                value={qtyB}
                                onChange={(e) => setQtyB(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                    </div>

                     {result && (
                        <div className="mt-6 pt-6 border-t border-slate-200/50 text-center">
                            <div className="text-sm text-slate-500 mb-1 uppercase tracking-wide">{t('tools.unit-price-comp.unitPrice')}</div>
                             <div className={`text-2xl font-black ${result.winner === 'B' ? 'text-cyan-700' : 'text-slate-400'}`}>
                                {formatCurrency(result.unitPriceB)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            {result?.winner === 'Tie' && (
                <div className="text-center bg-slate-100 p-4 rounded-xl font-bold text-slate-600 mb-8">
                    {t('tools.unit-price-comp.result.tie')}
                </div>
            )}

            <RelatedTools currentToolId="unit-price-comp" categoryId="biz" />
        </ToolPageLayout>
    );
}
