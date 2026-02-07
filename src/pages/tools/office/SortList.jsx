import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SortAsc } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function SortList() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Alphabetical Sorter | Mini Tools by Spinotek</title>
                <meta name="description" content="Sort any list alphabetically or numerically instantly." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <SortAsc size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Alphabetical Sorter</h1>
                        <p className="text-slate-500 text-sm">Sort any list alphabetically or numerically.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="sort-list" categoryId="office" />
        </ToolPageLayout>
    );
}
