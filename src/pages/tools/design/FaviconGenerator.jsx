import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Globe, Type, Image as ImageIcon, Download, RefreshCw } from 'lucide-react';
import JSZip from 'jszip';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function FaviconGenerator() {
    const [mode, setMode] = useState('text'); // 'text', 'image', 'emoji'
    const [text, setText] = useState('S');
    const [bgColor, setBgColor] = useState('#3b82f6');
    const [textColor, setTextColor] = useState('#ffffff');
    const [shape, setShape] = useState('rounded'); // 'square', 'rounded', 'circle'
    const [font, setFont] = useState('sans-serif');
    const [uploadedImage, setUploadedImage] = useState(null);
    const canvasRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState('');

    const fonts = ['sans-serif', 'serif', 'monospace', 'cursive', 'fantasy'];

    useEffect(() => {
        drawFavicon();
    }, [mode, text, bgColor, textColor, shape, font, uploadedImage]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const img = new Image();
                img.src = ev.target.result;
                img.onload = () => {
                    setUploadedImage(img);
                    setMode('image');
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const drawFavicon = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const size = 512; // High res base
        canvas.width = size;
        canvas.height = size;

        // Clear
        ctx.clearRect(0, 0, size, size);

        // Draw Background (Shape)
        if (mode !== 'image' || (mode === 'image' && !uploadedImage)) {
            ctx.fillStyle = bgColor;
            if (shape === 'square') {
                ctx.fillRect(0, 0, size, size);
            } else if (shape === 'rounded') {
                const r = size * 0.2;
                ctx.beginPath();
                ctx.roundRect(0, 0, size, size, r);
                ctx.fill();
            } else if (shape === 'circle') {
                ctx.beginPath();
                ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Draw Content
        if (mode === 'text' || mode === 'emoji') {
            ctx.fillStyle = textColor;
            ctx.font = `bold ${size * 0.6}px ${font}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            // Adjust y slightly for visual center
            ctx.fillText(text, size/2, size/2 + size * 0.05);
        } else if (mode === 'image' && uploadedImage) {
            // Draw image contained or cropped?
            // Let's draw it cover but within shape if we want shape?
            // Usually favicon generators just resize input image if image mode.
            // But let's allow background shape + image if requested?
            // For simplicity: If image mode, just draw image.
            // If user wants shape, they should upload image with transparent bg?
            // Let's support shape + image centering if they want.
            // Actually standard behavior: Image mode = straightforward resize.
            // But let's use the shape mask!
            
            ctx.save();
            ctx.beginPath();
            if (shape === 'square') { // No clip needed really
                ctx.rect(0, 0, size, size);
            } else if (shape === 'rounded') {
                const r = size * 0.2;
                ctx.roundRect(0, 0, size, size, r);
            } else if (shape === 'circle') {
                ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
            }
            ctx.clip();
            
            // Draw image cover
            const scale = Math.max(size / uploadedImage.width, size / uploadedImage.height);
            const x = (size / 2) - (uploadedImage.width / 2) * scale;
            const y = (size / 2) - (uploadedImage.height / 2) * scale;
            ctx.drawImage(uploadedImage, x, y, uploadedImage.width * scale, uploadedImage.height * scale);
            ctx.restore();
        }

        setPreviewUrl(canvas.toDataURL());
    };

    const downloadPackage = async () => {
        const zip = new JSZip();
        const sizes = [16, 32, 48, 180, 192, 512];
        
        for (const s of sizes) {
            const canvas = document.createElement('canvas');
            canvas.width = s;
            canvas.height = s;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(canvasRef.current, 0, 0, s, s);
            
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
            const name = s === 16 ? 'favicon.ico' : (s === 180 ? 'apple-touch-icon.png' : `favicon-${s}x${s}.png`);
            // Note: true .ico is different format, usually just 16x16 or 32x32 png works in modern browsers, 
            // but strict ICO requires header. Browsers rename png to ico fine usually.
            // For proper ICO we need a library, but let's stick to PNGs mostly and name one favicon.ico (modern browsers handle png with ico ext or just png)
            zip.file(name, blob);
        }
        
        // Add HTML code snippet
        const html = `
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
        `.trim();
        zip.file("code.html", html);

        const content = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(content);
        const link = document.createElement('a');
        link.href = url;
        link.download = "favicon-package.zip";
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Favicon Generator | MiniTools by Spinotek</title>
                <meta name="description" content="Create professional favicons from text, emoji, or images instantly." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <Globe size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Favicon Generator</h1>
                        <p className="text-slate-500">Generate icons for all platforms and browsers.</p>
                    </div>
                </div>
                <button 
                    onClick={downloadPackage}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-200"
                >
                    <Download size={20} /> Download Package
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-6">
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                            <button 
                                onClick={() => setMode('text')} 
                                className={`flex-1 flex justify-center items-center gap-2 py-2 rounded-lg font-bold text-sm transition-all ${mode === 'text' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                <Type size={16} /> Text
                            </button>
                            <button 
                                onClick={() => setMode('image')} 
                                className={`flex-1 flex justify-center items-center gap-2 py-2 rounded-lg font-bold text-sm transition-all ${mode === 'image' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                <ImageIcon size={16} /> Image
                            </button>
                        </div>

                        {mode === 'text' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Text / Emoji</label>
                                    <input 
                                        type="text" 
                                        maxLength={2}
                                        value={text} 
                                        onChange={(e) => setText(e.target.value)} 
                                        className="w-full text-center text-2xl font-bold p-2 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Font Family</label>
                                    <select 
                                        value={font} 
                                        onChange={(e) => setFont(e.target.value)}
                                        className="w-full rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        {fonts.map(f => <option key={f} value={f}>{f}</option>)}
                                    </select>
                                </div>
                            </div>
                        )}

                         {mode === 'image' && (
                            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:bg-slate-50 transition-colors relative">
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                                <ImageIcon className="mx-auto text-indigo-500 mb-2" size={32} />
                                <p className="text-sm font-bold text-slate-700">Upload Image</p>
                            </div>
                        )}

                        <div>
                             <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Shape</label>
                             <div className="flex gap-2">
                                <button onClick={() => setShape('square')} className={`flex-1 h-10 border-2 rounded transition-colors ${shape === 'square' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200'}`}></button>
                                <button onClick={() => setShape('rounded')} className={`flex-1 h-10 border-2 rounded-xl transition-colors ${shape === 'rounded' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200'}`}></button>
                                <button onClick={() => setShape('circle')} className={`flex-1 h-10 border-2 rounded-full transition-colors ${shape === 'circle' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200'}`}></button>
                             </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Background</label>
                                <div className="flex gap-2">
                                    <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-8 h-8 rounded border-0 p-0 cursor-pointer"/>
                                    <input type="text" value={bgColor} onChange={e => setBgColor(e.target.value)} className="flex-1 text-sm border-slate-200 rounded-lg"/>
                                </div>
                            </div>
                            {mode === 'text' && (
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Text Color</label>
                                     <div className="flex gap-2">
                                        <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-8 h-8 rounded border-0 p-0 cursor-pointer"/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center min-h-[400px]">
                        <div className="mb-4 text-slate-400 font-bold uppercase text-xs tracking-wider">Preview (512px)</div>
                        <img src={previewUrl} alt="Favicon Preview" className="w-32 h-32 shadow-2xl mb-8" />
                        
                        <div className="grid grid-cols-4 gap-8">
                            <div className="flex flex-col items-center gap-2">
                                <img src={previewUrl} alt="16x16" className="w-4 h-4 shadow-sm" />
                                <span className="text-xs text-slate-400">16px</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <img src={previewUrl} alt="32x32" className="w-8 h-8 shadow-sm" />
                                <span className="text-xs text-slate-400">32px</span>
                            </div>
                           <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center">
                                    <img src={previewUrl} alt="App Icon" className="w-8 h-8 rounded" />
                                </div>
                                <span className="text-xs text-slate-400">App Icon</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-16 h-8 bg-white border border-slate-200 rounded-t-lg flex items-center px-2 gap-2 mt-4">
                                    <img src={previewUrl} alt="Tab" className="w-4 h-4" />
                                    <div className="h-2 w-8 bg-slate-200 rounded-full"></div>
                                </div>
                                <span className="text-xs text-slate-400">Browser Tab</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden Canvas for Processing */}
            <canvas ref={canvasRef} className="hidden" />

            <RelatedTools currentToolId="favicon-gen" categoryId="design" />
        </ToolPageLayout>
    );
}
