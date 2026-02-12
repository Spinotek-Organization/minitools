import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Wallet, Info } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function SalaryCalculator() {
    const { t } = useTranslation();
    const [grossSalary, setGrossSalary] = useState(10000000);
    const [status, setStatus] = useState('TK/0'); // TK/0, K/0, K/1, etc.
    const [hasNPWP, setHasNPWP] = useState(true);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
    };

    const calculate = () => {
        const bpjsKesehatan = Math.min(grossSalary * 0.01, 120000); // 1% capped (example cap)
        const jht = grossSalary * 0.02; // Jaminan Hari Tua 2%
        const jp = Math.min(grossSalary * 0.01, 95596); // Jaminan Pensiun 1% capped (2024 roughly)

        // Simplified TER (Tarif Efektif Rata-rata) logic for monthly PPh 21 (2024 rules)
        // This is a VERY ROUGH approximation as TER tables are extensive.
        // Let's use a simplified bracket system for estimation.
        
        let pph21 = 0;
        // Basic TER Category A (TK/0, TK/1, K/0)
        if (status === 'TK/0' || status === 'TK/1' || status === 'K/0') {
            if (grossSalary <= 5400000) pph21 = 0;
            else if (grossSalary <= 5650000) pph21 = grossSalary * 0.0025;
            else if (grossSalary <= 5950000) pph21 = grossSalary * 0.005;
            else if (grossSalary <= 6300000) pph21 = grossSalary * 0.0075;
            else if (grossSalary <= 6750000) pph21 = grossSalary * 0.01;
            else if (grossSalary <= 7500000) pph21 = grossSalary * 0.015;
            else if (grossSalary <= 8550000) pph21 = grossSalary * 0.02;
            else if (grossSalary <= 9650000) pph21 = grossSalary * 0.0225;
            else if (grossSalary <= 10050000) pph21 = grossSalary * 0.025;
            else if (grossSalary <= 10350000) pph21 = grossSalary * 0.03;
            else if (grossSalary <= 10700000) pph21 = grossSalary * 0.035;
            else if (grossSalary <= 11050000) pph21 = grossSalary * 0.04; // ... and so on
            else pph21 = grossSalary * 0.05; // Fallback for higher
        } else {
            // Category B/C logic simplified
             pph21 = grossSalary * 0.03; // Rough average
        }

        if (!hasNPWP) {
            pph21 = pph21 * 1.2; // 20% surcharge
        }

        const totalDeductions = bpjsKesehatan + jht + jp + pph21;
        const takeHomePay = grossSalary - totalDeductions;

        return {
            bpjsKesehatan,
            jht,
            jp,
            pph21,
            totalDeductions,
            takeHomePay
        };
    };

    const result = calculate();

    return (
        <ToolPageLayout toolId="salary-calc">
            <Helmet>
                <title>{t('tools.salary-calc.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.salary-calc.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Wallet size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.salary-calc.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.salary-calc.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Inputs */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm h-fit">
                    <h2 className="text-lg font-bold text-slate-900 mb-6">{t('tools.salary-calc.employmentDetails')}</h2>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('tools.salary-calc.grossSalary')}</label>
                            <input
                                type="number"
                                value={grossSalary}
                                onChange={(e) => setGrossSalary(parseFloat(e.target.value))}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">{t('tools.salary-calc.ptkpStatus')}</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500 appearance-none"
                            >
                                <option value="TK/0">{t('tools.salary-calc.ptkp.tk0')}</option>
                                <option value="TK/1">{t('tools.salary-calc.ptkp.tk1')}</option>
                                <option value="K/0">{t('tools.salary-calc.ptkp.k0')}</option>
                                <option value="K/1">{t('tools.salary-calc.ptkp.k1')}</option>
                                <option value="K/2">{t('tools.salary-calc.ptkp.k2')}</option>
                                <option value="K/3">{t('tools.salary-calc.ptkp.k3')}</option>
                            </select>
                        </div>
                        
                        <div className="flex items-center gap-2">
                             <input 
                                type="checkbox" 
                                id="npwp" 
                                checked={hasNPWP} 
                                onChange={(e) => setHasNPWP(e.target.checked)}
                                className="w-5 h-5 accent-emerald-600 rounded"
                            />
                            <label htmlFor="npwp" className="text-sm font-medium text-slate-700 select-none">{t('tools.salary-calc.hasNPWP')}</label>
                        </div>

                         <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl text-xs border border-yellow-100 flex gap-2">
                            <Info size={16} className="shrink-0 mt-0.5" />
                            <p>{t('tools.salary-calc.terInfo')}</p>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="space-y-6">
                    <div className="bg-emerald-600 text-white rounded-3xl p-8 shadow-lg shadow-emerald-200">
                        <div className="text-emerald-100 text-sm font-bold uppercase mb-1">{t('tools.salary-calc.result.takeHome')}</div>
                        <div className="text-4xl font-black mb-1">
                            {formatCurrency(result.takeHomePay)}
                        </div>
                        <div className="text-emerald-200 text-sm">{t('tools.salary-calc.result.perMonth')}</div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4">{t('tools.salary-calc.breakdown')}</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                                <span className="text-slate-600">{t('tools.salary-calc.deduction.bpjsHealth')}</span>
                                <span className="font-medium text-red-500">-{formatCurrency(result.bpjsKesehatan)}</span>
                            </div>
                            <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                                <span className="text-slate-600">{t('tools.salary-calc.deduction.jht')}</span>
                                <span className="font-medium text-red-500">-{formatCurrency(result.jht)}</span>
                            </div>
                            <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                                <span className="text-slate-600">{t('tools.salary-calc.deduction.jp')}</span>
                                <span className="font-medium text-red-500">-{formatCurrency(result.jp)}</span>
                            </div>
                            <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                                <span className="text-slate-600">{t('tools.salary-calc.deduction.pph21')}</span>
                                <span className="font-medium text-red-500">-{formatCurrency(result.pph21)}</span>
                            </div>
                            <div className="flex justify-between font-bold pt-2">
                                <span className="text-slate-900">{t('tools.salary-calc.totalDeductions')}</span>
                                <span className="text-red-600">-{formatCurrency(result.totalDeductions)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="salary-calc" categoryId="biz" />
        </ToolPageLayout>
    );
}
