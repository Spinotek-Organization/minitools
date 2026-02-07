import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Scissors } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function BackgroundRemover() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Image Background Remover | MiniTools by Spinotek</title>
                <meta name="description" content="Quickly remove backgrounds from your images using AI." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Scissors size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Image Background Remover</h1>
                        <p className="text-slate-500 text-sm">Quickly remove backgrounds from your images using AI.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="bg-remover" categoryId="design" />
        </ToolPageLayout>
    );
}
