import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Combine, ArrowRightLeft } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function DiffChecker() {
    const [original, setOriginal] = useState('');
    const [modified, setModified] = useState('');
    const [diffResult, setDiffResult] = useState([]);

    // Simple Diff Algorithm (Longest Common Subsequence is ideal, but using a simpler O(N) approach for brevity)
    // This is a "greedy" diff, not minimal, but works for simple cases.
    const computeDiff = () => {
        const oLines = original.split('\n');
        const mLines = modified.split('\n');
        
        let i = 0;
        let j = 0;
        const result = [];

        while (i < oLines.length || j < mLines.length) {
            if (i < oLines.length && j < mLines.length && oLines[i] === mLines[j]) {
                // Unchanged
                result.push({ type: 'same', text: oLines[i] });
                i++;
                j++;
            } else {
                // Difference found.
                // Simple heuristic: check if next lines match to detect insert vs delete
                let foundMatch = false;
                
                // Look ahead in modified (Insertion?)
                for (let k = j + 1; k < Math.min(j + 10, mLines.length); k++) {
                    if (oLines[i] === mLines[k]) {
                        // Found a match later in modified -> implies lines between j and k were INSERTED
                        while (j < k) {
                            result.push({ type: 'added', text: mLines[j] });
                            j++;
                        }
                        foundMatch = true;
                        break;
                    }
                }

                if (!foundMatch) {
                    // Look ahead in original (Deletion?)
                    for (let k = i + 1; k < Math.min(i + 10, oLines.length); k++) {
                        if (mLines[j] === oLines[k]) {
                            // Found match later in original -> implies lines between i and k were DELETED
                            while (i < k) {
                                result.push({ type: 'removed', text: oLines[i] });
                                i++;
                            }
                            foundMatch = true;
                            break;
                        }
                    }
                }

                if (!foundMatch) {
                    // Changed (Remove old, Add new)
                    if (i < oLines.length) {
                        result.push({ type: 'removed', text: oLines[i] });
                        i++;
                    }
                    if (j < mLines.length) {
                        result.push({ type: 'added', text: mLines[j] });
                        j++;
                    }
                }
            }
        }
        setDiffResult(result);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Diff Checker | MiniTools by Spinotek</title>
                <meta name="description" content="Compare and find differences between two text sets." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Combine size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Diff Checker</h1>
                        <p className="text-slate-500 text-sm">Compare and find differences between two text sets.</p>
                    </div>
                </div>
                <button 
                    onClick={computeDiff}
                    className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-rose-200"
                >
                    <ArrowRightLeft size={20} /> Compare
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 ml-2">Original Text</label>
                    <textarea 
                        value={original}
                        onChange={(e) => setOriginal(e.target.value)}
                        className="w-full h-64 p-4 bg-white border border-slate-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                        placeholder="Paste original text..."
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 ml-2">Modified Text</label>
                    <textarea 
                        value={modified}
                        onChange={(e) => setModified(e.target.value)}
                        className="w-full h-64 p-4 bg-white border border-slate-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                        placeholder="Paste modified text..."
                    />
                </div>
            </div>

            {diffResult.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm mb-8">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-bold text-slate-900">Comparison Result</h3>
                    </div>
                    <div className="p-0 font-mono text-sm overflow-x-auto">
                        <table className="w-full border-collapse">
                            <tbody>
                                {diffResult.map((line, idx) => (
                                    <tr key={idx} className={
                                        line.type === 'added' ? 'bg-emerald-50' : 
                                        line.type === 'removed' ? 'bg-rose-50' : ''
                                    }>
                                        <td className="w-8 py-1 px-2 text-right text-xs text-slate-400 select-none border-r border-slate-100 bg-slate-50/30">
                                            {idx + 1}
                                        </td>
                                        <td className="w-8 py-1 px-2 text-center text-xs select-none font-bold">
                                            {line.type === 'added' ? <span className="text-emerald-600">+</span> : 
                                             line.type === 'removed' ? <span className="text-rose-600">-</span> : ''}
                                        </td>
                                        <td className={`py-1 px-4 whitespace-pre-wrap ${
                                            line.type === 'added' ? 'text-emerald-800' : 
                                            line.type === 'removed' ? 'text-rose-800 decoration-rose-300 line-through decoration-2' : 
                                            'text-slate-600'
                                        }`}>
                                            {line.text}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <RelatedTools currentToolId="diff-checker" categoryId="dev" />
        </ToolPageLayout>
    );
}
