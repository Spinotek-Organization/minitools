import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeftRight, Ruler, Scale, Beaker, Thermometer, Database, Variable } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

// Conversion Definitions
const UNITS = {
    length: {
        m: 1,
        cm: 0.01,
        mm: 0.001,
        km: 1000,
        inch: 0.0254,
        ft: 0.3048,
        yd: 0.9144,
        mile: 1609.344
    },
    mass: {
        kg: 1,
        g: 0.001,
        mg: 0.000001,
        lb: 0.453592,
        oz: 0.0283495,
        ton: 1000
    },
    volume: {
        l: 1,
        ml: 0.001,
        gal: 3.78541, // US Liquid Gallon
        qt: 0.946353,
        pt: 0.473176,
        cup: 0.236588,
        oz: 0.0295735
    },
    data: { // Base is Byte
        B: 1,
        KB: 1024,
        MB: 1024 * 1024,
        GB: 1024 * 1024 * 1024,
        TB: 1024 * 1024 * 1024 * 1024
    }
    // Temp is special handled
};

export default function UnitConverter() {
    const { t } = useTranslation();
    const [category, setCategory] = useState('length');
    const [val1, setVal1] = useState('1');
    const [unit1, setUnit1] = useState('m');
    const [val2, setVal2] = useState('');
    const [unit2, setUnit2] = useState('ft');
    
    // Define Categories inside or translate on fly
    const CATEGORIES = [
        { id: 'length', label: t('tools.unit-converter.categories.length'), icon: Ruler },
        { id: 'mass', label: t('tools.unit-converter.categories.mass'), icon: Scale },
        { id: 'volume', label: t('tools.unit-converter.categories.volume'), icon: Beaker },
        { id: 'temp', label: t('tools.unit-converter.categories.temp'), icon: Thermometer },
        { id: 'data', label: t('tools.unit-converter.categories.data'), icon: Database },
    ];

    // Reset units when category changes
    useEffect(() => {
        if (category === 'length') { setUnit1('m'); setUnit2('ft'); }
        else if (category === 'mass') { setUnit1('kg'); setUnit2('lb'); }
        else if (category === 'volume') { setUnit1('l'); setUnit2('gal'); }
        else if (category === 'temp') { setUnit1('C'); setUnit2('F'); }
        else if (category === 'data') { setUnit1('MB'); setUnit2('GB'); }
        setVal1('1');
    }, [category]);

    // Conversion Logic
    useEffect(() => {
        const v1 = parseFloat(val1);
        if (isNaN(v1)) {
            setVal2('');
            return;
        }

        let res = 0;

        if (category === 'temp') {
            // Temperature special cases
             if (unit1 === 'C' && unit2 === 'F') res = (v1 * 9/5) + 32;
            else if (unit1 === 'F' && unit2 === 'C') res = (v1 - 32) * 5/9;
            else if (unit1 === 'C' && unit2 === 'K') res = v1 + 273.15;
            else if (unit1 === 'K' && unit2 === 'C') res = v1 - 273.15;
            else if (unit1 === 'F' && unit2 === 'K') res = (v1 - 32) * 5/9 + 273.15;
            else if (unit1 === 'K' && unit2 === 'F') res = (v1 - 273.15) * 9/5 + 32;
            else res = v1; // Same unit
        } else {
            // Standard ratio conversion: (Value * FromFactor) / ToFactor
            const factor1 = UNITS[category][unit1];
            const factor2 = UNITS[category][unit2];
            res = (v1 * factor1) / factor2;
        }

        // Auto formatting
        // If result is huge or tiny, use scientific, else standard
        // Also remove trailing zeros
        setVal2(Number.isInteger(res) ? res.toString() : parseFloat(res.toFixed(6)).toString());
        
    }, [val1, unit1, unit2, category]);

    const handleSwap = () => {
        setUnit1(unit2);
        setUnit2(unit1);
        setVal1(val2);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.unit-converter.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.unit-converter.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <ArrowLeftRight size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.unit-converter.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.unit-converter.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Main Converter */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Category Tabs */}
                    <div className="bg-slate-100 p-1 rounded-2xl flex flex-wrap">
                        {CATEGORIES.map(c => {
                             const Icon = c.icon;
                             return (
                                <button
                                    key={c.id}
                                    onClick={() => setCategory(c.id)}
                                    className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${category === c.id ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    <Icon size={16} />
                                    <span className="hidden sm:inline">{c.label}</span>
                                </button>
                             );
                        })}
                    </div>

                    {/* Inputs */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm flex flex-col md:flex-row items-center gap-4">
                        
                        {/* Input 1 */}
                        <div className="flex-1 w-full">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t('tools.unit-converter.from')}</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={val1}
                                    onChange={(e) => setVal1(e.target.value)}
                                    className="w-full text-3xl font-black text-slate-800 bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-4 focus:border-orange-500 outline-none transition-colors"
                                />
                                <div className="absolute right-2 top-2 bottom-2">
                                     <select
                                        value={unit1}
                                        onChange={(e) => setUnit1(e.target.value)}
                                        className="h-full bg-white border border-slate-200 rounded-xl px-2 text-sm font-bold text-slate-600 focus:border-orange-500 outline-none cursor-pointer"
                                     >
                                        {category === 'temp' 
                                            ? ['C', 'F', 'K'].map(u => <option key={u} value={u}>{u}</option>)
                                            : Object.keys(UNITS[category]).map(u => <option key={u} value={u}>{u}</option>)
                                        }
                                     </select>
                                </div>
                            </div>
                        </div>

                        {/* Swap Button */}
                        <button
                             onClick={handleSwap}
                             className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-orange-100 hover:text-orange-600 transition-colors flex-shrink-0"
                        >
                            <ArrowLeftRight size={20} />
                        </button>

                         {/* Input 2 (Read Only / Output) */}
                         <div className="flex-1 w-full">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t('tools.unit-converter.to')}</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={val2}
                                    readOnly
                                    className="w-full text-3xl font-black text-orange-600 bg-orange-50/50 border-2 border-orange-100 rounded-2xl px-4 py-4 outline-none"
                                />
                                <div className="absolute right-2 top-2 bottom-2">
                                     <select
                                        value={unit2}
                                        onChange={(e) => setUnit2(e.target.value)}
                                        className="h-full bg-white border border-slate-200 rounded-xl px-2 text-sm font-bold text-slate-600 focus:border-orange-500 outline-none cursor-pointer"
                                     >
                                         {category === 'temp' 
                                            ? ['C', 'F', 'K'].map(u => <option key={u} value={u}>{u}</option>)
                                            : Object.keys(UNITS[category]).map(u => <option key={u} value={u}>{u}</option>)
                                        }
                                     </select>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="unit-conv" categoryId="academic" />
        </ToolPageLayout>
    );
}
