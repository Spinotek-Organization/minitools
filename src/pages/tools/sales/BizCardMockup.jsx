import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { CreditCard, Upload, Download, Layers, Box, Grid } from 'lucide-react';
import { toPng } from 'html-to-image';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function BizCardMockup() {
    const { t } = useTranslation();

    const SCENES = [
        { id: 'floating', name: t('tools.biz-card-mockup.scenes.floating'), icon: Box },
        { id: 'stack', name: t('tools.biz-card-mockup.scenes.stack'), icon: Layers },
        { id: 'flat', name: t('tools.biz-card-mockup.scenes.flat'), icon: Grid },
    ];

    const [frontImage, setFrontImage] = useState(DEFAULT_FRONT);
    const [backImage, setBackImage] = useState(DEFAULT_BACK);
    const [scene, setScene] = useState('floating');
    const canvasRef = useRef(null);

    const handleUpload = (e, side) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (side === 'front') setFrontImage(reader.result);
                else setBackImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDownload = async () => {
        if (!canvasRef.current) return;
        try {
            const dataUrl = await toPng(canvasRef.current, { quality: 0.95, pixelRatio: 2 });
            const link = document.createElement('a');
            link.download = `bizcard-mockup-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to generate image', err);
        }
    };

    const Card = ({ image, className = '' }) => (
        <div className={`w-[350px] h-[200px] bg-white rounded-lg shadow-xl overflow-hidden relative ${className}`}>
            <img src={image} alt="Card" className="w-full h-full object-cover" />
        </div>
    );

    return (
        <ToolPageLayout toolId="biz-card-mockup">
            <Helmet>
                <title>{t('tools.biz-card-mockup.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.biz-card-mockup.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <CreditCard size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.biz-card-mockup.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.biz-card-mockup.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Controls */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Upload Designs</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Front Side</label>
                                <div className="relative group">
                                    <div className="w-full h-32 rounded-xl overflow-hidden border-2 border-dashed border-slate-300 group-hover:border-amber-500 transition-colors bg-slate-50 relative">
                                        <img src={frontImage} alt="Front" className="w-full h-full object-cover opacity-80" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Upload className="text-white drop-shadow-md" size={24} />
                                        </div>
                                    </div>
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={(e) => handleUpload(e, 'front')} 
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Back Side</label>
                                <div className="relative group">
                                    <div className="w-full h-32 rounded-xl overflow-hidden border-2 border-dashed border-slate-300 group-hover:border-amber-500 transition-colors bg-slate-50 relative">
                                        <img src={backImage} alt="Back" className="w-full h-full object-cover opacity-80" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Upload className="text-white drop-shadow-md" size={24} />
                                        </div>
                                    </div>
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={(e) => handleUpload(e, 'back')} 
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                         <h2 className="text-lg font-bold text-slate-900 mb-4">Select Scene</h2>
                         <div className="grid grid-cols-1 gap-2">
                            {SCENES.map(s => (
                                <button
                                    key={s.id}
                                    onClick={() => setScene(s.id)}
                                    className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                                        scene === s.id
                                            ? 'bg-amber-50 border-amber-200 text-amber-900 ring-1 ring-amber-500'
                                            : 'bg-white border-slate-200 hover:bg-slate-50'
                                    }`}
                                >
                                    <s.icon size={20} className={scene === s.id ? 'text-amber-600' : 'text-slate-400'} />
                                    <span className="font-bold text-sm">{s.name}</span>
                                </button>
                            ))}
                         </div>
                    </div>
                </div>

                {/* Preview Canvas */}
                <div className="lg:col-span-2">
                     <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-slate-900">Mockup Preview</h2>
                        <button
                            onClick={handleDownload}
                            className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center gap-2"
                        >
                            <Download size={18} />
                            Download
                        </button>
                    </div>

                    <div className="bg-slate-200 rounded-3xl p-8 flex items-center justify-center min-h-[500px] overflow-hidden shadow-inner relative">
                        {/* The Canvas to Capture */}
                        <div 
                            ref={canvasRef} 
                            className="relative w-[800px] h-[600px] bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center overflow-hidden"
                            style={{ perspective: '1200px' }}
                        >   
                            {/* Scene: Floating */}
                            {scene === 'floating' && (
                                <div className="relative transform-style-3d rotate-x-6 rotate-z-[-10deg] hover:rotate-z-0 transition-transform duration-700 ease-out">
                                    <div className="absolute top-10 left-10 transform translate-z-[-20px] bg-black/20 w-[350px] h-[200px] blur-xl rounded-lg"></div>
                                    <Card image={frontImage} className="relative z-20" />
                                    <div className="absolute -bottom-32 -right-20 transform translate-z-[-40px] rotate-z-12 opacity-80">
                                        <Card image={backImage} />
                                    </div>
                                </div>
                            )}

                             {/* Scene: Stack */}
                            {scene === 'stack' && (
                                <div className="relative transform rotate-z-[-5deg]">
                                     <Card image={backImage} className="absolute top-0 left-0 transform translate-x-4 translate-y-4 opacity-50 shadow-none border border-slate-200" />
                                     <Card image={backImage} className="absolute top-0 left-0 transform translate-x-2 translate-y-2 opacity-80 shadow-md" />
                                     <Card image={frontImage} className="relative z-10 shadow-2xl" />
                                </div>
                            )}

                             {/* Scene: Flat */}
                            {scene === 'flat' && (
                                <div className="grid grid-cols-1 gap-8 transform rotate-z-0">
                                    <div className="space-y-2 text-center">
                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Front</div>
                                        <Card image={frontImage} className="shadow-lg" />
                                    </div>
                                    <div className="space-y-2 text-center">
                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Back</div>
                                        <Card image={backImage} className="shadow-lg" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="biz-card-mockup" categoryId="sales" />
        </ToolPageLayout>
    );
}
