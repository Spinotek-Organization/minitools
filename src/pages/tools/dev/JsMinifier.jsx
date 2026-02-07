import { Minimize2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function JsMinifier() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Javascript Minifier | MiniTools by Spinotek</title>
                <meta name="description" content="Compress and optimize your Javascript code." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-700 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Minimize2 size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Javascript Minifier</h1>
                        <p className="text-slate-500 text-sm">Compress and optimize your Javascript code.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="js-minifier" categoryId="dev" />
        </ToolPageLayout>
    );
}
