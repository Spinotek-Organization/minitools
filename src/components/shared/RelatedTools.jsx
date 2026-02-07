import React from 'react';
import { TOOLS } from '../../data/toolsList';
import ToolCard from './ToolCard';

export default function RelatedTools({ currentToolId, categoryId, limit = 4 }) {
    // Find related tools: same category, not the current tool
    const relatedTools = TOOLS
        .filter(tool => tool.cat === categoryId && tool.id !== currentToolId)
        .slice(0, limit);

    if (relatedTools.length === 0) return null;

    return (
        <div className="mt-16 pt-16 border-t border-slate-100">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-8">
                Related Utilities
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                ))}
            </div>
        </div>
    );
}
