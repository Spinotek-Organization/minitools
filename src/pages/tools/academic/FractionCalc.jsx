import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Hash, X, ChevronRight, Calculator } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

// --- Fraction Logic ---

const gcd = (a, b) => {
    return b ? gcd(b, a % b) : a;
};

const lcm = (a, b) => {
    return Math.abs(a * b) / gcd(a, b);
};

class Fraction {
    constructor(whole = 0, numerator = 0, denominator = 1) {
        this.whole = parseInt(whole) || 0;
        this.numerator = parseInt(numerator) || 0;
        this.denominator = parseInt(denominator) || 1;

        if (this.denominator === 0) {
            throw new Error("Denominator cannot be zero");
        }

        // Convert to improper fraction for calculations
        this.improperNumerator = this.whole * this.denominator + this.numerator;
        this.improperDenominator = this.denominator;
    }

    simplify() {
        const common = gcd(Math.abs(this.improperNumerator), Math.abs(this.improperDenominator));
        return {
            numerator: this.improperNumerator / common,
            denominator: this.improperDenominator / common
        };
    }

    toMixed() {
        const { numerator, denominator } = this.simplify();
        const whole = Math.floor(numerator / denominator);
        const rem = numerator % denominator;
        return { whole, numerator: rem, denominator };
    }

    toDecimal() {
        return this.improperNumerator / this.improperDenominator;
    }
}

