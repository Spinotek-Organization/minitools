import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Lock, Search, ExternalLink, ShieldCheck, History, AlertTriangle, Key } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

const TOOLS = [
    {
        id: 'ssllabs',
        name: 'Qualys SSL Labs',
        desc: 'Deep server configuration analysis. Gives you a grade (A+ to F).',
        urlTemplate: (domain) => `https://www.ssllabs.com/ssltest/analyze.html?d=${domain}`,
        icon: ShieldCheck,
        color: 'text-blue-600',
        bg: 'bg-blue-50'
    },
    {
        id: 'digicert',
        name: 'DigiCert SSL Helper',
        desc: 'Checks for common installation issues and intermediate chain validity.',
        urlTemplate: (domain) => `https://www.digicert.com/help/?host=${domain}`,
        icon: Key,
        color: 'text-indigo-600',
        bg: 'bg-indigo-50'
    },
    {
        id: 'crtsh',
        name: 'crt.sh (Log Search)',
        desc: 'Search Certificate Transparency logs for all certificates issued to this domain.',
        urlTemplate: (domain) => `https://crt.sh/?q=${domain}`,
        icon: History,
        color: 'text-slate-600',
        bg: 'bg-slate-50'
    },
    {
        id: 'whynopadlock',
        name: 'Why No Padlock?',
        desc: 'Identify mixed content errors (http resources on https pages).',
        urlTemplate: (domain) => `https://www.whynopadlock.com/results/${domain}`,
        icon: AlertTriangle,
        color: 'text-amber-600',
        bg: 'bg-amber-50'
    },
    {
        id: 'sslshopper',
        name: 'SSL Shopper',
        desc: 'Quick visual check of certificate expiration and server support.',
        urlTemplate: (domain) => `https://www.sslshopper.com/ssl-checker.html#hostname=${domain}`,
        icon: Lock,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50'
    }
];

export default function SslChecker() {
    const { t } = useTranslation('tools');
    const [domain, setDomain] = useState('');
    
    const handleDomainChange = (e) => {
        // Simple cleanup: remove http/https/www if pasted
        let val = e.target.value;
        val = val.replace(/^https?:\/\//, '').replace(/^www\./, '');
        setDomain(val);
    };

    const openTool = (template) => {
        if (!domain) {
            alert(t('ssl-checker.alert'));
            return;
        }
        window.open(template(domain), '_blank');
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('ssl-checker.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('ssl-checker.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Lock size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('ssl-checker.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('ssl-checker.headerDesc')}</p>
                    </div>
                </div>
            </div>

            {/* Input Section */}
            <div className="bg-white rounded-3xl border border-slate-100 p-8 mb-8 text-center shadow-sm">
                <label htmlFor="domain-input" className="block text-slate-900 font-bold mb-4 text-lg">
                    {t('ssl-checker.inputLabel')}
                </label>
                <div className="max-w-xl mx-auto relative flex items-center">
                    <Search className="absolute left-4 text-slate-400" size={20} />
                    <input
                        id="domain-input"
                        type="text"
                        placeholder={t('ssl-checker.placeholder')}
                        value={domain}
                        onChange={handleDomainChange}
                        className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-2xl text-lg outline-none focus:border-teal-500 transition-colors"
                    />
                </div>
                {!domain && (
                    <p className="text-slate-400 text-sm mt-3">
                        {t('ssl-checker.hint')}
                    </p>
                )}
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {TOOLS.map((tool) => (
                    <div 
                        key={tool.id}
                        className={`bg-white p-6 rounded-2xl border border-slate-100 shadow-sm ${domain ? 'opacity-100 hover:shadow-md' : 'opacity-60'} transition-all`}
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <div className={`w-12 h-12 ${tool.bg} ${tool.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                <tool.icon size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg">{t(`ssl-checker.tools.${tool.id}.name`)}</h3>
                                <p className="text-slate-500 text-sm">{t(`ssl-checker.tools.${tool.id}.desc`)}</p>
                            </div>
                        </div>
                        
                        <button
                            onClick={() => openTool(tool.urlTemplate)}
                            disabled={!domain}
                            className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors ${
                                domain 
                                    ? 'bg-slate-900 text-white hover:bg-slate-800' 
                                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                        >
                            {t('ssl-checker.analyzeBtn')}
                            <ExternalLink size={16} />
                        </button>
                    </div>
                ))}
            </div>

            <RelatedTools currentToolId="ssl-checker" categoryId="security" />
        </ToolPageLayout>
    );
}
