import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Bot } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function RobotsGenerator() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Robots.txt Generator | MiniTools by Spinotek</title>
                <meta name="description" content="Create properly formatted robots.txt files for SEO." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Bot size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Robots.txt Generator</h1>
                        <p className="text-slate-500 text-sm">Create properly formatted robots.txt files for SEO.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="robots-gen" categoryId="marketing" />
        </ToolPageLayout>
    );
}
