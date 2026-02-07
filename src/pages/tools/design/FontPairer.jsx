import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Type } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function FontPairer() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Font Pairer Suggestions | Mini Tools by Spinotek</title>
                <meta name="description" content="Find perfect typography combinations for your project." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Type size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Font Pairer Suggestions</h1>
                        <p className="text-slate-500 text-sm">Find perfect typography combinations for your project.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="font-pairer" categoryId="design" />
        </ToolPageLayout>
    );
}
