import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Database } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function SqlFormatter() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>SQL Formatter | Mini Tools by Spinotek</title>
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
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="sql-fmt" categoryId="dev" />
        </ToolPageLayout>
    );
}
