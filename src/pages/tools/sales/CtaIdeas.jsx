import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Zap, Copy, Check, Filter } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

const CTAS = [
    // E-commerce
    { id: 1, category: 'E-commerce', text: 'Shop Now & Save 20%' },
    { id: 2, category: 'E-commerce', text: 'Add to Cart - Limited Stock' },
    { id: 3, category: 'E-commerce', text: 'Claim Your Free Gift' },
    { id: 4, category: 'E-commerce', text: 'Get It Before It\'s Gone' },
    { id: 5, category: 'E-commerce', text: 'Yes, I Want Free Shipping' },

    // SaaS / Product
    { id: 11, category: 'SaaS', text: 'Start Your Free 14-Day Trial' },
    { id: 12, category: 'SaaS', text: 'See How It Works' },
    { id: 13, category: 'SaaS', text: 'Get Started for Free' },
    { id: 14, category: 'SaaS', text: 'Book a Live Demo' },
    { id: 15, category: 'SaaS', text: 'No Credit Card Required' },

    // Newsletter / Lead Gen
    { id: 21, category: 'Newsletter', text: 'Join 10,000+ Marketers' },
    { id: 22, category: 'Newsletter', text: 'Send Me the Guide' },
    { id: 23, category: 'Newsletter', text: 'Subscribe for Weekly Tips' },
    { id: 24, category: 'Newsletter', text: 'Unlock Exclusive Content' },
    { id: 25, category: 'Newsletter', text: 'Download Now (PDF)' },

    // Webinar / Events
    { id: 31, category: 'Events', text: 'Save My Seat' },
    { id: 32, category: 'Events', text: 'Register for Free' },
    { id: 33, category: 'Events', text: 'Reserve Your Spot' },
    { id: 34, category: 'Events', text: 'Add to Calendar' },
    
    // Social / Generic
    { id: 41, category: 'Social', text: 'Follow for More' },
    { id: 42, category: 'Social', text: 'Tell Me Your Thoughts Below' },
    { id: 43, category: 'Social', text: 'Share with a Friend' },
    { id: 44, category: 'Social', text: 'Learn More' },
    { id: 45, category: 'Social', text: 'Link in Bio' },
];

const CATEGORIES = ['All', ...new Set(CTAS.map(c => c.category))];

export default function CtaIdeas() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [copiedId, setCopiedId] = useState(null);

    const filteredCtas = selectedCategory === 'All' 
        ? CTAS 
        : CTAS.filter(c => c.category === selectedCategory);

    const handleCopy = (id, text) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>CTA Ideas Generator | MiniTools by Spinotek</title>
                <meta name="description" content="Catchy call-to-action ideas for higher conversion." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Zap size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">CTA Ideas Generator</h1>
                        <p className="text-slate-500 text-sm">Catchy call-to-action ideas for higher conversion.</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 w-fit">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                            selectedCategory === cat
                                ? 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-500'
                                : 'text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {filteredCtas.map(cta => (
                    <button
                        key={cta.id}
                        onClick={() => handleCopy(cta.id, cta.text)}
                        className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-yellow-200 hover:-translate-y-1 transition-all text-left flex flex-col justify-between min-h-[140px]"
                    >
                        <div>
                            <span className="inline-block px-2 py-1 bg-slate-50 text-slate-400 text-xs font-bold rounded-md mb-3 uppercase tracking-wider">
                                {cta.category}
                            </span>
                            <div className="text-lg font-bold text-slate-900 group-hover:text-yellow-700 transition-colors">
                                "{cta.text}"
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-400 mt-4">
                            {copiedId === cta.id ? (
                                <>
                                    <Check size={16} className="text-green-500" />
                                    <span className="text-green-500">Copied!</span>
                                </>
                            ) : (
                                <>
                                    <Copy size={16} className="group-hover:text-yellow-600 transition-colors" />
                                    <span className="group-hover:text-yellow-600 transition-colors">Click to copy</span>
                                </>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            <RelatedTools currentToolId="cta-ideas" categoryId="sales" />
        </ToolPageLayout>
    );
}
