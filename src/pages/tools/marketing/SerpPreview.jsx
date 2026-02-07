import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Search } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function SerpPreview() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Google SERP Preview | Mini Tools by Spinotek</title>
                <meta name="description" content="Visualize how your website appears on Google search results." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Search size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Google SERP Preview</h1>
                        <p className="text-slate-500 text-sm">Visualize how your website appears on Google search results.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="serp-preview" categoryId="marketing" />
        </ToolPageLayout>
    );
}
