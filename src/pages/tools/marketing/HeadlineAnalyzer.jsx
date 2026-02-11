import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, CheckCircle, AlertCircle, Info } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

import { useTranslation } from 'react-i18next';

// Simple word lists for demonstration (in a real app, these would be larger dictionaries)
const COMMON_WORDS = new Set(['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from', 'by', 'with', 'in', 'of', 'as', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'can', 'could', 'should', 'would', 'will', 'may', 'might', 'must', 'my', 'your', 'his', 'her', 'its', 'our', 'their', 'this', 'that', 'these', 'those', 'what', 'which', 'who', 'whom', 'whose', 'when', 'where', 'why', 'how']);

const EMOTIONAL_WORDS = new Set(['amazing', 'attractive', 'best', 'bold', 'brave', 'brilliant', 'busy', 'confessions', 'danger', 'delight', 'devastating', 'doctor', 'drama', 'dream', 'epic', 'excited', 'exclusive', 'expert', 'facts', 'faith', 'fear', 'forever', 'grateful', 'greatest', 'heart', 'heaven', 'hero', 'hope', 'horrific', 'insane', 'inspiring', 'jaw-dropping', 'joy', 'legend', 'life-changing', 'love', 'magic', 'miracle', 'misleading', 'mistake', 'most', 'nightmare', 'panic', 'perfect', 'powerful', 'proven', 'rare', 'real', 'results', 'risk', 'scary', 'scientific', 'secrets', 'shocking', 'simple', 'smart', 'spectacular', 'stunning', 'successful', 'surprising', 'terrible', 'tested', 'thrilling', 'tragic', 'trust', 'ultimate', 'unbelievable', 'urgent', 'valuable', 'war', 'warning', 'weird', 'wonderful', 'worst']);

const POWER_WORDS = new Set(['absolute', 'actually', 'challenge', 'compare', 'conquer', 'crazy', 'critical', 'detailed', 'discount', 'discover', 'extra', 'fast', 'free', 'growth', 'guarantee', 'hack', 'help', 'history', 'huge', 'immediately', 'important', 'increase', 'innovative', 'instant', 'intense', 'join', 'know', 'latest', 'lifetime', 'limited', 'luxury', 'massive', 'master', 'money', 'new', 'now', 'official', 'only', 'opportunity', 'plus', 'premium', 'profit', 'protect', 'quick', 'raw', 'secure', 'special', 'strategies', 'strong', 'superior', 'today', 'top', 'tremendous', 'truly', 'unique', 'unlimited', 'unusual', 'value', 'win', 'yes']);

