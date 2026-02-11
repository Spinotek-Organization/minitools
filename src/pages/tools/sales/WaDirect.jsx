import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { MessageSquare, Copy, ExternalLink, RefreshCw, Smartphone, QrCode, Download } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

// Common country codes
const COUNTRY_CODES = [
    { code: '1', name: 'USA / Canada' },
    { code: '44', name: 'UK' },
    { code: '91', name: 'India' },
    { code: '62', name: 'Indonesia' },
    { code: '61', name: 'Australia' },
    { code: '86', name: 'China' },
    { code: '33', name: 'France' },
    { code: '49', name: 'Germany' },
    { code: '39', name: 'Italy' },
    { code: '81', name: 'Japan' },
    { code: '60', name: 'Malaysia' },
    { code: '52', name: 'Mexico' },
    { code: '31', name: 'Netherlands' },
    { code: '64', name: 'New Zealand' },
    { code: '63', name: 'Philippines' },
    { code: '65', name: 'Singapore' },
    { code: '82', name: 'South Korea' },
    { code: '34', name: 'Spain' },
    { code: '971', name: 'UAE' },
    { code: '84', name: 'Vietnam' },
    // Add more as needed, or use a full library if requested, but a curated list is often better for UX
].sort((a, b) => a.name.localeCompare(b.name));

export default function WaDirect() {
    const [countryCode, setCountryCode] = useState('1');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [generatedLink, setGeneratedLink] = useState('');
    const [copied, setCopied] = useState(false);
    const [showQr, setShowQr] = useState(false);

    useEffect(() => {
        generateLink();
    }, [countryCode, phoneNumber, message]);

    const generateLink = () => {
        if (!phoneNumber) {
            setGeneratedLink('');
            return;
        }

        // Remove leading 0 if present
        let cleanNumber = phoneNumber.replace(/\D/g, '');
        if (cleanNumber.startsWith('0')) {
            cleanNumber = cleanNumber.substring(1);
        }

        // Construct full number
        const fullNumber = `${countryCode}${cleanNumber}`;
        
        let url = `https://wa.me/${fullNumber}`;
        if (message) {
            url += `?text=${encodeURIComponent(message)}`;
        }

        setGeneratedLink(url);
    };

    const handleCopy = () => {
        if (!generatedLink) return;
        navigator.clipboard.writeText(generatedLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadQr = () => {
        const canvas = document.getElementById('qr-code-canvas');
        if (canvas) {
            const pngUrl = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = `whatsapp-qr-${phoneNumber || 'code'}.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>WhatsApp Direct Link | MiniTools by Spinotek</title>
                <meta name="description" content="Send WhatsApp messages without saving numbers." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <MessageSquare size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">WhatsApp Direct Link</h1>
                        <p className="text-slate-500 text-sm">Send WhatsApp messages without saving numbers.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Input Section */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Smartphone size={20} className="text-green-600" />
                        Enter Details
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Phone Number
                            </label>
                            <div className="flex gap-3">
                                <select
                                    value={countryCode}
                                    onChange={(e) => setCountryCode(e.target.value)}
                                    className="w-32 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                                    style={{ backgroundImage: 'none' }} // Remove default arrow if needed, but styling usually handles it
                                >
                                    {COUNTRY_CODES.map((country) => (
                                        <option key={country.code} value={country.code}>
                                            +{country.code} ({country.name})
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="812 3456 7890"
                                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-2">
                                Enter the number without the country code. Leading zeros will be removed automatically.
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Message (Optional)
                            </label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Hi, I'm interested in your services..."
                                rows={4}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Output Section */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm flex flex-col">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <ExternalLink size={20} className="text-blue-600" />
                        Generated Link
                    </h2>

                    <div className="flex-1 flex flex-col justify-center">
                        {!generatedLink ? (
                            <div className="text-center py-12 text-slate-400">
                                <RefreshCw size={48} className="mx-auto mb-4 opacity-20" />
                                <p>Enter a phone number to generate a link</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 break-all text-slate-600 font-mono text-sm">
                                    {generatedLink}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <a
                                        href={generatedLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                                    >
                                        <MessageSquare size={18} />
                                        Open Chat
                                    </a>
                                    <button
                                        onClick={handleCopy}
                                        className={`flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl transition-colors border ${
                                            copied
                                                ? 'bg-green-50 border-green-200 text-green-700'
                                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                        }`}
                                    >
                                        {copied ? <RefreshCw size={18} /> : <Copy size={18} />}
                                        {copied ? 'Copied!' : 'Copy Link'}
                                    </button>
                                </div>

                                <button
                                    onClick={() => setShowQr(!showQr)}
                                    className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-slate-700 py-2 transition-colors"
                                >
                                    <QrCode size={18} />
                                    {showQr ? 'Hide QR Code' : 'Show QR Code'}
                                </button>

                                {showQr && (
                                    <div className="flex flex-col items-center pt-4 animate-in fade-in zoom-in duration-300 gap-4">
                                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                            <QRCodeCanvas
                                                id="qr-code-canvas"
                                                value={generatedLink}
                                                size={200}
                                                level="H"
                                                includeMargin={true}
                                            />
                                        </div>
                                        <button
                                            onClick={handleDownloadQr}
                                            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-green-600 transition-colors"
                                        >
                                            <Download size={16} />
                                            Download QR Image
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="wa-direct" categoryId="sales" />
        </ToolPageLayout>
    );
}
