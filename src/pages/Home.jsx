import React from 'react';
import Hero from '../components/home/Hero';
import CategoryGrid from '../components/home/CategoryGrid';
import RequestToolCTA from '../components/shared/RequestToolCTA';

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Mesh Gradient Background Layer - Pushed deeper for ornaments */}
            <div className="absolute top-0 left-0 right-0 h-[480px] mesh-gradient -z-20 opacity-60" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                {/* Hero Section */}
                <Hero />

                {/* Categories Header */}
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Explore by Category</h2>
                        <p className="text-slate-400 text-sm font-medium italic">Find the right tool for your workflow.</p>
                    </div>
                    <div className="hidden md:block h-px flex-grow mx-8 bg-slate-100" />
                </div>

                {/* Category Grid */}
                <CategoryGrid />

                {/* Request Tool CTA */}
                <div className="mt-20">
                    <RequestToolCTA />
                </div>
            </div>
        </div>
    );
}
