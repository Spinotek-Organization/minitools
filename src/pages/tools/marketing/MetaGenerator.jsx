import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Tags } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function MetaGenerator() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Meta Tag Generator | MiniTools by Spinotek</title>
                <meta name="description" content="Create SEO-optimized meta tags for your website." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Tags size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Meta Tag Generator</h1>
                        <p className="text-slate-500 text-sm">Create SEO-optimized meta tags for your website.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="meta-gen" categoryId="marketing" />
        </ToolPageLayout>
    );
}
