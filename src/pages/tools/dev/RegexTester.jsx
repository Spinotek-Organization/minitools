import { useState, useMemo } from 'react';
import { SearchCode, AlertCircle, CheckCircle, Info } from 'lucide-react';
import Card from '../../../components/shared/Card';
import { Helmet } from 'react-helmet-async';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function RegexTester() {
    const [regex, setRegex] = useState('');
    const [flags, setFlags] = useState('g');
    const [testText, setTestText] = useState('');
    const [error, setError] = useState(null);

    const matches = useMemo(() => {
        if (!regex || !testText) return [];
        try {
            const re = new RegExp(regex, flags);
            setError(null);

            const results = [];
            let match;

            // If global flag is not set, we only get one match
            if (!flags.includes('g')) {
                match = re.exec(testText);
                if (match) results.push(match);
            } else {
                while ((match = re.exec(testText)) !== null) {
                    results.push(match);
                    // Prevent infinite loop with zero-width matches
                    if (match.index === re.lastIndex) re.lastIndex++;
                }
            }
            return results;
        } catch (e) {
            setError(e.message);
            return [];
        }
    }, [regex, flags, testText]);

    const highlightMatches = () => {
        if (!testText) return <span className="text-slate-500 italic">Test string will appear here...</span>;
        if (!regex || error) return testText;

        const parts = [];
        let lastIndex = 0;

        matches.forEach((match, i) => {
            // Text before match
            parts.push(testText.slice(lastIndex, match.index));
            // The match itself
            parts.push(
                <mark key={i} className="bg-blue-500/30 text-blue-200 rounded px-0.5 border-b-2 border-blue-400">
                    {match[0]}
                </mark>
            );
            lastIndex = match.index + match[0].length;
        });

        // Remaining text
        parts.push(testText.slice(lastIndex));
        return parts;
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Regex Tester | MiniTools by Spinotek</title>
                <meta name="description" content="Test and debug your JavaScript regular expressions with real-time highlighting and match grouping." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <SearchCode size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Regex Tester</h1>
                        <p className="text-slate-500 text-sm">Real-time regular expression debugger.</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-xl border border-blue-100 text-blue-700 text-xs font-bold">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    Live Preview Active
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Controls Section */}
                <div className="space-y-6">
                    <Card className="p-8 space-y-6" noPadding>
                        <div className="p-8 space-y-6">
                            {/* Regex Input */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                    Regular Expression
                                    {error && <span className="text-red-500 italic normal-case tracking-normal">(Invalid Pattern)</span>}
                                </label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 font-mono text-lg">/</span>
                                    <input
                                        type="text"
                                        className={`w-full pl-8 pr-20 py-4 bg-slate-50 border ${error ? 'border-red-200' : 'border-slate-100'} rounded-2xl font-mono text-sm outline-none focus:ring-0 transition-all`}
                                        placeholder="Enter pattern..."
                                        value={regex}
                                        onChange={(e) => setRegex(e.target.value)}
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                        <span className="text-slate-300 font-mono text-lg">/</span>
                                        <input
                                            type="text"
                                            className="w-10 bg-transparent text-blue-600 font-mono font-bold outline-none"
                                            value={flags}
                                            onChange={(e) => setFlags(e.target.value)}
                                            placeholder="gim"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Test Text Input */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Test String</label>
                                <textarea
                                    className="w-full h-48 p-6 bg-slate-50 border border-slate-100 rounded-3xl font-mono text-sm resize-none outline-none focus:ring-0 transition-all"
                                    placeholder="Enter text to test your regex against..."
                                    value={testText}
                                    onChange={(e) => setTestText(e.target.value)}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Stats/Summary Card */}
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                                <CheckCircle size={20} />
                            </div>
                            <div>
                                <div className="text-xl font-black text-slate-900">{matches.length}</div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase leading-none">Matches</div>
                            </div>
                        </Card>
                        <Card className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 flex-shrink-0">
                                <Info size={20} />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-900 capitalize">{flags || 'none'}</div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase leading-none">Flags</div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Real-time Preview */}
                <Card dark noPadding className="flex flex-col relative min-h-[500px]">
                    <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Live Highlight Preview</span>
                        </div>
                    </div>

                    <div className="flex-grow p-8 font-mono text-sm overflow-auto text-slate-300 leading-relaxed whitespace-pre-wrap break-all">
                        {error ? (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                                <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
                                    <AlertCircle size={24} />
                                </div>
                                <div className="max-w-[300px]">
                                    <p className="text-red-400 font-black uppercase tracking-widest text-[10px] mb-2">Regex Error</p>
                                    <p className="text-slate-500 text-xs">{error}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="relative">
                                {highlightMatches()}
                            </div>
                        )}
                    </div>

                    <div className="p-6 bg-slate-800/30 border-t border-slate-800">
                        <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4">Common Tokens</div>
                        <div className="flex flex-wrap gap-2">
                            {['\\w', '\\d', '\\s', '^', '$', '.*'].map(token => (
                                <code key={token} className="px-2 py-1 bg-slate-800 rounded text-blue-400 text-xs border border-slate-700 cursor-help" title="Click to learn more">
                                    {token}
                                </code>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>

            <RelatedTools currentToolId="regex-tester" categoryId="dev" />
        </ToolPageLayout>
    );
}
