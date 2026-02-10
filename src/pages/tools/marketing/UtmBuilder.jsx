import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as LinkIcon, Copy, Check, ExternalLink } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function UtmBuilder() {
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
        <ToolPageLayout>
            <Helmet>
                <title>UTM Link Builder | MiniTools by Spinotek</title>
                <meta name="description" content="Easily generate UTM tracking links for your marketing campaigns." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <LinkIcon size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">UTM Link Builder</h1>
                        <p className="text-slate-500 text-sm">Easily generate UTM tracking links for your campaigns.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Form */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-6">Campaign Details</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">
                                Website URL <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="https://example.com"
                                value={form.url}
                                onChange={(e) => setForm({ ...form, url: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">
                                    Campaign Source <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="google, newsletter"
                                    value={form.source}
                                    onChange={(e) => setForm({ ...form, source: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">
                                    Campaign Medium <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="cpc, banner, email"
                                    value={form.medium}
                                    onChange={(e) => setForm({ ...form, medium: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">
                                Campaign Name
                            </label>
                            <input
                                type="text"
                                placeholder="spring_sale"
                                value={form.campaign}
                                onChange={(e) => setForm({ ...form, campaign: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">
                                    Campaign Term (Optional)
                                </label>
                                <input
                                    type="text"
                                    placeholder="running+shoes"
                                    value={form.term}
                                    onChange={(e) => setForm({ ...form, term: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">
                                    Campaign Content (Optional)
                                </label>
                                <input
                                    type="text"
                                    placeholder="logolink"
                                    value={form.content}
                                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Result */}
                <div className="space-y-6">
                    <div className="bg-orange-50 border border-orange-100 p-8 rounded-3xl h-full flex flex-col justify-center">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Generated URL</h3>
                        
                        <div className="bg-white border border-orange-200 rounded-2xl p-4 break-all min-h-[100px] text-slate-600 font-mono text-sm mb-4">
                            {generatedUrl || 'Fill in the required fields to generate your link...'}
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleCopy}
                                disabled={!generatedUrl}
                                className={`flex-1 flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl transition-all ${
                                    generatedUrl 
                                        ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-200' 
                                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                }`}
                            >
                                {copied ? <Check size={20} /> : <Copy size={20} />}
                                {copied ? 'Copied!' : 'Copy URL'}
                            </button>
                            
                            {generatedUrl && (
                                <a
                                    href={generatedUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-white text-orange-600 border border-orange-200 hover:bg-orange-50 font-bold py-3 px-6 rounded-xl transition-colors"
                                >
                                    <ExternalLink size={20} />
                                    Test Link
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="bg-white border border-slate-100 p-6 rounded-3xl">
                        <h3 className="font-bold text-slate-900 mb-2">Parameter Guide</h3>
                        <ul className="text-sm text-slate-500 space-y-2">
                            <li><span className="font-mono text-orange-600 bg-orange-50 px-1 rounded">utm_source</span>: The referrer (e.g. google, newsletter)</li>
                            <li><span className="font-mono text-orange-600 bg-orange-50 px-1 rounded">utm_medium</span>: Marketing medium (e.g. cpc, banner, email)</li>
                            <li><span className="font-mono text-orange-600 bg-orange-50 px-1 rounded">utm_campaign</span>: Product, promo code, or slogan</li>
                        </ul>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="utm-builder" categoryId="marketing" />
        </ToolPageLayout>
    );
}
