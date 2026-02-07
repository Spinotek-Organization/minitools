import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CopyMinus } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function RemoveDuplicates() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Duplicate Line Remover | Mini Tools by Spinotek</title>
                <meta name="description" content="Clean up your lists by removing repeated lines automatically." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <CopyMinus size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Duplicate Line Remover</h1>
                        <p className="text-slate-500 text-sm">Clean up your lists by removing repeated lines.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="remove-duplicates" categoryId="office" />
        </ToolPageLayout>
    );
}
