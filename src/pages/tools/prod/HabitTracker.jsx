import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2 } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function HabitTracker() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Daily Habit Tracker | Mini Tools by Spinotek</title>
                <meta name="description" content="Track and build better daily routines and habits." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <CheckCircle2 size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Daily Habit Tracker</h1>
                        <p className="text-slate-500 text-sm">Track and build better daily routines and habits.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="habit-tracker" categoryId="productivity" />
        </ToolPageLayout>
    );
}
