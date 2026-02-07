import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Waves } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function AmbientNoise() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Ambient Noise Generator | Mini Tools by Spinotek</title>
                <meta name="description" content="Focus with soothing sounds like rain, coffee shop, and more." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sky-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Waves size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Ambient Noise Generator</h1>
                        <p className="text-slate-500 text-sm">Focus with soothing sounds like rain, coffee shop, and more.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="ambient-noise" categoryId="productivity" />
        </ToolPageLayout>
    );
}
