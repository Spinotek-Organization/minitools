import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Play, Copy, Check, RefreshCw, MessageSquare } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function SalesScript() {
    const { t } = useTranslation();

    const FRAMEWORKS = [
        {
            id: 'cold-call',
            name: t('tools.sales-script.frameworks.cold_call.name'),
            description: t('tools.sales-script.frameworks.cold_call.desc'),
            template: (data) => t('tools.sales-script.frameworks.cold_call.template', { ...data, productName: data.productName || '[Product Name]', targetAudience: data.targetAudience || '[Target Audience]', painPoint: data.painPoint || '[Key Pain Point]', benefit: data.benefit || '[Key Benefit]' })
        },
        {
            id: 'gatekeeper',
            name: t('tools.sales-script.frameworks.gatekeeper.name'),
            description: t('tools.sales-script.frameworks.gatekeeper.desc'),
            template: (data) => t('tools.sales-script.frameworks.gatekeeper.template', { ...data, productName: data.productName || '[Product Name]', painPoint: data.painPoint || '[Key Pain Point]', targetAudience: data.targetAudience || '[Target Audience]', benefit: data.benefit || '[Key Benefit]' })
        },
        {
            id: 'objection',
            name: t('tools.sales-script.frameworks.objection.name'),
            description: t('tools.sales-script.frameworks.objection.desc'),
            template: (data) => t('tools.sales-script.frameworks.objection.template', { ...data, targetAudience: data.targetAudience || '[Target Audience]', painPoint: data.painPoint || '[Key Pain Point]', productName: data.productName || '[Product Name]', benefit: data.benefit || '[Key Benefit]' })
        },
        {
            id: 'spin',
            name: t('tools.sales-script.frameworks.spin.name'),
            description: t('tools.sales-script.frameworks.spin.desc'),
            template: (data) => t('tools.sales-script.frameworks.spin.template', { ...data, painPoint: data.painPoint || '[Key Pain Point]', targetAudience: data.targetAudience || '[Target Audience]', benefit: data.benefit || '[Key Benefit]', productName: data.productName || '[Product Name]' })
        },
        {
            id: 'aida',
            name: t('tools.sales-script.frameworks.aida.name'),
            description: t('tools.sales-script.frameworks.aida.desc'),
            template: (data) => t('tools.sales-script.frameworks.aida.template', { ...data, targetAudience: data.targetAudience || '[Target Audience]', painPoint: data.painPoint || '[Key Pain Point]', productName: data.productName || '[Product Name]', benefit: data.benefit || '[Key Benefit]' })
        }
    ];

    const [inputs, setInputs] = useState({
        productName: '',
        targetAudience: '',
        painPoint: '',
        benefit: ''
    });
    
    const [selectedFramework, setSelectedFramework] = useState(FRAMEWORKS[0].id);
    const [generatedScript, setGeneratedScript] = useState('');
    const [copied, setCopied] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGenerate = () => {
        const framework = FRAMEWORKS.find(f => f.id === selectedFramework);
        if (framework) {
            setGeneratedScript(framework.template(inputs));
        }
    };

    const handleCopy = () => {
        if (!generatedScript) return;
        navigator.clipboard.writeText(generatedScript);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolPageLayout toolId="sales-script">
            <Helmet>
                <title>{t('tools.sales-script.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.sales-script.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.sales-script.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.sales-script.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Inputs */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm h-fit">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <MessageSquare size={20} className="text-violet-600" />
                        Script Parameters
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Product / Company Name</label>
                            <input
                                type="text"
                                name="productName"
                                value={inputs.productName}
                                onChange={handleInputChange}
                                placeholder="e.g. Acme CRM"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-violet-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
                            <input
                                type="text"
                                name="targetAudience"
                                value={inputs.targetAudience}
                                onChange={handleInputChange}
                                placeholder="e.g. Marketing Managers"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-violet-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Key Pain Point</label>
                            <input
                                type="text"
                                name="painPoint"
                                value={inputs.painPoint}
                                onChange={handleInputChange}
                                placeholder="e.g. disorganized leads"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-violet-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Key Benefit</label>
                            <input
                                type="text"
                                name="benefit"
                                value={inputs.benefit}
                                onChange={handleInputChange}
                                placeholder="e.g. close deals 2x faster"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-violet-500 outline-none"
                            />
                        </div>

                        <div className="pt-4">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Select Framework</label>
                            <div className="space-y-2">
                                {FRAMEWORKS.map(fw => (
                                    <label 
                                        key={fw.id}
                                        className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                                            selectedFramework === fw.id
                                                ? 'bg-violet-50 border-violet-200 ring-1 ring-violet-500'
                                                : 'bg-white border-slate-200 hover:bg-slate-50'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="framework"
                                            value={fw.id}
                                            checked={selectedFramework === fw.id}
                                            onChange={() => setSelectedFramework(fw.id)}
                                            className="mt-1 w-4 h-4 text-violet-600 focus:ring-violet-500 border-gray-300"
                                        />
                                        <div>
                                            <span className="block text-sm font-bold text-slate-900">{fw.name}</span>
                                            <span className="block text-xs text-slate-500">{fw.description}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleGenerate}
                            className="w-full mt-4 bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                            <Play size={20} fill="currentColor" />
                            Generate Script
                        </button>
                    </div>
                </div>

                {/* Output */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm flex flex-col h-full min-h-[500px]">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <FileText size={20} className="text-violet-600" />
                            Generated Script
                        </h2>
                        {generatedScript && (
                            <button
                                onClick={handleCopy}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                                    copied
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                        )}
                    </div>

                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-6 relative">
                        {generatedScript ? (
                            <div className="whitespace-pre-wrap font-sans text-slate-800 leading-relaxed text-lg">
                                {generatedScript}
                            </div>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                                <RefreshCw size={48} className="mb-4 opacity-20" />
                                <p>Fill in the details and click Generate to create your sales script</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="sales-script" categoryId="sales" />
        </ToolPageLayout>
    );
}
