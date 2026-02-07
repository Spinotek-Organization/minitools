import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Timer } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function PomodoroTimer() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Pomodoro Timer | MiniTools by Spinotek</title>
                <meta name="description" content="Stay focused with customizable work and break intervals." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Timer size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Pomodoro Timer</h1>
                        <p className="text-slate-500 text-sm">Stay focused with customizable work and break intervals.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="pomodoro" categoryId="productivity" />
        </ToolPageLayout>
    );
}
