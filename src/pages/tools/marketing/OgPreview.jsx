import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Share2 } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function OgPreview() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Open Graph Preview | MiniTools by Spinotek</title>
                <meta name="description" content="Preview how your links will look on social media." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Share2 size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Open Graph Preview</h1>
                        <p className="text-slate-500 text-sm">Preview how your links will look on social media.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="og-preview" categoryId="marketing" />
        </ToolPageLayout>
    );
}
