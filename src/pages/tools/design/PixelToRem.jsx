import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MoveHorizontal } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function PixelToRem() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Pixel to REM Converter | MiniTools by Spinotek</title>
                <meta name="description" content="Convert pixels to REM for modern responsive CSS." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <MoveHorizontal size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Pixel to REM Converter</h1>
                        <p className="text-slate-500 text-sm">Convert pixels to REM for modern responsive CSS.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="pixel-rem" categoryId="design" />
        </ToolPageLayout>
    );
}
