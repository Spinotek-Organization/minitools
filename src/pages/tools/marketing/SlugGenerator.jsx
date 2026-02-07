import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Zap } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function SlugGenerator() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Slug Generator | Mini Tools by Spinotek</title>
                <meta name="description" content="Convert any text into a URL-friendly slug." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Zap size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Slug Generator</h1>
                        <p className="text-slate-500 text-sm">Convert any text into a URL-friendly slug.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="slug-gen" categoryId="marketing" />
        </ToolPageLayout>
    );
}
