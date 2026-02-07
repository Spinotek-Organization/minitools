import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Type } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function CaptionFormatter() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Caption Formatter | Mini Tools by Spinotek</title>
                <meta name="description" content="Clean up your captions with clean line breaks." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Type size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Caption Formatter</h1>
                        <p className="text-slate-500 text-sm">Clean up your captions with clean line breaks.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="caption-fmt" categoryId="content" />
        </ToolPageLayout>
    );
}
