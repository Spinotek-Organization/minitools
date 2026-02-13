import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Percent, ArrowRight, Calculator, RefreshCw } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function PercentageCalc() {
    const { t } = useTranslation();
    const [mode, setMode] = useState('what_is');
    const [val1, setVal1] = useState('');
    const [val2, setVal2] = useState('');
    const [result, setResult] = useState(null);
    const [explanation, setExplanation] = useState('');

    const MODES = [
        { id: 'what_is', label: t('tools.percentage-calc.modes.what_is') },
        { id: 'is_what', label: t('tools.percentage-calc.modes.is_what') },
        { id: 'change', label: t('tools.percentage-calc.modes.change') }
    ];

    useEffect(() => {
        const v1 = parseFloat(val1);
        const v2 = parseFloat(val2);

        if (isNaN(v1) || isNaN(v2)) {
            setResult(null);
            setExplanation('');
            return;
        }

        let res = 0;
        let expl = '';

        if (mode === 'what_is') {
            // What is X% of Y?
            res = (v1 / 100) * v2;
            expl = t('tools.percentage-calc.explanations.what_is', { v1, v2 });
        } else if (mode === 'is_what') {
            // X is what % of Y?
            res = (v1 / v2) * 100;
            expl = t('tools.percentage-calc.explanations.is_what', { v1, v2 });
        } else if (mode === 'change') {
            // % Change from X to Y
            // ((V2 - V1) / V1) * 100
            if (v1 === 0) {
                 setResult(null); 
                 setExplanation(t('tools.percentage-calc.errors.zeroChange'));
                 return;
            }
            res = ((v2 - v1) / v1) * 100;
            const directionKey = res > 0 ? 'increase' : res < 0 ? 'decrease' : 'noChange';
            const direction = t(`tools.percentage-calc.directions.${directionKey}`);
            
            expl = t('tools.percentage-calc.explanations.change', { direction, v1, v2 });
        }

        // Round to 2 decimals if needed
        setResult(Number.isInteger(res) ? res : res.toFixed(2));
        setExplanation(expl);

    }, [val1, val2, mode, t]);

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.percentage-calc.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.percentage-calc.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Percent size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.percentage-calc.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.percentage-calc.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Main Calculator */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Mode Selector */}
                    <div className="bg-slate-100 p-1 rounded-2xl flex flex-wrap">
                        {MODES.map(m => (
                            <button
                                key={m.id}
                                onClick={() => setMode(m.id)}
                                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${mode === m.id ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>

                    {/* Dynamic Inputs */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm flex flex-col md:flex-row items-center justify-center gap-4 text-lg font-medium text-slate-700">
                        
                        {mode === 'what_is' && (
                            <>
                                <span>{t('tools.percentage-calc.text.what_is')}</span>
                                <input type="number" value={val1} onChange={e => setVal1(e.target.value)} className="w-24 text-center px-4 py-2 border-2 border-emerald-100 rounded-xl focus:border-emerald-500 outline-none font-bold text-emerald-900" placeholder={t('tools.percentage-calc.inputs.x')} />
                                <span>{t('tools.percentage-calc.text.of')}</span>
                                <input type="number" value={val2} onChange={e => setVal2(e.target.value)} className="w-32 text-center px-4 py-2 border-2 border-emerald-100 rounded-xl focus:border-emerald-500 outline-none font-bold text-emerald-900" placeholder={t('tools.percentage-calc.inputs.y')} />
                                <span>?</span>
                            </>
                        )}

                        {mode === 'is_what' && (
                            <>
                                <input type="number" value={val1} onChange={e => setVal1(e.target.value)} className="w-24 text-center px-4 py-2 border-2 border-emerald-100 rounded-xl focus:border-emerald-500 outline-none font-bold text-emerald-900" placeholder={t('tools.percentage-calc.inputs.x')} />
                                <span>{t('tools.percentage-calc.text.is_what')}</span>
                                <input type="number" value={val2} onChange={e => setVal2(e.target.value)} className="w-32 text-center px-4 py-2 border-2 border-emerald-100 rounded-xl focus:border-emerald-500 outline-none font-bold text-emerald-900" placeholder={t('tools.percentage-calc.inputs.y')} />
                                <span>?</span>
                            </>
                        )}

                        {mode === 'change' && (
                            <>
                                <span>{t('tools.percentage-calc.text.from')}</span>
                                <input type="number" value={val1} onChange={e => setVal1(e.target.value)} className="w-24 text-center px-4 py-2 border-2 border-emerald-100 rounded-xl focus:border-emerald-500 outline-none font-bold text-emerald-900" placeholder={t('tools.percentage-calc.inputs.start')} />
                                <span>{t('tools.percentage-calc.text.to')}</span>
                                <input type="number" value={val2} onChange={e => setVal2(e.target.value)} className="w-24 text-center px-4 py-2 border-2 border-emerald-100 rounded-xl focus:border-emerald-500 outline-none font-bold text-emerald-900" placeholder={t('tools.percentage-calc.inputs.end')} />
                                <span>{t('tools.percentage-calc.text.is_a')}</span>
                            </>
                        )}
                        
                    </div>
                </div>

                {/* Results Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className={`rounded-3xl p-8 text-center transition-all ${result !== null ? 'bg-emerald-600 text-white shadow-xl scale-105' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>
                        <div className="text-sm uppercase font-bold tracking-widest opacity-80 mb-2">{t('tools.percentage-calc.result')}</div>
                        <div className="text-5xl font-black mb-2">
                             {result !== null ? result + (mode !== 'what_is' ? '%' : '') : '-'}
                        </div>
                    </div>

                    {result !== null && (
                         <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 text-emerald-900 text-sm">
                            <h4 className="font-bold mb-2 flex items-center gap-2">
                                <Calculator size={16} />
                                {t('tools.percentage-calc.explanation')}
                            </h4>
                            <p className="font-mono bg-white/50 p-3 rounded-lg border border-emerald-100/50 break-all">
                                {explanation}
                            </p>
                        </div>
                    )}
                </div>

            </div>

            <RelatedTools currentToolId="percentage-calc" categoryId="academic" />
        </ToolPageLayout>
    );
}
