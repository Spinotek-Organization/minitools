import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Shield, RefreshCw, Copy, Check, Info } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

const CHAR_SETS = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]\:;?><,./-=',
    ambiguous: 'Il1O0'
};

export default function PasswordGenerator() {
    const { t } = useTranslation('tools');
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
        avoidAmbiguous: false
    });
    const [history, setHistory] = useState([]);
    const [copied, setCopied] = useState(false);

    const generatePassword = () => {
        let chars = '';
        if (options.uppercase) chars += CHAR_SETS.uppercase;
        if (options.lowercase) chars += CHAR_SETS.lowercase;
        if (options.numbers) chars += CHAR_SETS.numbers;
        if (options.symbols) chars += CHAR_SETS.symbols;

        if (options.avoidAmbiguous) {
            // Remove ambiguous chars from the charset
            chars = chars.split('').filter(c => !CHAR_SETS.ambiguous.includes(c)).join('');
        }

        if (!chars) return; // Prevent infinite loop if no options selected

        let newPassword = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = window.crypto.getRandomValues(new Uint32Array(1))[0] % chars.length;
            newPassword += chars[randomIndex];
        }

        setPassword(newPassword);
        setCopied(false);
        
        // Add to history (limit 5)
        setHistory(prev => {
            const newHistory = [newPassword, ...prev];
            return newHistory.slice(0, 5);
        });
    };

    // Auto-generate on mount and when options change
    useEffect(() => {
        generatePassword();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [length, options]);

    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleOption = (key) => {
        // Prevent unchecking the last remaining option
        const activeCount = Object.keys(options).filter(k => k !== 'avoidAmbiguous' && options[k]).length;
        if (activeCount === 1 && options[key] && key !== 'avoidAmbiguous') return;
        
        setOptions(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('password-gen.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('password-gen.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Shield size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('password-gen.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('password-gen.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Generator Section */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Password Display */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm text-center relative overflow-hidden group">
                        <div className="font-mono text-3xl md:text-5xl font-bold text-slate-800 break-all leading-tight py-4">
                            {password}
                        </div>
                        
                        <div className="mt-6 flex justify-center gap-4">
                            <button
                                onClick={generatePassword}
                                className="p-4 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-colors"
                                title={t('password-gen.actions.regenerate')}
                            >
                                <RefreshCw size={24} />
                            </button>
                            <button
                                onClick={handleCopy}
                                className={`px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg ${
                                    copied
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-slate-900 text-white hover:bg-slate-800'
                                }`}
                            >
                                {copied ? <Check size={24} /> : <Copy size={24} />}
                                {copied ? t('password-gen.actions.copied') : t('password-gen.actions.copy')}
                            </button>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                        
                        {/* Length Slider */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <label className="font-bold text-slate-700">{t('password-gen.length')}</label>
                                <span className="bg-emerald-100 text-emerald-800 font-mono font-bold px-3 py-1 rounded-lg">
                                    {length}
                                </span>
                            </div>
                            <input
                                type="range"
                                min="8"
                                max="64"
                                value={length}
                                onChange={(e) => setLength(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                            />
                            <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono">
                                <span>8</span>
                                <span>64</span>
                            </div>
                        </div>

                        {/* Options Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { id: 'uppercase' },
                                { id: 'lowercase' },
                                { id: 'numbers' },
                                { id: 'symbols' },
                            ].map(opt => (
                                <button
                                    key={opt.id}
                                    onClick={() => toggleOption(opt.id)}
                                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                                        options[opt.id]
                                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                                            : 'border-slate-100 bg-white text-slate-400'
                                    }`}
                                >
                                    <span className="font-bold">{t(`password-gen.options.${opt.id}`)}</span>
                                    {options[opt.id] && <Check size={18} className="text-emerald-600" />}
                                </button>
                            ))}
                            
                            {/* Special Option */}
                            <button
                                onClick={() => toggleOption('avoidAmbiguous')}
                                className={`sm:col-span-2 flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                                    options.avoidAmbiguous
                                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                                        : 'border-slate-100 bg-white text-slate-500'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="font-bold">{t('password-gen.options.ambiguous')}</span>
                                    <span className="text-xs opacity-60">{t('password-gen.options.ambiguousHint')}</span>
                                </div>
                                {options.avoidAmbiguous && <Check size={18} className="text-emerald-600" />}
                            </button>
                        </div>

                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                            <Info size={20} className="text-slate-400" />
                            {t('password-gen.history.title')}
                        </h3>
                        <div className="space-y-2">
                            {history.length > 0 ? (
                                history.map((pass, i) => (
                                    <div 
                                        key={i} 
                                        className="font-mono text-sm p-3 bg-white rounded-xl border border-slate-200 text-slate-600 truncate cursor-pointer hover:border-emerald-500 hover:text-emerald-700 transition-colors"
                                        onClick={() => {
                                            navigator.clipboard.writeText(pass);
                                            // Optional: visual feedback for history copy
                                        }}
                                        title={t('password-gen.history.clickToCopy')}
                                    >
                                        {pass}
                                    </div>
                                ))
                            ) : (
                                <div className="text-sm text-slate-400 italic text-center py-4">
                                    {t('password-gen.history.empty')}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            <RelatedTools currentToolId="password-gen" categoryId="security" />
        </ToolPageLayout>
    );
}
