import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Search, Globe, Server, Activity, AlertCircle, Clock, Database, ArrowRight } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

const RECORD_TYPES = [
    { value: 'A', label: 'A (IPv4 Address)' },
    { value: 'AAAA', label: 'AAAA (IPv6 Address)' },
    { value: 'MX', label: 'MX (Mail Server)' },
    { value: 'NS', label: 'NS (Name Server)' },
    { value: 'TXT', label: 'TXT (Text Records)' },
    { value: 'CNAME', label: 'CNAME (Alias)' },
    { value: 'SOA', label: 'SOA (Start of Authority)' },
];

const DNS_TYPE_MAP = {
    1: 'A',
    2: 'NS',
    5: 'CNAME',
    6: 'SOA',
    15: 'MX',
    16: 'TXT',
    28: 'AAAA',
};

export default function DnsLookup() {
    const { t } = useTranslation();
    const [domain, setDomain] = useState('');
    const [recordType, setRecordType] = useState('A');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!domain) return;

        setLoading(true);
        setError(null);
        setResults(null);

        try {
            const cleanDomain = domain.replace(/^(https?:\/\/)/, '').replace(/\/$/, '');
            const response = await fetch(`https://dns.google/resolve?name=${cleanDomain}&type=${recordType}`);
            const data = await response.json();

            if (data.Status !== 0 && data.Status !== 3) {
                // 0 = No Error, 3 = NXDOMAIN (not found)
                 throw new Error(t('tools.dns-lookup.form.errorStatus', { status: data.Status }));
            }

            setResults(data);
        } catch (err) {
            setError(err.message || t('tools.dns-lookup.results.fetchError'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.dns-lookup.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.dns-lookup.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Search size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.dns-lookup.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.dns-lookup.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Search Box */}
                <div className="lg:col-span-1 space-y-6">
                    <form onSubmit={handleSearch} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <label className="block text-slate-700 font-bold mb-4">{t('tools.dns-lookup.form.domainLabel')}</label>
                        
                        <div className="space-y-4">
                            <div className="relative">
                                <Globe className="absolute left-4 top-3.5 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    value={domain}
                                    onChange={(e) => setDomain(e.target.value)}
                                    placeholder={t('tools.dns-lookup.form.domainPlaceholder')}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500 font-medium transition-colors"
                                    autoComplete="off"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t('tools.dns-lookup.form.typeLabel')}</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {RECORD_TYPES.map((type) => (
                                        <button
                                            key={type.value}
                                            type="button"
                                            onClick={() => setRecordType(type.value)}
                                            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border-2 text-left ${
                                                recordType === type.value 
                                                    ? 'border-cyan-500 bg-cyan-50 text-cyan-700' 
                                                    : 'border-slate-100 text-slate-500 hover:border-slate-200'
                                            }`}
                                        >
                                            {t(`tools.dns-lookup.types.${type.value}`)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !domain}
                                className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? <Activity className="animate-spin" size={20} /> : <Search size={20} />}
                                {loading ? t('tools.dns-lookup.form.querying') : t('tools.dns-lookup.form.submit')}
                            </button>
                        </div>
                    </form>

                    <div className="bg-cyan-50 border border-cyan-100 rounded-3xl p-6 text-cyan-900 text-sm">
                        <h4 className="font-bold flex items-center gap-2 mb-2">
                            <Server size={16} />
                            {t('tools.dns-lookup.howItWorks.title')}
                        </h4>
                        <p className="opacity-80 leading-relaxed">
                            {t('tools.dns-lookup.howItWorks.text')}
                        </p>
                    </div>
                </div>

                {/* Results Area */}
                <div className="lg:col-span-2">
                    {!results && !error && !loading && (
                        <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center text-slate-400">
                            <Database size={48} className="mx-auto mb-4 opacity-20" />
                            <p className="font-medium">{t('tools.dns-lookup.results.empty')}</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 text-red-600 p-8 rounded-3xl text-center border border-red-100">
                            <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
                            <h3 className="text-xl font-bold mb-2">{t('tools.dns-lookup.results.failed')}</h3>
                            <p>{error}</p>
                        </div>
                    )}

                    {results && (
                        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                    <Globe size={18} className="text-slate-400" />
                                    {t('tools.dns-lookup.results.title', { domain: results.Question?.[0]?.name?.replace(/\.$/, '') })}
                                </h3>
                                <div className="text-xs font-bold px-2 py-1 bg-white border border-slate-200 rounded text-slate-500">
                                    {t('tools.dns-lookup.results.type', { type: recordType })}
                                </div>
                            </div>

                            {results.Answer ? (
                                <div className="divide-y divide-slate-50">
                                    {results.Answer.map((record, index) => (
                                        <div key={index} className="p-4 hover:bg-slate-50 transition-colors group">
                                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-mono text-sm text-slate-900 font-bold mb-1 break-all">
                                                        {record.data}
                                                    </div>
                                                    <div className="text-xs text-slate-500 flex items-center gap-3">
                                                        <span className="flex items-center gap-1">
                                                            <ArrowRight size={10} />
                                                            {record.name}
                                                        </span>
                                                        <span className="flex items-center gap-1 bg-slate-100 px-1.5 rounded text-slate-600 font-bold">
                                                            {DNS_TYPE_MAP[record.type] || record.type}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono bg-slate-50 px-2 py-1 rounded border border-slate-100 whitespace-nowrap">
                                                    <Clock size={12} />
                                                    TTL: {record.TTL}s
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center">
                                    <div className="bg-amber-50 text-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <AlertCircle size={32} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-1">{t('tools.dns-lookup.results.noRecords')}</h3>
                                    <p className="text-slate-500 text-sm">
                                        {t('tools.dns-lookup.results.noRecordsDesc', { type: recordType })}
                                    </p>
                                    {/* Suggestion based on status */}
                                    {results.Status === 3 && (
                                        <p className="text-red-500 text-xs mt-2 font-bold bg-red-50 inline-block px-3 py-1 rounded-full">
                                            {t('tools.dns-lookup.results.nxdomain')}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

            </div>

            <RelatedTools currentToolId="dns-lookup" categoryId="security" />
        </ToolPageLayout>
    );
}
