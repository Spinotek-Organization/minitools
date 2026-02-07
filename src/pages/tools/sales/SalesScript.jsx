import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function SalesScript() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Sales Script Generator | MiniTools by Spinotek</title>
                <meta name="description" content="Generate persuasive sales scripts instantly." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Sales Script Generator</h1>
                        <p className="text-slate-500 text-sm">Generate persuasive sales scripts instantly.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="sales-script" categoryId="sales" />
        </ToolPageLayout>
    );
}
