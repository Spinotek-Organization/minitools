import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as LinkIcon } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function PlagiarismChecker() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Plagiarism Checker Linker | Mini Tools by Spinotek</title>
                <meta name="description" content="Quick links to top free plagiarism detection tools." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sky-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <LinkIcon size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Plagiarism Checker Linker</h1>
                        <p className="text-slate-500 text-sm">Quick links to top free plagiarism detection tools.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="plagiarism-linker" categoryId="academic" />
        </ToolPageLayout>
    );
}
