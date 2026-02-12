import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Hash, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function RomanConverter() {
    const { t } = useTranslation('tools');
    const [decimal, setDecimal] = useState('');
    const [roman, setRoman] = useState('');
    const [error, setError] = useState('');

    const convertToRoman = (num) => {
        if (!num || isNaN(num)) return '';
        if (num > 3999) return t('roman-conv.errors.large');
        if (num <= 0) return t('roman-conv.errors.positive');

        const map = {
            M: 1000, CM: 900, D: 500, CD: 400,
            C: 100, XC: 90, L: 50, XL: 40,
            X: 10, IX: 9, V: 5, IV: 4, I: 1
        };
        let result = '';
        let n = num;

        for (const key in map) {
            while (n >= map[key]) {
                result += key;
                n -= map[key];
            }
        }
        return result;
    };

    const convertToDecimal = (str) => {
        if (!str) return '';
        const s = str.toUpperCase();
        const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
        let result = 0;

        for (let i = 0; i < s.length; i++) {
            const current = map[s[i]];
            const next = map[s[i + 1]];

            if (!current) return ''; // Invalid char

            if (next && current < next) {
                result -= current;
            } else {
                result += current;
            }
        }
        return result;
    };

    // Strict validation for Roman Numerals using format principles
    const isValidRoman = (str) => {
        const pattern = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
        return pattern.test(str.toUpperCase());
    };

    const handleDecimalChange = (e) => {
        const val = e.target.value;
        setDecimal(val);
        setError('');

        if (val) {
            const num = parseInt(val, 10);
            const romanVal = convertToRoman(num);
            setRoman(romanVal);
        } else {
            setRoman('');
        }
    };

    const handleRomanChange = (e) => {
        const val = e.target.value.toUpperCase();
        setRoman(val);
        setError('');

        if (val) {
            if (!isValidRoman(val)) {
                setError(t('roman-conv.errors.format'));
                setDecimal('');
                return;
            }
            const decimalVal = convertToDecimal(val);
            setDecimal(decimalVal);
        } else {
            setDecimal('');
        }
    };

    return (
        <ToolPageLayout toolId="roman-conv">
            <Helmet>
                <title>{t('roman-conv.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('roman-conv.desc')} />
            </Helmet>

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-200">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('roman-conv.title')}</h1>
                        <p className="text-slate-500">{t('roman-conv.desc')}</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-8 md:p-12 space-y-12">

                        {/* Converter Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
                            {/* Decimal Input */}
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-slate-500 uppercase tracking-wide">
                                    {t('roman-conv.inputs.decimal')}
                                </label>
                                <div className="relative group">
                                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                                    <input
                                        type="number"
                                        value={decimal}
                                        onChange={handleDecimalChange}
                                        placeholder={t('roman-conv.inputs.decimalPlaceholder')}
                                        className="w-full pl-12 pr-4 py-4 text-3xl font-mono font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all placeholder:text-slate-300"
                                    />
                                </div>
                            </div>

                            {/* Arrow Indicator (Desktop) */}
                            <div className="hidden md:flex justify-center text-slate-300">
                                <ArrowRight size={32} />
                            </div>

                            {/* Roman Input */}
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-slate-500 uppercase tracking-wide">
                                    {t('roman-conv.inputs.roman')}
                                </label>
                                <div className="relative group">
                                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                                    <input
                                        type="text"
                                        value={roman}
                                        onChange={handleRomanChange}
                                        placeholder={t('roman-conv.inputs.romanPlaceholder')}
                                        className={`w-full pl-12 pr-4 py-4 text-3xl font-serif font-bold bg-slate-50 border rounded-2xl outline-none transition-all placeholder:text-slate-300 uppercase ${error
                                                ? 'text-red-500 border-red-300 focus:border-red-500 bg-red-50'
                                                : 'text-slate-800 border-slate-200 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500'
                                            }`}
                                    />
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="absolute -bottom-8 left-0 right-0 flex justify-center">
                                    <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 px-4 py-2 rounded-full animate-in fade-in slide-in-from-top-1">
                                        <AlertCircle size={16} />
                                        {error}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Reference Table */}
                    <div className="border-t border-slate-100 bg-slate-50/50 p-8">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 text-center">{t('roman-conv.quickRef')}</h3>
                        <div className="flex justify-center flex-wrap gap-4 md:gap-8">
                            {[
                                { r: 'I', d: 1 },
                                { r: 'V', d: 5 },
                                { r: 'X', d: 10 },
                                { r: 'L', d: 50 },
                                { r: 'C', d: 100 },
                                { r: 'D', d: 500 },
                                { r: 'M', d: 1000 }
                            ].map((item) => (
                                <div key={item.r} className="flex flex-col items-center bg-white border border-slate-200 rounded-xl w-16 py-2 shadow-sm">
                                    <span className="text-lg font-serif font-bold text-slate-800">{item.r}</span>
                                    <span className="text-xs font-mono text-slate-500 border-t border-slate-100 w-full text-center mt-1 pt-1">{item.d}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-slate-200 py-8">
                    <RelatedTools currentToolId="roman-converter" categoryId="office" />
                </div>
            </div>
        </ToolPageLayout>
    );
}
