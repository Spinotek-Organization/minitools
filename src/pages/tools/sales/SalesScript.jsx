import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Play, Copy, Check, RefreshCw, MessageSquare } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

const FRAMEWORKS = [
    {
        id: 'cold-call',
        name: 'Cold Call',
        description: 'Standard outreach script for new prospects',
        template: (data) => `Hi [Prospect Name], this is [Your Name] with ${data.productName || '[Product Name]'}.

I'm calling because we help ${data.targetAudience || '[Target Audience]'} who are frustrated with ${data.painPoint || '[Key Pain Point]'}.

We've developed a way to ${data.benefit || '[Key Benefit]'}, and I'd love to share how it works.

Do you have 30 seconds for me to tell you what we do?`
    },
    {
        id: 'gatekeeper',
        name: 'Gatekeeper',
        description: 'Getting past the receptionist or assistant',
        template: (data) => `Hi, my name is [Your Name] calling from ${data.productName || '[Product Name]'}.

I'm looking to speak with the person who handles ${data.painPoint || '[Key Pain Point]'} for the company.

Could you point me in the right direction?

(If asked what it's about):
It's about how we help ${data.targetAudience || '[Target Audience]'} achieve ${data.benefit || '[Key Benefit]'} without the usual headaches. Using our ${data.productName || '[Product Name]'} solution.`
    },
    {
        id: 'objection',
        name: 'Objection Handling',
        description: 'Responses to "I\'m not interested" or "Send me info"',
        template: (data) => `(prospect says "I'm not interested")

I completely understand. A lot of ${data.targetAudience || '[Target Audience]'} say that initially because they're used to dealing with ${data.painPoint || '[Key Pain Point]'} and don't think there's a better way.

But once they see how ${data.productName || '[Product Name]'} allows them to ${data.benefit || '[Key Benefit]'}, they usually wish they'd had a conversation sooner.

Value Proposition:
What if I could show you a 5-minute overview of how we solve ${data.painPoint || '[Key Pain Point]'}? Would you be open to that next Tuesday?`
    },
       {
        id: 'spin',
        name: 'SPIN Selling',
        description: 'Situation, Problem, Implication, Need-Payoff',
        template: (data) => ` SITUATION:
"Can you tell me a bit about your current process for handling ${data.painPoint || '[Key Pain Point]'}?"
"How are you currently managing expectations for your ${data.targetAudience || '[Target Audience]'}?"

 PROBLEM:
"Do you find that ${data.painPoint || '[Key Pain Point]'} is taking up more time/resources than you'd like?"
"Is it difficult to achieve ${data.benefit || '[Key Benefit]'} with your current setup?"

 IMPLICATION:
"If ${data.painPoint || '[Key Pain Point]'} continues, how will that impact your quarterly goals?"
"Does failing to ${data.benefit || '[Key Benefit]'} affect your team's morale or productivity?"

 NEED-PAYOFF:
"If you could fix ${data.painPoint || '[Key Pain Point]'} and immediately start to ${data.benefit || '[Key Benefit]'}, how would that help you?"
"Would it be valuable if ${data.productName || '[Product Name]'} could automate this for you?"`
    },
    {
        id: 'aida',
        name: 'AIDA Framework',
        description: 'Attention, Interest, Desire, Action',
        template: (data) => ` ATTENTION:
"Did you know that many ${data.targetAudience || '[Target Audience]'} are losing hours every week due to ${data.painPoint || '[Key Pain Point]'}?"

 INTEREST:
"${data.productName || '[Product Name]'} is a new solution designed specifically to eliminate ${data.painPoint || '[Key Pain Point]'} forever."

 DESIRE:
"Imagine being able to ${data.benefit || '[Key Benefit]'} without any extra effort. Our clients are seeing results in just a few days."

 ACTION:
"I'd love to give you a quick demo. Are you free tomorrow morning or Thursday afternoon?"`
    }
];

export default function SalesScript() {
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
        <ToolPageLayout>
            <Helmet>
                <title>Sales Script Generator | MiniTools by Spinotek</title>
                <meta name="description" content="Generate persuasive sales scripts instantly." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Sales Script Generator</h1>
                        <p className="text-slate-500 text-sm">Generate persuasive sales scripts instantly based on frameworks.</p>
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
