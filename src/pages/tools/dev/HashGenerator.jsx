import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Hash } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function HashGenerator() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>MD5/SHA256 Hasher | Mini Tools by Spinotek</title>
                <meta name="description" content="Generate secure cryptographic hashes for your data." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Hash size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">MD5/SHA256 Hasher</h1>
                        <p className="text-slate-500 text-sm">Generate secure cryptographic hashes for your data.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="hash-gen" categoryId="dev" />
        </ToolPageLayout>
    );
}
