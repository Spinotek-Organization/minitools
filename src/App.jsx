import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/shared/Layout';
import { CATEGORIES } from './data/categories';
import * as Icons from 'lucide-react';
import JsonFormatter from './pages/tools/dev/JsonFormatter';
import { Helmet } from 'react-helmet-async';

function App() {
    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tools/dev/json-formatter" element={
                        <>
                            <Helmet>
                                <title>JSON Formatter & Validator | Spinotek Tools</title>
                                <meta name="description" content="Clean, format, and validate your JSON data instantly with our professional JSON Formatter tool." />
                            </Helmet>
                            <JsonFormatter />
                        </>
                    } />
                </Routes>
            </Layout>
        </Router>
    );
}

function Home() {
    return (
        <div className="min-h-screen">
            {/* Mesh Gradient Background Layer */}
            <div className="absolute top-0 left-0 right-0 h-[480px] mesh-gradient -z-10 opacity-60" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                {/* Hero Section */}
                <div className="text-center mb-16 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] animate-float">
                        <Icons.Zap size={12} /> 120+ Tools and Counting
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[1.1]">
                        Utility Suite for <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
                            Modern Makers.
                        </span>
                    </h2>

                    <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        Professional collection of specialized tools for <span className="text-slate-900">developers</span>,
                        <span className="text-slate-900"> marketers</span>, and <span className="text-slate-900">builders</span>.
                        No sign-up. Fast. Flat. Free.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                        <button className="px-8 py-4 bg-blue-600 text-white font-extrabold rounded-2xl hover:bg-blue-700 transition-all active:scale-95 text-base">
                            Explore Tools
                        </button>
                        <button className="px-8 py-4 bg-white text-slate-700 font-extrabold rounded-2xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all text-base">
                            View Roadmap
                        </button>
                    </div>

                    <div className="pt-8 flex flex-col items-center gap-4">
                        <div className="flex items-center gap-3 text-slate-400 group cursor-pointer" onClick={() => window.dispatchEvent(new CustomEvent('toggle-search'))}>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Press</span>
                            <kbd className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-900 font-mono text-xs group-hover:border-blue-300 transition-colors">/</kbd>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">to search</span>
                        </div>
                    </div>
                </div>

                {/* Categories Header */}
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Explore by Category</h2>
                        <p className="text-slate-400 text-sm font-medium italic">Find the right tool for your workflow.</p>
                    </div>
                    <div className="hidden md:block h-px flex-grow mx-8 bg-slate-100" />
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                    {CATEGORIES.map((cat, idx) => {
                        const IconComponent = Icons[cat.icon];
                        return (
                            <Link
                                key={cat.id}
                                to={`/category/${cat.id}`}
                                className="group relative bg-white p-7 rounded-[2rem] border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 overflow-hidden"
                            >
                                <div className="relative z-10">
                                    <div className="w-12 h-12 mb-6 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                                        {IconComponent && <IconComponent size={24} />}
                                    </div>
                                    <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-blue-700 transition-colors leading-tight">{cat.name}</h3>
                                    <p className="text-slate-500 text-xs font-medium leading-relaxed group-hover:text-slate-600 transition-colors">{cat.description}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Trust Section / Stats Bar */}
                <div className="mt-24 p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row items-center justify-around gap-8 text-center">
                    <div className="space-y-1">
                        <div className="text-3xl font-black text-slate-900">99.9%</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Uptime</div>
                    </div>
                    <div className="w-px h-8 bg-slate-200 hidden md:block" />
                    <div className="space-y-1">
                        <div className="text-3xl font-black text-slate-900">0ms</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Latency</div>
                    </div>
                    <div className="w-px h-8 bg-slate-200 hidden md:block" />
                    <div className="space-y-1">
                        <div className="text-3xl font-black text-slate-900">Flat UI</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Modern Design</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
