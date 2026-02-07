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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <div className="text-center mb-20 space-y-6">
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight">
                    Tools for <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 pr-2">Productivity</span>,<br />
                    Built for Speed.
                </h2>
                <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium">
                    Over 120+ specialized tools for developers, marketers, and business owners.
                    Everything you need in one powerful command palette.
                </p>

                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95">
                        Get Started Free
                    </button>
                    <button className="px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 hover:-translate-y-1 transition-all">
                        Browse All Tools
                    </button>
                </div>

                <div className="pt-8 flex items-center justify-center gap-2 text-slate-400">
                    <span className="text-sm font-semibold uppercase tracking-widest">Press</span>
                    <kbd className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-slate-900 shadow-sm font-mono text-xs">Ctrl + /</kbd>
                    <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">to search</span>
                </div>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {CATEGORIES.map((cat) => {
                    const IconComponent = Icons[cat.icon];
                    return (
                        <Link
                            key={cat.id}
                            to={`/category/${cat.id}`}
                            className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 hover:border-blue-100 transition-all duration-300"
                        >
                            <div className="w-12 h-12 mb-6 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                                {IconComponent && <IconComponent size={24} />}
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{cat.name}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{cat.description}</p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
