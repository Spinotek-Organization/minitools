import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Coins, Copy, Check, Repeat } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function NumberToWords() {
    const [number, setNumber] = useState('');
    const [lang, setLang] = useState('en'); // 'en' or 'id'
    const [output, setOutput] = useState('');
    const [currencyMode, setCurrencyMode] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!number) {
            setOutput('');
            return;
        }
        
        const num = parseFloat(number.replace(/,/g, ''));
        if (isNaN(num)) {
            setOutput('Invalid number');
            return;
        }

        let words = lang === 'en' ? numberToEnglish(num) : numberToIndonesian(num);
        
        if (currencyMode) {
            if (lang === 'en') words = `${words} Dollars`; // Simplified
            else words = `${words} Rupiah`;
        }
        
        // Capitalize first letter
        words = words.charAt(0).toUpperCase() + words.slice(1);
        setOutput(words);

    }, [number, lang, currencyMode]);


    // --- ENGLISH LOGIC ---
    const EN_ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const EN_TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const EN_SCALES = ['', 'thousand', 'million', 'billion', 'trillion'];

    const numberToEnglish = (n) => {
        if (n === 0) return 'zero';
        
        // Handle decimals (simplified: just ignore or handle as point)
        // For this tool, let's focus on integers for simplicity or handle decimals strictly
        const integerPart = Math.floor(n);
        
        let words = '';
        let numStr = integerPart.toString();
        
        // Split into groups of 3
        let groups = [];
        while (numStr.length > 0) {
            groups.push(numStr.slice(-3));
            numStr = numStr.slice(0, -3);
        }

        for (let i = 0; i < groups.length; i++) {
            const num = parseInt(groups[i]);
            if (num > 0) {
                const w = convertGroupEn(num);
                words = w + (EN_SCALES[i] ? ' ' + EN_SCALES[i] : '') + (words ? ' ' + words : '');
            }
        }

        return words.trim();
    };

    const convertGroupEn = (n) => {
        let str = '';
        const h = Math.floor(n / 100);
        const t = n % 100;

        if (h > 0) {
            str += EN_ONES[h] + ' hundred';
            if (t > 0) str += ' and ';
        }
        
        if (t > 0) {
            if (t < 20) {
                str += EN_ONES[t];
            } else {
                str += EN_TENS[Math.floor(t / 10)];
                if (t % 10 > 0) str += '-' + EN_ONES[t % 10];
            }
        }
        return str;
    };


    // --- INDONESIAN LOGIC ---
    const ID_ONES = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'];
    
    // Recursive helper for Indonesian
    const convertId = (n) => {
        n = Math.abs(n);
        let temp = '';
        
        if (n < 12) {
            temp = " " + ID_ONES[n];
        } else if (n < 20) {
            temp = convertId(n - 10) + " belas";
        } else if (n < 100) {
            temp = convertId(Math.floor(n / 10)) + " puluh" + convertId(n % 10);
        } else if (n < 200) {
            temp = " seratus" + convertId(n - 100);
        } else if (n < 1000) {
            temp = convertId(Math.floor(n / 100)) + " ratus" + convertId(n % 100);
        } else if (n < 2000) {
            temp = " seribu" + convertId(n - 1000);
        } else if (n < 1000000) {
            temp = convertId(Math.floor(n / 1000)) + " ribu" + convertId(n % 1000);
        } else if (n < 1000000000) {
            temp = convertId(Math.floor(n / 1000000)) + " juta" + convertId(n % 1000000);
        } else if (n < 1000000000000) {
            temp = convertId(Math.floor(n / 1000000000)) + " milyar" + convertId(n % 1000000000);
        } else if (n < 1000000000000000) {
            temp = convertId(Math.floor(n / 1000000000000)) + " triliun" + convertId(n % 1000000000000);
        }

        return temp;
    }

    const numberToIndonesian = (n) => {
        if (n === 0) return 'nol';
        return convertId(Math.floor(n)).trim();
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Number to Words Converter | MiniTools by Spinotek</title>
                <meta name="description" content="Convert numbers to written text in English and Indonesian (Terbilang)." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-lime-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-lime-200">
                        <Coins size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Number to Words</h1>
                        <p className="text-slate-500 text-sm">Convert numerical values into written text.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Input */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Enter Number</label>
                        <input
                            type="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            placeholder="12345"
                            className="w-full text-4xl font-bold p-4 bg-slate-50 border-b-2 border-slate-200 outline-none focus:border-lime-500 text-slate-800 placeholder-slate-300 transition-colors"
                        />
                        
                        <div className="flex gap-4 mt-8">
                             <button
                                onClick={() => setLang('en')}
                                className={`flex-1 py-3 rounded-xl font-bold border transition-all ${lang === 'en' ? 'bg-lime-50 border-lime-500 text-lime-700' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                            >
                                English
                            </button>
                            <button
                                onClick={() => setLang('id')}
                                className={`flex-1 py-3 rounded-xl font-bold border transition-all ${lang === 'id' ? 'bg-lime-50 border-lime-500 text-lime-700' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                            >
                                Indonesian
                            </button>
                        </div>

                         <div className="mt-6">
                            <label className="flex items-center gap-3 text-sm text-slate-600 font-bold cursor-pointer select-none">
                                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${currencyMode ? 'bg-lime-600' : 'bg-slate-200'}`}>
                                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${currencyMode ? 'translate-x-6' : 'translate-x-0'}`} />
                                </div>
                                <input type="checkbox" checked={currencyMode} onChange={() => setCurrencyMode(!currencyMode)} className="hidden" />
                                Format as Currency
                            </label>
                        </div>
                    </div>
                </div>

                {/* Output */}
                <div className="flex flex-col h-full bg-lime-50 border border-lime-100 p-8 rounded-3xl justify-center relative">
                     <h3 className="text-sm font-bold text-lime-800 uppercase tracking-widest mb-4">Result</h3>
                     
                     <div className="text-2xl md:text-3xl font-serif text-slate-800 leading-relaxed min-h-[100px] break-words">
                        {output || <span className="text-slate-400 italic">...</span>}
                     </div>

                     <button
                        onClick={handleCopy}
                        disabled={!output}
                        className={`absolute bottom-6 right-6 p-3 rounded-xl shadow-sm transition-all ${output ? 'bg-white text-lime-600 hover:scale-105 hover:shadow-md' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
                    >
                         {copied ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                </div>
            </div>

            <RelatedTools currentToolId="num-to-words" categoryId="office" />
        </ToolPageLayout>
    );
}
