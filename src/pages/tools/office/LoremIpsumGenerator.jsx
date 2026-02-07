import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Type, Copy, RefreshCw, Check, AlignLeft, AlignJustify, List } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

// Simple Lorem Ipsum generator logic (client-side)
const LOREM_WORDS = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod",
    "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "ut", "enim", "ad", "minim",
    "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
    "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit", "in", "voluptate", "velit",
    "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat",
    "non", "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
];

const HIPSTER_WORDS = [
    "kale", "chips", "bespoke", "aesthetic", "shoreditch", "tote", "bag", "chartreuse", "pickled", "fingerstache",
    "cold-pressed", "sriracha", "mustache", "flexitarian", "readymade", "coloring", "book", "letterpress",
    "distillery", "poutine", "keffiyeh", "pork", "belly", "kinfolk", "banjo", "sustainable", "ethical", "trust",
    "fund", "dreamcatcher", "quinoa", "occupy", "kitsch", "microdosing", "taxidermy", "raw", "denim", "vape",
    "activated", "charcoal", "vegan", "gluten-free", "truffaut", "paleo", "thundercats", "drinking", "vinegar"
];

export default function LoremIpsumGenerator() {
    const [count, setCount] = useState(5);
    const [unit, setUnit] = useState('paragraphs'); // paragraphs, sentences, words
    const [type, setType] = useState('standard'); // standard, hipster
    const [startWithLorem, setStartWithLorem] = useState(true);
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    // Generate text when inputs change
    useEffect(() => {
        generateText();
    }, [count, unit, type, startWithLorem]);

    const generateText = () => {
        const words = type === 'hipster' ? HIPSTER_WORDS : LOREM_WORDS;
        let result = [];

        if (unit === 'words') {
            for (let i = 0; i < count; i++) {
                result.push(getRandomWord(words));
            }
            let text = result.join(' ');
            if (startWithLorem && type === 'standard') {
                text = "Lorem ipsum " + text;
            }
            setOutput(text.charAt(0).toUpperCase() + text.slice(1) + ".");
        }
        else if (unit === 'sentences') {
            for (let i = 0; i < count; i++) {
                result.push(generateSentence(words));
            }
            let text = result.join(' ');
            if (startWithLorem && type === 'standard' && !text.startsWith("Lorem")) {
                text = "Lorem ipsum dolor sit amet. " + text;
            }
            setOutput(text);
        }
        else { // Paragraphs
            for (let i = 0; i < count; i++) {
                result.push(generateParagraph(words));
            }
            // Handle start with lorem for first paragraph
            if (startWithLorem && type === 'standard' && result.length > 0) {
                result[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + result[0];
            }
            setOutput(result.join('\n\n'));
        }
    };

    const getRandomWord = (wordList) => {
        return wordList[Math.floor(Math.random() * wordList.length)];
    };

    const generateSentence = (wordList) => {
        const length = Math.floor(Math.random() * 10) + 8; // 8-18 words
        const sentence = [];
        for (let i = 0; i < length; i++) {
            sentence.push(getRandomWord(wordList));
        }
        let text = sentence.join(' ');
        return text.charAt(0).toUpperCase() + text.slice(1) + ".";
    };

    const generateParagraph = (wordList) => {
        const length = Math.floor(Math.random() * 5) + 3; // 3-8 sentences
        const paragraph = [];
        for (let i = 0; i < length; i++) {
            paragraph.push(generateSentence(wordList));
        }
        return paragraph.join(' ');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Lorem Ipsum Generator | Mini Tools by Spinotek</title>
                <meta name="description" content="Generate random placeholder text for your designs. Choose between standard Lorem Ipsum or fun Hipster Ipsum." />
            </Helmet>

            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <Type size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Lorem Ipsum Generator</h1>
                        <p className="text-slate-500">Create placeholder text for your layouts instantly.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24">
                            <h3 className="text-sm font-bold text-slate-900 mb-4">Configuration</h3>

                            {/* Count & Unit */}
                            <div className="flex gap-4 mb-6">
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-slate-500 mb-2">Quantity</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="100"
                                        value={count}
                                        onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-slate-500 mb-2">Unit</label>
                                    <select
                                        value={unit}
                                        onChange={(e) => setUnit(e.target.value)}
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none appearance-none"
                                    >
                                        <option value="paragraphs">Paragraphs</option>
                                        <option value="sentences">Sentences</option>
                                        <option value="words">Words</option>
                                    </select>
                                </div>
                            </div>

                            {/* Type */}
                            <div className="mb-6">
                                <label className="block text-xs font-medium text-slate-500 mb-3">Text Style</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setType('standard')}
                                        className={`px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 border transition-all ${type === 'standard'
                                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        Standard
                                    </button>
                                    <button
                                        onClick={() => setType('hipster')}
                                        className={`px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 border transition-all ${type === 'hipster'
                                            ? 'bg-pink-50 border-pink-200 text-pink-700'
                                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        Hipster ✨
                                    </button>
                                </div>
                            </div>

                            {/* Start with Lorem */}
                            <div className="flex items-center gap-3 mb-8">
                                <button
                                    onClick={() => setStartWithLorem(!startWithLorem)}
                                    className={`w-12 h-6 rounded-full p-1 transition-colors ${startWithLorem ? 'bg-indigo-600' : 'bg-slate-200'}`}
                                >
                                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${startWithLorem ? 'translate-x-6' : 'translate-x-0'}`} />
                                </button>
                                <span className="text-sm text-slate-600">Start with "Lorem ipsum..."</span>
                            </div>

                            <button
                                onClick={generateText}
                                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
                            >
                                <RefreshCw size={18} /> Regenerate
                            </button>
                        </div>
                    </div>

                    {/* Output */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col min-h-[500px]">
                            {/* Toolbar */}
                            <div className="bg-slate-50 border-b border-slate-100 px-6 py-3 flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    {count} {unit} Generated
                                </span>
                                <button
                                    onClick={handleCopy}
                                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${copied
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                                        }`}
                                >
                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                    {copied ? 'Copied!' : 'Copy Text'}
                                </button>
                            </div>

                            {/* Text Area */}
                            <textarea
                                value={output}
                                readOnly
                                className="flex-1 w-full p-8 resize-none outline-none text-slate-700 text-lg leading-relaxed font-serif"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-slate-200 py-8">
                    <RelatedTools currentToolId="lorem-gen" categoryId="office" />
                </div>
            </div>
        </ToolPageLayout>
    );
}
