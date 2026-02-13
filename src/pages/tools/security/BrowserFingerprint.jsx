import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Fingerprint, Monitor, Globe, Clock, Cpu, Cookie, Grid, Eye, AlertTriangle } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function BrowserFingerprint() {
    const { t } = useTranslation();
    const [info, setInfo] = useState(null);

    useEffect(() => {
        // Collect Browser Data
        const getBrowserData = () => {
            // Basic Navigator Info
            const nav = window.navigator;
            const screen = window.screen;

            // Canvas Fingerprinting:
            // This function creates a unique ID based on how your computer's Graphics Card (GPU) renders images.
            // Every GPU/Driver combination renders fonts and anti-aliasing slightly differently.
            // By drawing a complex scene (text + shapes + colors) and converting it to a text code (hash),
            // we create a "fingerprint" that is unique to your hardware.
            const getCanvasFingerprint = () => {
                try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = 200;
                    canvas.height = 50;
                    
                    // 1. Draw Text: Fonts render differently on Windows vs Mac vs Linux, and even NVIDIA vs AMD.
                    ctx.textBaseline = "top";
                    ctx.font = "14px 'Arial'";
                    ctx.textBaseline = "alphabetic";
                    ctx.fillStyle = "#f60";
                    ctx.fillRect(125,1,62,20);
                    
                    // 2. Draw Shapes/Colors: Blending and anti-aliasing differences are captured here.
                    ctx.fillStyle = "#069";
                    ctx.fillText("Browser Fingerprint v1", 2, 15);
                    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
                    ctx.fillText("Render Test", 4, 17);
                    
                    // 3. Get the Data: Convert the image to a base64 string.
                    const dataUrl = canvas.toDataURL();
                    
                    // 4. Create Hash: Convert that long string into a short, unique ID (using a simple DJB2 hash variant).
                    let hash = 0;
                    for (let i = 0; i < dataUrl.length; i++) {
                        const char = dataUrl.charCodeAt(i);
                        hash = ((hash << 5) - hash) + char;
                        hash = hash & hash; // Convert to 32bit integer
                    }
                    return (hash >>> 0).toString(16).toUpperCase(); // Make unsigned and hex
                } catch (e) {
                    return 'Blocked';
                }
            };

            return {
                userAgent: nav.userAgent,
                platform: nav.platform || t('tools.browser-fingerprint.unknown'),
                language: nav.language || t('tools.browser-fingerprint.unknown'),
                resolution: `${screen.width} x ${screen.height}`,
                colorDepth: `${screen.colorDepth}-bit`,
                pixelRatio: window.devicePixelRatio || 1,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                cookiesEnabled: nav.cookieEnabled,
                cores: nav.hardwareConcurrency || t('tools.browser-fingerprint.unknown'),
                memory: nav.deviceMemory ? `~${nav.deviceMemory} GB` : t('tools.browser-fingerprint.unknown'),
                canvasHash: getCanvasFingerprint()
            };
        };

        setInfo(getBrowserData());
    }, [t]);

    const InfoCard = ({ icon: Icon, label, value, warning = false }) => (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${warning ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
                <Icon size={20} />
            </div>
            <div className="min-w-0 overflow-hidden">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</div>
                <div className="font-bold text-slate-800 truncate" title={value}>{value ? value.toString() : 'N/A'}</div>
            </div>
        </div>
    );

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.browser-fingerprint.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.browser-fingerprint.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Fingerprint size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.browser-fingerprint.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.browser-fingerprint.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Main Stats Grid */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Unique ID Section */}
                    {info && (
                        <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
                             <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Fingerprint size={120} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-violet-200 font-bold uppercase text-sm mb-2">{t('tools.browser-fingerprint.canvas.title')}</h3>
                                <div className="text-4xl sm:text-5xl font-mono font-black tracking-widest mb-4 drop-shadow-md">
                                    {info.canvasHash}
                                </div>
                                <p className="text-violet-100 text-sm max-w-lg leading-relaxed">
                                    {t('tools.browser-fingerprint.canvas.desc')}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* General Info Grid */}
                    {info && (
                        <div>
                             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Monitor size={20} className="text-slate-400" />
                                {t('tools.browser-fingerprint.hardware.title')}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InfoCard icon={Monitor} label={t('tools.browser-fingerprint.hardware.screen')} value={info.resolution} />
                                <InfoCard icon={Grid} label={t('tools.browser-fingerprint.hardware.pixel')} value={`${info.pixelRatio}x`} />
                                <InfoCard icon={Eye} label={t('tools.browser-fingerprint.hardware.color')} value={info.colorDepth} />
                                <InfoCard icon={Cpu} label={t('tools.browser-fingerprint.hardware.cores')} value={info.cores} />
                                <InfoCard icon={Grid} label={t('tools.browser-fingerprint.hardware.memory')} value={info.memory} />
                                <InfoCard icon={Globe} label={t('tools.browser-fingerprint.hardware.platform')} value={info.platform} />
                            </div>
                        </div>
                    )}

                    {info && (
                        <div>
                             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Globe size={20} className="text-slate-400" />
                                {t('tools.browser-fingerprint.location.title')}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InfoCard icon={Globe} label={t('tools.browser-fingerprint.location.language')} value={info.language} />
                                <InfoCard icon={Clock} label={t('tools.browser-fingerprint.location.timezone')} value={info.timezone} />
                                <InfoCard icon={Cookie} label={t('tools.browser-fingerprint.location.cookies')} value={info.cookiesEnabled ? t('tools.browser-fingerprint.location.yes') : t('tools.browser-fingerprint.location.no')} />
                            </div>
                        </div>
                    )}

                    {/* User Agent */}
                    {info && (
                         <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 break-all">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t('tools.browser-fingerprint.ua')}</div>
                            <code className="text-slate-700 text-sm font-mono leading-relaxed">
                                {info.userAgent}
                            </code>
                         </div>
                    )}
                </div>

              

            </div>

            <RelatedTools currentToolId="browser-fingerprint" categoryId="security" />
        </ToolPageLayout>
    );
}