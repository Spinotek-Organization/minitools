import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Database, Zap, FileJson } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function SqlFormatter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const formatSQL = () => {
        if (!input) return;
        
        let formatted = input
            // Remove extra whitespace
            .replace(/\s+/g, ' ')
            // Add newlines key clauses (very basic regex implementation)
            .replace(/\b(SELECT|FROM|WHERE|AND|OR|ORDER BY|GROUP BY|limit|INNER JOIN|LEFT JOIN|RIGHT JOIN|HAVING|VALUES|UPDATE|SET|DELETE|INSERT INTO|CREATE TABLE|ALTER TABLE|DROP TABLE)\b/gi, (match) => `\n${match.toUpperCase()}`)
            .replace(/\b(ASC|DESC)\b/gi, (match) => ` ${match.toUpperCase()}`)
            .replace(/\,/g, ',\n\t') // Newline after comma
            .replace(/\(/g, '(\n\t') // Newline after open parenthesis
            .replace(/\)/g, '\n)')   // Newline before close parenthesis
            .trim();
            
        // Fix double newlines
        formatted = formatted.replace(/\n\s*\n/g, '\n');
        
        setOutput(formatted);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>SQL Formatter | MiniTools by Spinotek</title>
                <meta name="description" content="Beautify and format your SQL queries instantly." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Database size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">SQL Formatter</h1>
                        <p className="text-slate-500 text-sm">Beautify and format your SQL queries instantly.</p>
                    </div>
                </div>
                <button 
                    onClick={formatSQL}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-emerald-200"
                >
                    <Zap size={20} /> Format SQL
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm h-full flex flex-col">
                    <label className="text-sm font-bold text-slate-500 mb-2 ml-2">Input SQL</label>
                    <textarea 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="SELECT * FROM users WHERE id = 1..." 
                        className="flex-1 w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[300px]"
                    />
                </div>
                <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm h-full flex flex-col">
                    <label className="text-sm font-bold text-slate-500 mb-2 ml-2">Formatted Output</label>
                    <textarea 
                        readOnly
                        value={output}
                        placeholder="Formatted query will appear here..." 
                        className="flex-1 w-full p-4 bg-slate-900 border border-slate-800 rounded-xl font-mono text-sm text-emerald-400 focus:outline-none min-h-[300px]"
                    />
                </div>
            </div>

            <RelatedTools currentToolId="sql-fmt" categoryId="dev" />
        </ToolPageLayout>
    );
}
