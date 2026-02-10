import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calculator, ArrowRight, Info, RefreshCw } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function TaxCalculator() {
    const [taxType, setTaxType] = useState('ppn'); // ppn, pph21, pph23
    const [calculationMode, setCalculationMode] = useState('exclude'); // exclude (add tax), include (extract tax)
    const [amount, setAmount] = useState('');
    const [taxRate, setTaxRate] = useState(11);
    const [result, setResult] = useState(null);

    // Default rates
    useEffect(() => {
        if (taxType === 'ppn') setTaxRate(11);
        if (taxType === 'pph21') setTaxRate(5); // Minimum bracket
        if (taxType === 'pph23') setTaxRate(2);
    }, [taxType]);

    const calculate = () => {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount)) {
            setResult(null);
            return;
        }

        let dpp = 0; // Dasar Pengenaan Pajak (Tax Base)
        let taxValue = 0;
        let total = 0;

        if (calculationMode === 'exclude') {
            // Amount is BEFORE tax
            dpp = numAmount;
            taxValue = dpp * (taxRate / 100);
            total = dpp + taxValue; // For PPh, usually it's deducted, but let's stick to standard "add tax" or "deduct tax" logic?
            // Actually for PPh 21/23, it's usually withheld. So Total Received = Amount - Tax.
            // But let's standardize: 
            // PPN: Customer pays Amount + Tax.
            // PPh: You receive Amount - Tax.
            
            // Let's keep it simple: Base, Tax, Total (Base + Tax) for PPN.
            // For PPh, we might want to show "Amount to Pay" vs "Amount Received".
        } else {
            // Amount is AFTER tax (Inclusive)
            // Total = DPP + (DPP * Rate) = DPP * (1 + Rate)
            // DPP = Total / (1 + Rate)
            dpp = numAmount / (1 + (taxRate / 100));
            taxValue = numAmount - dpp;
            total = numAmount;
        }

        setResult({
            dpp,
            taxValue,
            total
        });
    };

    useEffect(() => {
        calculate();
    }, [amount, taxRate, calculationMode, taxType]);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Tax Calculator (PPN/PPh) | MiniTools by Spinotek</title>
                <meta name="description" content="Calculate Indonesian tax obligations (PPN 11%, PPh 21/23)." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-lime-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Calculator size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Tax Calculator</h1>
                        <p className="text-slate-500 text-sm">Calculate PPN (VAT) and PPh (Income Tax) instantly.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Inputs */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm h-fit">
                    <h2 className="text-lg font-bold text-slate-900 mb-6">Tax Settings</h2>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Tax Type</label>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setTaxType('ppn')}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                                        taxType === 'ppn' ? 'bg-lime-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                >
                                    PPN (11%)
                                </button>
                                <button
                                    onClick={() => setTaxType('pph23')}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                                        taxType === 'pph23' ? 'bg-lime-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                >
                                    PPh 23 (2%)
                                </button>
                                <button
                                    onClick={() => setTaxType('custom')}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                                        taxType === 'custom' ? 'bg-lime-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                >
                                    Custom Rate
                                </button>
                            </div>
                        </div>

                        <div>
                             <label className="block text-sm font-medium text-slate-700 mb-2">Calculation Mode</label>
                             <div className="flex bg-slate-100 p-1 rounded-xl">
                                <button
                                    onClick={() => setCalculationMode('exclude')}
                                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                                        calculationMode === 'exclude' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                                    }`}
                                >
                                    Exclude Tax (Add Tax)
                                </button>
                                <button
                                    onClick={() => setCalculationMode('include')}
                                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                                        calculationMode === 'include' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                                    }`}
                                >
                                    Include Tax (Extract)
                                </button>
                             </div>
                             <p className="text-xs text-slate-500 mt-2">
                                {calculationMode === 'exclude' 
                                    ? 'Select this if the amount is pure base price (DPP).' 
                                    : 'Select this if the input amount already includes tax.'}
                             </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Amount (Rp)</label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="1000000"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-lime-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Tax Rate (%)</label>
                                <input
                                    type="number"
                                    value={taxRate}
                                    onChange={(e) => {
                                        setTaxRate(parseFloat(e.target.value));
                                        setTaxType('custom');
                                    }}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-lime-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Result */}
                <div className="bg-lime-50 rounded-3xl border border-lime-100 p-8 flex flex-col justify-center">
                    {!result ? (
                        <div className="text-center text-lime-800/50">
                            <Info size={48} className="mx-auto mb-4 opacity-50" />
                            <p className="font-medium">Enter an amount to verify calculation.</p>
                        </div>
                    ) : (
                        <div className="space-y-6 w-full">
                            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-lime-100">
                                <div className="text-sm font-bold text-slate-500 uppercase mb-1">
                                    Base Price (DPP)
                                </div>
                                <div className="text-2xl font-black text-slate-900">
                                    {formatCurrency(result.dpp)}
                                </div>
                            </div>

                            <div className="flex items-center justify-center text-lime-600">
                                <ArrowRight size={24} className="rotate-90 md:rotate-0" />
                            </div>

                            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-lime-100">
                                <div className="text-sm font-bold text-slate-500 uppercase mb-1 flex justify-between">
                                    <span>Tax Value ({taxRate}%)</span>
                                </div>
                                <div className="text-2xl font-black text-red-500">
                                    {formatCurrency(result.taxValue)}
                                </div>
                            </div>

                             <div className="bg-lime-600 text-white p-6 rounded-2xl shadow-lg mt-4">
                                <div className="text-sm font-bold text-lime-100 uppercase mb-1">
                                    Total Amount
                                </div>
                                <div className="text-3xl font-black">
                                    {formatCurrency(result.total)}
                                </div>
                                {calculationMode === 'exclude' && taxType.startsWith('pph') && (
                                     <p className="text-xs text-lime-100 mt-2 italic">
                                        *For PPh, this is usually strictly withheld. Meaning you might actually pay/receive Base Price - Tax.
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <RelatedTools currentToolId="tax-calc" categoryId="biz" />
        </ToolPageLayout>
    );
}
