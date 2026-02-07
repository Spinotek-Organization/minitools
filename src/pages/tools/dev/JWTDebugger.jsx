import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function JWTDebugger() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>JWT Debugger | Mini Tools by Spinotek</title>
                <meta name="description" content="Decode and inspect JSON Web Tokens safely." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">JWT Debugger</h1>
                        <p className="text-slate-500 text-sm">Decode and inspect JSON Web Tokens safely.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="jwt-debug" categoryId="dev" />
        </ToolPageLayout>
    );
}
