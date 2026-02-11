import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Twitter, Copy, ArrowRight, MessageCircle } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

import { useTranslation } from 'react-i18next';

export default function TweetCounter() {
    const { t } = useTranslation();
    const [text, setText] = useState('');
    const [tweets, setTweets] = useState([]);
    const [copiedIndex, setCopiedIndex] = useState(null);

    const MAX_LENGTH = 280;

    useEffect(() => {
        // Simple splitting logic: split by period+space or newline, then re-merge until max length
        // This is a naive implementation; proper splitting is complex.
        
        let words = text.split(/\s+/);
        let currentTweet = "";
        let chunks = [];

        words.forEach((word) => {
            if ((currentTweet + word).length + 1 <= MAX_LENGTH - 6) { // -6 for numbering (1/X)
                 currentTweet += (currentTweet ? " " : "") + word;
            } else {
                chunks.push(currentTweet);
                currentTweet = word;
            }
        });
        if (currentTweet) chunks.push(currentTweet);

        setTweets(chunks.map((t, i) => `${t} ${i + 1}/${chunks.length}`));
    }, [text]);

    const handleCopy = (content, index) => {
        navigator.clipboard.writeText(content);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <ToolPageLayout toolId="tweet-counter">
            <Helmet>
                <title>{t('tools.tweet-counter.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.tweet-counter.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Twitter size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.tweet-counter.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.tweet-counter.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Input */}
                <div className="flex flex-col h-full">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex-1 flex flex-col">
                        <label className="block text-sm font-bold text-slate-700 mb-2 flex justify-between">
                            <span>Draft Content</span>
                            <span className="text-slate-400 font-normal">{text.length} chars</span>
                        </label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type your long thread here..."
                            className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-sky-500 text-lg resize-none min-h-[300px]"
                        />
                    </div>
                </div>

                {/* Output */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">
                        <MessageCircle size={16} /> Preview ({tweets.length} tweets)
                    </div>
                    
                    {tweets.length === 0 && (
                        <div className="bg-slate-50 border border-dashed border-slate-300 rounded-3xl p-8 text-center text-slate-400">
                            Start typing to see your thread preview here.
                        </div>
                    )}

                    {tweets.map((tweet, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm relative group hover:border-sky-200 transition-colors">
                            <div className="absolute -left-3 top-6 w-6 h-6 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 z-10">
                                {i + 1}
                            </div>
                            {i < tweets.length - 1 && (
                                <div className="absolute left-0 top-12 bottom-0 w-[2px] bg-slate-100 -ml-[1px]" />
                            )}
                            
                            <p className="text-slate-800 text-lg mb-4 whitespace-pre-wrap break-words">{tweet}</p>
                            
                            <div className="flex justify-between items-center">
                                <span className={`text-xs font-bold ${tweet.length > 280 ? 'text-red-500' : 'text-slate-300'}`}>
                                    {tweet.length} chars
                                </span>
                                <button
                                    onClick={() => handleCopy(tweet, i)}
                                    className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-bold transition-all ${
                                        copiedIndex === i 
                                            ? 'bg-green-100 text-green-600' 
                                            : 'bg-slate-50 text-slate-500 hover:bg-sky-50 hover:text-sky-600'
                                    }`}
                                >
                                    {copiedIndex === i ? 'Copied' : 'Copy'} <Copy size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <RelatedTools currentToolId="tweet-counter" categoryId="marketing" />
        </ToolPageLayout>
    );
}
