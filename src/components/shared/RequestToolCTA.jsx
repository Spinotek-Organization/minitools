import React from 'react';
import { ArrowRight } from 'lucide-react';
import Card from './Card';

export default function RequestToolCTA() {
    return (
        <Card className="bg-slate-900 border-none shadow-2xl shadow-blue-900/20 overflow-hidden relative group">
            {/* Background Decorative Element */}
            <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all duration-700" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-2 md:p-4">
                <div className="text-center md:text-left">
                    <p className="text-slate-300 text-lg font-bold leading-relaxed">
                        We are constantly adding new utilities. <span className="text-white">Submit your request today!</span>
                    </p>
                    <p className="text-slate-500 text-xs mt-1 font-medium tracking-wide uppercase">
                        Fast turnaround • 100% Free • Privacy Focused
                    </p>
                </div>

                <button className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all active:scale-95 group/btn shadow-xl shadow-blue-600/20 whitespace-nowrap">
                    Request New Tool
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
        </Card>
    );
}
