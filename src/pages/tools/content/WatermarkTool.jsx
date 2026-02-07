import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Stamp } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function WatermarkTool() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Watermark Tool | Mini Tools by Spinotek</title>
                <meta name="description" content="Protect your content with custom watermarks." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Stamp size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Watermark Tool</h1>
                        <p className="text-slate-500 text-sm">Protect your content with custom watermarks.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="watermark-tool" categoryId="content" />
        </ToolPageLayout>
    );
}
