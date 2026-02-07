import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Wallet } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function SalaryCalculator() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Salary Calculator | MiniTools by Spinotek</title>
                <meta name="description" content="Calculate net pay after taxes and deductions." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Wallet size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Salary Calculator</h1>
                        <p className="text-slate-500 text-sm">Calculate net pay after taxes and deductions.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="salary-calc" categoryId="biz" />
        </ToolPageLayout>
    );
}
