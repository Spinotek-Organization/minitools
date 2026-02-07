import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import * as Icons from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { TOOLS } from '../../data/toolsList';
import Card from '../../components/shared/Card';
import ToolCard from '../../components/shared/ToolCard';
import RequestToolCTA from '../../components/shared/RequestToolCTA';
import Breadcrumbs from '../../components/shared/Breadcrumbs';

export default function CategoryPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const category = CATEGORIES.find(cat => cat.id === id);
    if (!category) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-black text-slate-900">Category not found</h1>
                <Link to="/" className="text-blue-600 font-bold hover:underline mt-4 inline-block">Return Home</Link>
            </div>
        );
    }

    const categoryTools = TOOLS.filter(tool => tool.cat === id);
    const filteredTools = categoryTools.filter(tool =>
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const CategoryIcon = Icons[category.icon];

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>{category.name} Tools | MiniTools by Spinotek</title>
                <meta name="description" content={`Explore our collection of ${category.name} tools for your productivity needs.`} />
            </Helmet>

            {/* Header Section */}
            <div className="bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                    {/* Breadcrumbs Navigation */}
                    <Breadcrumbs />

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                            <div className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center ${category.color} shadow-sm border border-slate-100/50`}>
                                {CategoryIcon && <CategoryIcon size={32} />}
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
                                    {category.name}
                                </h1 >
                                <p className="text-slate-500 font-medium max-w-xl leading-relaxed">
                                    {category.description}
                                </p>
                            </div>
                        </div>

                        <div className="relative w-full md:w-80">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                <Icons.Search size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder={`Search ${categoryTools.length} tools...`}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tools Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">
                        {searchQuery ? `Search Results (${filteredTools.length})` : `All ${category.name} Tools`}
                    </h2>
                </div>

                {filteredTools.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredTools.map((tool) => {
                            const ToolIcon = Icons[tool.icon] || Icons.HelpCircle;
                            return <ToolCard key={tool.id} tool={tool} />;
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100 border-dashed">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-4">
                            <Icons.SearchX size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">No tools found</h3>
                        <p className="text-slate-400 mt-2">Try searching for something else or browse categories.</p>
                    </div>
                )}
            </div>

            {/* Reusable CTA */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <RequestToolCTA />
            </div>
        </div>
    );
}
