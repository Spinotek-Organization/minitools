import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { FileCode, Bold, Italic, Link, Image, Quote, Code, List, Columns, Eye, Play } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function MarkdownEditor() {
    const [markdown, setMarkdown] = useState('# Welcome to the Markdown Editor\n\nStart typing on the left, and see the preview on the right.');
    const [viewMode, setViewMode] = useState('split'); // split, editor, preview
    const textareaRef = useRef(null);

    const insertAtCursor = (before, after = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selectedText = text.substring(start, end);

        const newText = text.substring(0, start) + before + selectedText + after + text.substring(end);
        
        setMarkdown(newText);
        
        // Restore focus and selection
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, end + before.length);
        }, 0);
    };

    const handleBold = () => insertAtCursor('**', '**');
    const handleItalic = () => insertAtCursor('_', '_');
    const handleLink = () => insertAtCursor('[', '](url)');
    const handleImage = () => insertAtCursor('![alt text](', ')');
    const handleQuote = () => insertAtCursor('> ');
    const handleCode = () => insertAtCursor('`', '`');
    const handleCodeBlock = () => insertAtCursor('```\n', '\n```');
    const handleList = () => insertAtCursor('- ');

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Markdown Editor | MiniTools by Spinotek</title>
                <meta name="description" content="Write and preview Markdown in real-time. Simple, fast, and offline." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-fuchsia-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-fuchsia-200">
                        <FileCode size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Markdown Editor</h1>
                        <p className="text-slate-500 text-sm">Write and preview Markdown syntax instantly.</p>
                    </div>
                </div>

                <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                        onClick={() => setViewMode('editor')}
                        className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${viewMode === 'editor' ? 'bg-white shadow-sm text-fuchsia-600' : 'text-slate-500 hover:text-slate-700'}`}
                        title="Editor Only"
                    >
                        <Code size={16} />
                    </button>
                    <button
                        onClick={() => setViewMode('split')}
                        className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${viewMode === 'split' ? 'bg-white shadow-sm text-fuchsia-600' : 'text-slate-500 hover:text-slate-700'}`}
                        title="Split View"
                    >
                        <Columns size={16} />
                    </button>
                    <button
                        onClick={() => setViewMode('preview')}
                        className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${viewMode === 'preview' ? 'bg-white shadow-sm text-fuchsia-600' : 'text-slate-500 hover:text-slate-700'}`}
                        title="Preview Only"
                    >
                        <Eye size={16} />
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white border border-slate-200 rounded-t-2xl p-2 flex flex-wrap gap-1 sticky top-20 z-10 shadow-sm">
                <ToolbarButton icon={<Bold size={16} />} onClick={handleBold} tooltip="Bold" />
                <ToolbarButton icon={<Italic size={16} />} onClick={handleItalic} tooltip="Italic" />
                <div className="w-[1px] h-6 bg-slate-200 mx-1 self-center" />
                <ToolbarButton icon={<Link size={16} />} onClick={handleLink} tooltip="Link" />
                <ToolbarButton icon={<Image size={16} />} onClick={handleImage} tooltip="Image" />
                <div className="w-[1px] h-6 bg-slate-200 mx-1 self-center" />
                <ToolbarButton icon={<Quote size={16} />} onClick={handleQuote} tooltip="Quote" />
                <ToolbarButton icon={<Code size={16} />} onClick={handleCode} tooltip="Inline Code" />
                <ToolbarButton icon={<List size={16} />} onClick={handleList} tooltip="List Item" />
                
                <div className="flex-1" />
                <div className="text-xs font-mono text-slate-400 self-center px-3">
                    {markdown.length} chars
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 h-[calc(100vh-300px)] min-h-[500px] border-x border-b border-slate-200 bg-white rounded-b-2xl overflow-hidden shadow-sm">
                {/* Editor Pane */}
                {(viewMode === 'editor' || viewMode === 'split') && (
                    <textarea
                        ref={textareaRef}
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        className={`w-full h-full p-6 resize-none outline-none font-mono text-sm leading-relaxed bg-slate-50 text-slate-800 ${viewMode === 'split' ? 'border-r border-slate-200' : ''} ${viewMode === 'editor' ? 'col-span-2' : ''}`}
                        placeholder="Type your markdown here..."
                        spellCheck="false"
                    />
                )}

                {/* Preview Pane */}
                {(viewMode === 'preview' || viewMode === 'split') && (
                    <div className={`w-full h-full overflow-y-auto p-8 prose prose-slate max-w-none ${viewMode === 'preview' ? 'col-span-2' : ''}`}>
                        <ReactMarkdown 
                            components={{
                                h1: ({node, ...props}) => <h1 className="text-3xl font-black mb-4 pb-2 border-b border-slate-200" {...props} />,
                                h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-800" {...props} />,
                                h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-6 mb-3 text-slate-800" {...props} />,
                                p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-slate-700" {...props} />,
                                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-1 text-slate-700" {...props} />,
                                ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-1 text-slate-700" {...props} />,
                                li: ({node, ...props}) => <li className="pl-1" {...props} />,
                                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-fuchsia-300 pl-4 py-1 my-4 italic text-slate-600 bg-fuchsia-50 rounded-r-lg" {...props} />,
                                code: ({node, inline, className, children, ...props}) => {
                                    return inline ? (
                                        <code className="bg-slate-100 text-fuchsia-600 px-1 py-0.5 rounded font-mono text-sm border border-slate-200" {...props}>{children}</code>
                                    ) : (
                                        <div className="bg-slate-900 rounded-lg p-4 my-4 overflow-x-auto text-slate-50 text-sm font-mono leading-relaxed border border-slate-800">
                                            <code {...props}>{children}</code>
                                        </div>
                                    );
                                },
                                a: ({node, ...props}) => <a className="text-fuchsia-600 hover:underline font-medium" {...props} />,
                                img: ({node, ...props}) => <img className="max-w-full h-auto rounded-lg shadow-sm my-4 border border-slate-100" {...props} />,
                                hr: ({node, ...props}) => <hr className="my-8 border-slate-200" {...props} />,
                            }}
                        >
                            {markdown}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            <div className="mt-8">
                <RelatedTools currentToolId="md-editor" categoryId="office" />
            </div>
        </ToolPageLayout>
    );
}

function ToolbarButton({ icon, onClick, tooltip }) {
    return (
        <button
            onClick={onClick}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-fuchsia-600 transition-colors"
            title={tooltip}
        >
            {icon}
        </button>
    );
}
