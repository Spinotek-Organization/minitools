import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Eye } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function ContrastChecker() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Contrast Checker | MiniTools by Spinotek</title>
                <meta name="description" content="Check WCAG accessibility contrast ratios for your designs." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Eye size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Contrast Checker</h1>
                        <p className="text-slate-500 text-sm">Check WCAG accessibility contrast ratios for your designs.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="contrast-check" categoryId="design" />
        </ToolPageLayout>
    );
}
