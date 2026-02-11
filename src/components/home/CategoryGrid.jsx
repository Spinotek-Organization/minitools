import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import Card from '../shared/Card';
import { CATEGORIES } from '../../data/categories';
import { useTranslation } from 'react-i18next';

export default function CategoryGrid() {
    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {CATEGORIES.map((cat) => {
                const IconComponent = Icons[cat.icon];
                return (
                    <Link key={cat.id} to={`/category/${cat.id}`}>
                        <Card hover className="h-full" noPadding>
                            <div className="p-7">
                                <div className={`w-12 h-12 mb-6 rounded-xl ${cat.bgColor} flex items-center justify-center ${cat.color} group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-110 shadow-sm`}>
                                    {IconComponent && <IconComponent size={24} />}
                                </div>
                                <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-blue-700 transition-colors leading-tight">{t(`categories.${cat.id}`)}</h3>
                                <p className="text-slate-500 text-xs font-medium leading-relaxed group-hover:text-slate-600 transition-colors">{t(`categories_desc.${cat.id}`)}</p>
                            </div>
                        </Card>
                    </Link>
                );
            })}
        </div>
    );
}