export default function FractionCalc() {
    const { t } = useTranslation();

    // State for Fraction A
    const [f1Whole, setF1Whole] = useState('');
    const [f1Num, setF1Num] = useState('');
    const [f1Denom, setF1Denom] = useState('');

    // State for Fraction B
    const [f2Whole, setF2Whole] = useState('');
    const [f2Num, setF2Num] = useState('');
    const [f2Denom, setF2Denom] = useState('');

    const [operator, setOperator] = useState('+');
    const [result, setResult] = useState(null);
    const [steps, setSteps] = useState([]);
    const [error, setError] = useState('');

    const calculate = () => {
        setError('');
        setResult(null);
        setSteps([]);

        try {
            // Validation
            if ((!f1Num && f1Num !== 0) || (!f1Denom && f1Denom !== 0) || (!f2Num && f2Num !== 0) || (!f2Denom && f2Denom !== 0)) {
                // Allow empty whole, but num/denom are required if entered partial
                // Actually user might just enter whole number.
                // Let's assume standard input: if whole is present, num/denom optional (0/1).
                // If whole is empty, num/denom required.
                // For simplicity, let's defaults:
            }
            
            const v1Whole = f1Whole === '' ? 0 : parseInt(f1Whole);
            const v1Num = f1Num === '' ? 0 : parseInt(f1Num);
            const v1Denom = f1Denom === '' ? 1 : parseInt(f1Denom);

            const v2Whole = f2Whole === '' ? 0 : parseInt(f2Whole);
            const v2Num = f2Num === '' ? 0 : parseInt(f2Num);
            const v2Denom = f2Denom === '' ? 1 : parseInt(f2Denom);

            if (v1Denom === 0 || v2Denom === 0) {
                setError(t('tools.fraction-calc.errors.denomZero'));
                return;
            }

            const frac1 = new Fraction(v1Whole, v1Num, v1Denom);
            const frac2 = new Fraction(v2Whole, v2Num, v2Denom);

            let resNum, resDenom, stepLog = [];

            const n1 = frac1.improperNumerator;
            const d1 = frac1.improperDenominator;
            const n2 = frac2.improperNumerator;
            const d2 = frac2.improperDenominator;

            stepLog.push(t('tools.fraction-calc.steps.convertImproper'));
            stepLog.push(t('tools.fraction-calc.steps.frac1', { val1: `${v1Whole ? `${v1Whole} ` : ''}${v1Num}/${v1Denom}`, val2: `${n1}/${d1}` }));
            stepLog.push(t('tools.fraction-calc.steps.frac2', { val1: `${v2Whole ? `${v2Whole} ` : ''}${v2Num}/${v2Denom}`, val2: `${n2}/${d2}` }));

            if (operator === '+') {
                const commonDenom = lcm(d1, d2);
                const adjN1 = n1 * (commonDenom / d1);
                const adjN2 = n2 * (commonDenom / d2);
                
                stepLog.push(t('tools.fraction-calc.steps.lcm', { d1, d2, lcm: commonDenom }));
                stepLog.push(t('tools.fraction-calc.steps.adjust', { v1: `${n1}/${d1}`, a1: `${adjN1}/${commonDenom}`, v2: `${n2}/${d2}`, a2: `${adjN2}/${commonDenom}` }));
                
                resNum = adjN1 + adjN2;
                resDenom = commonDenom;
                stepLog.push(t('tools.fraction-calc.steps.addNum', { v1: adjN1, v2: adjN2, res: resNum }));
                stepLog.push(t('tools.fraction-calc.steps.res', { res: `${resNum}/${resDenom}` }));

            } else if (operator === '-') {
                const commonDenom = lcm(d1, d2);
                const adjN1 = n1 * (commonDenom / d1);
                const adjN2 = n2 * (commonDenom / d2);

                stepLog.push(t('tools.fraction-calc.steps.lcm', { d1, d2, lcm: commonDenom }));
                stepLog.push(t('tools.fraction-calc.steps.adjust', { v1: `${n1}/${d1}`, a1: `${adjN1}/${commonDenom}`, v2: `${n2}/${d2}`, a2: `${adjN2}/${commonDenom}` }));

                resNum = adjN1 - adjN2;
                resDenom = commonDenom;
                stepLog.push(t('tools.fraction-calc.steps.subNum', { v1: adjN1, v2: adjN2, res: resNum }));
                stepLog.push(t('tools.fraction-calc.steps.res', { res: `${resNum}/${resDenom}` }));

            } else if (operator === '*') {
                resNum = n1 * n2;
                resDenom = d1 * d2;
                stepLog.push(t('tools.fraction-calc.steps.mulNum', { v1: n1, v2: n2, res: resNum }));
                stepLog.push(t('tools.fraction-calc.steps.mulDen', { d1, d2, res: resDenom }));
                stepLog.push(t('tools.fraction-calc.steps.res', { res: `${resNum}/${resDenom}` }));

            } else if (operator === '/') {
                resNum = n1 * d2;
                resDenom = d1 * n2;
                stepLog.push(t('tools.fraction-calc.steps.mulRecip', { v1: `${n1}/${d1}`, v2: `${d2}/${n2}` }));
                stepLog.push(t('tools.fraction-calc.steps.res', { res: `${n1*d2}/${d1*n2} = ${resNum}/${resDenom}` }));
            }

            // Create result result fraction
            const resFrac = new Fraction(0, resNum, resDenom);
            const simplified = resFrac.simplify();
            const mixed = resFrac.toMixed();
            
            if (simplified.denominator !== resDenom) {
                 stepLog.push(t('tools.fraction-calc.steps.simplify', { v1: `${resNum}/${resDenom}`, v2: `${simplified.numerator}/${simplified.denominator}` }));
            }
            if (mixed.whole !== 0 && mixed.numerator !== 0) {
                 stepLog.push(t('tools.fraction-calc.steps.mixed', { mixed: `${mixed.whole} ${Math.abs(mixed.numerator)}/${mixed.denominator}` }));
            }

            setResult({
                fraction: `${simplified.numerator}/${simplified.denominator}`,
                mixed: mixed.numerator === 0 ? mixed.whole : `${mixed.whole !== 0 ? mixed.whole : ''} ${Math.abs(mixed.numerator)}/${mixed.denominator}`.trim(),
                decimal: resFrac.toDecimal(),
                isWhole: mixed.numerator === 0
            });
            setSteps(stepLog);

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.fraction-calc.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.fraction-calc.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Hash size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.fraction-calc.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.fraction-calc.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                
                {/* Calculator Interface */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
                    
                    {/* Fraction 1 */}
                    <div className="flex items-center gap-2">
                        <input 
                            type="number" 
                            placeholder={t('tools.fraction-calc.inputs.whole')} 
                            className="w-16 p-3 text-center bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            value={f1Whole}
                            onChange={(e) => setF1Whole(e.target.value)}
                        />
                        <div className="flex flex-col gap-2">
                             <input 
                                type="number" 
                                placeholder={t('tools.fraction-calc.inputs.num')} 
                                className="w-16 p-2 text-center bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                value={f1Num}
                                onChange={(e) => setF1Num(e.target.value)}
                            />
                            <div className="h-0.5 bg-slate-300 w-full"></div>
                             <input 
                                type="number" 
                                placeholder={t('tools.fraction-calc.inputs.den')} 
                                className="w-16 p-2 text-center bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                value={f1Denom}
                                onChange={(e) => setF1Denom(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Operator */}
                    <div className="flex flex-col gap-2">
                        <select 
                            className="p-3 bg-slate-100 rounded-xl font-bold text-lg cursor-pointer hover:bg-slate-200 transition-colors text-center"
                            value={operator}
                            onChange={(e) => setOperator(e.target.value)}
                        >
                            <option value="+">+</option>
                            <option value="-">-</option>
                            <option value="*">×</option>
                            <option value="/">÷</option>
                        </select>
                    </div>

                    {/* Fraction 2 */}
                    <div className="flex items-center gap-2">
                        <input 
                            type="number" 
                            placeholder={t('tools.fraction-calc.inputs.whole')} 
                            className="w-16 p-3 text-center bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            value={f2Whole}
                            onChange={(e) => setF2Whole(e.target.value)}
                        />
                        <div className="flex flex-col gap-2">
                             <input 
                                type="number" 
                                placeholder={t('tools.fraction-calc.inputs.num')} 
                                className="w-16 p-2 text-center bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                value={f2Num}
                                onChange={(e) => setF2Num(e.target.value)}
                            />
                            <div className="h-0.5 bg-slate-300 w-full"></div>
                             <input 
                                type="number" 
                                placeholder={t('tools.fraction-calc.inputs.den')} 
                                className="w-16 p-2 text-center bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                value={f2Denom}
                                onChange={(e) => setF2Denom(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Calculate Button (Mobile: Full width, Desktop: Auto) */}
                    <button 
                        onClick={calculate}
                        className="w-full md:w-auto p-4 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                    >
                        <Calculator size={20} />
                        {t('tools.fraction-calc.calculate')}
                    </button>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-2">
                        <X size={18} />
                        {error}
                    </div>
                )}

                {/* Results */}
                {result && (
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 animate-fade-in">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                            <ChevronRight className="text-cyan-600" />
                            {t('tools.fraction-calc.result.title')}
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-8 mb-6">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 min-w-[120px] text-center">
                                <span className="text-slate-400 text-xs uppercase font-bold tracking-wider block mb-1">{t('tools.fraction-calc.result.fraction')}</span>
                                <span className="text-2xl font-black text-slate-800">{result.fraction}</span>
                            </div>

                            {!result.isWhole && (
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 min-w-[120px] text-center">
                                    <span className="text-slate-400 text-xs uppercase font-bold tracking-wider block mb-1">{t('tools.fraction-calc.result.mixed')}</span>
                                    <span className="text-2xl font-black text-cyan-600">{result.mixed}</span>
                                </div>
                            )}

                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 min-w-[120px] text-center">
                                <span className="text-slate-400 text-xs uppercase font-bold tracking-wider block mb-1">{t('tools.fraction-calc.result.decimal')}</span>
                                <span className="text-2xl font-black text-violet-600">{parseFloat(result.decimal.toFixed(4))}</span>
                            </div>
                        </div>

                        {/* Steps */}
                        <div className="mt-6">
                            <h4 className="font-bold text-slate-900 mb-3">{t('tools.fraction-calc.result.steps')}</h4>
                            <div className="space-y-2">
                                {steps.map((step, index) => (
                                    <div key={index} className="flex items-start gap-3 text-slate-600">
                                        <div className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                                            {index + 1}
                                        </div>
                                        <p>{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <RelatedTools currentToolId="fraction-calc" categoryId="academic" />
        </ToolPageLayout>
    );
}
