import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Search } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function IconSearcher() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Icon Searcher | Mini Tools by Spinotek</title>
                <meta name="description" content="Search through thousands of open-source icons." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Search size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Icon Searcher</h1>
                        <p className="text-slate-500 text-sm">Search through thousands of open-source icons.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="icon-search" categoryId="design" />
        </ToolPageLayout>
    );
}
