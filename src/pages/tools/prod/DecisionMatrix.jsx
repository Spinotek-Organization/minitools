import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Shuffle, Plus, ArrowRight, Trash2, Check, RotateCcw } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function DecisionMatrix() {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const [options, setOptions] = useState([{ id: 1, name: '' }, { id: 2, name: '' }]);
    const [criteria, setCriteria] = useState([{ id: 1, name: 'Cost', weight: 5 }, { id: 2, name: 'Impact', weight: 3 }]);
    const [ratings, setRatings] = useState({}); // { optionId-criteriaId: score }

    const updateOption = (id, name) => {
        setOptions(options.map(o => o.id === id ? { ...o, name } : o));
    };

    const addOption = () => {
        setOptions([...options, { id: Date.now(), name: '' }]);
    };

    const removeOption = (id) => {
        setOptions(options.filter(o => o.id !== id));
    };

    const updateCriteria = (id, field, value) => {
        setCriteria(criteria.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    const addCriteria = () => {
        setCriteria([...criteria, { id: Date.now(), name: '', weight: 3 }]);
    };

    const removeCriteria = (id) => {
        setCriteria(criteria.filter(c => c.id !== id));
    };

    const updateRating = (optionId, criteriaId, value) => {
        setRatings({ ...ratings, [`${optionId}-${criteriaId}`]: parseInt(value) || 0 });
    };

    const calculateScore = (optionId) => {
        return criteria.reduce((total, crit) => {
            const score = ratings[`${optionId}-${crit.id}`] || 0;
            return total + (score * crit.weight);
        }, 0);
    };

    const reset = () => {
        setStep(1);
        setOptions([{ id: 1, name: '' }, { id: 2, name: '' }]);
        setCriteria([{ id: 1, name: 'Cost', weight: 5 }, { id: 2, name: 'Impact', weight: 3 }]);
        setRatings({});
    };

    // Filter out empty entries before progressing
    const nextStep = () => {
        if (step === 1) {
            setOptions(options.filter(o => o.name.trim() !== ''));
            if (options.filter(o => o.name.trim() !== '').length < 2) {
                alert(t('tools.decision-matrix.step1.alert'));
                return;
            }
        }
        if (step === 2) {
             setCriteria(criteria.filter(c => c.name.trim() !== ''));
             if (criteria.filter(c => c.name.trim() !== '').length < 1) {
                 alert(t('tools.decision-matrix.step2.alert'));
                 return;
             }
        }
        setStep(step + 1);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.decision-matrix.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.decision-matrix.metaDesc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Shuffle size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.decision-matrix.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.decision-matrix.desc')}</p>
                    </div>
                </div>
                {step === 4 && (
                     <button onClick={reset} className="flex items-center gap-2 text-slate-500 hover:text-orange-600 transition-colors">
                        <RotateCcw size={18} />
                        {t('tools.decision-matrix.controls.startOver')}
                     </button>
                )}
            </div>

            {/* Steps Progress */}
            <div className="flex items-center justify-center mb-12 gap-4 text-sm font-bold text-slate-400">
                <div className={`flex items-center gap-2 ${step >= 1 ? 'text-orange-600' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-orange-100' : 'bg-slate-100'}`}>1</div>
                    {t('tools.decision-matrix.steps.options')}
                </div>
                <div className="w-8 h-1 bg-slate-100 rounded-full">
                    <div className={`h-full bg-orange-500 rounded-full transition-all ${step > 1 ? 'w-full' : 'w-0'}`}></div>
                </div>
                <div className={`flex items-center gap-2 ${step >= 2 ? 'text-orange-600' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-orange-100' : 'bg-slate-100'}`}>2</div>
                    {t('tools.decision-matrix.steps.criteria')}
                </div>
                <div className="w-8 h-1 bg-slate-100 rounded-full">
                    <div className={`h-full bg-orange-500 rounded-full transition-all ${step > 2 ? 'w-full' : 'w-0'}`}></div>
                </div>
                 <div className={`flex items-center gap-2 ${step >= 3 ? 'text-orange-600' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-orange-100' : 'bg-slate-100'}`}>3</div>
                    {t('tools.decision-matrix.steps.rate')}
                </div>
                 <div className="w-8 h-1 bg-slate-100 rounded-full">
                    <div className={`h-full bg-orange-500 rounded-full transition-all ${step > 3 ? 'w-full' : 'w-0'}`}></div>
                </div>
                 <div className={`flex items-center gap-2 ${step >= 4 ? 'text-orange-600' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 4 ? 'bg-orange-100' : 'bg-slate-100'}`}>4</div>
                    {t('tools.decision-matrix.steps.result')}
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                
                {/* Step 1: Options */}
                {step === 1 && (
                    <div className="max-w-xl mx-auto">
                        <h2 className="text-xl font-bold mb-6 text-center">{t('tools.decision-matrix.step1.title')}</h2>
                        <div className="space-y-4 mb-8">
                            {options.map((opt, idx) => (
                                <div key={opt.id} className="flex gap-2">
                                    <input 
                                        type="text" 
                                        value={opt.name}
                                        onChange={(e) => updateOption(opt.id, e.target.value)}
                                        placeholder={t('tools.decision-matrix.step1.placeholder', { count: idx + 1 })}
                                        className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        autoFocus={idx === 0}
                                    />
                                    {options.length > 2 && (
                                        <button onClick={() => removeOption(opt.id)} className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl">
                                            <Trash2 size={20} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button onClick={addOption} className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:border-orange-500 hover:text-orange-500 font-medium flex items-center justify-center gap-2 transition-all">
                                <Plus size={20} /> {t('tools.decision-matrix.controls.addOption')}
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={nextStep} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors">
                                {t('tools.decision-matrix.controls.nextStep')} <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Criteria */}
                {step === 2 && (
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-xl font-bold mb-2 text-center">{t('tools.decision-matrix.step2.title')}</h2>
                        <p className="text-center text-slate-500 mb-8">{t('tools.decision-matrix.step2.desc')}</p>
                        
                        <div className="space-y-4 mb-8">
                            {criteria.map((crit, idx) => (
                                <div key={crit.id} className="flex gap-2 items-center">
                                    <input 
                                        type="text" 
                                        value={crit.name}
                                        onChange={(e) => updateCriteria(crit.id, 'name', e.target.value)}
                                        placeholder={t('tools.decision-matrix.step2.placeholder', { count: idx + 1 })}
                                        className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                    <select 
                                        value={crit.weight}
                                        onChange={(e) => updateCriteria(crit.id, 'weight', parseInt(e.target.value))}
                                        className="w-24 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    >
                                        {[1,2,3,4,5].map(w => <option key={w} value={w}>{w}</option>)}
                                    </select>
                                    {criteria.length > 1 && (
                                        <button onClick={() => removeCriteria(crit.id)} className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl">
                                            <Trash2 size={20} />
                                        </button>
                                    )}
                                </div>
                            ))}
                             <button onClick={addCriteria} className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:border-orange-500 hover:text-orange-500 font-medium flex items-center justify-center gap-2 transition-all">
                                <Plus size={20} /> {t('tools.decision-matrix.controls.addCriteria')}
                            </button>
                        </div>
                        <div className="flex justify-between">
                            <button onClick={() => setStep(1)} className="text-slate-500 font-medium hover:underline">{t('tools.decision-matrix.controls.back')}</button>
                            <button onClick={nextStep} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors">
                                {t('tools.decision-matrix.controls.startRating')} <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Rating */}
                {step === 3 && (
                    <div className="overflow-x-auto">
                        <h2 className="text-xl font-bold mb-2 text-center">{t('tools.decision-matrix.step3.title')}</h2>
                        <p className="text-center text-slate-500 mb-8">{t('tools.decision-matrix.step3.desc')}</p>

                        <table className="w-full min-w-[600px] border-collapse mb-8">
                            <thead>
                                <tr>
                                    <th className="text-left p-4 text-slate-400 font-medium">{t('tools.decision-matrix.steps.criteria')}</th>
                                    {options.map(opt => (
                                        <th key={opt.id} className="p-4 text-center text-slate-900 font-bold bg-slate-50 rounded-t-xl border-x-4 border-white">{opt.name}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {criteria.map(crit => (
                                    <tr key={crit.id} className="border-b border-slate-50">
                                        <td className="p-4 font-medium text-slate-700">
                                            {crit.name} <span className="text-xs text-slate-400 block font-normal">{t('tools.decision-matrix.step3.weight')}: {crit.weight}</span>
                                        </td>
                                        {options.map(opt => (
                                            <td key={opt.id} className="p-4 text-center border-x border-slate-50">
                                                <input 
                                                    type="number" 
                                                    min="1" 
                                                    max="10" 
                                                    value={ratings[`${opt.id}-${crit.id}`] || ''}
                                                    onChange={(e) => updateRating(opt.id, crit.id, e.target.value)}
                                                    placeholder="1-10"
                                                    className="w-20 p-2 text-center border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mx-auto"
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex justify-between">
                            <button onClick={() => setStep(2)} className="text-slate-500 font-medium hover:underline">{t('tools.decision-matrix.controls.back')}</button>
                            <button onClick={nextStep} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors">
                                {t('tools.decision-matrix.controls.calcResults')} <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 4: Results */}
                {step === 4 && (
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-2xl font-black mb-8 text-center">{t('tools.decision-matrix.result.title')}</h2>
                        
                        <div className="grid gap-6 mb-12">
                            {options.map(opt => ({...opt, score: calculateScore(opt.id)})).sort((a,b) => b.score - a.score).map((opt, idx) => {
                                const isWinner = idx === 0;
                                return (
                                    <div key={opt.id} className={`flex items-center justify-between p-6 rounded-3xl border-2 ${isWinner ? 'border-orange-500 bg-orange-50 shadow-lg shadow-orange-100' : 'border-slate-100 bg-white'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${isWinner ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <h3 className={`font-bold text-lg ${isWinner ? 'text-slate-900' : 'text-slate-700'}`}>{opt.name}</h3>
                                                {isWinner && <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">{t('tools.decision-matrix.result.bestChoice')}</span>}
                                            </div>
                                        </div>
                                        <div className={`text-4xl font-black ${isWinner ? 'text-orange-500' : 'text-slate-300'}`}>
                                            {opt.score}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

            </div>

            <RelatedTools currentToolId="decision-matrix" categoryId="productivity" />
        </ToolPageLayout>
    );
}
