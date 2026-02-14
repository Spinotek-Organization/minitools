import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Globe, RefreshCw, MapPin, Server, Clock, Shield, AlertTriangle } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function IpChecker() {
    const { t } = useTranslation('tools');
    const [ipData, setIpData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchIpData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // First, get the IP address securely
            const ipRes = await fetch('https://api.ipify.org?format=json');
            if (!ipRes.ok) throw new Error(t('ip-checker.errors.fetchIp'));
            const { ip } = await ipRes.json();

            // Then, get location data using ip-api.com (free for non-commercial)
            // Note: ip-api is HTTP only on free tier, which causes Mixed Content errors on HTTPS sites.
            // We'll use a CORS proxy or handle the error gracefully if blocked.
            // For production with HTTPS, you'd typically need a paid plan or a different HTTPS-supported API like ipapi.co (limited free tier).
            // Here we try ipapi.co as a fallback for HTTPS support.
            
            let details = {};
            try {
                const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
                if (geoRes.ok) {
                    details = await geoRes.json();
                } else {
                     throw new Error('Fallback needed');
                }
            } catch (e) {
                // Fallback to basic data if geo fails (e.g. ad blockers)
                details = { ip, city: t('ip-checker.unknown'), region: t('ip-checker.unknown'), country_name: t('ip-checker.unknown'), org: t('ip-checker.unknown') };
                console.warn('Geo-lookup failed, showing basic IP only.');
            }

            setIpData(details);

        } catch (err) {
            setError(err.message || t('ip-checker.errors.general'));
        } finally {
            setLoading(false);
        }
    }, [t]);

    useEffect(() => {
        fetchIpData();
    }, [fetchIpData]);

    const DataRow = ({ icon: Icon, label, value }) => (
        <div className="flex items-center justify-between p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3 text-slate-600">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                    <Icon size={16} />
                </div>
                <span className="font-medium text-sm">{label}</span>
            </div>
            <span className="font-bold text-slate-800 text-right">{value || 'N/A'}</span>
        </div>
    );

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('ip-checker.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('ip-checker.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sky-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Globe size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('ip-checker.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('ip-checker.desc')}</p>
                    </div>
                </div>
                <button 
                    onClick={fetchIpData}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all disabled:opacity-50"
                >
                    <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    {loading ? t('ip-checker.checking') : t('ip-checker.refresh')}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Main Card */}
                <div className="lg:col-span-2 space-y-6">
                    {loading ? (
                        <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center animate-pulse">
                            <div className="h-4 bg-slate-100 rounded w-24 mx-auto mb-4"></div>
                            <div className="h-12 bg-slate-100 rounded w-64 mx-auto mb-8"></div>
                            <div className="space-y-4">
                                <div className="h-8 bg-slate-100 rounded w-full"></div>
                                <div className="h-8 bg-slate-100 rounded w-full"></div>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 text-red-600 p-8 rounded-3xl flex flex-col items-center justify-center text-center">
                            <AlertTriangle size={48} className="mb-4 opacity-50" />
                            <h3 className="text-xl font-bold mb-2">{t('ip-checker.errors.failed')}</h3>
                            <p>{error}</p>
                            <button onClick={fetchIpData} className="mt-4 px-6 py-2 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200">
                                {t('ip-checker.errors.tryAgain')}
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                            {/* IP Header */}
                            <div className="bg-sky-50 p-8 text-center border-b border-sky-100">
                                <p className="text-sky-600 font-bold text-sm uppercase tracking-wider mb-2">{t('ip-checker.results.ipv4')}</p>
                                <div className="text-4xl md:text-6xl font-black text-slate-900 font-mono tracking-tight">
                                    {ipData.ip}
                                </div>
                                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs font-bold text-sky-700 shadow-sm border border-sky-100">
                                    <Shield size={12} />
                                    {t('ip-checker.results.visible')}
                                </div>
                            </div>

                            {/* Details List */}
                            <div className="p-2">
                                {/* Details List */}
                            <div className="p-2">
                                <DataRow icon={Server} label={t('ip-checker.results.isp')} value={ipData.org} />
                                <DataRow icon={MapPin} label={t('ip-checker.results.location')} value={`${ipData.city}, ${ipData.region}, ${ipData.country_name}`} />
                                <DataRow icon={Clock} label={t('ip-checker.results.timezone')} value={ipData.timezone} />
                                <DataRow icon={Globe} label={t('ip-checker.results.coordinates')} value={`${ipData.latitude}, ${ipData.longitude}`} />
                            </div>
                            </div>
                            
                            {/* Map Link */}
                            {ipData.latitude && (
                                <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
                                    <a 
                                        href={`https://www.google.com/maps/search/?api=1&query=${ipData.latitude},${ipData.longitude}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sky-600 font-bold hover:text-sky-700 hover:underline"
                                    >
                                        <MapPin size={18} />
                                        {t('ip-checker.results.map')}
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Sidebar Info */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Accuracy Disclaimer - NEW */}
                    <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 text-amber-900 text-sm">
                        <h4 className="font-bold flex items-center gap-2 mb-2">
                            <AlertTriangle size={16} />
                            {t('ip-checker.accuracy.title')}
                        </h4>
                        <p className="opacity-80 leading-relaxed">
                            {t('ip-checker.accuracy.text')}
                        </p>
                        <p className="mt-2 text-xs font-bold opacity-60 uppercase">{t('ip-checker.accuracy.note')}</p>
                    </div>

                  
                </div>

            </div>

            <RelatedTools currentToolId="ip-checker" categoryId="security" />
        </ToolPageLayout>
    );
}
