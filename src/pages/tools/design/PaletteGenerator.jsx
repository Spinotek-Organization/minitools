import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Palette } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function PaletteGenerator() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Color Palette Generator | MiniTools by Spinotek</title>
                <meta name="description" content="Create beautiful, harmonious color schemes for your projects." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Palette size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Color Palette Generator</h1>
                        <p className="text-slate-500 text-sm">Create beautiful, harmonious color schemes for your projects.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="palette-gen" categoryId="design" />
        </ToolPageLayout>
    );
}
