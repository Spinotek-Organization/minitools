import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ToolCard({ tool }) {
    const { t } = useTranslation();
    const ToolIcon = Icons[tool.icon] || Icons.HelpCircle;

    // Determine status badge
    let statusBadge = null;
    if (!tool.isReady) {
        statusBadge = (
            <span className="px-2.5 py-1 bg-slate-100 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-wider border border-slate-200/50">
                {t('tool_card.status.in_dev')}
            </span>
        );
    } else if (tool.isNew) {
        statusBadge = (
            <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-wider border border-blue-100">
                {t('tool_card.status.new')}
            </span>
        );
    }

    return (
        <Link to={tool.path} className="group block h-full">
            <div className="bg-white rounded-3xl border border-slate-100 p-8 h-full shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl ${tool.bgColor || 'bg-slate-50'} flex items-center justify-center ${tool.color || 'text-slate-400'} group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                        <ToolIcon size={24} />
                    </div>
                    {statusBadge}
                </div>

                <h3 className="text-lg font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                    {t(`tools.${tool.id}.title`, tool.title)}
                </h3>

                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 line-clamp-2">
                    {t(`tools.${tool.id}.desc`, tool.desc)}
                </p>

                <div className="flex items-center gap-2 text-blue-600 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 mt-auto">
                    {tool.isReady ? t('tool_card.action.launch') : t('tool_card.action.preview')} <Icons.ArrowRight size={12} />
                </div>
            </div>
        </Link>
    );
}
