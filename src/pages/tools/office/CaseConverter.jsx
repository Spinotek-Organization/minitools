import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Type, Copy, RotateCcw, Check } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function CaseConverter() {
    const { t } = useTranslation('tools');
    const [text, setText] = useState('');
    const [stats, setStats] = useState({ words: 0, chars: 0 });
    const [copied, setCopied] = useState(false);

    const handleTextChange = (e) => {
        const val = e.target.value;
        setText(val);
        setStats({
            words: val.trim().split(/\s+/).filter(w => w).length,
            chars: val.length
        });
    };

    const convertCase = (type) => {
        let result = '';
        switch (type) {
            case 'upper':
                result = text.toUpperCase();
                break;
            case 'lower':
                result = text.toLowerCase();
                break;
            case 'title':
                result = text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
                break;
            case 'sentence':
                result = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
                break;
            case 'alternating':
                result = text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
                break;
            case 'inverse':
                result = text.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
                break;
            default:
                result = text;
        }
        setText(result);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolPageLayout toolId="case-converter">
            <Helmet>
                <title>{t('case-converter.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('case-converter.desc')} />
            </Helmet>

            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-200">
                        <Type size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('case-converter.title')}</h1>
                        <p className="text-slate-500">{t('case-converter.desc')}</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">

                    {/* Main Editor */}
                    <div className="flex-1 flex flex-col border-r border-slate-100">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                {t('case-converter.stats.summary', { words: stats.words, chars: stats.chars })}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setText('')}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    title={t('case-converter.btns.clear')}
                                >
                                    <RotateCcw size={16} />
                                </button>
                                <button
                                    onClick={handleCopy}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${copied
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm'
                                        }`}
                                >
                                    {copied ? <Check size={14} /> : <Copy size={14} />}
                                    {copied ? t('case-converter.btns.copied') : t('case-converter.btns.copy')}
                                </button>
                            </div>
                        </div>
                        <textarea
                            value={text}
                            onChange={handleTextChange}
                            placeholder={t('case-converter.labels.placeholder')}
                            className="flex-1 w-full p-8 resize-none outline-none text-slate-700 text-lg leading-relaxed font-normal bg-transparent focus:bg-slate-50/30 transition-colors"
                            spellCheck="false"
                        />
                    </div>

                    {/* Sidebar Controls */}
                    <div className="w-full md:w-80 bg-slate-50 p-6 border-l border-slate-100 flex flex-col gap-3 shrink-0">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                            Convert To
                        </label>

                        <button onClick={() => convertCase('sentence')} className="case-btn">
                            Sentence case
                            <span className="sample">Hello world</span>
                        </button>
                        <button onClick={() => convertCase('lower')} className="case-btn">
                            lower case
                            <span className="sample">hello world</span>
                        </button>
                        <button onClick={() => convertCase('upper')} className="case-btn">
                            UPPER CASE
                            <span className="sample">HELLO WORLD</span>
                        </button>
                        <button onClick={() => convertCase('title')} className="case-btn">
                            Capitalized Case
                            <span className="sample">Hello World</span>
                        </button>
                        <div className="h-px bg-slate-200 my-2"></div>
                        <button onClick={() => convertCase('alternating')} className="case-btn">
                            aLtErNaTiNg cAsE
                            <span className="sample">hElLo wOrLd</span>
                        </button>
                        <button onClick={() => convertCase('inverse')} className="case-btn">
                            InVeRsE CaSe
                            <span className="sample">HeLlO WoRlD</span>
                        </button>

                        <div className="mt-auto pt-6 text-center">
                            <button
                                onClick={() => {
                                    const blob = new Blob([text], { type: 'text/plain' });
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = 'converted-text.txt';
                                    a.click();
                                }}
                                className="text-xs text-slate-400 hover:text-purple-600 font-medium underline decoration-slate-300 hover:decoration-purple-300 underline-offset-4 transition-colors"
                            >
                                {t('case-converter.btns.download')}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-slate-200 py-8">
                    <RelatedTools currentToolId="case-converter" categoryId="office" />
                </div>

                <style>{`
                    .case-btn {
                        @apply w-full text-left px-4 py-3 bg-white border border-slate-200 rounded-xl hover:border-purple-300 hover:text-purple-700 hover:shadow-sm transition-all text-sm font-medium text-slate-600 flex justify-between items-center;
                    }
                    .case-btn .sample {
                        @apply text-xs text-slate-300 font-normal opacity-0 transition-opacity;
                    }
                    .case-btn:hover .sample {
                        @apply opacity-100;
                    }
                `}</style>
            </div>
        </ToolPageLayout>
    );
}
