import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Eye } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function EyeBreak() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Eye Break Timer | Mini Tools by Spinotek</title>
                <meta name="description" content="Protect your eyes using the 20-20-20 break rule." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Eye size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Eye Break Timer</h1>
                        <p className="text-slate-500 text-sm">Protect your eyes using the 20-20-20 break rule.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="eye-break" categoryId="productivity" />
        </ToolPageLayout>
    );
}
