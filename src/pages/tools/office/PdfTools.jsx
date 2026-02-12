import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FilePlus2, Split, Merge, Upload, Download, Trash2, ArrowUp, ArrowDown, FileText } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function PdfTools() {
    const { t } = useTranslation('tools');
    const [mode, setMode] = useState('merge'); // 'merge' or 'split'
    const [files, setFiles] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [splitRange, setSplitRange] = useState({ start: 1, end: 1 });
    const [splitFile, setSplitFile] = useState(null);

    // Common
    const handleFileUpload = (e) => {
        const uploadedFiles = Array.from(e.target.files);
        if (mode === 'merge') {
            setFiles(prev => [...prev, ...uploadedFiles]);
        } else {
            if (uploadedFiles.length > 0) {
                setSplitFile(uploadedFiles[0]);
                // Reset range when new file uploaded
                setSplitRange({ start: 1, end: 1 });
            }
        }
    };

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const moveFile = (index, direction) => {
        const newFiles = [...files];
        const targetIndex = index + direction;
        if (targetIndex >= 0 && targetIndex < newFiles.length) {
            [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
            setFiles(newFiles);
        }
    };

    // MERGE LOGIC
    const mergePdfs = async () => {
        if (files.length < 2) return;
        setIsProcessing(true);
        try {
            const mergedPdf = await PDFDocument.create();
            
            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const pdfBytes = await mergedPdf.save();
            downloadPdf(pdfBytes, 'merged_document.pdf');
        } catch (error) {
            console.error(error);
            alert(t('pdf-merge.alerts.mergeError'));
        }
        setIsProcessing(false);
    };


    // SPLIT LOGIC
    const splitPdf = async () => {
        if (!splitFile) return;
        setIsProcessing(true);
        try {
            const arrayBuffer = await splitFile.arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            const pageCount = pdf.getPageCount();

            // Validate range
            let start = Math.max(1, Math.min(splitRange.start, pageCount));
            let end = Math.max(start, Math.min(splitRange.end, pageCount));

            const newPdf = await PDFDocument.create();
            // indices are 0-based
            const pageIndices = [];
            for (let i = start - 1; i < end; i++) {
                pageIndices.push(i);
            }
            
            const copiedPages = await newPdf.copyPages(pdf, pageIndices);
            copiedPages.forEach((page) => newPdf.addPage(page));

            const pdfBytes = await newPdf.save();
            downloadPdf(pdfBytes, `split_${start}-${end}_${splitFile.name}`);

        } catch (error) {
            console.error(error);
            alert(t('pdf-merge.alerts.splitError'));
        }
        setIsProcessing(false);
    }

    const downloadPdf = (bytes, filename) => {
        const blob = new Blob([bytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    };

    return (
        <ToolPageLayout toolId="pdf-merge">
            <Helmet>
                <title>{t('pdf-merge.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('pdf-merge.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-red-200">
                        <FilePlus2 size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('pdf-merge.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('pdf-merge.desc')}</p>
                    </div>
                </div>

                <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                        onClick={() => { setMode('merge'); setFiles([]); setSplitFile(null); }}
                        className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${mode === 'merge' ? 'bg-white shadow-sm text-red-600' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Merge size={16} /> {t('pdf-merge.actions.merge')}
                    </button>
                    <button
                        onClick={() => { setMode('split'); setFiles([]); setSplitFile(null); }}
                        className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${mode === 'split' ? 'bg-white shadow-sm text-red-600' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Split size={16} /> {t('pdf-merge.actions.split')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Main Interaction Area */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* MERGE MODE UI */}
                    {mode === 'merge' && (
                        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center">
                            <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-2xl h-48 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative group">
                                <input
                                    type="file"
                                    accept=".pdf"
                                    multiple
                                    onChange={handleFileUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="p-4 bg-white rounded-full shadow-md mb-4 text-red-500 group-hover:scale-110 transition-transform">
                                    <Upload size={24} />
                                </div>
                                <h3 className="font-bold text-slate-700">{t('pdf-merge.dropzone.title')}</h3>
                                <p className="text-sm text-slate-400 mt-1">{t('pdf-merge.dropzone.subtitle')}</p>
                            </div>

                            {files.length > 0 && (
                                <div className="mt-8 text-left">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 flex justify-between">
                                        <span>{t('pdf-merge.fileList.title')} ({files.length})</span>
                                        <button onClick={() => setFiles([])} className="text-red-500 hover:underline">{t('pdf-merge.fileList.clear')}</button>
                                    </h4>
                                    <div className="space-y-3">
                                        {files.map((file, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 animate-in fade-in slide-in-from-bottom-2">
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-red-500">
                                                        <FileText size={16} />
                                                    </div>
                                                    <span className="font-medium text-slate-700 truncate text-sm">{file.name}</span>
                                                    <span className="text-xs text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <button onClick={() => moveFile(i, -1)} disabled={i === 0} className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"><ArrowUp size={16} /></button>
                                                    <button onClick={() => moveFile(i, 1)} disabled={i === files.length - 1} className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"><ArrowDown size={16} /></button>
                                                    <button onClick={() => removeFile(i)} className="p-1 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <button
                                        onClick={mergePdfs}
                                        disabled={files.length < 2 || isProcessing}
                                        className="mt-6 w-full py-4 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-2"
                                    >
                                        {isProcessing ? t('pdf-merge.buttons.processing') : t('pdf-merge.buttons.merge', { count: files.length })}
                                        {!isProcessing && <Merge size={20} />}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* SPLIT MODE UI */}
                    {mode === 'split' && (
                         <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center">
                            {!splitFile ? (
                                <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-2xl h-48 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative group">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="p-4 bg-white rounded-full shadow-md mb-4 text-red-500 group-hover:scale-110 transition-transform">
                                        <Upload size={24} />
                                    </div>
                                    <h3 className="font-bold text-slate-700">{t('pdf-merge.dropzone.splitTitle')}</h3>
                                    <p className="text-sm text-slate-400 mt-1">{t('pdf-merge.dropzone.splitSubtitle')}</p>
                                </div>
                            ) : (
                                <div className="text-left">
                                     <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-red-500">
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-700">{splitFile.name}</div>
                                                <div className="text-xs text-slate-500">{(splitFile.size / 1024 / 1024).toFixed(2)} MB</div>
                                            </div>
                                        </div>
                                        <button onClick={() => setSplitFile(null)} className="text-slate-400 hover:text-red-500 font-bold text-sm">{t('pdf-merge.fileList.change')}</button>
                                    </div>

                                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                        <h3 className="font-bold text-slate-800 mb-4">{t('pdf-merge.split.sectionTitle')}</h3>
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1">
                                                <label className="block text-xs font-bold text-slate-500 mb-2">{t('pdf-merge.split.from')}</label>
                                                <input 
                                                    type="number" 
                                                    min="1" 
                                                    value={splitRange.start}
                                                    onChange={e => setSplitRange({...splitRange, start: parseInt(e.target.value) || 1})}
                                                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none font-bold text-center"
                                                />
                                            </div>
                                            <div className="pt-6 font-bold text-slate-300">{t('pdf-merge.split.separator')}</div>
                                            <div className="flex-1">
                                                <label className="block text-xs font-bold text-slate-500 mb-2">{t('pdf-merge.split.to')}</label>
                                                <input 
                                                    type="number" 
                                                    min="1" 
                                                    value={splitRange.end}
                                                    onChange={e => setSplitRange({...splitRange, end: parseInt(e.target.value) || 1})}
                                                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none font-bold text-center"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={splitPdf}
                                        disabled={isProcessing}
                                        className="mt-6 w-full py-4 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-2"
                                    >
                                        {isProcessing ? t('pdf-merge.buttons.processing') : t('pdf-merge.buttons.download')}
                                        {!isProcessing && <Download size={20} />}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Sidebar Info */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4">{t('pdf-merge.howItWorks.title')}</h3>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li className="flex gap-2">
                                <span className="bg-red-100 text-red-600 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                                <div>
                                    <strong className="block text-slate-800">{t('pdf-merge.howItWorks.items.clientSide.title')}</strong>
                                    {t('pdf-merge.howItWorks.items.clientSide.desc')}
                                </div>
                            </li>
                             <li className="flex gap-2">
                                <span className="bg-red-100 text-red-600 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                                <div>
                                    <strong className="block text-slate-800">{t('pdf-merge.howItWorks.items.mergeOrder.title')}</strong>
                                    {t('pdf-merge.howItWorks.items.mergeOrder.desc')}
                                </div>
                            </li>
                             <li className="flex gap-2">
                                <span className="bg-red-100 text-red-600 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                                <div>
                                    <strong className="block text-slate-800">{t('pdf-merge.howItWorks.items.splitRange.title')}</strong>
                                    {t('pdf-merge.howItWorks.items.splitRange.desc')}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="pdf-merge" categoryId="office" />
        </ToolPageLayout>
    );
}
