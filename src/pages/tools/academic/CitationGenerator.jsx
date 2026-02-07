import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Quote } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function CitationGenerator() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Citation Generator | MiniTools by Spinotek</title>
                <meta name="description" content="Generate citations in APA, MLA, and Chicago formats easily." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Quote size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Citation Generator</h1>
                        <p className="text-slate-500 text-sm">Generate citations in APA, MLA, and Chicago formats.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="citation-gen" categoryId="academic" />
        </ToolPageLayout>
    );
}
