import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Percent, Plus, Trash2, Tag, RefreshCw } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function DiscountCalculator() {
    const { t } = useTranslation();
    const [originalPrice, setOriginalPrice] = useState(100);
    const [discounts, setDiscounts] = useState([{ id: 1, value: 20 }]); // Array for stacked discounts
    const [taxRate, setTaxRate] = useState(0);

    const addDiscount = () => {
        setDiscounts([...discounts, { id: Date.now(), value: 0 }]);
    };

    const removeDiscount = (id) => {
        setDiscounts(discounts.filter(d => d.id !== id));
    };

    const updateDiscount = (id, value) => {
        setDiscounts(discounts.map(d => d.id === id ? { ...d, value: parseFloat(value) } : d));
    };

    const calculate = () => {
        let currentPrice = originalPrice;
        let totalDiscountAmount = 0;

        // Apply discounts sequentially (stacked)
        discounts.forEach(discount => {
            const amount = currentPrice * (discount.value / 100);
            totalDiscountAmount += amount;
            currentPrice -= amount;
        });

        // Apply tax on the discounted price usually? Or original?
        // Usually sales tax is applied to the final sale price.
        const taxAmount = currentPrice * (taxRate / 100);
        const finalPrice = currentPrice + taxAmount;

        return {
            finalPrice,
            totalSaved: originalPrice - currentPrice,
            taxPayload: taxAmount
        };
    };

    const result = calculate();

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
    };

    return (
        <ToolPageLayout toolId="discount-calc">
            <Helmet>
                <title>{t('tools.discount-calc.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.discount-calc.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Tag size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.discount-calc.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.discount-calc.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Inputs */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm h-fit">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Percent size={20} className="text-rose-600" />
                        {t('tools.discount-calc.section.price')}
                    </h2>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('tools.discount-calc.form.original')}</label>
                            <input
                                type="number"
                                value={originalPrice}
                                onChange={(e) => setOriginalPrice(parseFloat(e.target.value))}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-lg font-bold outline-none focus:ring-2 focus:ring-rose-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">{t('tools.discount-calc.form.discounts')}</label>
                            <div className="space-y-3">
                                {discounts.map((discount, index) => (
                                    <div key={discount.id} className="flex gap-2 items-center">
                                        <div className="bg-rose-50/50 flex-1 border border-rose-100 rounded-xl px-4 py-2 flex items-center">
                                            <span className="text-rose-400 font-bold mr-2">-{discount.value}%</span>
                                            <input
                                                type="number"
                                                value={discount.value}
                                                onChange={(e) => updateDiscount(discount.id, e.target.value)}
                                                className="w-full bg-transparent outline-none text-slate-900 font-medium"
                                                placeholder="0"
                                            />
                                        </div>
                                        {discounts.length > 1 && (
                                            <button onClick={() => removeDiscount(discount.id)} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button onClick={addDiscount} className="mt-3 text-sm font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 transition-colors">
                                <Plus size={16} /> {t('tools.discount-calc.form.addDiscount')}
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('tools.discount-calc.form.tax')}</label>
                            <input
                                type="number"
                                value={taxRate}
                                onChange={(e) => setTaxRate(parseFloat(e.target.value))}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-rose-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Result */}
                <div className="flex flex-col gap-6">
                    <div className="bg-rose-600 text-white rounded-3xl p-8 shadow-lg shadow-rose-200">
                        <div className="text-rose-100 font-bold uppercase tracking-wider text-sm mb-1">{t('tools.discount-calc.result.final')}</div>
                        <div className="text-5xl font-black mb-4">
                            {formatCurrency(result.finalPrice)}
                        </div>
                        <div className="flex justify-between items-end border-t border-rose-400/30 pt-4">
                            <div>
                                <div className="text-rose-100 text-sm mb-1">{t('tools.discount-calc.result.save')}</div>
                                <div className="text-2xl font-bold">{formatCurrency(result.totalSaved)}</div>
                            </div>
                             <div className="text-right">
                                <div className="text-rose-100 text-sm mb-1">{t('tools.discount-calc.result.original')}</div>
                                <div className="text-xl font-medium line-through decoration-rose-300/70 opacity-80">{formatCurrency(originalPrice)}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <div className="flex justify-between mb-2 pb-2 border-b border-slate-50">
                            <span className="text-slate-500">{t('tools.discount-calc.form.original')}</span>
                            <span className="font-medium text-slate-900">{formatCurrency(originalPrice)}</span>
                        </div>
                         <div className="flex justify-between mb-2 pb-2 border-b border-slate-50">
                            <span className="text-slate-500">{t('tools.discount-calc.result.totalDiscount')}</span>
                            <span className="font-bold text-emerald-500">-{formatCurrency(result.totalSaved)}</span>
                        </div>
                         <div className="flex justify-between mb-2">
                             <span className="text-slate-500">{t('tools.discount-calc.result.tax')} ({taxRate}%)</span>
                            <span className="font-medium text-slate-900">+{formatCurrency(result.taxPayload)}</span>
                        </div>
                    </div>
                    
                    <div className="bg-blue-50 text-blue-800 p-4 rounded-2xl text-sm border border-blue-100">
                        {t('tools.discount-calc.result.insight')}
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="discount-calc" categoryId="biz" />
        </ToolPageLayout>
    );
}
