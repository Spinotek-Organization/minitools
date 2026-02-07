import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Divide } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function EquationSolver() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Equation Solver | MiniTools by Spinotek</title>
                <meta name="description" content="Solve basic linear and quadratic equations step-by-step." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Divide size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Equation Solver</h1>
                        <p className="text-slate-500 text-sm">Solve basic linear and quadratic equations step-by-step.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="equation-solver" categoryId="academic" />
        </ToolPageLayout>
    );
}
