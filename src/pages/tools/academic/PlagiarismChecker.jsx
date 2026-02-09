import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileSearch, Search, ExternalLink, RefreshCw, AlertTriangle, Check } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function PlagiarismChecker() {
    const [text, setText] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const analyzeText = () => {
        if (!text.trim()) return;
        setIsAnalyzing(true);
        setAnalysis(null);

        // Simulate processing delay for "effect"
        setTimeout(() => {
            // Split by periods, exclamation marks, question marks
            // Filter out short sentences (< 20 chars) as they are likely common
            const sentences = text
                .match(/[^.!?]+[.!?]+/g)
                ?.map(s => s.trim())
                .filter(s => s.length > 25) || [];
            
            // If no punctuation, try splitting by newlines or just take the whole block if short
            if (sentences.length === 0 && text.length > 20) {
                sentences.push(text.trim());
            }

            setAnalysis(sentences);
            setIsAnalyzing(false);
        }, 800);
    };

    const searchGoogle = (query) => {
        const url = `https://www.google.com/search?q="${encodeURIComponent(query)}"`;
        window.open(url, '_blank');
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Plagiarism Checker | MiniTools by Spinotek</title>
                <meta name="description" content="Analyze text and check for plagiarism using smart search patterns." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sky-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <FileSearch size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Plagiarism Checker</h1>
                        <p className="text-slate-500 text-sm">Analyze content and verify originality via smart search.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Main Tool */}
                <div className="lg:col-span-12 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        
                        {!analysis ? (
                            <>
                                <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <RefreshCw size={20} className="text-sky-600"/>
                                    Content Analyzer
                                </h2>
                                <p className="text-sm text-slate-500 mb-6">
                                    Paste your text below. We will break it down into checkable segments to help you find plagiarized content across the web.
                                </p>
                                
                                <textarea 
                                    className="w-full h-64 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm resize-none mb-4 font-medium text-slate-700"
                                    placeholder="Paste the text you want to check here (min 20 characters)..."
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                ></textarea>

                                <button 
                                    onClick={analyzeText}
                                    disabled={!text.trim() || isAnalyzing}
                                    className={`
                                        w-full py-4 text-white rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2
                                        ${!text.trim() || isAnalyzing ? 'bg-slate-300 cursor-not-allowed shadow-none' : 'bg-sky-600 hover:bg-sky-700 shadow-sky-200 active:scale-95'}
                                    `}
                                >
                                    {isAnalyzing ? (
                                        <>Processing...</>
                                    ) : (
                                        <>
                                            <Search size={20} />
                                            Analyze Text
                                        </>
                                    )}
                                </button>
                            </>
                        ) : (
                            <div className="animate-fade-in">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="font-bold text-slate-800 flex items-center gap-2">
                                        <FileSearch size={20} className="text-sky-600"/>
                                        Analysis Results
                                    </h2>
                                    <button 
                                        onClick={() => setAnalysis(null)}
                                        className="text-sm font-bold text-slate-500 hover:text-sky-600 transition-colors"
                                    >
                                        Check Another Text
                                    </button>
                                </div>

                                <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 mb-6 flex items-start gap-3">
                                    <AlertTriangle className="text-sky-600 flex-shrink-0 mt-0.5" size={20} />
                                    <div className="text-sm text-sky-900">
                                        <span className="font-bold">How to check:</span> We've isolated {analysis.length} key phrases. Click "Search Match" to see if these exact sentences appear elsewhere on the internet.
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {analysis.map((sentence, idx) => (
                                        <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow group">
                                            <p className="text-slate-700 text-sm mb-3 leading-relaxed border-l-4 border-slate-200 pl-3 italic group-hover:border-sky-400 transition-colors">
                                                "{sentence}"
                                            </p>
                                            <div className="flex justify-end">
                                                <button 
                                                    onClick={() => searchGoogle(sentence)}
                                                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-white border border-slate-200 hover:border-sky-200 text-slate-600 hover:text-sky-700 rounded-lg text-xs font-bold transition-all"
                                                >
                                                    <ExternalLink size={14} />
                                                    Check for Plagiarism
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {analysis.length === 0 && (
                                        <div className="text-center py-10 text-slate-400">
                                            <Check className="mx-auto mb-2 text-green-500" size={32} />
                                            No long phrases detected to check. Text might be too short or fragmented.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="plagiarism-linker" categoryId="academic" />
        </ToolPageLayout>
    );    
}

