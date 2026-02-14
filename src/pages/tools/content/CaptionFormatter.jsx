import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Type, Copy, Check, Hash } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function CaptionFormatter() {
    const { t } = useTranslation('tools');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    const formatCaption = () => {
        // Replace empty lines (double newline) with newline + zero-width space + newline
        // This prevents Instagram from collapsing the empty line.
        // Also trim whitespace.
        
        let formatted = input;
        
        // 1. Trim trailing spaces on each line
        formatted = formatted.split('\n').map(line => line.trimEnd()).join('\n');
        
        // 2. Replace multiple newlines with \n + \u200B + \n
        // We look for 2 or more newlines, and replace with \n\u200B\n
        // Logic: if there is an empty line, put an invisible char effectively.
        
        formatted = formatted.replace(/\n\n+/g, '\n\u200B\n');
        
        setOutput(formatted);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('caption-fmt.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('caption-fmt.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <Type size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('caption-fmt.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('caption-fmt.subtitle')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input */}
                <div className="space-y-4">
                    <label className="block text-sm font-bold text-slate-700">{t('caption-fmt.labels.input')}</label>
                    <textarea 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={t('caption-fmt.placeholders.input')}
                        className="w-full h-96 p-4 rounded-3xl border-slate-200 bg-white focus:border-indigo-500 focus:ring-indigo-500 resize-none shadow-sm"
                    />
                    <button 
                        onClick={formatCaption}
                        className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                    >
                        {t('caption-fmt.buttons.convert')}
                    </button>
                </div>

                {/* Output */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-bold text-slate-700">{t('caption-fmt.labels.output')}</label>
                        {output && (
                            <button 
                                onClick={copyToClipboard}
                                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 px-3 py-1 rounded-lg transition-colors"
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                {copied ? t('caption-fmt.buttons.copied') : t('caption-fmt.buttons.copy')}
                            </button>
                        )}
                    </div>
                    <textarea 
                        readOnly
                        value={output}
                        placeholder={t('caption-fmt.placeholders.output')}
                        className="w-full h-96 p-4 rounded-3xl border-slate-200 bg-slate-50 text-slate-600 resize-none font-sans"
                    />
                    <div className="p-4 bg-indigo-50 rounded-xl text-xs text-indigo-800 border border-indigo-100 flex items-start gap-2">
                         <div className="pt-0.5"><Hash size={14} /></div>
                         <p>
                             <strong>{t('caption-fmt.tip.title')}</strong> {t('caption-fmt.tip.text')}
                         </p>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="caption-fmt" categoryId="content" />
        </ToolPageLayout>
    );
}
