import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import EmojiPickerReact from 'emoji-picker-react';
import { Smile, Copy, Check } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function EmojiPicker() {
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [copied, setCopied] = useState(false);

    const onEmojiClick = (emojiData) => {
        setSelectedEmoji(emojiData);
        navigator.clipboard.writeText(emojiData.emoji);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Emoji Keyboard & Picker | MiniTools by Spinotek</title>
                <meta name="description" content="Search and copy emojis quickly for your social media posts." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-yellow-200">
                        <Smile size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Emoji Picker</h1>
                        <p className="text-slate-500">Find the perfect emoji. Click to copy.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Picker */}
                <div className="lg:col-span-2 flex justify-center">
                    <div className="w-full max-w-[500px] shadow-xl rounded-3xl overflow-hidden border border-slate-100">
                        <EmojiPickerReact 
                            onEmojiClick={onEmojiClick}
                            width="100%"
                            height={500}
                            previewConfig={{ showPreview: false }}
                            skinTonesDisabled
                            searchPlaceHolder="Search emojis..."
                        />
                    </div>
                </div>

                {/* Details / Copied State */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
                        {selectedEmoji ? (
                            <div className="animate-in fade-in zoom-in duration-300">
                                <div className="text-8xl mb-6 filter drop-shadow-lg">
                                    {selectedEmoji.emoji}
                                </div>
                                <div className="text-slate-900 font-bold text-xl capitalize mb-2">
                                    {selectedEmoji.names[0].replace(/_/g, ' ')}
                                </div>
                                <div className="text-slate-400 font-mono text-xs mb-6 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 inline-block">
                                    U+{selectedEmoji.unified.toUpperCase()}
                                </div>
                                
                                {copied ? (
                                    <div className="flex items-center gap-2 text-green-500 font-bold bg-green-50 px-4 py-2 rounded-xl">
                                        <Check size={20} /> Copied!
                                    </div>
                                ) : (
                                    <div className="text-slate-400 text-sm">
                                        Click to copy again
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-slate-400">
                                <Smile size={64} className="mx-auto mb-4 opacity-20" />
                                <p className="font-medium">Select an emoji to view details and copy code.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="emoji-picker" categoryId="content" />
        </ToolPageLayout>
    );
}
