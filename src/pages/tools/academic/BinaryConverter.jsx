import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Binary } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function BinaryConverter() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Binary to Decimal | MiniTools by Spinotek</title>
                <meta name="description" content="Convert numbers between binary, decimal, and hex easily." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Binary size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Binary to Decimal</h1>
                        <p className="text-slate-500 text-sm">Convert numbers between binary, decimal, and hex.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="binary-conv" categoryId="academic" />
        </ToolPageLayout>
    );
}
