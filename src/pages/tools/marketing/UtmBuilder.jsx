import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as LinkIcon, Copy, Check, ExternalLink } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

import { useTranslation } from 'react-i18next';

// ...

export default function UtmBuilder() {
    const { t } = useTranslation();
    const [form, setForm] = useState({
        url: '',
        source: '',
        medium: '',
        campaign: '',
        term: '',
        content: ''
    });

    const [generatedUrl, setGeneratedUrl] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!form.url) {
            setGeneratedUrl('');
            return;
        }

        try {
            const url = new URL(form.url.startsWith('http') ? form.url : `https://${form.url}`);
            const params = new URLSearchParams(url.search);

            if (form.source) params.set('utm_source', form.source);
            if (form.medium) params.set('utm_medium', form.medium);
            if (form.campaign) params.set('utm_campaign', form.campaign);
            if (form.term) params.set('utm_term', form.term);
            if (form.content) params.set('utm_content', form.content);

            setGeneratedUrl(url.origin + url.pathname + '?' + params.toString());
        } catch (e) {
            setGeneratedUrl('');
        }
    }, [form]);

    const handleCopy = () => {
        if (!generatedUrl) return;
        navigator.clipboard.writeText(generatedUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolPageLayout toolId="utm-builder">
            <Helmet>
                <title>{t('tools.utm-builder.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.utm-builder.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <LinkIcon size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.utm-builder.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.utm-builder.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Form */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <LinkIcon size={20} className="text-orange-500" /> {t('tools.utm-builder.form.title')}
                    </h2>
                    
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">
                            {t('tools.utm-builder.form.url')} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="https://example.com"
                            value={form.url}
                            onChange={(e) => setForm({ ...form, url: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">
                                {t('tools.utm-builder.form.source')} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="google, newsletter, facebook"
                                value={form.source}
                                onChange={(e) => setForm({ ...form, source: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">
                                {t('tools.utm-builder.form.medium')} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="cpc, banner, email"
                                value={form.medium}
                                onChange={(e) => setForm({ ...form, medium: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">
                                {t('tools.utm-builder.form.name')} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="summer_sale, promo_code"
                                value={form.campaign}
                                onChange={(e) => setForm({ ...form, campaign: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">
                                {t('tools.utm-builder.form.term')}
                            </label>
                            <input
                                type="text"
                                placeholder="running+shoes"
                                value={form.term}
                                onChange={(e) => setForm({ ...form, term: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">
                            {t('tools.utm-builder.form.content')}
                        </label>
                        <input
                            type="text"
                            placeholder="logolink, textlink"
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                </div>

                {/* Result */}
                <div className="space-y-6">
                    <div className="bg-orange-50 border border-orange-100 p-8 rounded-3xl flex flex-col h-full relative">
                        <h3 className="text-md  font-bold text-slate-900 mb-6">{t('tools.utm-builder.output.title')}</h3>
                        
                        <div className="bg-white border border-orange-200 rounded-2xl p-6 break-all min-h-[100px] text-slate-800 font-medium text-lg mb-6 flex items-center shadow-inner">
                            {generatedUrl || <span className="text-slate-300 text-sm">{t('tools.utm-builder.output.placeholder')}</span>}
                        </div>

                        <div className="flex gap-4 mt-auto">
                            <button
                                disabled={!generatedUrl}
                                onClick={() => window.open(generatedUrl, '_blank')}
                                className="flex-1 bg-white hover:bg-orange-50 border border-orange-200 text-orange-700 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ExternalLink size={20} /> {t('tools.utm-builder.output.test')}
                            </button>
                            <button
                                disabled={!generatedUrl}
                                onClick={handleCopy}
                                className={`flex-[2] py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                                    generatedUrl 
                                        ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-200' 
                                        : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                                }`}
                            >
                                {copied ? <Check size={20} /> : <Copy size={20} />}
                                {copied ? t('tools.utm-builder.output.copied') : t('tools.utm-builder.output.copy')}
                            </button>
                        </div>

                        <div className="mt-8 pt-8 border-t border-orange-200/50">
                            <h4 className="text-sm font-bold text-orange-800 mb-4">{t('tools.utm-builder.guide.title')}</h4>
                            <ul className="space-y-3 text-sm text-orange-700/80">
                                <li className="flex gap-2">
                                    <span className="font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs h-fit font-mono">utm_source</span>
                                    <span>{t('tools.utm-builder.guide.source')}</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs h-fit font-mono">utm_medium</span>
                                    <span>{t('tools.utm-builder.guide.medium')}</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs h-fit font-mono">utm_campaign</span>
                                    <span>{t('tools.utm-builder.guide.campaign')}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="utm-builder" categoryId="marketing" />
        </ToolPageLayout>
    );
}
