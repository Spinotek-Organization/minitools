import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Bot, Plus, Trash2, Download, Copy, Check } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

import { useTranslation } from 'react-i18next';

export default function RobotsGenerator() {
    const { t } = useTranslation();
    const [defaultAccess, setDefaultAccess] = useState('Allow');
    const [delay, setDelay] = useState('');
    const [sitemaps, setSitemaps] = useState(['']);
    const [rules, setRules] = useState([
        { userAgent: '*', allow: '/', disallow: '' }
    ]);
    const [generatedTxt, setGeneratedTxt] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        let txt = '';
        
        // Rules
        rules.forEach(rule => {
            txt += `User-agent: ${rule.userAgent}\n`;
            if (rule.disallow) {
                const paths = rule.disallow.split(',').map(p => p.trim());
                paths.forEach(p => txt += `Disallow: ${p}\n`);
            }
             if (rule.allow && rule.allow !== '/') { // Avoid redundant Allow: / if default is usually allow
                const paths = rule.allow.split(',').map(p => p.trim());
                paths.forEach(p => txt += `Allow: ${p}\n`);
            } else if (rule.allow === '/' && !rule.disallow) {
                // If explicitly allowing root and no disallow, technically empty disallow means allow all
                 // But for clarity we can skip or add Disallow: 
            }
            txt += '\n';
        });

        // Crawl Delay
        if (delay) {
            txt += `Crawl-delay: ${delay}\n\n`;
        }

        // Sitemaps
        sitemaps.forEach(map => {
            if (map) txt += `Sitemap: ${map}\n`;
        });

        setGeneratedTxt(txt.trim());
    }, [defaultAccess, delay, sitemaps, rules]);

    const addRule = () => {
        setRules([...rules, { userAgent: 'Googlebot', allow: '', disallow: '' }]);
    };

    const updateRule = (index, field, value) => {
        const newRules = [...rules];
        newRules[index][field] = value;
        setRules(newRules);
    };

    const removeRule = (index) => {
        setRules(rules.filter((_, i) => i !== index));
    };

    const addSitemap = () => setSitemaps([...sitemaps, '']);
    
    const updateSitemap = (index, value) => {
        const newMaps = [...sitemaps];
        newMaps[index] = value;
        setSitemaps(newMaps);
    };

    const removeSitemap = (index) => {
        setSitemaps(sitemaps.filter((_, i) => i !== index));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedTxt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([generatedTxt], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "robots.txt";
        document.body.appendChild(element); 
        element.click();
        document.body.removeChild(element);
    };

    return (
        <ToolPageLayout toolId="robots-gen">
            <Helmet>
                <title>{t('tools.robots-gen.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.robots-gen.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Bot size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.robots-gen.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.robots-gen.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Configuration */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-slate-900">{t('tools.robots-gen.rules.title')}</h2>
                            <button onClick={addRule} className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                <Plus size={16} /> {t('tools.robots-gen.rules.add')}
                            </button>
                        </div>
                        
                        <div className="space-y-6">
                            {rules.map((rule, index) => (
                                <div key={index} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative group">
                                    <button 
                                        onClick={() => removeRule(index)}
                                        className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="mb-3">
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('tools.robots-gen.rules.agent')}</label>
                                        <input
                                            type="text"
                                            value={rule.userAgent}
                                            onChange={(e) => updateRule(index, 'userAgent', e.target.value)}
                                            placeholder="*"
                                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono text-slate-700"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-green-600 uppercase mb-1">{t('tools.robots-gen.rules.allow')}</label>
                                            <input
                                                type="text"
                                                value={rule.allow}
                                                onChange={(e) => updateRule(index, 'allow', e.target.value)}
                                                placeholder="/"
                                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono text-slate-700"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-red-600 uppercase mb-1">{t('tools.robots-gen.rules.disallow')}</label>
                                            <input
                                                type="text"
                                                value={rule.disallow}
                                                onChange={(e) => updateRule(index, 'disallow', e.target.value)}
                                                placeholder="/admin/"
                                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono text-slate-700"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <p className="text-xs text-slate-400 italic text-center">
                                {t('tools.robots-gen.rules.hint')}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-slate-900">{t('tools.robots-gen.sitemap.title')}</h2>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">{t('tools.robots-gen.sitemap.urls')}</label>
                                {sitemaps.map((map, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={map}
                                            onChange={(e) => updateSitemap(index, e.target.value)}
                                            placeholder="https://example.com/sitemap.xml"
                                            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        {sitemaps.length > 1 && (
                                            <button onClick={() => removeSitemap(index)} className="text-slate-400 hover:text-red-500">
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button onClick={addSitemap} className="text-sm font-bold text-blue-600 mt-2 flex items-center gap-1">
                                    <Plus size={16} /> {t('tools.robots-gen.sitemap.add')}
                                </button>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">{t('tools.robots-gen.sitemap.delay')}</label>
                                <input
                                    type="number"
                                    value={delay}
                                    onChange={(e) => setDelay(e.target.value)}
                                    placeholder={t('tools.robots-gen.sitemap.delayPlaceholder')}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Output */}
                <div className="bg-slate-800 text-slate-300 p-8 rounded-3xl flex flex-col h-full font-mono text-sm relative">
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button 
                            onClick={handleCopy}
                            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-white"
                            title={t('tools.robots-gen.output.copy')}
                        >
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                        <button 
                            onClick={handleDownload}
                            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-white"
                            title={t('tools.robots-gen.output.download')}
                        >
                            <Download size={18} />
                        </button>
                    </div>

                    <div className="mb-4 font-bold text-slate-400 uppercase tracking-wider text-xs">{t('tools.robots-gen.output.preview')}</div>
                    <textarea
                        readOnly
                        value={generatedTxt}
                        className="w-full h-full bg-transparent resize-none outline-none text-green-400"
                    />
                </div>
            </div>

            <RelatedTools currentToolId="robots-gen" categoryId="marketing" />
        </ToolPageLayout>
    );
}
