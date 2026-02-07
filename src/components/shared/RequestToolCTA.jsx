import React from 'react';
import { ArrowRight, Sparkles, PlusCircle } from 'lucide-react';

export default function RequestToolCTA() {
    return (
        <div className="w-full relative py-12">
            {/* Background Decor - Full Width */}
            <div className="absolute inset-0 bg-slate-50/50 -z-10" />

            <div className="max-w-7xl mx-auto">
                <div className="relative group overflow-hidden bg-white border border-blue-100 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)]">

                    {/* Decorative Blobs */}
                    <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 group-hover:bg-blue-100 transition-colors duration-700" />
                    <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-60" />

                    {/* Background Grid Pattern (Subtle) */}
                    <div className="absolute inset-0 opacity-[0.4] pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '30px 30px' }}
                    />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">

                        {/* Left: Content */}
                        <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                            {/* Icon Container with Glass Effect */}
                            <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-xl shadow-blue-200 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                <PlusCircle className="text-white" size={38} strokeWidth={1.5} />
                            </div>

                            <div className="space-y-3">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                                    <Sparkles size={12} /> Community Driven
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                                    Need a specific tool? <br />
                                    <span className="text-blue-600">Let us build it for you.</span>
                                </h3>
                                <p className="text-slate-500 text-lg font-medium max-w-xl">
                                    Our mission is to empower makers. If you can't find what you're looking for, we'll build it for free.
                                </p>
                            </div>
                        </div>

                        {/* Right: Button */}
                        <div className="w-full lg:w-auto">
                            <button className="w-full lg:w-auto group/btn relative flex items-center justify-center gap-3 px-10 py-5 bg-slate-900 hover:bg-blue-600 text-white font-extrabold rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-2xl shadow-slate-200">
                                <span className="text-lg">Request New Tool</span>
                                <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform duration-300" />
                            </button>
                            <p className="text-center mt-4 text-slate-400 text-xs font-semibold uppercase tracking-widest">
                                Response within 24 hours
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}