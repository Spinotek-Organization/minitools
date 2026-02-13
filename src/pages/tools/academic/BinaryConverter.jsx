import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Binary, ArrowRightLeft, Copy, Check } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function BinaryConverter() {
    const { t } = useTranslation();
    const [values, setValues] = useState({
        bin: '',
        oct: '',
        dec: '',
        hex: ''
    });
    const [copied, setCopied] = useState(null);

    const updateValues = (type, val) => {
        // ... (logic remains same)
        let dec = NaN;
        const v = val.trim();

        if (v === '') {
            setValues({ bin: '', oct: '', dec: '', hex: '' });
            return;
        }

        try {
            if (type === 'bin') dec = parseInt(v, 2);
            else if (type === 'oct') dec = parseInt(v, 8);
            else if (type === 'dec') dec = parseInt(v, 10);
            else if (type === 'hex') dec = parseInt(v, 16);
            
            if (isNaN(dec)) {
                 // Invalid input for that base
                 // For now, just let input be what it is, other fields blank or error
                 // Simple approach: Update source, clear others
                 setValues(prev => ({...prev, [type]: v})); 
                 return;
            }

            setValues({
                bin: dec.toString(2),
                oct: dec.toString(8),
                dec: dec.toString(10),
                hex: dec.toString(16).toUpperCase()
            });

        } catch (e) {
            console.error(e);
        }
    };

    const handleCopy = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.binary-converter.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.binary-converter.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Binary size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.binary-converter.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.binary-converter.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Main Converter Inputs */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-6">
                        
                        {/* Binary */}
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t('tools.binary-converter.bases.bin')}</label>
                            <div className="relative group">
                                <input 
                                    type="text" 
                                    value={values.bin}
                                    onChange={(e) => updateValues('bin', e.target.value)}
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-mono text-slate-700 outline-none focus:border-blue-500 transition-colors"
                                    placeholder="101010"
                                />
                                <button 
                                    onClick={() => handleCopy(values.bin, 'bin')}
                                    className="absolute right-3 top-3 text-slate-400 hover:text-blue-500 transition-colors"
                                >
                                    {copied === 'bin' ? <Check size={20} className="text-emerald-500"/> : <Copy size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Decimal */}
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t('tools.binary-converter.bases.dec')}</label>
                            <div className="relative group">
                                <input 
                                    type="text" 
                                    value={values.dec}
                                    onChange={(e) => updateValues('dec', e.target.value)}
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-mono text-slate-700 outline-none focus:border-blue-500 transition-colors"
                                    placeholder="42"
                                />
                                <button 
                                    onClick={() => handleCopy(values.dec, 'dec')}
                                    className="absolute right-3 top-3 text-slate-400 hover:text-blue-500 transition-colors"
                                >
                                    {copied === 'dec' ? <Check size={20} className="text-emerald-500"/> : <Copy size={20} />}
                                </button>
                            </div>
                        </div>

                         {/* Hex */}
                         <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t('tools.binary-converter.bases.hex')}</label>
                            <div className="relative group">
                                <input 
                                    type="text" 
                                    value={values.hex}
                                    onChange={(e) => updateValues('hex', e.target.value)}
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-mono text-slate-700 outline-none focus:border-blue-500 transition-colors"
                                    placeholder="2A"
                                />
                                <button 
                                    onClick={() => handleCopy(values.hex, 'hex')}
                                    className="absolute right-3 top-3 text-slate-400 hover:text-blue-500 transition-colors"
                                >
                                    {copied === 'hex' ? <Check size={20} className="text-emerald-500"/> : <Copy size={20} />}
                                </button>
                            </div>
                        </div>

                         {/* Octal */}
                         <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t('tools.binary-converter.bases.oct')}</label>
                            <div className="relative group">
                                <input 
                                    type="text" 
                                    value={values.oct}
                                    onChange={(e) => updateValues('oct', e.target.value)}
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-mono text-slate-700 outline-none focus:border-blue-500 transition-colors"
                                    placeholder="52"
                                />
                                <button 
                                    onClick={() => handleCopy(values.oct, 'oct')}
                                    className="absolute right-3 top-3 text-slate-400 hover:text-blue-500 transition-colors"
                                >
                                    {copied === 'oct' ? <Check size={20} className="text-emerald-500"/> : <Copy size={20} />}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Info Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100 text-sm text-blue-900 leading-relaxed">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                             <ArrowRightLeft size={20} />
                             {t('tools.binary-converter.sidebar.title')}
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <div className="font-bold mb-1">{t('tools.binary-converter.sidebar.decimal')}</div>
                                <span dangerouslySetInnerHTML={{ __html: t('tools.binary-converter.sidebar.info.decimal') }}></span>
                            </li>
                            <li>
                                <div className="font-bold mb-1">{t('tools.binary-converter.sidebar.binary')}</div>
                                <span dangerouslySetInnerHTML={{ __html: t('tools.binary-converter.sidebar.info.binary') }}></span>
                            </li>
                            <li>
                                <div className="font-bold mb-1">{t('tools.binary-converter.sidebar.hex')}</div>
                                <span dangerouslySetInnerHTML={{ __html: t('tools.binary-converter.sidebar.info.hex') }}></span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

            <RelatedTools currentToolId="binary-converter" categoryId="academic" />
        </ToolPageLayout>
    );
}
