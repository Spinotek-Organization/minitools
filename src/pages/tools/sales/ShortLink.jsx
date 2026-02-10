import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link2, Copy, Check, Scissors, RefreshCw, ExternalLink } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function ShortLink() {
    const [baseUrl, setBaseUrl] = useState('');
    const [utmParams, setUtmParams] = useState({
        source: 'linkedin',
        medium: 'social',
        campaign: 'summer_sale',
        term: '',
        content: ''
    });
    const [generatedUrl, setGeneratedUrl] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        generateUrl();
    }, [baseUrl, utmParams]);

    const handleParamChange = (e) => {
        const { name, value } = e.target;
        setUtmParams(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const generateUrl = () => {
        if (!baseUrl) {
            setGeneratedUrl('');
            return;
        }

        try {
            const url = new URL(baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`);
            
            // Add UTM params
            if (utmParams.source) url.searchParams.set('utm_source', utmParams.source);
            if (utmParams.medium) url.searchParams.set('utm_medium', utmParams.medium);
            if (utmParams.campaign) url.searchParams.set('utm_campaign', utmParams.campaign);
            if (utmParams.term) url.searchParams.set('utm_term', utmParams.term);
            if (utmParams.content) url.searchParams.set('utm_content', utmParams.content);

            setGeneratedUrl(url.toString());
        } catch (e) {
            // Invalid URL, just return base
            setGeneratedUrl(baseUrl);
        }
    };

    const cleanUrl = () => {
        if (!baseUrl) return;
        try {
            const url = new URL(baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`);
            // Remove common tracking params
            const paramsToRemove = ['fbclid', 'gclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', '_hsenc', '_hsmi', 'mc_cid', 'mc_eid'];
            paramsToRemove.forEach(p => url.searchParams.delete(p));
            setBaseUrl(url.toString());
        } catch (e) {
            // ignore
        }
    };

    const handleCopy = () => {
        if (!generatedUrl) return;
        navigator.clipboard.writeText(generatedUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const openShortener = (service) => {
        if (!generatedUrl) return;
        const encoded = encodeURIComponent(generatedUrl);
        let target = '';
        
        switch(service) {
            case 'tinyurl':
                target = `https://tinyurl.com/create.php?url=${encoded}`;
                break;
            case 'bitly':
                target = `https://bitly.com/`; // Bitly doesn't allow simple GET pre-fill easily without API
                break;
            default:
                return;
        }
        
        window.open(target, '_blank');
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Link Tracker & Shortener | MiniTools by Spinotek</title>
                <meta name="description" content="Create trackable UTM links and shorten them." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sky-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Link2 size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Link Tracker & Shortener</h1>
                        <p className="text-slate-500 text-sm">Build trackable URLs and prepare them for sharing.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Inputs */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm h-fit">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <RefreshCw size={20} className="text-sky-600" />
                        URL Parameters
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Destination URL</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={baseUrl}
                                    onChange={(e) => setBaseUrl(e.target.value)}
                                    placeholder="https://example.com/page"
                                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                                />
                                <button 
                                    onClick={cleanUrl}
                                    title="Clean existing params"
                                    className="bg-slate-100 text-slate-600 px-3 rounded-xl hover:bg-slate-200 transition-colors"
                                >
                                    <Scissors size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Campaign Source (utm_source)</label>
                                <input
                                    type="text"
                                    name="source"
                                    value={utmParams.source}
                                    onChange={handleParamChange}
                                    placeholder="google, newsletter"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Campaign Medium (utm_medium)</label>
                                <input
                                    type="text"
                                    name="medium"
                                    value={utmParams.medium}
                                    onChange={handleParamChange}
                                    placeholder="cpc, banner, email"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Campaign Name (utm_campaign)</label>
                            <input
                                type="text"
                                name="campaign"
                                value={utmParams.campaign}
                                onChange={handleParamChange}
                                placeholder="spring_sale"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Term (optional)</label>
                                <input
                                    type="text"
                                    name="term"
                                    value={utmParams.term}
                                    onChange={handleParamChange}
                                    placeholder="running+shoes"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Content (optional)</label>
                                <input
                                    type="text"
                                    name="content"
                                    value={utmParams.content}
                                    onChange={handleParamChange}
                                    placeholder="logolink, textlink"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Output */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm h-fit">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Link2 size={20} className="text-sky-600" />
                        Generated Link
                    </h2>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 break-all mb-6 font-mono text-sm text-slate-700">
                        {generatedUrl || 'Start typing to generate link...'}
                    </div>

                    <button
                        onClick={handleCopy}
                        disabled={!generatedUrl}
                        className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl mb-6 ${
                            copied
                                ? 'bg-green-600 text-white'
                                : 'bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed'
                        }`}
                    >
                        {copied ? <Check size={20} /> : <Copy size={20} />}
                        {copied ? 'Copied to Clipboard' : 'Copy Tracking Link'}
                    </button>

                    <div className="pt-6 border-t border-slate-100">
                         <h3 className="text-sm font-bold text-slate-700 mb-3">Shorten with external service:</h3>
                         <div className="grid grid-cols-2 gap-3">
                             <button
                                onClick={() => openShortener('tinyurl')}
                                disabled={!generatedUrl}
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 disabled:opacity-50"
                            >
                                <ExternalLink size={16} />
                                TinyURL
                            </button>
                            <button
                                onClick={() => openShortener('bitly')}
                                disabled={!generatedUrl}
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 disabled:opacity-50"
                            >
                                <ExternalLink size={16} />
                                Bit.ly
                            </button>
                         </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="short-link" categoryId="sales" />
        </ToolPageLayout>
    );
}
