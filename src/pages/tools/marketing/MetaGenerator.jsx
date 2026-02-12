import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Tags, Copy, Check, Code } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

import { useTranslation } from 'react-i18next';

export default function MetaGenerator() {
    const { t } = useTranslation();
    const [data, setData] = useState({
        title: '',
        description: '',
        keywords: '',
        author: '',
        viewport: 'width=device-width, initial-scale=1.0',
        robots: 'index, follow',
        charset: 'UTF-8'
    });

    const [copied, setCopied] = useState(false);

    const generateCode = () => {
        let code = '';
        if (data.charset) code += `<meta charset="${data.charset}">\n`;
        if (data.viewport) code += `<meta name="viewport" content="${data.viewport}">\n`;
        if (data.title) code += `<title>${data.title}</title>\n`;
        if (data.description) code += `<meta name="description" content="${data.description}">\n`;
        if (data.keywords) code += `<meta name="keywords" content="${data.keywords}">\n`;
        if (data.author) code += `<meta name="author" content="${data.author}">\n`;
        if (data.robots) code += `<meta name="robots" content="${data.robots}">\n`;
        return code.trim();
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateCode());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolPageLayout toolId="meta-gen">
            <Helmet>
                <title>{t('tools.meta-gen.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.meta-gen.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Tags size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.meta-gen.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.meta-gen.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Form */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">{t('tools.meta-gen.form.title')}</h2>
                    
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">{t('tools.meta-gen.form.pageTitle')}</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                            placeholder={t('tools.meta-gen.form.pageTitlePlaceholder')}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">{t('tools.meta-gen.form.description')}</label>
                        <textarea
                            rows={3}
                            value={data.description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                            placeholder={t('tools.meta-gen.form.descriptionPlaceholder')}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">{t('tools.meta-gen.form.keywords')}</label>
                        <input
                            type="text"
                            value={data.keywords}
                            onChange={(e) => setData({ ...data, keywords: e.target.value })}
                            placeholder={t('tools.meta-gen.form.keywordsPlaceholder')}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">{t('tools.meta-gen.form.author')}</label>
                        <input
                            type="text"
                            value={data.author}
                            onChange={(e) => setData({ ...data, author: e.target.value })}
                            placeholder={t('tools.meta-gen.form.authorPlaceholder')}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">{t('tools.meta-gen.form.robots')}</label>
                            <select
                                value={data.robots}
                                onChange={(e) => setData({ ...data, robots: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-amber-500"
                            >
                                <option value="index, follow">Index, Follow</option>
                                <option value="index, nofollow">Index, No Follow</option>
                                <option value="noindex, follow">No Index, Follow</option>
                                <option value="noindex, nofollow">No Index, No Follow</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">{t('tools.meta-gen.form.charset')}</label>
                            <select
                                value={data.charset}
                                onChange={(e) => setData({ ...data, charset: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-amber-500"
                            >
                                <option value="UTF-8">UTF-8</option>
                                <option value="ISO-8859-1">ISO-8859-1</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Output */}
                <div className="bg-amber-50 border border-amber-100 p-8 rounded-3xl flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <Code size={20} className="text-amber-600" />
                            {t('tools.meta-gen.output.title')}
                        </h2>
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors"
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            {copied ? t('tools.meta-gen.output.copied') : t('tools.meta-gen.output.copy')}
                        </button>
                    </div>

                    <div className="flex-1 bg-slate-900 rounded-2xl p-6 overflow-x-auto shadow-inner">
                        <pre className="font-mono text-sm text-amber-300 whitespace-pre-wrap">
                            {generateCode()}
                        </pre>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="meta-gen" categoryId="marketing" />
        </ToolPageLayout>
    );
}
