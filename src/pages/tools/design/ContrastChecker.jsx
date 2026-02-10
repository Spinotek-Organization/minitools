import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Eye, Check, X, RefreshCw } from 'lucide-react';
import chroma from 'chroma-js';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function ContrastChecker() {
    const [foreground, setForeground] = useState('#ffffff');
    const [background, setBackground] = useState('#3b82f6');
    const [ratio, setRatio] = useState(0);
    const [status, setStatus] = useState({ aa_sm: false, aa_lg: false, aaa_sm: false, aaa_lg: false });
    const [suggestion, setSuggestion] = useState('');

    useEffect(() => {
        try {
            const r = chroma.contrast(foreground, background);
            setRatio(r);
            setStatus({
                aa_sm: r >= 4.5,
                aa_lg: r >= 3,
                aaa_sm: r >= 7,
                aaa_lg: r >= 4.5
            });

            if (r < 4.5) {
                // Find better color
                // Try lightening or darkening the background until it works? 
                // Suggest flipping or using a darker/lighter shade.
                setSuggestion("Try increasing the contrast by using a darker background or lighter text.");
            } else {
                setSuggestion("Great contrast! Your text is accessible.");
            }
        } catch (e) {
            setRatio(0);
        }
    }, [foreground, background]);

    const getStatusIcon = (pass) => pass ? <Check className="text-green-500" size={20}/> : <X className="text-red-500" size={20}/>;
    const getStatusText = (pass) => pass ? <span className="text-green-600 font-bold">PASS</span> : <span className="text-red-600 font-bold">FAIL</span>;

    const swapColors = () => {
        const temp = foreground;
        setForeground(background);
        setBackground(temp);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Contrast Ratio Checker | MiniTools by Spinotek</title>
                <meta name="description" content="Ensure your design is accessible with our WCAG AA/AAA contrast checker." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-200">
                        <Eye size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Contrast Ratio Checker</h1>
                        <p className="text-slate-500">Check WCAG compliance for text accessibility.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Text Color</label>
                            <div className="flex items-center gap-2 border rounded-xl p-2">
                                <input 
                                    type="color" 
                                    value={foreground}
                                    onChange={(e) => setForeground(e.target.value)}
                                    className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                                />
                                <input 
                                    type="text" 
                                    value={foreground}
                                    onChange={(e) => setForeground(e.target.value)}
                                    className="w-full border-none focus:ring-0 font-mono text-sm uppercase"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Background Color</label>
                            <div className="flex items-center gap-2 border rounded-xl p-2">
                                <input 
                                    type="color" 
                                    value={background}
                                    onChange={(e) => setBackground(e.target.value)}
                                    className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                                />
                                <input 
                                    type="text" 
                                    value={background}
                                    onChange={(e) => setBackground(e.target.value)}
                                    className="w-full border-none focus:ring-0 font-mono text-sm uppercase"
                                />
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={swapColors}
                        className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl font-medium transition-colors flex justify-center items-center gap-2"
                    >
                        <RefreshCw size={18} /> Swap Colors
                    </button>

                    <div className="space-y-4">
                        <h3 className="font-bold text-slate-900">WCAG Scores</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                                <div>
                                    <div className="text-xs text-slate-500 font-bold mb-1">AA - NORMAL TEXT</div>
                                    {getStatusText(status.aa_sm)}
                                </div>
                                {getStatusIcon(status.aa_sm)}
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                                <div>
                                    <div className="text-xs text-slate-500 font-bold mb-1">AA - LARGE TEXT</div>
                                    {getStatusText(status.aa_lg)}
                                </div>
                                {getStatusIcon(status.aa_lg)}
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                                <div>
                                    <div className="text-xs text-slate-500 font-bold mb-1">AAA - NORMAL TEXT</div>
                                    {getStatusText(status.aaa_sm)}
                                </div>
                                {getStatusIcon(status.aaa_sm)}
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                                <div>
                                    <div className="text-xs text-slate-500 font-bold mb-1">AAA - LARGE TEXT</div>
                                    {getStatusText(status.aaa_lg)}
                                </div>
                                {getStatusIcon(status.aaa_lg)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="space-y-8">
                    {/* Big Score Display */}
                    <div className={`p-8 rounded-3xl text-center border-4 ${ratio >= 4.5 ? 'border-green-100 bg-green-50' : 'border-red-100 bg-red-50'}`}>
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Contrast Ratio</div>
                        <div className={`text-6xl font-black ${ratio >= 4.5 ? 'text-green-600' : 'text-red-600'}`}>
                            {ratio.toFixed(2)}:1
                        </div>
                        <p className="mt-4 text-slate-600 font-medium">{suggestion}</p>
                    </div>

                    {/* Live Preview */}
                    <div 
                        className="rounded-3xl p-8 shadow-xl transition-all duration-300 min-h-[300px] flex flex-col justify-center gap-6"
                        style={{ backgroundColor: background, color: foreground }}
                    >
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Designed for Everyone.</h2>
                            <p className="text-lg opacity-90">Good contrast ensures that your content is readable by everyone, regardless of their visual capabilities.</p>
                        </div>
                        <div className="flex gap-4">
                            <button 
                                className="px-6 py-3 rounded-xl font-bold transition-transform active:scale-95"
                                style={{ backgroundColor: foreground, color: background }}
                            >
                                Primary Action
                            </button>
                            <button 
                                className="px-6 py-3 rounded-xl font-bold border-2 transition-transform active:scale-95"
                                style={{ borderColor: foreground, color: foreground }}
                            >
                                Secondary
                            </button>
                        </div>
                        <div className="text-xs opacity-70 mt-4">
                            This is a sample of small text (12px).
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="contrast-check" categoryId="design" />
        </ToolPageLayout>
    );
}
