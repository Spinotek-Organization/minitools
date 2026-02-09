import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Binary, Copy, Check, Hash } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

const BASES = [
    { id: 'bin', label: 'Binary (Base 2)', radix: 2, pattern: /^[0-1]*$/, placeholder: '101010' },
    { id: 'oct', label: 'Octal (Base 8)', radix: 8, pattern: /^[0-7]*$/, placeholder: '52' },
    { id: 'dec', label: 'Decimal (Base 10)', radix: 10, pattern: /^[0-9]*$/, placeholder: '42' },
    { id: 'hex', label: 'Hexadecimal (Base 16)', radix: 16, pattern: /^[0-9A-Fa-f]*$/, placeholder: '2A' }
];

export default function BinaryConverter() {
    const [values, setValues] = useState({ bin: '', oct: '', dec: '', hex: '' });
    const [copied, setCopied] = useState(null);

    const handleChange = (id, value) => {
        const base = BASES.find(b => b.id === id);
        
        // Remove invalid chars
        if (!base.pattern.test(value)) return;

        // If empty
        if (value === '') {
            setValues({ bin: '', oct: '', dec: '', hex: '' });
            return;
        }

        // Calculate Decimal first
        const decimal = parseInt(value, base.radix);

        if (isNaN(decimal)) return;

        setValues({
            bin: decimal.toString(2),
            oct: decimal.toString(8),
            dec: decimal.toString(10),
            hex: decimal.toString(16).toUpperCase()
        });
    };

    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 1500);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Binary to Decimal | MiniTools by Spinotek</title>
                <meta name="description" content="Convert numbers between binary, decimal, and hex easily." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Binary size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Binary to Decimal</h1>
                        <p className="text-slate-500 text-sm">Convert numbers between binary, decimal, and hex.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Main Converter */}
                <div className="lg:col-span-2 space-y-4">
                    {BASES.map((base) => (
                        <div key={base.id} className="relative group">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">
                                {base.label}
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-4 text-slate-400 font-mono font-bold select-none opacity-50">
                                    {base.id === 'hex' ? '0x' : base.id === 'bin' ? '0b' : base.id === 'oct' ? '0o' : '#'}
                                </span>
                                <input
                                    type="text"
                                    value={values[base.id]}
                                    onChange={(e) => handleChange(base.id, e.target.value)}
                                    placeholder={base.placeholder}
                                    className="w-full bg-white border-2 border-slate-100 rounded-2xl py-3 pl-10 pr-12 text-xl font-mono font-bold text-slate-800 focus:border-slate-800 outline-none transition-all shadow-sm group-hover:border-slate-200"
                                />
                                <button
                                    onClick={() => handleCopy(values[base.id], base.id)}
                                    className="absolute right-3 top-2.5 p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                                    title="Copy"
                                    disabled={!values[base.id]}
                                >
                                    {copied === base.id ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar Info */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                        <h4 className="font-bold flex items-center gap-2 mb-4 text-slate-800">
                            <Hash size={18} />
                            Quick Reference
                        </h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between py-2 border-b border-slate-50">
                                <span className="text-slate-500">Decimal</span>
                                <span className="font-mono font-bold">10</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-50">
                                <span className="text-slate-500">Binary</span>
                                <span className="font-mono font-bold">1010</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-50">
                                <span className="text-slate-500">Hex</span>
                                <span className="font-mono font-bold">A</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-50">
                                <span className="text-slate-500">Octal</span>
                                <span className="font-mono font-bold">12</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 text-slate-600 text-sm leading-relaxed">
                        <p>
                            <strong>Decimal (Base 10)</strong> is what humans use daily. <br/>
                            <strong>Binary (Base 2)</strong> is the language of computers (0s and 1s). <br/>
                            <strong>Hexadecimal (Base 16)</strong> is used in web colors and memory addresses.
                        </p>
                    </div>
                </div>

            </div>

            <RelatedTools currentToolId="binary-conv" categoryId="academic" />
        </ToolPageLayout>
    );
}
