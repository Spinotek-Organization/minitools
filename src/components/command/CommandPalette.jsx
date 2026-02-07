import { useState, Fragment, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition, Combobox } from '@headlessui/react';
import { Search, Command, ArrowRight, History, Sparkles } from 'lucide-react';
import { TOOLS } from '../../data/toolsList';
import { CATEGORIES } from '../../data/categories';
import { useShortcut } from '../../hooks/useShortcut';
import * as Icons from 'lucide-react';

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [recentSearches, setRecentSearches] = useState([]);
    const navigate = useNavigate();

    // Load recent searches from localStorage
    useEffect(() => {
        const history = localStorage.getItem('recent-tools');
        if (history) {
            try {
                const parsed = JSON.parse(history);
                // Validate if tools still exist
                const validHistory = parsed
                    .map(id => TOOLS.find(t => t.id === id))
                    .filter(Boolean);
                setRecentSearches(validHistory);
            } catch (e) {
                console.error("Failed to parse history", e);
            }
        }
    }, [isOpen]);

    const addToHistory = (tool) => {
        const newHistory = [
            tool.id,
            ...recentSearches.map(t => t.id).filter(id => id !== tool.id)
        ].slice(0, 5);
        localStorage.setItem('recent-tools', JSON.stringify(newHistory));
    };

    // Keyboard shortcut handler
    useShortcut('/', () => setIsOpen(true));

    // Global event listener for navbar search trigger
    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('toggle-search', handleOpen);
        return () => window.removeEventListener('toggle-search', handleOpen);
    }, []);

    const filteredTools = query === ""
        ? []
        : TOOLS.filter((tool) =>
            tool.title.toLowerCase().includes(query.toLowerCase()) ||
            tool.desc.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 10);

    const suggestedTools = useMemo(() => {
        return TOOLS.slice(0, 5);
    }, []);

    const getCategoryName = (catId) => {
        return CATEGORIES.find(c => c.id === catId)?.name || "General";
    };

    return (
        <Transition.Root show={isOpen} as={Fragment} afterLeave={() => setQuery('')} appear>
            <Dialog as="div" className="relative z-[100]" onClose={setIsOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="mx-auto max-w-2xl transform divide-y divide-slate-100 overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
                            <Combobox onChange={(tool) => {
                                addToHistory(tool);
                                navigate(tool.path);
                                setIsOpen(false);
                            }}>
                                <div className="relative">
                                    <Search className="pointer-events-none absolute left-6 top-5 h-6 w-6 text-slate-400" />
                                    <Combobox.Input
                                        className="h-16 w-full border-0 bg-transparent pl-16 pr-6 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-lg font-medium outline-none"
                                        placeholder="Search for tools, categories, or actions..."
                                        onChange={(e) => setQuery(e.target.value)}
                                        autoComplete="off"
                                        autoFocus
                                    />
                                </div>

                                <Combobox.Options static className="max-h-96 scroll-py-2 overflow-y-auto py-4 text-sm text-slate-800">
                                    {query === "" && (
                                        <>
                                            {recentSearches.length > 0 && (
                                                <div className="px-6 mb-4">
                                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                        <History size={14} /> Recently Searched
                                                    </h3>
                                                    <div className="space-y-1">
                                                        {recentSearches.map((tool) => (
                                                            <ToolItem key={`recent-${tool.id}`} tool={tool} getCategoryName={getCategoryName} />
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            <div className="px-6 mb-2">
                                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                    <Sparkles size={14} /> Suggested Tools
                                                </h3>
                                                <div className="space-y-1">
                                                    {suggestedTools.map((tool) => (
                                                        <ToolItem key={`suggested-${tool.id}`} tool={tool} getCategoryName={getCategoryName} />
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {query !== "" && filteredTools.length > 0 && (
                                        <div className="px-2">
                                            {filteredTools.map((tool) => (
                                                <ToolItem key={tool.id} tool={tool} getCategoryName={getCategoryName} />
                                            ))}
                                        </div>
                                    )}

                                    {query !== "" && filteredTools.length === 0 && (
                                        <div className="p-12 text-center">
                                            <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-50 rounded-full text-slate-400 mb-4">
                                                <Search size={24} />
                                            </div>
                                            <p className="text-slate-900 font-bold text-lg">No tools found</p>
                                            <p className="text-slate-500 text-sm">We couldn't find any tool matching your search.</p>
                                        </div>
                                    )}
                                </Combobox.Options>

                                <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-t border-slate-100">
                                    <div className="flex gap-4">
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                            <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-900 shadow-sm">Enter</kbd> to select
                                        </span>
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                            <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-900 shadow-sm">ESC</kbd> to close
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                                        <Command size={14} />
                                        <span>Powered by <a href="https://spinotek.com" target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline">Spinotek</a></span>
                                    </div>
                                </div>
                            </Combobox>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

function ToolItem({ tool, getCategoryName }) {
    const IconComponent = Icons[tool.icon] || Icons.Code;
    return (
        <Combobox.Option
            value={tool}
            className={({ active }) =>
                `cursor-pointer select-none px-4 py-3 rounded-2xl flex items-center justify-between transition-all ${active ? 'bg-blue-50' : 'bg-transparent'
                }`
            }
        >
            {({ active }) => (
                <>
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-50 text-slate-400'
                            }`}>
                            <IconComponent size={20} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <p className={`font-bold ${active ? 'text-blue-900' : 'text-slate-900'}`}>
                                    {tool.title}
                                </p>
                                <span className={`text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded-md ${active ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                                    }`}>
                                    {getCategoryName(tool.cat)}
                                </span>
                                {!tool.isReady && (
                                    <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md ${active ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                        In Dev
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-slate-500 line-clamp-1">{tool.desc}</p>
                        </div>
                    </div>
                    {active && <ArrowRight size={18} className="text-blue-600 animate-in slide-in-from-left-2" />}
                </>
            )}
        </Combobox.Option>
    );
}
