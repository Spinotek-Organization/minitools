import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Papa from 'papaparse';
import { Table, FileJson, ArrowRight, Copy, Check, Upload, Trash2 } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function CsvToJson() {
    const { t } = useTranslation('tools');
    const [csv, setCsv] = useState('');
    const [json, setJson] = useState('');
    const [options, setOptions] = useState({
        header: true,
        skipEmptyLines: true,
        minify: false
    });
    const [copied, setCopied] = useState(false);
    const [stats, setStats] = useState(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setCsv(event.target.result);
                convert(event.target.result);
            };
            reader.readAsText(file);
        }
    };

    const convert = (inputCsv = csv) => {
        if (!inputCsv.trim()) {
            setJson('');
            setStats(null);
            return;
        }

        Papa.parse(inputCsv, {
            header: options.header,
            skipEmptyLines: options.skipEmptyLines,
            complete: (results) => {
                if (results.errors.length > 0) {
                    console.error(results.errors);
                    // We could show errors, but for now just show data if present
                }
                
                const data = results.data;
                setStats({ 
                    rows: data.length, 
                    fields: results.meta.fields ? results.meta.fields.length : (data[0] ? Object.keys(data[0]).length : 0) 
                });

                const jsonString = options.minify 
                    ? JSON.stringify(data) 
                    : JSON.stringify(data, null, 2);
                
                setJson(jsonString);
            }
        });
    };

    // Re-convert when options change
    React.useEffect(() => {
        convert();
    }, [csv, options.header, options.skipEmptyLines, options.minify]);

    const handleCopy = () => {
        navigator.clipboard.writeText(json);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <ToolPageLayout toolId="csv-json">
            <Helmet>
                <title>{t('csv-json.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('csv-json.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-orange-200">
                        <Table size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('csv-json.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('csv-json.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Input Column */}
                <div className="flex flex-col h-full">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex-1 flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                             <h3 className="font-bold text-slate-700 flex items-center gap-2">
                                <Table size={18} className="text-orange-500" /> {t('csv-json.inputs.label')}
                            </h3>
                            <div className="relative overflow-hidden">
                                <button className="text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2">
                                    <Upload size={14} /> {t('csv-json.inputs.upload')}
                                </button>
                                <input 
                                    type="file" 
                                    accept=".csv,.txt"
                                    onChange={handleFileUpload}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>
                        
                        <textarea
                            value={csv}
                            onChange={(e) => setCsv(e.target.value)}
                            placeholder={t('csv-json.inputs.placeholder')}
                            className="flex-1 w-full p-4 bg-slate-50 border border-slate-200 rounded-xl resize-none outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-mono text-xs whitespace-pre leading-relaxed min-h-[300px]"
                        />

                        <div className="mt-4 flex flex-wrap gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <label className="flex items-center gap-2 text-sm text-slate-600 font-medium cursor-pointer select-none">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center ${options.header ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white border-slate-300'}`}>
                                    {options.header && <Check size={14} />}
                                </div>
                                <input type="checkbox" checked={options.header} onChange={() => setOptions({...options, header: !options.header})} className="hidden" />
                                {t('csv-json.options.header')}
                            </label>

                            <label className="flex items-center gap-2 text-sm text-slate-600 font-medium cursor-pointer select-none">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center ${options.skipEmptyLines ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white border-slate-300'}`}>
                                    {options.skipEmptyLines && <Check size={14} />}
                                </div>
                                <input type="checkbox" checked={options.skipEmptyLines} onChange={() => setOptions({...options, skipEmptyLines: !options.skipEmptyLines})} className="hidden" />
                                {t('csv-json.options.skipEmpty')}
                            </label>
                        </div>
                    </div>
                </div>

                {/* Output Column */}
                <div className="flex flex-col h-full">
                     <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex-1 flex flex-col">
                         <div className="flex justify-between items-center mb-4">
                             <h3 className="font-bold text-slate-700 flex items-center gap-2">
                                <FileJson size={18} className="text-orange-500" /> {t('csv-json.outputs.label')}
                            </h3>
                            <div className="flex gap-2">
                                <label className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase cursor-pointer select-none mr-4">
                                    <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${options.minify ? 'bg-orange-500' : 'bg-slate-300'}`}>
                                        <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${options.minify ? 'translate-x-4' : 'translate-x-0'}`} />
                                    </div>
                                    <input type="checkbox" checked={options.minify} onChange={() => setOptions({...options, minify: !options.minify})} className="hidden" />
                                    {t('csv-json.options.minify')}
                                </label>
                                
                                <button 
                                    onClick={handleCopy}
                                    disabled={!json}
                                    className="text-slate-400 hover:text-orange-500 transition-colors"
                                    title={t('csv-json.buttons.copy')}
                                >
                                    {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="relative flex-1">
                            <textarea
                                value={json}
                                readOnly
                                placeholder={t('csv-json.outputs.placeholder')}
                                className="absolute inset-0 w-full h-full p-4 bg-slate-900 border border-slate-700 rounded-xl resize-none outline-none text-slate-300 font-mono text-xs leading-relaxed"
                            />
                        </div>

                        {stats && (
                            <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-500 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                                <span>{t('csv-json.stats.records', { count: stats.rows })}</span>
                                <div>
                                    <button onClick={handleDownload} className="text-orange-600 font-bold hover:underline">{t('csv-json.buttons.download')}</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="csv-json" categoryId="office" />
        </ToolPageLayout>
    );
}
