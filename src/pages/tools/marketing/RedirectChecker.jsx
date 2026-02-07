import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRightLeft } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function RedirectChecker() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Redirect Checker | Mini Tools by Spinotek</title>
                <meta name="description" content="Track and verify URL redirection paths and status codes." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <ArrowRightLeft size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Redirect Checker</h1>
                        <p className="text-slate-500 text-sm">Track and verify URL redirection paths and status codes.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="redirect-check" categoryId="marketing" />
        </ToolPageLayout>
    );
}
