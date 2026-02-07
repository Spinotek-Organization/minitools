import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Replace } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function BatchReplace() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Batch Search & Replace | Mini Tools by Spinotek</title>
                <meta name="description" content="Find and replace text across multiple lines or files instantly." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Replace size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Batch Search & Replace</h1>
                        <p className="text-slate-500 text-sm">Find and replace text across multiple lines or files.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="text-replace" categoryId="office" />
        </ToolPageLayout>
    );
}
