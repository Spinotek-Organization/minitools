import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { PenTool, Copy, Check, Info, User, Building, Share2, Palette, Upload } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

const FONTS = [
    { name: 'Sans Serif', value: 'Arial, Helvetica, sans-serif' },
    { name: 'Serif', value: 'Georgia, serif' },
    { name: 'Monospace', value: '"Courier New", Courier, monospace' },
    { name: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
    { name: 'Trebuchet', value: '"Trebuchet MS", Helvetica, sans-serif' },
];

const COLORS = [
    { name: 'Blue', value: '#2563EB' },
    { name: 'Red', value: '#DC2626' },
    { name: 'Green', value: '#16A34A' },
    { name: 'Purple', value: '#9333EA' },
    { name: 'Orange', value: '#EA580C' },
    { name: 'Black', value: '#000000' },
];

export default function EmailSignature() {
    const [activeTab, setActiveTab] = useState('personal');
    const [copied, setCopied] = useState(false);
    const signatureRef = useRef(null);

    const [data, setData] = useState({
        // Personal
        fullName: 'John Doe',
        jobTitle: 'Sales Manager',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        // Company
        companyName: 'Acme Corp',
        website: 'www.example.com',
        address: '123 Business Rd, Tech City',
        logoUrl: 'https://dummyimage.com/100x100/e2e8f0/64748b?text=Logo',
        // Social
        linkedin: '',
        twitter: '',
        instagram: '',
        // Style
        color: '#2563EB',
        font: 'Arial, Helvetica, sans-serif',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setData(prev => ({ ...prev, logoUrl: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCopy = async () => {
        if (!signatureRef.current) return;

        try {
            const html = signatureRef.current.innerHTML;
            const blob = new Blob([html], { type: 'text/html' });
            const textBlob = new Blob([signatureRef.current.innerText], { type: 'text/plain' });
            
            // Try using the Clipboard Item API for rich text
            if (navigator.clipboard && navigator.clipboard.write) {
                 await navigator.clipboard.write([
                    new ClipboardItem({
                        'text/html': blob,
                        'text/plain': textBlob
                    })
                ]);
            } else {
                // Fallback: Select and copy
                const selection = window.getSelection();
                const range = document.createRange();
                range.selectNodeContents(signatureRef.current);
                selection.removeAllRanges();
                selection.addRange(range);
                document.execCommand('copy');
                selection.removeAllRanges();
            }

            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
            alert('Failed to copy. Please manually select the signature and copy it.');
        }
    };

    // We render the signature structure carefully using inline styles for email compatibility
    const renderSignature = () => (
        <table cellPadding="0" cellSpacing="0" style={{ fontFamily: data.font, fontSize: '14px', lineHeight: '1.4', color: '#333' }}>
            <tbody>
                <tr>
                    <td style={{ paddingRight: '20px', verticalAlign: 'top' }}>
                        {data.logoUrl && (
                            <img 
                                src={data.logoUrl} 
                                alt="Logo" 
                                style={{ width: '80px', height: 'auto', borderRadius: '4px' }} 
                            />
                        )}
                    </td>
                    <td style={{ borderLeft: `2px solid ${data.color}`, paddingLeft: '20px', verticalAlign: 'top' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#111', marginBottom: '4px' }}>
                            {data.fullName}
                        </div>
                        <div style={{ color: data.color, marginBottom: '8px', fontWeight: '500' }}>
                            {data.jobTitle}
                        </div>
                        
                        <div style={{ marginBottom: '8px' }}>
                            {data.companyName && (
                                <div style={{ marginBottom: '2px' }}>
                                    <strong>{data.companyName}</strong>
                                </div>
                            )}
                            {data.address && <div>{data.address}</div>}
                        </div>

                        <div style={{ marginBottom: '8px' }}>
                            {data.email && (
                                <div>
                                    <a href={`mailto:${data.email}`} style={{ color: '#333', textDecoration: 'none' }}>
                                        {data.email}
                                    </a>
                                </div>
                            )}
                            {data.phone && (
                                <div>
                                    <a href={`tel:${data.phone}`} style={{ color: '#333', textDecoration: 'none' }}>
                                        {data.phone}
                                    </a>
                                </div>
                            )}
                            {data.website && (
                                <div>
                                    <a href={`https://${data.website.replace(/^https?:\/\//, '')}`} style={{ color: data.color, textDecoration: 'none' }}>
                                        {data.website}
                                    </a>
                                </div>
                            )}
                        </div>

                        {(data.linkedin || data.twitter || data.instagram) && (
                            <div style={{ marginTop: '8px' }}>
                                {data.linkedin && (
                                    <a href={data.linkedin} style={{ display: 'inline-block', marginRight: '8px', color: data.color, textDecoration: 'none', fontSize: '12px' }}>LinkedIn</a>
                                )}
                                {data.twitter && (
                                    <a href={data.twitter} style={{ display: 'inline-block', marginRight: '8px', color: data.color, textDecoration: 'none', fontSize: '12px' }}>Twitter</a>
                                )}
                                {data.instagram && (
                                    <a href={data.instagram} style={{ display: 'inline-block', marginRight: '8px', color: data.color, textDecoration: 'none', fontSize: '12px' }}>Instagram</a>
                                )}
                            </div>
                        )}
                    </td>
                </tr>
            </tbody>
        </table>
    );

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Email Signature Generator | MiniTools by Spinotek</title>
                <meta name="description" content="Create professional email signatures for your brand." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <PenTool size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Email Signature Generator</h1>
                        <p className="text-slate-500 text-sm">Create professional email signatures for your brand.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
                {/* Inputs */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm">
                    {/* Tabs */}
                    <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                        {[
                            { id: 'personal', icon: User, label: 'Personal' },
                            { id: 'company', icon: Building, label: 'Company' },
                            { id: 'social', icon: Share2, label: 'Social' },
                            { id: 'style', icon: Palette, label: 'Style' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                                    activeTab === tab.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                <tab.icon size={16} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        {activeTab === 'personal' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={data.fullName}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
                                    <input
                                        type="text"
                                        name="jobTitle"
                                        value={data.jobTitle}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={data.phone}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'company' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={data.companyName}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Website</label>
                                    <input
                                        type="text"
                                        name="website"
                                        value={data.website}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={data.address}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Logo</label>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <label className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer bg-white">
                                                <Upload size={16} />
                                                Upload Image
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                />
                                            </label>
                                            <span className="text-xs text-slate-400">or</span>
                                            <input
                                                type="text"
                                                name="logoUrl"
                                                value={data.logoUrl}
                                                onChange={handleChange}
                                                placeholder="https://"
                                                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                            />
                                        </div>
                                        <p className="text-xs text-slate-400">
                                            Upload an image or paste a direct link. Square images work best.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'social' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn URL</label>
                                    <input
                                        type="text"
                                        name="linkedin"
                                        value={data.linkedin}
                                        onChange={handleChange}
                                        placeholder="https://linkedin.com/in/..."
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Twitter URL</label>
                                    <input
                                        type="text"
                                        name="twitter"
                                        value={data.twitter}
                                        onChange={handleChange}
                                        placeholder="https://twitter.com/..."
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Instagram URL</label>
                                    <input
                                        type="text"
                                        name="instagram"
                                        value={data.instagram}
                                        onChange={handleChange}
                                        placeholder="https://instagram.com/..."
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'style' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Theme Color</label>
                                    <div className="flex flex-wrap gap-2">
                                        {COLORS.map((color) => (
                                            <button
                                                key={color.value}
                                                onClick={() => setData(prev => ({ ...prev, color: color.value }))}
                                                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                                                    data.color === color.value ? 'border-white ring-2 ring-slate-400' : 'border-transparent'
                                                }`}
                                                style={{ backgroundColor: color.value }}
                                                title={color.name}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Font Family</label>
                                    <div className="space-y-2">
                                        {FONTS.map((font) => (
                                            <label key={font.value} className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-slate-50">
                                                <input
                                                    type="radio"
                                                    name="font"
                                                    value={font.value}
                                                    checked={data.font === font.value}
                                                    onChange={handleChange}
                                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                />
                                                <span style={{ fontFamily: font.value }}>{font.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Preview */}
                <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-bold text-slate-900">Live Preview</h2>
                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                            Changes apply automatically
                        </span>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex-1 flex flex-col">
                        <div className="flex-1 p-8 flex items-center justify-center bg-white overflow-auto">
                            <div ref={signatureRef} className="bg-white p-4 border border-dashed border-slate-200 rounded-lg">
                                {renderSignature()}
                            </div>
                        </div>

                        <div className="p-6 bg-slate-50 border-t border-slate-100">
                            <div className="mb-4 flex items-start gap-3 bg-blue-50 text-blue-800 p-4 rounded-xl text-sm">
                                <Info size={18} className="flex-shrink-0 mt-0.5" />
                                <p>
                                    Click <strong>Copy Signature</strong> below, then go to your email settings (Gmail, Outlook, etc.) and paste (Ctrl+V) it into the signature box.
                                </p>
                            </div>
                            <button
                                onClick={handleCopy}
                                className={`w-full flex items-center justify-center gap-2 font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl ${
                                    copied
                                        ? 'bg-green-600 text-white'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                            >
                                {copied ? <Check size={20} /> : <Copy size={20} />}
                                {copied ? 'Copied to Clipboard!' : 'Copy Signature'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="email-sig" categoryId="sales" />
        </ToolPageLayout>
    );
}
