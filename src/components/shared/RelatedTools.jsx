import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { TOOLS } from '../../data/toolsList';
import Card from './Card';

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
                {relatedTools.map((tool) => {
                    const ToolIcon = Icons[tool.icon] || Icons.HelpCircle;
                    return (
                        <Link key={tool.id} to={tool.path} className="group">
                            <Card hover className="h-full border-slate-100/60" noPadding>
                                <div className="p-6">
                                    <div className={`w-10 h-10 mb-4 rounded-xl ${tool.bgColor || 'bg-slate-50'} flex items-center justify-center ${tool.color || 'text-slate-400'} group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                                        <ToolIcon size={20} />
                                    </div>
                                    <h4 className="text-base font-black text-slate-900 mb-1 group-hover:text-blue-600 transition-colors leading-tight">
                                        {tool.title}
                                    </h4>
                                    <p className="text-slate-500 text-[11px] font-medium leading-relaxed line-clamp-2">
                                        {tool.desc}
                                    </p>
                                </div>
                            </Card>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}
