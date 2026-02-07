import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { TOOLS } from '../../data/toolsList';

export default function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    // If we're on the home page, don't show breadcrumbs
    if (pathnames.length === 0) return null;

    return (
        <nav className="flex mb-8 overflow-x-auto no-scrollbar" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                <li>
                    <Link to="/" className="text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1.5">
                        <Home size={14} />
                        Home
                    </Link>
                </li>

                {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                    // Logic to find readable names for IDs
                    let displayName = value;
                    if (value === 'category') return null; // Skip 'category' segment

                    const category = CATEGORIES.find(c => c.id === value);
                    const tool = TOOLS.find(t => t.path.endsWith(value) || t.id === value);

                    if (category) displayName = category.name;
                    else if (tool) displayName = tool.title;
                    else if (value === 'explore') displayName = 'Explore Tools';

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
