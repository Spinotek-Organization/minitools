import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Divide, Sigma } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function EquationSolver() {
    const { t } = useTranslation();
    const [type, setType] = useState('quadratic'); // linear, quadratic
    const [a, setA] = useState('1');
    const [b, setB] = useState('5');
    const [c, setC] = useState('6');
    const [solution, setSolution] = useState(null);

    useEffect(() => {
        const va = parseFloat(a);
        const vb = parseFloat(b);
        const vc = parseFloat(c);

        if (isNaN(va) || isNaN(vb) || isNaN(vc)) {
            setSolution(null);
            return;
        }

        if (type === 'linear') {
            // ax + b = c  =>  ax = c - b  =>  x = (c - b) / a
            // Note: Inputs are usually ax + b = 0 or ax + b = c. Let's assume ax + b = 0 for consistency with quadratic
            // ax + b = 0 => x = -b / a
            
            if (va === 0) {
                setSolution({ error: t('tools.equation-solver.errors.linearA') });
                return;
            }

            const x = -vb / va;
            setSolution({
                steps: [
                    t('tools.equation-solver.steps.eq', { eq: `${va}x + ${vb} = 0` }),
                    t('tools.equation-solver.steps.sub', { val: vb, res: `${va}x = ${-vb}` }),
                    t('tools.equation-solver.steps.div', { val: va, res: `x = ${-vb} / ${va}` }),
                    `x = ${Number.isInteger(x) ? x : x.toFixed(4)}`
                ],
                result: `x = ${Number.isInteger(x) ? x : x.toFixed(4)}`
            });

        } else if (type === 'quadratic') {
            // ax^2 + bx + c = 0
            if (va === 0) {
                 setSolution({ error: t('tools.equation-solver.errors.quadraticA') });
                 return;
            }

            const delta = (vb * vb) - (4 * va * vc);
            const steps = [
                t('tools.equation-solver.steps.eq', { eq: `${va}x² + ${vb}x + ${vc} = 0` }),
                t('tools.equation-solver.steps.discriminant'),
                t('tools.equation-solver.steps.deltaCalc', { b: vb, a: va, c: vc }),
                t('tools.equation-solver.steps.deltaRes', { b2: vb * vb, ac4: 4 * va * vc, delta })
            ];

            let resString = '';

            if (delta > 0) {
                const x1 = (-vb + Math.sqrt(delta)) / (2 * va);
                const x2 = (-vb - Math.sqrt(delta)) / (2 * va);
                steps.push(t('tools.equation-solver.steps.twoRoots'));
                steps.push(t('tools.equation-solver.steps.quadFormula'));
                steps.push(`x1 = (${-vb} + ${Math.sqrt(delta).toFixed(2)}) / ${2 * va}`);
                steps.push(`x2 = (${-vb} - ${Math.sqrt(delta).toFixed(2)}) / ${2 * va}`);
                resString = `x₁ = ${Number.isInteger(x1) ? x1 : x1.toFixed(4)}, x₂ = ${Number.isInteger(x2) ? x2 : x2.toFixed(4)}`;
            } else if (delta === 0) {
                const x = -vb / (2 * va);
                steps.push(t('tools.equation-solver.steps.oneRoot'));
                steps.push(`x = -b / 2a`);
                steps.push(`x = ${-vb} / ${2 * va}`);
                resString = `x = ${Number.isInteger(x) ? x : x.toFixed(4)}`;
            } else {
                const realPart = (-vb / (2 * va)).toFixed(2);
                const imagPart = (Math.sqrt(-delta) / (2 * va)).toFixed(2);
                steps.push(t('tools.equation-solver.steps.complexRoots'));
                steps.push(`x = (-b ± i√|Δ|) / 2a`);
                steps.push(`x = ${realPart} ± ${imagPart}i`);
                resString = `x = ${realPart} ± ${imagPart}i`;
            }

            setSolution({ steps, result: resString });
        }
    }, [type, a, b, c, t]);

    return (
        <ToolPageLayout>
             <Helmet>
                <title>{t('tools.equation-solver.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.equation-solver.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Divide size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.equation-solver.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.equation-solver.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Controls */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        
                        <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                            <button onClick={() => setType('linear')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${type === 'linear' ? 'bg-white shadow-sm text-rose-600' : 'text-slate-500'}`}>{t('tools.equation-solver.types.linear')}</button>
                            <button onClick={() => setType('quadratic')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${type === 'quadratic' ? 'bg-white shadow-sm text-rose-600' : 'text-slate-500'}`}>{t('tools.equation-solver.types.quadratic')}</button>
                        </div>

                        <div className="space-y-4">
                            {type === 'quadratic' && (
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">{t('tools.equation-solver.inputs.a_squared')}</label>
                                    <input type="number" value={a} onChange={e => setA(e.target.value)} className="w-full px-4 py-2 border-2 border-slate-100 rounded-xl focus:border-rose-500 outline-none font-bold text-slate-800" />
                                </div>
                            )}
                             <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">{type === 'quadratic' ? t('tools.equation-solver.inputs.b_linear') : t('tools.equation-solver.inputs.a_linear')}</label>
                                <input type="number" value={type === 'quadratic' ? b : a} onChange={e => type === 'quadratic' ? setB(e.target.value) : setA(e.target.value)} className="w-full px-4 py-2 border-2 border-slate-100 rounded-xl focus:border-rose-500 outline-none font-bold text-slate-800" />
                            </div>
                             <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">{type === 'quadratic' ? t('tools.equation-solver.inputs.c_const') : t('tools.equation-solver.inputs.b_const')}</label>
                                <input type="number" value={type === 'quadratic' ? c : b} onChange={e => type === 'quadratic' ? setC(e.target.value) : setB(e.target.value)} className="w-full px-4 py-2 border-2 border-slate-100 rounded-xl focus:border-rose-500 outline-none font-bold text-slate-800" />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Results */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Equation Preview */}
                    <div className="bg-slate-900 rounded-3xl p-8 text-center text-white">
                        <div className="text-sm font-mono text-slate-400 mb-2">{t('tools.equation-solver.preview')}</div>
                        <div className="text-3xl md:text-4xl font-serif italic">
                            {type === 'quadratic' 
                                ? `${a}x² + ${b}x + ${c} = 0`
                                : `${a}x + ${b} = 0`
                            }
                        </div>
                    </div>

                    {solution && !solution.error && (
                         <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                            <h3 className="font-bold text-xl text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                                <Sigma className="text-rose-500" />
                                {t('tools.equation-solver.solution.title')}
                            </h3>
                            
                            <div className="mb-8">
                                <div className="text-sm text-slate-500 uppercase font-black tracking-widest mb-2">{t('tools.equation-solver.solution.finalAnswer')}</div>
                                <div className="text-3xl font-black text-rose-600 font-mono">{solution.result}</div>
                            </div>

                            <div className="space-y-4">
                                <div className="text-sm text-slate-500 uppercase font-black tracking-widest">{t('tools.equation-solver.solution.steps')}</div>
                                {solution.steps.map((step, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-6 h-6 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                            {i + 1}
                                        </div>
                                        <div className="font-medium text-slate-700 font-mono">{step}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {solution && solution.error && (
                        <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 text-rose-900 font-medium text-center">
                            {solution.error}
                        </div>
                    )}

                </div>

            </div>

            <RelatedTools currentToolId="equation-solver" categoryId="academic" />
        </ToolPageLayout>
    );
}
