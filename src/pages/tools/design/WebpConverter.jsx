import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileOutput, Upload, Download, Check, X, FileImage } from 'lucide-react';
import JSZip from 'jszip';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function WebpConverter() {
    const [files, setFiles] = useState([]);
    const [quality, setQuality] = useState(0.8);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedFiles, setProcessedFiles] = useState([]);

    const handleFileSelect = (e) => {
        const selected = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
        setFiles(prev => [...prev, ...selected]);
        // Reset processed state
        setProcessedFiles([]);
    };

    const processFiles = async () => {
        setIsProcessing(true);
        setProcessedFiles([]);
        const results = [];

        for (const file of files) {
            try {
                const result = await convertToWebP(file);
                results.push(result);
            } catch (err) {
                console.error("Error converting file", file.name, err);
                results.push({
                    original: file,
                    error: true
                });
            }
        }
        setProcessedFiles(results);
        setIsProcessing(false);
    };

    const convertToWebP = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    
                    canvas.toBlob((blob) => {
                        if (blob) {
                            resolve({
                                original: file,
                                blob: blob,
                                url: URL.createObjectURL(blob),
                                size: blob.size,
                                savings: ((file.size - blob.size) / file.size * 100).toFixed(1)
                            });
                        } else {
                            reject(new Error("Canvas to Blob failed"));
                        }
                    }, 'image/webp', quality);
                };
                img.onerror = (e) => reject(e);
            };
            reader.onerror = (e) => reject(e);
        });
    };

    const downloadAll = async () => {
        const zip = new JSZip();
        processedFiles.forEach(item => {
            if (!item.error) {
                const name = item.original.name.replace(/\.[^/.]+$/, "") + ".webp";
                zip.file(name, item.blob);
            }
        });
        const content = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(content);
        const link = document.createElement('a');
        link.href = url;
        link.download = "converted-images.zip";
        link.click();
        URL.revokeObjectURL(url);
    };

    const downloadOne = (item) => {
        const link = document.createElement('a');
        link.href = item.url;
        link.download = item.original.name.replace(/\.[^/.]+$/, "") + ".webp";
        link.click();
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Image to WebP Converter | MiniTools by Spinotek</title>
                <meta name="description" content="Convert JPG and PNG images to high-performance WebP format instantly in your browser." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sky-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-200">
                        <FileOutput size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Image-to-WebP Converter</h1>
                        <p className="text-slate-500 text-sm">Convert your images to high-performance WebP format.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-6">
                        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 hover:bg-slate-50 hover:border-sky-300 transition-colors text-center cursor-pointer relative">
                            <input 
                                type="file" 
                                multiple 
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={handleFileSelect}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <Upload className="mx-auto text-sky-500 mb-4" size={48} />
                            <p className="font-bold text-slate-700">Click or Drag Files Here</p>
                            <p className="text-sm text-slate-400 mt-2">Supports JPG, PNG</p>
                        </div>

                        {files.length > 0 && (
                            <div>
                                <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                                    <span>Quality: {Math.round(quality * 100)}%</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="0.1" 
                                    max="1.0" 
                                    step="0.05"
                                    value={quality}
                                    onChange={(e) => setQuality(Number(e.target.value))}
                                    className="w-full accent-sky-600 h-2 bg-slate-200 rounded-full appearance-none cursor-pointer"
                                />
                            </div>
                        )}

                        <button 
                            onClick={processFiles}
                            disabled={files.length === 0 || isProcessing}
                            className={`w-full py-3 rounded-xl font-bold transition-all ${
                                files.length > 0 && !isProcessing
                                    ? 'bg-sky-600 text-white hover:bg-sky-700 shadow-lg shadow-sky-200'
                                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                        >
                            {isProcessing ? 'Converting...' : 'Convert to WebP'}
                        </button>
                    </div>

                    
                </div>

                <div className="lg:col-span-2 space-y-6">
                     {processedFiles.length > 0 ? (
                        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
                            <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="font-bold text-slate-700">Results ({processedFiles.length})</h3>
                                <button 
                                    onClick={downloadAll}
                                    className="text-sm font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm transition-colors"
                                >
                                    <Download size={14} /> Download All (ZIP)
                                </button>
                            </div>
                            <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
                                {processedFiles.map((item, index) => (
                                    <div key={index} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                                        <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden border border-slate-200">
                                            {item.error ? <X className="text-red-400" /> : <img src={item.url} alt="Result" className="w-full h-full object-cover" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-slate-700 truncate">{item.original.name}</p>
                                            {item.error ? (
                                                <span className="text-red-500 text-xs font-bold">Error Processing</span>
                                            ) : (
                                                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                                    <span className="line-through">{(item.original.size / 1024).toFixed(1)} KB</span>
                                                    <ArrowRight size={10} />
                                                    <span className="text-green-600 font-bold">{(item.size / 1024).toFixed(1)} KB</span>
                                                    <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded-md text-[10px] font-bold">-{item.savings}%</span>
                                                </div>
                                            )}
                                        </div>
                                        {!item.error && (
                                            <button 
                                                onClick={() => downloadOne(item)}
                                                className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                                            >
                                                <Download size={20} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                     ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-300 min-h-[300px] border-2 border-dashed border-slate-100 rounded-3xl">
                            <FileImage size={48} className="mb-4 opacity-50" />
                            <p>Converted files will appear here</p>
                        </div>
                     )}
                </div>
            </div>

            <RelatedTools currentToolId="webp-conv" categoryId="design" />
        </ToolPageLayout>
    );
}

function ArrowRight({ size }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    )
}
