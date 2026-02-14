import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { BadgeCheck, Upload, Download, Type, Image as ImageIcon, RotateCw, Grid } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function WatermarkTool() {
    const { t } = useTranslation('tools');
    const [baseImage, setBaseImage] = useState(null);
    const [watermarkImage, setWatermarkImage] = useState(null);
    const [watermarkText, setWatermarkText] = useState('My Watermark');
    const [mode, setMode] = useState('text'); // text, image
    
    // Controls
    const [opacity, setOpacity] = useState(0.5);
    const [scale, setScale] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [position, setPosition] = useState('center'); // top-left, top-center, top-right, etc.
    const [color, setColor] = useState('#ffffff');
    const [fontSize, setFontSize] = useState(48);

    const canvasRef = useRef(null);
    
    // Load images
    const baseImgRef = useRef(new Image());
    const wmImgRef = useRef(new Image());

    const handleBaseUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            baseImgRef.current.src = url;
            baseImgRef.current.onload = () => {
                setBaseImage(url);
                drawCanvas();
            };
        }
    };

    const handleWmUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            wmImgRef.current.src = url;
            wmImgRef.current.onload = () => {
                setWatermarkImage(url);
                setMode('image');
            };
        }
    };

    const drawCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx || !baseImage) return;

        const img = baseImgRef.current;
        
        // Set canvas size to image size
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw base
        ctx.drawImage(img, 0, 0);

        // Draw Watermark
        ctx.globalAlpha = opacity;
        ctx.save();

        let x = 0, y = 0, w = 0, h = 0;

        if (mode === 'image' && watermarkImage) {
            const wm = wmImgRef.current;
            w = wm.width * scale * (canvas.width / 1000); // Relative scale
            h = wm.height * scale * (canvas.width / 1000);
            
            // Calculate Position
            const p = getPositionCoords(position, canvas.width, canvas.height, w, h);
            x = p.x;
            y = p.y;

            // Rotate around center of watermark
            ctx.translate(x + w/2, y + h/2);
            ctx.rotate((rotation * Math.PI) / 180);
            ctx.drawImage(wm, -w/2, -h/2, w, h);

        } else {
            // Text Mode
            const fontSizePx = fontSize * (canvas.width / 1000) * scale;
            ctx.font = `bold ${fontSizePx}px sans-serif`;
            ctx.fillStyle = color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            w = ctx.measureText(watermarkText).width;
            h = fontSizePx; // Approx

            const p = getPositionCoords(position, canvas.width, canvas.height, 0, 0); 
            // Text positioning logic slightly different as we use alignment
            
            ctx.translate(p.x, p.y);
            ctx.rotate((rotation * Math.PI) / 180);
            ctx.fillText(watermarkText, 0, 0);
        }

        ctx.restore();
        ctx.globalAlpha = 1.0;
    };

    // Helper for grid positioning
    const getPositionCoords = (pos, cw, ch, w, h) => {
        const padding = cw * 0.05;
        let x = cw / 2;
        let y = ch / 2;

        if (pos.includes('left')) x = padding + w/2;
        if (pos.includes('right')) x = cw - padding - w/2;
        if (pos.includes('top')) y = padding + h/2;
        if (pos.includes('bottom')) y = ch - padding - h/2;

        return { x, y };
    };

    // Redraw whenever state changes
    useEffect(() => {
        if (baseImage) {
            // Wait for next frame to ensure resources loaded or just call
            requestAnimationFrame(drawCanvas);
        }
    }, [baseImage, watermarkImage, watermarkText, mode, opacity, scale, rotation, position, color, fontSize]);

    const downloadImage = () => {
        const link = document.createElement('a');
        link.download = 'watermarked-image.png';
        link.href = canvasRef.current.toDataURL();
        link.click();
    };

    const positions = [
        'top-left', 'top-center', 'top-right',
        'center-left', 'center', 'center-right',
        'bottom-left', 'bottom-center', 'bottom-right'
    ];

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('watermark-tool.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('watermark-tool.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-200">
                        <BadgeCheck size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('watermark-tool.title')}</h1>
                        <p className="text-slate-500">{t('watermark-tool.subtitle')}</p>
                    </div>
                </div>
                {baseImage && (
                    <button 
                        onClick={downloadImage}
                        className="px-6 py-3 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 transition-colors flex items-center gap-2 shadow-lg shadow-amber-200"
                    >
                        <Download size={20} /> {t('watermark-tool.buttons.download')}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-6">
                        {/* Upload Base */}
                        {!baseImage && (
                            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 hover:bg-slate-50 transition-colors text-center cursor-pointer relative">
                                <input type="file" onChange={handleBaseUpload} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                                <Upload className="mx-auto text-amber-500 mb-4" size={40} />
                                <p className="font-bold text-slate-700">{t('watermark-tool.labels.uploadBase')}</p>
                            </div>
                        )}

                        {baseImage && (
                            <>
                                {/* Mode Switch */}
                                <div className="flex bg-slate-100 rounded-lg p-1">
                                    <button onClick={() => setMode('text')} className={`flex-1 py-2 text-xs font-bold rounded-md ${mode === 'text' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}>{t('watermark-tool.buttons.text')}</button>
                                    <button onClick={() => setMode('image')} className={`flex-1 py-2 text-xs font-bold rounded-md ${mode === 'image' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}>{t('watermark-tool.buttons.image')}</button>
                                </div>

                                {/* Watermark Input */}
                                {mode === 'text' ? (
                                    <div className="space-y-4">
                                        <input 
                                            type="text" 
                                            value={watermarkText}
                                            onChange={(e) => setWatermarkText(e.target.value)}
                                            className="w-full text-sm font-bold p-3 rounded-xl border-slate-200 focus:ring-amber-500"
                                            placeholder={t('watermark-tool.placeholders.text')}
                                        />
                                        <div className="flex gap-2">
                                            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 w-10 p-0 border-0 rounded cursor-pointer" />
                                            <input 
                                                type="number" 
                                                value={fontSize} 
                                                onChange={(e) => setFontSize(Number(e.target.value))} 
                                                className="flex-1 p-2 border rounded-lg"
                                                placeholder={t('watermark-tool.labels.size')}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center relative hover:bg-slate-50">
                                        <input type="file" onChange={handleWmUpload} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                                         <p className="text-xs font-bold text-slate-500">
                                             {watermarkImage ? t('watermark-tool.labels.changeLogo') : t('watermark-tool.labels.uploadLogo')}
                                         </p>
                                    </div>
                                )}

                                {/* Sliders */}
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs font-bold text-slate-500">
                                            <span>{t('watermark-tool.labels.opacity')}</span>
                                            <span>{Math.round(opacity * 100)}%</span>
                                        </div>
                                        <input type="range" min="0" max="1" step="0.1" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full h-1 bg-slate-200 rounded-full appearance-none accent-amber-500" />
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs font-bold text-slate-500">
                                            <span>{t('watermark-tool.labels.scale')}</span>
                                            <span>{scale}x</span>
                                        </div>
                                        <input type="range" min="0.1" max="5" step="0.1" value={scale} onChange={(e) => setScale(Number(e.target.value))} className="w-full h-1 bg-slate-200 rounded-full appearance-none accent-amber-500" />
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs font-bold text-slate-500">
                                            <span>{t('watermark-tool.labels.rotation')}</span>
                                            <span>{rotation}°</span>
                                        </div>
                                        <input type="range" min="0" max="360" value={rotation} onChange={(e) => setRotation(Number(e.target.value))} className="w-full h-1 bg-slate-200 rounded-full appearance-none accent-amber-500" />
                                    </div>
                                </div>

                                {/* Position Grid */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-2">{t('watermark-tool.labels.position')}</label>
                                    <div className="grid grid-cols-3 gap-1 w-24 mx-auto">
                                        {positions.map(pos => (
                                            <button 
                                                key={pos}
                                                onClick={() => setPosition(pos)}
                                                className={`aspect-square rounded border ${
                                                    position === pos 
                                                        ? 'bg-amber-500 border-amber-500' 
                                                        : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Preview */}
                <div className="lg:col-span-2">
                    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-4 flex items-center justify-center min-h-[500px] overflow-hidden">
                        {baseImage ? (
                            <canvas 
                                ref={canvasRef}
                                className="max-w-full max-h-[600px] object-contain shadow-2xl"
                            />
                        ) : (
                            <div className="text-slate-500 flex flex-col items-center">
                                <ImageIcon size={48} className="mb-4 opacity-20" />
                                <p>{t('tools.watermark-tool.placeholders.empty')}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="watermark-tool" categoryId="content" />
        </ToolPageLayout>
    );
}
