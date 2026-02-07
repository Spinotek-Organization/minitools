import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FilePlus2 } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function PdfTools() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>PDF Merge/Split | Mini Tools by Spinotek</title>
                <meta name="description" content="Combine multiple PDFs or extract pages into new files easily." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <FilePlus2 size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">PDF Merge/Split</h1>
                        <p className="text-slate-500 text-sm">Combine multiple PDFs or extract pages into new files.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="pdf-merge" categoryId="office" />
        </ToolPageLayout>
    );
}
