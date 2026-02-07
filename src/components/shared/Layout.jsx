import { useNavigate, Link } from 'react-router-dom';
import { Search, Menu as MenuIcon, X, Twitter, ChevronDown, Globe, Smartphone, Briefcase, Layout as LayoutIcon } from 'lucide-react';
import { useState, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import CommandPalette from '../command/CommandPalette';
import { CATEGORIES } from '../../data/categories';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-slate-900">
            <Navbar />
            <CommandPalette />

            <main className="flex-grow pt-20">
                {children}
            </main>

            <Footer />
        </div>
    );
}

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleSearch = () => {
        window.dispatchEvent(new CustomEvent('toggle-search'));
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                                <img src="/img/spinotek-symbol.png" alt="Spinotek" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-600 tracking-tight">
                                Spinotek Tools
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-6">
                            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Home</Link>

                            <Menu as="div" className="relative">
                                <Menu.Button className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1 outline-none">
                                    Categories <ChevronDown size={14} />
                                </Menu.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left divide-y divide-slate-100 rounded-2xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden">
                                        <div className="p-2">
                                            {CATEGORIES.map((cat) => (
                                                <Menu.Item key={cat.id}>
                                                    {({ active }) => (
                                                        <Link
                                                            to={`/category/${cat.id}`}
                                                            className={`${active ? 'bg-blue-50 text-blue-700' : 'text-slate-600'
                                                                } group flex w-full items-center rounded-xl px-3 py-2 text-sm font-medium transition-colors`}
                                                        >
                                                            {cat.name}
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSearch}
                            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-200 transition-all group"
                        >
                            <Search size={16} />
                            <span className="text-xs font-medium">Search tools...</span>
                            <kbd className="ml-2 px-1 text-[10px] font-bold bg-white border border-slate-300 rounded text-slate-400">Ctrl /</kbd>
                        </button>

                        <div className="flex items-center gap-2">
                            <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2">
                    <Link to="/" className="block px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg">Home</Link>
                    <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">Categories</div>
                    {CATEGORIES.map((cat) => (
                        <Link key={cat.id} to={`/category/${cat.id}`} className="block px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg ml-4">
                            {cat.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}

function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <a href="https://spinotek.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 group">
                                <div className="w-8 h-8 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                                    <img src="/img/spinotek-symbol.png" alt="Spinotek" className="w-full h-full object-contain" />
                                </div>
                                <span className="font-bold text-slate-900 border-b-2 border-transparent group-hover:border-blue-600 transition-all">Spinotek Tools</span>
                            </a>
                        </div>
                        <p className="text-slate-500 text-sm max-w-xs">
                            Handcrafted utility suite by <a href="https://spinotek.com" className="text-blue-600 font-bold hover:underline">Spinotek</a>. Built with focus on speed, privacy, and visual excellence.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Services</h4>
                        <ul className="space-y-2 text-sm text-slate-600 font-medium">
                            <li>
                                <a href="https://spinotek.com/web-development" target="_blank" rel="noreferrer" className="hover:text-blue-600 flex items-center gap-2">
                                    <Globe size={14} /> Web Development
                                </a>
                            </li>
                            <li>
                                <a href="https://spinotek.com/mobile-development" target="_blank" rel="noreferrer" className="hover:text-blue-600 flex items-center gap-2">
                                    <Smartphone size={14} /> Mobile App Development
                                </a>
                            </li>
                            <li>
                                <a href="https://spinotek.com/showcase" target="_blank" rel="noreferrer" className="hover:text-blue-600 flex items-center gap-2">
                                    <LayoutIcon size={14} /> Showcase
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Company</h4>
                        <ul className="space-y-2 text-sm text-slate-600 font-medium">
                            <li>
                                <a href="https://spinotek.com/products" target="_blank" rel="noreferrer" className="hover:text-blue-600 flex items-center gap-2">
                                    <Briefcase size={14} /> Our Products
                                </a>
                            </li>
                            <li><a href="https://spinotek.com" target="_blank" rel="noreferrer" className="hover:text-blue-600">About Spinotek</a></li>
                            <li><Link to="/api" className="hover:text-blue-600">Developer API</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-xs">
                        © {new Date().getFullYear()} <a href="https://spinotek.com" className="hover:text-blue-600">Spinotek</a>. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="https://twitter.com/spinotek" target="_blank" rel="noreferrer" className="p-2 text-slate-300 hover:text-blue-400 transition-colors">
                            <Twitter size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
