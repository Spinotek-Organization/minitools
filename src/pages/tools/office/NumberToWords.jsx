import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Coins } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function NumberToWords() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Number to Words (Terbilang) | Mini Tools by Spinotek</title>
                <meta name="description" content="Convert numerical values into written text or words instantly." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-lime-700 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Coins size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Number to Words (Terbilang)</h1>
                        <p className="text-slate-500 text-sm">Convert numerical values into written text.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="num-to-words" categoryId="office" />
        </ToolPageLayout>
    );
}