export default function HeadlineAnalyzer() {
    const { t } = useTranslation();
    const [headline, setHeadline] = useState('');
    const [score, setScore] = useState(0);
    const [breakdown, setBreakdown] = useState(null);

    const analyze = () => {
        if (!headline.trim()) {
            setScore(0);
            setBreakdown(null);
            return;
        }

        const words = headline.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w);
        const totalWords = words.length;

        let commonCount = 0;
        let emotionalCount = 0;
        let powerCount = 0;

        words.forEach(w => {
            if (COMMON_WORDS.has(w)) commonCount++;
            if (EMOTIONAL_WORDS.has(w)) emotionalCount++;
            if (POWER_WORDS.has(w)) powerCount++;
        });

        const uncommonCount = totalWords - commonCount - emotionalCount - powerCount; // Simplified logic, overlap possible but acceptable for basic tool

        // Calculate Percentages
        const commonPct = (commonCount / totalWords) * 100;
        const uncommonPct = (uncommonCount / totalWords) * 100;
        const emotionalPct = (emotionalCount / totalWords) * 100;
        const powerPct = (powerCount / totalWords) * 100;

        // SCORING ALGORITHM
        let calculatedScore = 0;

        // 1. Length Score (Optimization for 50-60 chars)
        const charCount = headline.length;
        if (charCount >= 20 && charCount <= 80) calculatedScore += 20;
        if (charCount >= 50 && charCount <= 65) calculatedScore += 10; // Sweet spot

        // 2. Word Balance Score
        if (commonPct >= 20 && commonPct <= 30) calculatedScore += 15;
        if (uncommonPct >= 10 && uncommonPct <= 20) calculatedScore += 15;
        if (emotionalPct >= 10) calculatedScore += 20;
        if (powerPct >= 1) calculatedScore += 20; // At least one power word is good

        setScore(Math.min(100, calculatedScore));
        setBreakdown({
            totalWords,
            charCount,
            common: { count: commonCount, pct: commonPct },
            uncommon: { count: Math.max(0, uncommonCount), pct: uncommonPct },
            emotional: { count: emotionalCount, pct: emotionalPct },
            power: { count: powerCount, pct: powerPct }
        });
    };

    const getScoreColor = (s) => {
        if (s >= 70) return 'text-green-500';
        if (s >= 50) return 'text-yellow-500';
        return 'text-red-500';
    };
    
    const getGrade = (s) => {
        if (s >= 80) return 'A';
        if (s >= 70) return 'B';
        if (s >= 50) return 'C';
        return 'D';
    }

    return (
        <ToolPageLayout toolId="headline-analyzer">
            <Helmet>
                <title>{t('tools.headline-analyzer.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.headline-analyzer.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.headline-analyzer.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.headline-analyzer.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Input */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Your Headline</label>
                        <textarea
                            value={headline}
                            onChange={(e) => setHeadline(e.target.value)}
                            placeholder="e.g. 10 Secrets to Growing Your Business Fast"
                            className="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 text-xl font-bold text-slate-800 resize-none mb-4"
                        />
                        <button
                            onClick={analyze}
                            disabled={!headline}
                            className={`w-full py-4 rounded-xl font-bold transition-all ${
                                headline 
                                    ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-200' 
                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                        >
                            Analyze Headline
                        </button>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                             <Info size={18} className="text-orange-500" /> Tips for High-Converting Headlines
                        </h3>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li className="flex items-start gap-2">
                                <span className="bg-orange-100 text-orange-600 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold shrink-0">1</span>
                                Use numbers (e.g. "7 Ways...", "10 Tips...")
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="bg-orange-100 text-orange-600 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold shrink-0">2</span>
                                Use strong emotional words (e.g. "Amazing", "Fear")
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="bg-orange-100 text-orange-600 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold shrink-0">3</span>
                                Keep it between 50-60 characters for optimal search visibility.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="bg-orange-100 text-orange-600 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold shrink-0">4</span>
                                Address the reader directly with "You" or "Your".
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Result */}
                <div className="flex flex-col h-full gap-6">
                    {breakdown ? (
                        <>
                            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm flex flex-col items-center justify-center text-center">
                                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Headline Score</div>
                                <div className={`text-6xl font-black ${getScoreColor(score)} mb-4`}>{score}/100</div>
                                <div className={`text-9xl font-black opacity-10 absolute pointer-events-none ${getScoreColor(score)}`}>
                                    {getGrade(score)}
                                </div>
                                <p className="text-slate-600 max-w-xs">
                                    {score >= 70 ? "Great job! This headline is likely to perform well." : "This headline could use some improvement. Try adding more emotional or power words."}
                                </p>
                            </div>

                            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-4 rounded-xl">
                                    <div className="text-xs font-bold text-slate-500 uppercase">Common Words</div>
                                    <div className="text-2xl font-black text-slate-800">{Math.round(breakdown.common.pct)}%</div>
                                    <div className="text-xs text-slate-400">Target: 20-30%</div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl">
                                    <div className="text-xs font-bold text-slate-500 uppercase">Uncommon Words</div>
                                    <div className="text-2xl font-black text-slate-800">{Math.round(breakdown.uncommon.pct)}%</div>
                                    <div className="text-xs text-slate-400">Target: 10-20%</div>
                                </div>
                                <div className="bg-orange-50 p-4 rounded-xl">
                                    <div className="text-xs font-bold text-orange-600 uppercase">Emotional</div>
                                    <div className="text-2xl font-black text-orange-800">{Math.round(breakdown.emotional.pct)}%</div>
                                    <div className="text-xs text-orange-400">Target: 10-15%</div>
                                </div>
                                <div className="bg-indigo-50 p-4 rounded-xl">
                                    <div className="text-xs font-bold text-indigo-600 uppercase">Power Words</div>
                                    <div className="text-2xl font-black text-indigo-800">{Math.round(breakdown.power.pct)}%</div>
                                    <div className="text-xs text-indigo-400">Target: at least 1</div>
                                </div>
                            </div>
                            
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center px-6">
                                <span className="font-bold text-slate-600">Character Count</span>
                                <span className={`font-black text-xl ${breakdown.charCount >= 50 && breakdown.charCount <= 65 ? 'text-green-500' : 'text-slate-800'}`}>
                                    {breakdown.charCount}
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center h-full text-center text-slate-400">
                             <FileText size={48} className="mb-4 opacity-20" />
                             <p>Enter a headline to see your analysis score.</p>
                        </div>
                    )}
                </div>
            </div>

            <RelatedTools currentToolId="headline-analyzer" categoryId="marketing" />
        </ToolPageLayout>
    );
}
