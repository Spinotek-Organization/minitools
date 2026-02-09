import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { QrCode, Download, Link, Type, Mail, Wifi, User, Share2 } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

const TABS = [
    { id: 'url', label: 'URL', icon: Link },
    { id: 'text', label: 'Text', icon: Type },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'vcard', label: 'Contact', icon: User },
];

export default function QrGenerator() {
    const [activeTab, setActiveTab] = useState('url');
    const [fgColor, setFgColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [size, setSize] = useState(256);
    const [level, setLevel] = useState('M'); // L, M, Q, H

    // Data State
    const [url, setUrl] = useState('');
    const [text, setText] = useState('');
    const [email, setEmail] = useState({ to: '', subject: '', body: '' });
    const [wifi, setWifi] = useState({ ssid: '', password: '', encryption: 'WPA' });
    const [contact, setContact] = useState({ fn: '', tel: '', email: '' });

    const qrRef = useRef(null);

    // Generate value based on active tab
    const getQrValue = () => {
        switch (activeTab) {
            case 'url':
                return url;
            case 'text':
                return text;
            case 'email':
                return `mailto:${email.to}?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`;
            case 'wifi':
                return `WIFI:T:${wifi.encryption};S:${wifi.ssid};P:${wifi.password};;`;
            case 'vcard':
                return `BEGIN:VCARD\nVERSION:3.0\nFN:${contact.fn}\nTEL:${contact.tel}\nEMAIL:${contact.email}\nEND:VCARD`;
            default:
                return '';
        }
    };

    const handleDownload = () => {
        const canvas = qrRef.current.querySelector('canvas');
        if (canvas) {
            const pngUrl = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = "minitools-qrcode.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };

    const qrValue = getQrValue();
    const hasValue = qrValue && qrValue.length > 0;

    return (
        <ToolPageLayout>
            <Helmet>
                <title>QR Code Generator | MiniTools by Spinotek</title>
                <meta name="description" content="Generate secure, custom QR codes for URLs, WiFi, Contacts, and more directly in your browser." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <QrCode size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">QR Code Generator</h1>
                        <p className="text-slate-500 text-sm">Generate QR codes for URLs, text, or contact information.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Controls */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Tabs */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-2 flex flex-wrap gap-2">
                        {TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                                    activeTab === tab.id 
                                        ? 'bg-slate-900 text-white shadow-sm' 
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                }`}
                            >
                                <tab.icon size={16} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Inputs */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        {activeTab === 'url' && (
                            <div>
                                <label className="block text-slate-700 font-bold mb-2">Website URL</label>
                                <input
                                    type="url"
                                    placeholder="https://example.com"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        )}

                        {activeTab === 'text' && (
                            <div>
                                <label className="block text-slate-700 font-bold mb-2">Plain Text</label>
                                <textarea
                                    placeholder="Enter your text here..."
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className="w-full h-32 p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                            </div>
                        )}

                        {activeTab === 'email' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-slate-700 font-bold mb-2">Recipient</label>
                                    <input
                                        type="email"
                                        placeholder="hello@example.com"
                                        value={email.to}
                                        onChange={(e) => setEmail({ ...email, to: e.target.value })}
                                        className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-700 font-bold mb-2">Subject</label>
                                    <input
                                        type="text"
                                        placeholder="Meeting inquiry"
                                        value={email.subject}
                                        onChange={(e) => setEmail({ ...email, subject: e.target.value })}
                                        className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-700 font-bold mb-2">Body</label>
                                    <textarea
                                        placeholder="Message content..."
                                        value={email.body}
                                        onChange={(e) => setEmail({ ...email, body: e.target.value })}
                                        className="w-full h-24 p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'wifi' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-slate-700 font-bold mb-2">Network Name (SSID)</label>
                                    <input
                                        type="text"
                                        placeholder="MyWiFi"
                                        value={wifi.ssid}
                                        onChange={(e) => setWifi({ ...wifi, ssid: e.target.value })}
                                        className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-700 font-bold mb-2">Password</label>
                                    <input
                                        type="text"
                                        placeholder="secret123"
                                        value={wifi.password}
                                        onChange={(e) => setWifi({ ...wifi, password: e.target.value })}
                                        className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-700 font-bold mb-2">Encryption</label>
                                    <select
                                        value={wifi.encryption}
                                        onChange={(e) => setWifi({ ...wifi, encryption: e.target.value })}
                                        className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                    >
                                        <option value="WPA">WPA/WPA2</option>
                                        <option value="WEP">WEP</option>
                                        <option value="nopass">No Encryption</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {activeTab === 'vcard' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-slate-700 font-bold mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={contact.fn}
                                        onChange={(e) => setContact({ ...contact, fn: e.target.value })}
                                        className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-slate-700 font-bold mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            placeholder="+123456789"
                                            value={contact.tel}
                                            onChange={(e) => setContact({ ...contact, tel: e.target.value })}
                                            className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-slate-700 font-bold mb-2">Email</label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            value={contact.email}
                                            onChange={(e) => setContact({ ...contact, email: e.target.value })}
                                            className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Customization Options */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4">Appearance Options</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-slate-500 mb-2">Foreground Color</label>
                                <div className="flex items-center gap-3">
                                    <input 
                                        type="color" 
                                        value={fgColor} 
                                        onChange={(e) => setFgColor(e.target.value)} 
                                        className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0"
                                    />
                                    <span className="font-mono text-sm bg-slate-50 px-2 py-1 rounded">{fgColor}</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-slate-500 mb-2">Background Color</label>
                                <div className="flex items-center gap-3">
                                    <input 
                                        type="color" 
                                        value={bgColor} 
                                        onChange={(e) => setBgColor(e.target.value)} 
                                        className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0"
                                    />
                                    <span className="font-mono text-sm bg-slate-50 px-2 py-1 rounded">{bgColor}</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-slate-500 mb-2">Size: {size}px</label>
                                <input 
                                    type="range" 
                                    min="128" 
                                    max="512" 
                                    step="32"
                                    value={size} 
                                    onChange={(e) => setSize(Number(e.target.value))} 
                                    className="w-full accent-blue-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-500 mb-2">Error Correction</label>
                                <select 
                                    value={level} 
                                    onChange={(e) => setLevel(e.target.value)}
                                    className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                                >
                                    <option value="L">Low (7%)</option>
                                    <option value="M">Medium (15%)</option>
                                    <option value="Q">Quartile (25%)</option>
                                    <option value="H">High (30%)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Preview */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-6">
                        <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-lg text-center">
                            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center justify-center gap-2">
                                <Share2 size={20} className="text-blue-500" />
                                Live Preview
                            </h2>
                            
                            <div className="flex justify-center mb-8" ref={qrRef}>
                                {hasValue ? (
                                    <QRCodeCanvas
                                        value={qrValue}
                                        size={size} // Render at selected size but scale in CSS
                                        fgColor={fgColor}
                                        bgColor={bgColor}
                                        level={level}
                                        includeMargin={true}
                                        style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px' }}
                                    />
                                ) : (
                                    <div className="w-64 h-64 bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-200 text-slate-400">
                                        Enter data to generate
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleDownload}
                                disabled={!hasValue}
                                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                                    hasValue 
                                        ? 'bg-slate-900 text-white hover:bg-slate-800 hover:scale-[1.02]' 
                                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                }`}
                            >
                                <Download size={20} />
                                Download PNG
                            </button>
                        </div>

                    
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="qr-gen" categoryId="security" />
        </ToolPageLayout>
    );
}
