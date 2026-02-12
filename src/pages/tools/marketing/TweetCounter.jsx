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
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-bold text-slate-700">{t('tools.tweet-counter.input.label')}</label>
                            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                                {t('tools.tweet-counter.input.stats', { count: text.length })}
                            </span>
                        </div>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={t('tools.tweet-counter.input.placeholder')}
                            className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-sky-500 text-lg resize-none min-h-[300px]"
                        />
                    </div>
                </div>

                {/* Output */}
                <div className="bg-sky-50 border border-sky-100 p-8 rounded-3xl flex flex-col h-full overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <Twitter size={20} className="text-sky-500" />
                            {t('tools.tweet-counter.output.title', { count: tweets.length })}
                        </h2>
                    </div>
                    <div className="space-y-4 overflow-y-auto pr-2 -mr-2">
                        {tweets.length > 0 ? (
                            tweets.map((tweet, index) => (
                                <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-sky-100 relative group">
                                    <div className="flex gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0" />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-1 mb-0.5">
                                                <span className="font-bold text-slate-900 text-sm">You</span>
                                                <span className="text-slate-400 text-sm">@you</span>
                                                <span className="text-slate-400 text-xs">· now</span>
                                            </div>
                                            <p className="text-slate-900 text-[15px] whitespace-pre-wrap leading-normal">
                                                {tweet}
                                                {index < tweets.length - 1 && <span className="text-sky-500 ml-1 font-medium">...</span>}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => handleCopy(tweet, index)}
                                            className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-sky-500"
                                            title={t('tools.tweet-counter.output.copy')}
                                        >
                                            {copiedIndex === index ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                        </button>
                                    </div>
                                    <div className="absolute bottom-2 right-4 text-xs font-bold text-slate-300">
                                        {index + 1}/{tweets.length}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50">
                                <Twitter size={48} className="mb-2" />
                                <p>{t('tools.tweet-counter.output.placeholder')}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="tweet-counter" categoryId="marketing" />
        </ToolPageLayout>
    );
}
