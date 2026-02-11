import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { QRCodeCanvas } from 'qrcode.react';
import { QrCode, Download, Link, Type, Wifi, UserSquare, Upload, RefreshCw } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function QrCodeGenerator() {
    const { t } = useTranslation();

    const ERROR_LEVELS = [
        { value: 'L', label: 'Low (7%)' },
        { value: 'M', label: 'Medium (15%)' },
        { value: 'Q', label: 'Quartile (25%)' },
        { value: 'H', label: 'High (30%)' },
    ];

    const [type, setType] = useState('url'); // url, text, wifi, vcard
    const [content, setContent] = useState('https://example.com');
    
    // Specific inputs
    const [wifiData, setWifiData] = useState({ ssid: '', password: '', encryption: 'WPA' });
    const [vcardData, setVcardData] = useState({ firstName: '', lastName: '', phone: '', email: '', org: '', title: '' });

    // Styles
    const [fgColor, setFgColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [size, setSize] = useState(256);
    const [level, setLevel] = useState('M');
    const [includeLogo, setIncludeLogo] = useState(false);
    const [logoUrl, setLogoUrl] = useState('');
    const [logoSize, setLogoSize] = useState(24);

    const qrRef = useRef(null);

    const getQrValue = () => {
        if (type === 'url' || type === 'text') return content;
        if (type === 'wifi') {
            return `WIFI:T:${wifiData.encryption};S:${wifiData.ssid};P:${wifiData.password};;`;
        }
        if (type === 'vcard') {
            return `BEGIN:VCARD
VERSION:3.0
N:${vcardData.lastName};${vcardData.firstName}
FN:${vcardData.firstName} ${vcardData.lastName}
ORG:${vcardData.org}
TITLE:${vcardData.title}
TEL:${vcardData.phone}
EMAIL:${vcardData.email}
END:VCARD`;
        }
        return '';
    };

    const handleDownload = (fmt) => {
        const canvas = qrRef.current?.querySelector('canvas');
        if (!canvas) return;

        const url = canvas.toDataURL(`image/${fmt}`);
        const link = document.createElement('a');
        link.download = `qrcode-${Date.now()}.${fmt}`;
        link.href = url;
        link.click();
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoUrl(reader.result);
                setIncludeLogo(true);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <ToolPageLayout toolId="qr-gen">
            <Helmet>
                <title>{t('tools.qr-gen.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.qr-gen.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sky-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <QrCode size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.qr-gen.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.qr-gen.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Configuration */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Content Type Tabs */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {[
                                { id: 'url', icon: Link, label: 'URL' },
                                { id: 'text', icon: Type, label: 'Text' },
                                { id: 'wifi', icon: Wifi, label: 'WiFi' },
                                { id: 'vcard', icon: UserSquare, label: 'vCard' }
                            ].map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => setType(t.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                                        type === t.id
                                            ? 'bg-sky-600 text-white shadow-md'
                                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    <t.icon size={16} />
                                    {t.label}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-4">
                            {(type === 'url' || type === 'text') && (
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        {type === 'url' ? 'Website URL' : 'Plain Text'}
                                    </label>
                                    <input
                                        type="text"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                                        placeholder={type === 'url' ? 'https://...' : 'Enter text here'}
                                    />
                                </div>
                            )}

                            {type === 'wifi' && (
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Network Name (SSID)</label>
                                        <input
                                            type="text"
                                            value={wifiData.ssid}
                                            onChange={(e) => setWifiData({ ...wifiData, ssid: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                                            <input
                                                type="text"
                                                value={wifiData.password}
                                                onChange={(e) => setWifiData({ ...wifiData, password: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Encryption</label>
                                            <select
                                                value={wifiData.encryption}
                                                onChange={(e) => setWifiData({ ...wifiData, encryption: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none cursor-pointer"
                                            >
                                                <option value="WPA">WPA/WPA2</option>
                                                <option value="WEP">WEP</option>
                                                <option value="nopass">None</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {type === 'vcard' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <div className="col-span-full md:col-span-1">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                                        <input
                                            type="text"
                                            value={vcardData.firstName}
                                            onChange={(e) => setVcardData({ ...vcardData, firstName: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                                        />
                                    </div>
                                    <div className="col-span-full md:col-span-1">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                                        <input
                                            type="text"
                                            value={vcardData.lastName}
                                            onChange={(e) => setVcardData({ ...vcardData, lastName: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                                        />
                                    </div>
                                    <div className="col-span-full">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            value={vcardData.email}
                                            onChange={(e) => setVcardData({ ...vcardData, email: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                                        />
                                    </div>
                                    <div className="col-span-full md:col-span-1">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                                        <input
                                            type="tel"
                                            value={vcardData.phone}
                                            onChange={(e) => setVcardData({ ...vcardData, phone: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                                        />
                                    </div>
                                    <div className="col-span-full md:col-span-1">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
                                        <input
                                            type="text"
                                            value={vcardData.title}
                                            onChange={(e) => setVcardData({ ...vcardData, title: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Appearance */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <RefreshCw size={20} className="text-sky-600" />
                            Appearance
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Colors</label>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <div className="text-xs text-slate-500 mb-1">Foreground</div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="color"
                                                value={fgColor}
                                                onChange={(e) => setFgColor(e.target.value)}
                                                className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                                            />
                                            <span className="text-xs font-mono text-slate-600 uppercase">{fgColor}</span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs text-slate-500 mb-1">Background</div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="color"
                                                value={bgColor}
                                                onChange={(e) => setBgColor(e.target.value)}
                                                className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                                            />
                                            <span className="text-xs font-mono text-slate-600 uppercase">{bgColor}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Details</label>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-slate-600">Error Correction</span>
                                        <select
                                            value={level}
                                            onChange={(e) => setLevel(e.target.value)}
                                            className="text-xs bg-slate-100 rounded px-2 py-1 border-none focus:ring-0 cursor-pointer"
                                        >
                                            {ERROR_LEVELS.map(l => (
                                                <option key={l.value} value={l.value}>{l.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-slate-600">Size: {size}px</span>
                                        <input
                                            type="range"
                                            min="128"
                                            max="1024"
                                            step="32"
                                            value={size}
                                            onChange={(e) => setSize(Number(e.target.value))}
                                            className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                         <div className="mt-6 pt-6 border-t border-slate-100">
                             <div className="flex items-center gap-2 mb-4">
                                <input
                                    type="checkbox"
                                    id="logo-check"
                                    checked={includeLogo}
                                    onChange={(e) => setIncludeLogo(e.target.checked)}
                                    className="w-4 h-4 text-sky-600 rounded focus:ring-sky-500 border-gray-300"
                                />
                                <label htmlFor="logo-check" className="text-sm font-medium text-slate-700 select-none">Include Center Logo</label>
                             </div>
                             
                             {includeLogo && (
                                <div className="flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
                                    <div className="relative w-16 h-16 bg-slate-100 rounded-lg border border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                                        {logoUrl ? (
                                            <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
                                        ) : (
                                            <Upload className="text-slate-400" size={20} />
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleLogoUpload}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs text-slate-500 mb-2">Logo Size</div>
                                         <input
                                            type="range"
                                            min="16"
                                            max="64"
                                            value={logoSize}
                                            onChange={(e) => setLogoSize(Number(e.target.value))}
                                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                                        />
                                    </div>
                                </div>
                             )}
                         </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm text-center sticky top-8">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Preview</h2>
                        
                        <div className="flex justify-center mb-8">
                            <div className="p-4 bg-white border border-slate-100 shadow-xl rounded-xl" ref={qrRef}>
                                <QRCodeCanvas
                                    value={getQrValue()}
                                    size={256} // Always render at decent size for preview, real size for download
                                    bgColor={bgColor}
                                    fgColor={fgColor}
                                    level={level}
                                    includeMargin={true}
                                    imageSettings={includeLogo && logoUrl ? {
                                        src: logoUrl,
                                        width: logoSize,
                                        height: logoSize,
                                    } : undefined}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => handleDownload('png')}
                                className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-sky-200"
                            >
                                <Download size={18} />
                                Download PNG
                            </button>
                             <button
                                onClick={() => handleDownload('jpeg')}
                                className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-xl transition-colors"
                            >
                                <Download size={18} />
                                Download JPEG
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="qr-gen" categoryId="sales" />
        </ToolPageLayout>
    );
}
