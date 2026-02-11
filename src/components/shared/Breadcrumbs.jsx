import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { TOOLS } from '../../data/toolsList';
import { useTranslation } from 'react-i18next';

export default function Breadcrumbs() {
    const location = useLocation();
    const { t } = useTranslation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    // If we're on the home page, don't show breadcrumbs
    if (pathnames.length === 0) return null;

    return (
        <nav className="flex mb-6 overflow-x-auto no-scrollbar" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                <li>
                    <Link to="/" className="text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1.5">
                        <Home size={14} />
                        {t('breadcrumbs.home')}
                    </Link>
                </li>

                {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;

                    // Logic to find readable names and correct paths
                    let displayName = value;
                    let to = `/${pathnames.slice(0, index + 1).join('/')}`;

                    if (value === 'category' || value === 'category') return null; // Skip 'category' segment

                    const category = CATEGORIES.find(c => c.id === value);
                    const tool = TOOLS.find(t => t.path.endsWith(value) || t.id === value);

                    if (value === 'tools') {
                        displayName = t('breadcrumbs.explore');
                        to = '/explore';
                    } else if (category) {
                        displayName = t(`categories.${category.id}`);
                        to = `/category/${category.id}`;
                    } else if (tool) {
                        displayName = t(`tools.${tool.id}.title`, tool.title);
                    } else if (value === 'explore') {
                        displayName = t('breadcrumbs.explore');
                    }

                    // Format display name (capitalize if no match found)
                    if (displayName === value) {
                        displayName = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');
                    }

                    return (
                        <li key={to} className="flex items-center space-x-2">
                            <ChevronRight size={14} className="text-slate-300 flex-shrink-0" />
                            {last ? (
                                <span className="text-blue-600 select-none">{displayName}</span>
                            ) : (
                                <Link to={to} className="text-slate-400 hover:text-blue-600 transition-colors">
                                    {displayName}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
